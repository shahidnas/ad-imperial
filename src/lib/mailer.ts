import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Delivers contact-form leads by email via a generic SMTP transport
 * (Nodemailer) — works with any SMTP provider (Gmail with an app password,
 * Outlook/Office 365, Zoho Mail, Brevo's free SMTP relay, etc.), so no
 * particular paid vendor is required.
 *
 * The RECIPIENT is fixed to the client's provided address. The SENDER-SIDE
 * SMTP account is configured separately via environment variables (see
 * .env.example) — nothing here is a hardcoded credential. If those env vars
 * are absent, `isEmailConfigured()` returns false and no send is attempted;
 * the API route falls back to logging the lead server-side.
 */

const RECIPIENT_EMAIL =
  process.env.CONTACT_RECIPIENT_EMAIL?.trim() || "snasim@gmail.com";

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

  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "Not provided"],
    ["Service", lead.service || "Not specified"],
    ["Submitted", submittedAt],
  ];

  const text = [
    "New enquiry from the AD Imperial website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    lead.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #111111;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New enquiry from the AD Imperial website</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="font-weight: 700; padding-right: 12px; vertical-align: top; white-space: nowrap;">${escapeHtml(label)}</td>
            <td>${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="font-weight: 700; margin: 20px 0 4px;">Message</p>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(lead.message)}</p>
    </div>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: RECIPIENT_EMAIL,
    // So replying in the inbox goes straight back to the enquirer.
    replyTo: lead.email || undefined,
    subject: `New website enquiry — ${lead.name}`,
    text,
    html,
  });
}
