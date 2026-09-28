import type { MetadataRoute } from "next";
import { seoConfig } from "@/src/lib/seo";
import { absoluteUrl } from "@/src/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Vercel preview/development deployments must never be indexed.
  if (!seoConfig.isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
