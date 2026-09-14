import { NextResponse } from "next/server";

/**
 * Contact / free-quote endpoint.
 *
 * This validates the submission server-side and then hands it off to whatever
 * delivery channel is configured via environment variables:
 *
 *   CONTACT_WEBHOOK_URL  — if set, the payload is POSTed here as JSON. Works
 *                          with Zapier / Make / n8n / a Slack or Discord
 *                          incoming webhook, or your own endpoint.
 *
 * If nothing is configured the lead is logged to the server console and the
 * response reports `delivered: false` so the UI can show an honest message.
 * Wire up an email provider (Resend, Nodemailer, SES, …) inside `deliverLead`
 * when one is available.
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

async function deliverLead(lead: Record<string, unknown>): Promise<boolean> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    throw new Error(`Webhook responded with ${res.status}`);
  }
  return true;
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

  const lead = {
    ...clean,
    service: (body.service ?? "").trim() || null,
    submittedAt: new Date().toISOString(),
  };

  try {
    const delivered = await deliverLead(lead);

    if (!delivered) {
      // No delivery channel configured — keep a server-side record.
      console.info("[contact] new lead (no delivery channel configured):", lead);
    }

    return NextResponse.json({ ok: true, delivered });
  } catch (error) {
    console.error("[contact] failed to deliver lead:", error);
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
