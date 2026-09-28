import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/src/lib/site";

/**
 * Central SEO configuration.
 *
 * Every page builds its metadata through `buildMetadata()` so that title,
 * description, canonical, Open Graph, Twitter and robots are always emitted
 * together. (Next.js merges metadata *shallowly* — a page that sets its own
 * `openGraph` replaces the layout's entirely, dropping the image, site name
 * and locale — so each page needs the complete object.)
 */

export const seoConfig = {
  siteName: siteConfig.name,
  locale: siteConfig.locale,
  /** BCP 47 language tag for <html lang> and JSON-LD `inLanguage`. */
  language: "en-IN",
  /**
   * Default social share image: a 1200×630 JPEG crop of a real project photo
   * (the Shahjan Sons & Co. showroom). JPEG because some link previews
   * (e.g. WhatsApp) don't reliably support WebP. Dimensions match the file.
   */
  defaultImage: {
    url: "/og/ad-imperial-showroom-signage.jpg",
    width: 1200,
    height: 630,
    alt: "Illuminated facade signage on the Shahjan Sons & Co. family fashion showroom",
  },
  /**
   * Honest service-area model: one studio in Kolkata, serving these states.
   * Used in copy and in LocalBusiness `areaServed`. Never implies branches.
   */
  serviceStates: ["West Bengal", "Jharkhand", "Bihar"],
  /**
   * Search engines other than production (Vercel preview/development
   * deployments) must not index duplicate copies of the site.
   */
  isIndexable:
    !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production",
} as const;

export interface PageSeo {
  /** Page title, without the brand suffix (the layout template adds it). */
  title: string;
  description: string;
  /** Site-relative canonical path, e.g. "/services/led-letters". */
  path: string;
  /** Optional share image (site-relative path). Defaults to seoConfig.defaultImage. */
  image?: { url: string; alt: string; width?: number; height?: number };
  /** A handful of genuinely relevant phrases — never a stuffed list. */
  keywords?: string[];
  type?: "website" | "article";
  /** For articles. ISO dates. */
  publishedTime?: string;
  modifiedTime?: string;
  /** Exclude from search results (still followable). */
  noindex?: boolean;
  /** Use the title exactly as given, without the "| AD Imperial" template. */
  absoluteTitle?: boolean;
}

export function buildMetadata(page: PageSeo): Metadata {
  const image = page.image ?? seoConfig.defaultImage;
  const fullTitle = page.absoluteTitle
    ? page.title
    : `${page.title} | ${seoConfig.siteName}`;
  const index = seoConfig.isIndexable && !page.noindex;

  const openGraphBase = {
    title: fullTitle,
    description: page.description,
    url: page.path,
    siteName: seoConfig.siteName,
    locale: seoConfig.locale,
    images: [image],
  };

  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: page.path },
    openGraph:
      page.type === "article"
        ? {
            ...openGraphBase,
            type: "article",
            publishedTime: page.publishedTime,
            modifiedTime: page.modifiedTime,
          }
        : { ...openGraphBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [image.url],
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/** Absolute URL helper re-exported for JSON-LD builders. */
export { absoluteUrl };
