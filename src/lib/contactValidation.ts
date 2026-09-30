/**
 * Server-side parsing and validation for contact-form submissions.
 *
 * Kept free of framework and path-aliased imports so it can be unit tested
 * directly (see src/lib/contactValidation.test.ts). The API route
 * (app/api/contact/route.ts) is the only consumer.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

/** Anything larger than this can't be a genuine enquiry. */
export const MAX_BODY_CHARS = 20_000;

export const MAX_LENGTHS = {
  name: 100,
  phone: 20,
  email: 254,
  company: 200,
  service: 100,
  message: 5000,
} as const;

export type Field = keyof typeof MAX_LENGTHS;

export type ContactFields = Record<Field, string>;

export type ContactErrors = Partial<Record<Field, string>>;

/**
 * Reads every known field as a trimmed string. Returns null if the body
 * isn't a plain object or any present field isn't a string, so nothing
 * downstream ever calls `.trim()` on a number, object or array.
 */
export function readFields(body: unknown): ContactFields | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const fields = {} as ContactFields;

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

export function validate(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
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
