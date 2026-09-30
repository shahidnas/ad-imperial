import type { MetadataRoute } from "next";
import { guides } from "@/src/data/guides";
import { allIndustrySlugs } from "@/src/data/industries";
import { cities, cityPath, statePath, states } from "@/src/data/locations";
import { allServiceSlugs } from "@/src/data/serviceContent";
import { publicRoutes, routes } from "@/src/lib/navigation";
import { absoluteUrl } from "@/src/lib/site";

/**
 * Only canonical, indexable URLs: no API routes, no query-string variants
 * (e.g. /contact?service=…), no redirected legacy paths, no 404 page.
 *
 * `lastModified`: only guides carry a real, maintained `dateModified`, so
 * only they send one. Other pages have no reliable per-page date — the build
 * time would claim every page changed on every deploy, which teaches Google
 * to ignore the field — so it's omitted for them rather than invented.
 * (`changeFrequency`/`priority` are ignored by Google but harmless.)
 */

const priorities: Partial<Record<string, number>> = {
  [routes.home]: 1,
  [routes.services]: 0.9,
  [routes.contact]: 0.9,
  [routes.locations]: 0.85,
  [routes.gallery]: 0.8,
  [routes.guides]: 0.6,
  [routes.about]: 0.7,
  [routes.faq]: 0.7,
  [routes.privacyPolicy]: 0.3,
  [routes.terms]: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "monthly",
    priority: priorities[route] ?? 0.5,
  }));

  const serviceEntries: MetadataRoute.Sitemap = allServiceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    changeFrequency: "monthly",
    priority: slug === "letter-board" || slug === "sign-board" ? 0.85 : 0.75,
  }));

  const industryEntries: MetadataRoute.Sitemap = allIndustrySlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const stateEntries: MetadataRoute.Sitemap = states.map((state) => ({
    url: absoluteUrl(statePath(state.slug)),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityEntries: MetadataRoute.Sitemap = cities.map((city) => ({
    url: absoluteUrl(cityPath(city)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`${routes.guides}/${guide.slug}`),
    lastModified: new Date(guide.dateModified),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...industryEntries,
    ...stateEntries,
    ...cityEntries,
    ...guideEntries,
  ];
}
