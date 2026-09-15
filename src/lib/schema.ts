import { absoluteUrl } from "@/src/lib/site";

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

/** Service JSON-LD for a dedicated service page. */
export function serviceSchema(options: {
  name: string;
  description: string;
  path: string;
  image?: string;
  providerName: string;
  areaCountry: string;
  /** Overrides the default Country-level areaServed — e.g. a State or City for a regional page. */
  areaServed?: { type: "City" | "State" | "Country"; name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    image: options.image ? absoluteUrl(options.image) : undefined,
    serviceType: options.name,
    provider: {
      "@type": "LocalBusiness",
      name: options.providerName,
    },
    areaServed: options.areaServed
      ? { "@type": options.areaServed.type, name: options.areaServed.name }
      : { "@type": "Country", name: options.areaCountry },
  };
}

/** FAQPage JSON-LD from a list of question/answer pairs. */
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
