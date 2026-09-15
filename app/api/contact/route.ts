import { NextResponse } from "next/server";
import { isEmailConfigured, sendContactEmail } from "@/src/lib/mailer";

/**
 * Contact / free-quote endpoint.
 *
 * This validates the submission server-side, then delivers it through
 * whichever channel(s) are configured via environment variables:
 *
 *   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD
 *                        — sender-side SMTP account (see src/lib/mailer.ts
 *                          and .env.example). When set, the lead is emailed
 *                          to CONTACT_RECIPIENT_EMAIL (defaults to the
 *                          client's fixed address, snasim@gmail.com).
 *
 *   CONTACT_WEBHOOK_URL  — if set, the payload is ALSO POSTed here as JSON.
 *                          Works with Zapier / Make / n8n, a Slack/Discord
 *                          incoming webhook, or your own endpoint.
 *
 * Both channels are independent and optional. If neither is configured, the
 * lead is logged to the server console and the response reports
 * `delivered: false` so the UI can show an honest message rather than
 * pretending the email was sent.
 */

export const runtime = "nodejs";

interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  company?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

function validate(body: Partial<LeadPayload>) {
  const errors: Record<string, string> = {};
  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.length < 10) {
    errors.message = "Please add a few words about your project.";
  }

  return { errors, clean: { name, phone, email, message } };
}

interface Lead {
  name: string;
  phone: string;
  email: string;
  message: string;
  service: string | null;
  submittedAt: string;
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
    tasks.push(
      sendContactEmail(lead).then(
        () => {
          result.email = true;
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
  let body: Partial<LeadPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: silently accept but do nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const { errors, clean } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, errors, message: "Please check the highlighted fields." },
      { status: 422 },
    );
  }

  const lead: Lead = {
    ...clean,
    service: (body.service ?? "").trim() || null,
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
