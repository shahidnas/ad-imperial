import type { MetadataRoute } from "next";
import { allLocationSlugs, getLocationContent } from "@/src/data/locationContent";
import { allServiceSlugs } from "@/src/data/serviceContent";
import { publicRoutes, routes } from "@/src/lib/navigation";
import { absoluteUrl } from "@/src/lib/site";

const priorities: Partial<Record<string, number>> = {
  [routes.home]: 1,
  [routes.services]: 0.9,
  [routes.contact]: 0.9,
  [routes.locations]: 0.85,
  [routes.gallery]: 0.8,
  [routes.about]: 0.7,
  [routes.faq]: 0.7,
  [routes.privacyPolicy]: 0.3,
  [routes.terms]: 0.3,
};

const changeFrequency: Partial<
  Record<string, MetadataRoute.Sitemap[number]["changeFrequency"]>
> = {
  [routes.home]: "monthly",
  [routes.services]: "monthly",
  [routes.locations]: "monthly",
  [routes.gallery]: "monthly",
  [routes.about]: "yearly",
  [routes.faq]: "yearly",
  [routes.contact]: "yearly",
  [routes.privacyPolicy]: "yearly",
  [routes.terms]: "yearly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: changeFrequency[route] ?? "monthly",
    priority: priorities[route] ?? 0.5,
  }));

  // Dedicated service pages — the two pillar pages (letter-board, sign-board)
  // rank slightly above the individual product pages.
  const serviceEntries: MetadataRoute.Sitemap = allServiceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: slug === "letter-board" || slug === "sign-board" ? 0.85 : 0.75,
  }));

  // Location pages — the two state pages (West Bengal, Jharkhand) rank
  // slightly above their individual city pages.
  const locationEntries: MetadataRoute.Sitemap = allLocationSlugs.map((slug) => {
    const entry = getLocationContent(slug);
    return {
      url: absoluteUrl(`/locations/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: entry?.type === "state" ? 0.8 : 0.7,
    };
  });

  return [...staticEntries, ...serviceEntries, ...locationEntries];
}
