import { NextResponse } from "next/server";
import { getEnquiryServiceLabel } from "@/src/data/services";
import {
  getRecipientEmail,
  isEmailConfigured,
  sendContactEmail,
  type ContactLead,
} from "@/src/lib/mailer";
import { createRateLimiter, getClientIp } from "@/src/lib/rateLimit";

/**
 * Contact / free-quote endpoint.
 *
 * This validates the submission server-side, then delivers it through
 * whichever channel(s) are configured via environment variables:
 *
 *   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD
 *                        — sender-side SMTP account (see src/lib/mailer.ts
 *                          and .env.example). When set, the lead is emailed
 *                          to CONTACT_RECIPIENT_EMAIL (defaults to
 *                          nayeem.akhtar181@gmail.com).
 *
 *   CONTACT_WEBHOOK_URL  — if set, the payload is ALSO POSTed here as JSON.
 *                          Works with Zapier / Make / n8n, a Slack/Discord
 *                          incoming webhook, or your own endpoint.
 *
 * Both channels are independent and optional. If neither is configured, the
 * lead is logged to the server console and the response reports
 * `delivered: false` so the UI can show an honest message rather than
 * pretending the email was sent.
 *
 * Malformed input (non-object bodies, non-string fields) is rejected with a
 * 400, invalid values with a 422, and repeated submissions from one IP with
 * a 429 — user input never causes a 500.
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

/** Anything larger than this can't be a genuine enquiry. */
const MAX_BODY_CHARS = 20_000;

const MAX_LENGTHS = {
  name: 100,
  phone: 20,
  email: 254,
  company: 200,
  service: 100,
  message: 5000,
} as const;

type Field = keyof typeof MAX_LENGTHS;

// 5 submissions per IP per 10 minutes — plenty for a real visitor fixing a
// typo or sending a follow-up, while stopping scripted floods.
const checkRateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

function badRequest(message = "Invalid request body.") {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

/**
 * Reads every known field as a trimmed string. Returns null if the body
 * isn't a plain object or any present field isn't a string, so nothing
 * downstream ever calls `.trim()` on a number, object or array.
 */
function readFields(body: unknown): Record<Field, string> | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const fields = {} as Record<Field, string>;

  for (const field of Object.keys(MAX_LENGTHS) as Field[]) {
    const value = record[field];
    if (value === undefined || value === null) {
      fields[field] = "";
    } else if (typeof value === "string") {
      fields[field] = value.trim();
    } else {
      return null;
    }
  }

  return fields;
}

function validate(fields: Record<Field, string>) {
  const errors: Partial<Record<Field, string>> = {};
  const { name, phone, email, message, service } = fields;

  if (name.length < 2 || name.length > MAX_LENGTHS.name) {
    errors.name = "Please enter your name.";
  }
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (email && (email.length > MAX_LENGTHS.email || !EMAIL_RE.test(email))) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.length < 10) {
    errors.message = "Please add a few words about your project.";
  } else if (message.length > MAX_LENGTHS.message) {
    errors.message = `Please keep your message under ${MAX_LENGTHS.message} characters.`;
  }
  if (service.length > MAX_LENGTHS.service) {
    errors.service = "Please choose a service from the list.";
  }

  return errors;
}

interface Lead extends ContactLead {
  /** Raw service slug as submitted (e.g. "letter-board"), for webhooks. */
  serviceSlug: string | null;
}

async function postWebhook(webhookUrl: string, lead: Lead): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    throw new Error(`Webhook responded with ${res.status}`);
  }
}

/**
 * Attempts every configured delivery channel independently (one channel
 * failing doesn't block the other) and reports which ones actually
 * succeeded.
 */
async function deliverLead(
  lead: Lead,
): Promise<{ email: boolean; webhook: boolean }> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const result = { email: false, webhook: false };

  const tasks: Promise<void>[] = [];

  if (isEmailConfigured()) {
    console.info(`[contact] sending lead email to ${getRecipientEmail()}`);
    tasks.push(
      sendContactEmail(lead).then(
        () => {
          result.email = true;
          console.info("[contact] lead email accepted by SMTP server");
        },
        (error) => {
          console.error("[contact] failed to send email:", error);
        },
      ),
    );
  }

  if (webhookUrl) {
    tasks.push(
      postWebhook(webhookUrl, lead).then(
        () => {
          result.webhook = true;
        },
        (error) => {
          console.error("[contact] failed to post webhook:", error);
        },
      ),
    );
  }

  await Promise.all(tasks);
  return result;
}

export async function POST(request: Request) {
  const rate = checkRateLimit(getClientIp(request));
  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Too many requests. Please wait a few minutes and try again, or contact us by phone or WhatsApp.",
      },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) {
      return NextResponse.json(
        { ok: false, message: "Request is too large." },
        { status: 413 },
      );
    }
    body = JSON.parse(raw);
  } catch {
    return badRequest();
  }

  const fields = readFields(body);
  if (!fields) return badRequest();

  // Honeypot: silently accept but do nothing.
  if (fields.company !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const errors = validate(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, errors, message: "Please check the highlighted fields." },
      { status: 422 },
    );
  }

  const serviceSlug = fields.service || null;
  const lead: Lead = {
    name: fields.name,
    phone: fields.phone,
    email: fields.email,
    company: fields.company || null,
    service: serviceSlug
      ? (getEnquiryServiceLabel(serviceSlug) ?? serviceSlug)
      : null,
    serviceSlug,
    message: fields.message,
    submittedAt: new Date().toISOString(),
  };

  try {
    const { email, webhook } = await deliverLead(lead);
    const delivered = email || webhook;

    if (!delivered) {
      // No delivery channel configured (or all configured channels
      // failed) — keep a server-side record so the lead isn't lost.
      console.info("[contact] new lead (not delivered to any channel):", lead);
    }

    return NextResponse.json({ ok: true, delivered });
  } catch (error) {
    console.error("[contact] unexpected error delivering lead:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't send your request right now. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
