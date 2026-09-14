import fs from "node:fs";
import path from "node:path";

/**
 * Builds the gallery from every image in `public/services/`.
 *
 * Drop a file into that folder (named with a recognisable prefix — `acp-`,
 * `neon-`, `led-letter-`, `channel-letter-`, `gold-acrylic-`, `stainless-steel-`,
 * `acp-cladding-`) and it shows up in the right tab automatically. No code
 * change needed.
 */

export interface GalleryItem {
  /** Stable key / filename. */
  key: string;
  /** Public path, e.g. "/services/neon-sign-1.jpeg". */
  image: string;
  category: string;
  title: string;
  alt: string;
}

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

/** First match wins — keep the more specific prefixes above the generic ones. */
const CATEGORY_RULES: { test: RegExp; category: string }[] = [
  { test: /acp[-_ ]?cladding/i, category: "ACP Cladding" },
  { test: /^acp|acp[-_ ]?(board|sheet|letter)/i, category: "ACP Sign Boards" },
  { test: /stainless|steel/i, category: "Steel Letters" },
  { test: /gold(en)?[-_ ]?acrylic|acrylic/i, category: "Acrylic Letters" },
  { test: /led[-_ ]?letter/i, category: "LED Letters" },
  { test: /neon/i, category: "Neon Signage" },
  { test: /channel[-_ ]?letter|3d[-_ ]?channel/i, category: "Channel Letters" },
];

const FALLBACK_CATEGORY = "Other Signage";

/** Tab order. */
const CATEGORY_ORDER = [
  "ACP Sign Boards",
  "ACP Cladding",
  "Steel Letters",
  "Acrylic Letters",
  "LED Letters",
  "Neon Signage",
  "Channel Letters",
  FALLBACK_CATEGORY,
];

const CATEGORY_COPY: Record<string, { title: string; alt: string }> = {
  "ACP Sign Boards": {
    title: "ACP Sign Board",
    alt: "ACP sign board installed on a storefront fascia",
  },
  "ACP Cladding": {
    title: "ACP Cladding",
    alt: "ACP cladding on a commercial building facade",
  },
  "Steel Letters": {
    title: "Stainless Steel Letters",
    alt: "Stainless steel letters mounted on a wall",
  },
  "Acrylic Letters": {
    title: "Acrylic Letters",
    alt: "Acrylic letters forming a business name",
  },
  "LED Letters": {
    title: "LED Letters",
    alt: "Illuminated LED letters on a commercial building",
  },
  "Neon Signage": {
    title: "Neon Signage",
    alt: "Illuminated neon-style sign",
  },
  "Channel Letters": {
    title: "Channel Letters",
    alt: "Dimensional channel letters on a building facade",
  },
  [FALLBACK_CATEGORY]: {
    title: "Signage Project",
    alt: "Custom signage project by AD Imperial",
  },
};

function categoryFor(filename: string): string {
  for (const rule of CATEGORY_RULES) {
    if (rule.test.test(filename)) return rule.category;
  }
  return FALLBACK_CATEGORY;
}

function orderIndex(category: string): number {
  const i = CATEGORY_ORDER.indexOf(category);
  return i === -1 ? CATEGORY_ORDER.length : i;
}

let cache: { items: GalleryItem[]; categories: string[] } | null = null;

export function getServiceGallery(): {
  items: GalleryItem[];
  categories: string[];
} {
  if (cache) return cache;

  const dir = path.join(process.cwd(), "public", "services");

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((file) => IMAGE_EXT.test(file));
  } catch {
    files = [];
  }

  files.sort((a, b) => {
    const byCategory = orderIndex(categoryFor(a)) - orderIndex(categoryFor(b));
    if (byCategory !== 0) return byCategory;
    return a.localeCompare(b, undefined, { numeric: true });
  });

  const totals: Record<string, number> = {};
  for (const file of files) {
    const category = categoryFor(file);
    totals[category] = (totals[category] ?? 0) + 1;
  }

  const seen: Record<string, number> = {};
  const items: GalleryItem[] = files.map((file) => {
    const category = categoryFor(file);
    seen[category] = (seen[category] ?? 0) + 1;
    const copy = CATEGORY_COPY[category] ?? CATEGORY_COPY[FALLBACK_CATEGORY];
    const n = seen[category];
    const suffix = totals[category] > 1 ? ` ${String(n).padStart(2, "0")}` : "";
    return {
      key: file,
      image: `/services/${file}`,
      category,
      title: `${copy.title}${suffix}`,
      alt: `${copy.alt} — ${category} project ${n}`,
    };
  });

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))).sort(
      (a, b) => orderIndex(a) - orderIndex(b),
    ),
  ];

  cache = { items, categories };
  return cache;
}

/**
 * A compact, varied selection for the home "Our Work" teaser —
 * one image per category, in tab order, capped at `limit`.
 */
export function getFeaturedGallery(limit = 6): GalleryItem[] {
  const { items } = getServiceGallery();

  const byCategory = new Map<string, GalleryItem[]>();
  for (const item of items) {
    const bucket = byCategory.get(item.category) ?? [];
    bucket.push(item);
    byCategory.set(item.category, bucket);
  }

  const featured: GalleryItem[] = [];
  const buckets = [...byCategory.values()];
  let round = 0;
  while (featured.length < limit && buckets.some((b) => b.length > round)) {
    for (const bucket of buckets) {
      if (bucket[round]) featured.push(bucket[round]);
      if (featured.length >= limit) break;
    }
    round += 1;
  }
  return featured;
}
