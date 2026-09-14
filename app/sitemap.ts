import type { MetadataRoute } from "next";
import { publicRoutes, routes } from "@/src/lib/navigation";
import { absoluteUrl } from "@/src/lib/site";

const priorities: Partial<Record<string, number>> = {
  [routes.home]: 1,
  [routes.services]: 0.9,
  [routes.contact]: 0.9,
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
  [routes.gallery]: "monthly",
  [routes.about]: "yearly",
  [routes.faq]: "yearly",
  [routes.contact]: "yearly",
  [routes.privacyPolicy]: "yearly",
  [routes.terms]: "yearly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: changeFrequency[route] ?? "monthly",
    priority: priorities[route] ?? 0.5,
  }));
}
