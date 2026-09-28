export interface LocationFaq {
  question: string;
  answer: string;
}

/** A service recommended for a location, with a location-specific reason. */
export interface ServiceHighlight {
  /** Slug of a /services/[slug] page. */
  slug: string;
  /** Why this service suits businesses in this particular place. */
  note: string;
}

interface LocationBase {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Accent?: string;
  intro: string;
  /** Honest paragraph on the area's business character — unique per page. */
  regionalContext: string;
  serviceHighlights: ServiceHighlight[];
  /** Slugs of industry pages (see src/data/industries.ts). */
  industries: string[];
  /** Real project photos (paths in src/data/projectImages.ts) relevant to this area. */
  projectImages?: string[];
  faqs: LocationFaq[];
  /** A few natural search phrases for the keywords meta — never a stuffed list. */
  keywords: string[];
}

export interface StateLocation extends LocationBase {
  type: "state";
  /** How projects in this state are planned, fabricated and installed from Kolkata. */
  coverageNote: string;
  /** City slugs within this state that have their own page. */
  citySlugs: string[];
}

export interface CityLocation extends LocationBase {
  type: "city";
  stateSlug: string;
  /** Other common spellings, e.g. Burdwan for Bardhaman. */
  altNames?: string[];
  /** Well-known commercial areas and markets in the city that we cover. */
  commercialAreas: string[];
  /** Practical, location-specific installation and planning notes. */
  installationNote: string;
  /** Nearby cities with their own pages (may be in a neighbouring state). */
  nearby: string[];
}

export type LocationEntry = StateLocation | CityLocation;
