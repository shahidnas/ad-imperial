import { NextResponse } from "next/server";
import { getEnquiryServiceLabel } from "@/src/data/services";
import {
  getRecipientEmail,
  isEmailConfigured,
  isRecipientConfigured,
  sendContactEmail,
  type ContactLead,
} from "@/src/lib/mailer";
import {
  MAX_BODY_CHARS,
  readFields,
  validate,
} from "@/src/lib/contactValidation";
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

// 5 submissions per IP per 10 minutes — plenty for a real visitor fixing a
// typo or sending a follow-up, while stopping scripted floods.
const checkRateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

/**
 * A webhook that doesn't answer within this window counts as failed, so a
 * slow or hung endpoint can never hold the visitor's submission open.
 */
const WEBHOOK_TIMEOUT_MS = 5000;

function badRequest(message = "Invalid request body.") {
  return NextResponse.json({ ok: false, message }, { status: 400 });
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
    // Aborts with a TimeoutError, which deliverLead catches and logs like
    // any other webhook failure.
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
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
    console.info(
      `[contact] sending lead email to ${getRecipientEmail()}` +
        (isRecipientConfigured()
          ? ""
          : " (built-in default; set CONTACT_RECIPIENT_EMAIL)"),
    );
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

  // Honeypot: silently accept but do nothing. The response deliberately
  // matches a real success so a bot can't tell it was filtered and adapt.
  // Nothing is sent to any channel, so this never inflates lead counts; if
  // client-side analytics are added later, count leads on the server (in
  // deliverLead) rather than from this response.
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
      // Logged at error level so it stands out in the hosting logs (and can
      // drive a log alert) — this record is the only copy of the lead.
      console.error("[contact] new lead (not delivered to any channel):", lead);
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
