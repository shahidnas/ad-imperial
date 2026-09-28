import { seoConfig } from "@/src/lib/seo";
import { absoluteUrl, siteConfig } from "@/src/lib/site";

/**
 * JSON-LD builders. Only accurate, visible business information is emitted —
 * no ratings, reviews, prices, opening hours or branch addresses, since none
 * are published by the business.
 */

/** Stable @id of the single LocalBusiness entity, referenced by every Service. */
export const BUSINESS_ID = absoluteUrl("/#business");
export const WEBSITE_ID = absoluteUrl("/#website");

type AreaType = "City" | "State" | "Country";

/** Site-wide LocalBusiness (the Kolkata studio) — rendered once in the root layout. */
export function localBusinessSchema() {
  const { phone, email, address, gstin } = siteConfig.contact;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl(seoConfig.defaultImage.url),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/ad-imperial-logo.png"),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: address.lines.slice(0, -1).join(", "),
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    // One studio in Kolkata; these are the areas it serves — not branches.
    areaServed: [
      { "@type": "City", name: siteConfig.area.split(",")[0] },
      ...seoConfig.serviceStates.map((name) => ({ "@type": "State", name })),
      { "@type": "Country", name: siteConfig.serviceCountry },
    ],
    knowsAbout: [
      "Letter boards",
      "Sign boards",
      "ACP signage",
      "LED signage",
      "Channel letters",
      "Acrylic letters",
      "Stainless steel letters",
      "Neon signage",
    ],
  };

  if (phone) data.telephone = phone;
  if (email) data.email = email;
  if (gstin) data.taxID = gstin;
  if (siteConfig.socials.length > 0) {
    data.sameAs = siteConfig.socials.map((social) => social.href);
  }

  return data;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: seoConfig.language,
    publisher: { "@id": BUSINESS_ID },
  };
}

/** BreadcrumbList JSON-LD for an inner page. `trail` excludes Home. */
export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
) {
  const items = [{ name: "Home", path: "/" }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Service JSON-LD, provided by the site-wide LocalBusiness. */
export function serviceSchema(options: {
  name: string;
  description: string;
  path: string;
  image?: string;
  /** Defaults to the business's Country-level coverage. */
  areaServed?: { type: AreaType; name: string } | Array<{ type: AreaType; name: string }>;
  serviceType?: string;
}) {
  const areas = options.areaServed
    ? Array.isArray(options.areaServed)
      ? options.areaServed
      : [options.areaServed]
    : [{ type: "Country" as const, name: siteConfig.serviceCountry }];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    image: options.image ? absoluteUrl(options.image) : undefined,
    serviceType: options.serviceType ?? options.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: areas.map((area) => ({ "@type": area.type, name: area.name })),
  };
}

/** FAQPage JSON-LD — only for FAQs that are rendered visibly on the same page. */
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Article JSON-LD for a guide. */
export function articleSchema(options: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    mainEntityOfPage: absoluteUrl(options.path),
    url: absoluteUrl(options.path),
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    inLanguage: seoConfig.language,
    image: absoluteUrl(options.image ?? seoConfig.defaultImage.url),
    author: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
  };
}

/** ImageGallery JSON-LD listing real project photos. */
export function imageGallerySchema(options: {
  name: string;
  path: string;
  images: Array<{ src: string; alt: string; title?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: options.name,
    url: absoluteUrl(options.path),
    about: { "@id": BUSINESS_ID },
    image: options.images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(image.src),
      name: image.title,
      description: image.alt,
      creator: { "@id": BUSINESS_ID },
    })),
  };
}
