/**
 * Central site configuration.
 *
 * Official AD Imperial business details live here. Every component — header,
 * footer, contact page, structured data — reads from this file, so updating a
 * detail here updates it everywhere. Values can also be overridden per
 * environment via the matching `NEXT_PUBLIC_*` variables.
 *
 * A contact channel left as an empty string is treated as "not configured"
 * and is hidden from the UI rather than rendered as a dead link.
 */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // bootstrap-icons class name, e.g. "bi-instagram"
}

export interface BusinessAddress {
  /** Address as it should be displayed, one entry per line. */
  lines: string[];
  locality: string;
  region: string;
  postalCode: string;
  /** ISO country code. */
  country: string;
}

const address: BusinessAddress = {
  lines: [
    "43, B.B. Ganguly Street",
    "Near Central Metro Station",
    "Kolkata – 700012",
  ],
  locality: "Kolkata",
  region: "West Bengal",
  postalCode: "700012",
  country: "IN",
};

export const siteConfig = {
  name: "AD Imperial",
  legalName: "AD Imperial",
  shortName: "AD Imperial",
  /** Used for metadataBase, canonical URLs and the sitemap. */
  url: siteUrl,
  description:
    "Premium letter boards, 3D letters, LED & neon signage and custom signage solutions in Kolkata. Designed, crafted and installed with precision.",
  locale: "en_IN",
  /** Primary service area — used in copy and structured data. */
  area: "Kolkata, West Bengal",

  contact: {
    /** Display form of the primary mobile number. */
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 97094 67647",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    /** Digits only, international format, e.g. "919876543210". */
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "919709467647",
    /** Goods & Services Tax Identification Number. */
    gstin: process.env.NEXT_PUBLIC_GSTIN || "19AIGPA8165N1ZS",
    address,
  },

  /**
   * Only add entries that point to a real profile. Empty list = the social
   * row is not rendered at all.
   */
  socials: [] as SocialLink[],
};

export type SiteConfig = typeof siteConfig;

/** Tel: href helper — returns null when no phone is configured. */
export function telHref(): string | null {
  const phone = siteConfig.contact.phone.replace(/[^\d+]/g, "");
  return phone ? `tel:${phone}` : null;
}

/** mailto: href helper — returns null when no email is configured. */
export function mailtoHref(): string | null {
  return siteConfig.contact.email
    ? `mailto:${siteConfig.contact.email}`
    : null;
}

/** WhatsApp chat href helper — returns null when not configured. */
export function whatsappHref(message?: string): string | null {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}

/** Absolute URL for a given path, based on the configured site URL. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** True when at least one contact channel is configured. */
export function hasAnyContactChannel(): boolean {
  const { phone, email, whatsapp } = siteConfig.contact;
  return Boolean(phone || email || whatsapp);
}
