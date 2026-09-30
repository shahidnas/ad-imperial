import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Delivers contact-form leads by email via a generic SMTP transport
 * (Nodemailer) — works with any SMTP provider (Gmail with an app password,
 * Outlook/Office 365, Zoho Mail, Brevo's free SMTP relay, etc.), so no
 * particular paid vendor is required.
 *
 * The RECIPIENT defaults to nayeem.akhtar181@gmail.com (overridable with
 * CONTACT_RECIPIENT_EMAIL) and is independent of the sender. The SENDER-SIDE
 * SMTP account is configured separately via environment variables (see
 * .env.example) — nothing here is a hardcoded credential. If those env vars
 * are absent, `isEmailConfigured()` returns false and no send is attempted;
 * the API route falls back to logging the lead server-side.
 */

const RECIPIENT_FROM_ENV = process.env.CONTACT_RECIPIENT_EMAIL?.trim() || "";

/**
 * Kept as a fallback so existing deployments without CONTACT_RECIPIENT_EMAIL
 * keep delivering. Production should set the env var explicitly.
 */
const DEFAULT_RECIPIENT_EMAIL = "nayeem.akhtar181@gmail.com";

const RECIPIENT_EMAIL = RECIPIENT_FROM_ENV || DEFAULT_RECIPIENT_EMAIL;

/** Where leads are delivered — safe to log (not a credential). */
export function getRecipientEmail(): string {
  return RECIPIENT_EMAIL;
}

/** False when the built-in fallback recipient is in use. */
export function isRecipientConfigured(): boolean {
  return Boolean(RECIPIENT_FROM_ENV);
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD,
  );
}

export interface ContactLead {
  name: string;
  phone: string;
  email: string;
  company: string | null;
  /** Human-readable service label, e.g. "Letter Board". */
  service: string | null;
  message: string;
  /** ISO timestamp. */
  submittedAt: string;
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const port = Number(process.env.SMTP_PORT);

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // Port 465 is implicit TLS; anything else (587, 25, …) uses STARTTLS.
    // SMTP_SECURE can override this explicitly if a provider needs it.
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Nodemailer's defaults (2 min to connect, 10 min idle socket) could hold
    // a contact-form request open far past the serverless function limit.
    // A normal send completes in a few seconds; past these, fail fast so the
    // route can log the lead and respond.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return cachedTransporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSubmittedAt(iso: string): string {
  try {
    return `${new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: "Asia/Kolkata",
    }).format(new Date(iso))} (IST)`;
  } catch {
    return iso;
  }
}

/**
 * Sends the lead to RECIPIENT_EMAIL. Throws if SMTP isn't configured or the
 * send fails — callers should catch and log/handle accordingly.
 */
export async function sendContactEmail(lead: ContactLead): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error(
      "SMTP is not configured (missing SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASSWORD).",
    );
  }

  const transporter = getTransporter();
  const fromAddress = process.env.SMTP_FROM || (process.env.SMTP_USER as string);
  const submittedAt = formatSubmittedAt(lead.submittedAt);

  const heading = "AD Imperial — New Website Enquiry";

  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "Not provided"],
    ["Company", lead.company || "Not provided"],
    ["Selected Service", lead.service || "Not specified"],
  ];

  const text = [
    heading,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    lead.message,
    "",
    `Submission Date/Time: ${submittedAt}`,
  ].join("\n");

  const labelCell =
    "padding: 10px 16px 10px 0; border-bottom: 1px solid #eeeeee; font-weight: 700; color: #555555; vertical-align: top; white-space: nowrap;";
  const valueCell =
    "padding: 10px 0; border-bottom: 1px solid #eeeeee; color: #111111; vertical-align: top;";

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.5; color: #111111; max-width: 600px;">
      <h2 style="margin: 0 0 4px; font-size: 20px;">${escapeHtml(heading)}</h2>
      <p style="margin: 0 0 20px; color: #666666;">Submitted via the contact form on the AD Imperial website.</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="${labelCell}">${escapeHtml(label)}</td>
            <td style="${valueCell}">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="font-weight: 700; color: #555555; margin: 20px 0 6px;">Message</p>
      <div style="white-space: pre-wrap; padding: 12px 14px; background: #f7f7f7; border-radius: 6px;">${escapeHtml(lead.message)}</div>
      <p style="margin: 20px 0 0; color: #666666;"><strong>Submission Date/Time:</strong> ${escapeHtml(submittedAt)}</p>
    </div>
  `;

  await transporter.sendMail({
    // Always the configured SMTP account — never the visitor's address.
    from: fromAddress,
    to: RECIPIENT_EMAIL,
    // Only a validated visitor address reaches here, so replying in the
    // inbox goes straight back to the enquirer.
    replyTo: lead.email || undefined,
    subject: `${heading} — ${lead.name.replace(/\s+/g, " ")}`,
    text,
    html,
  });
}
