/** Canonical route + navigation definitions. Import these instead of hard-coding hrefs. */

export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  locations: "/locations",
  gallery: "/gallery",
  faq: "/faq",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
} as const;

export type Route = (typeof routes)[keyof typeof routes];

export interface NavItem {
  label: string;
  href: Route;
}

/** Primary navigation shown in the header and mobile menu. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Locations", href: routes.locations },
  { label: "Gallery", href: routes.gallery },
  { label: "FAQ", href: routes.faq },
];

/** Footer "Explore" column. */
export const footerNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Locations", href: routes.locations },
  { label: "Gallery", href: routes.gallery },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: routes.privacyPolicy },
  { label: "Terms & Conditions", href: routes.terms },
];

/** All statically routable public pages — consumed by the sitemap. */
export const publicRoutes: Route[] = [
  routes.home,
  routes.about,
  routes.services,
  routes.locations,
  routes.gallery,
  routes.faq,
  routes.contact,
  routes.privacyPolicy,
  routes.terms,
];
