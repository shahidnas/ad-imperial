import { getIndustry } from "@/src/data/industries";
import { isPendingConfirmation } from "@/src/data/productStatus";
import { getServiceContent } from "@/src/data/serviceContent";

/**
 * Resolves any slug under /services/[slug] — a product, a pillar category or
 * an industry page — to a label and href for internal links.
 */

export interface ServiceLink {
  slug: string;
  label: string;
  href: string;
}

// Pillar h1s are written as page headings ("Sign Board Manufacturer");
// links read better with a plain noun.
const LABEL_OVERRIDES: Record<string, string> = {
  "letter-board": "Letter Boards",
  "sign-board": "Sign Boards",
};

export function getServiceLink(slug: string): ServiceLink | undefined {
  // Unconfirmed products are never linked.
  if (isPendingConfirmation(slug)) return undefined;

  const service = getServiceContent(slug);
  if (service) {
    return {
      slug,
      label: LABEL_OVERRIDES[slug] ?? service.h1,
      href: `/services/${slug}`,
    };
  }

  const industry = getIndustry(slug);
  if (industry) {
    return { slug, label: industry.name, href: `/services/${slug}` };
  }

  return undefined;
}

export function getServiceLinks(slugs: string[]): ServiceLink[] {
  return slugs
    .map((slug) => getServiceLink(slug))
    .filter((link): link is ServiceLink => Boolean(link));
}
