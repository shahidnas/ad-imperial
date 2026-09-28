/**
 * Descriptive metadata for every real project photo on the site, keyed by
 * public path. This is the single source for image alt text and captions —
 * the gallery, service, industry and location pages all read from here.
 *
 * Alt text describes what is actually visible in each photo. Only add a
 * `location` when the place is visible in the photo itself (e.g. signage
 * text naming the city) — never guess.
 */

export interface ProjectImage {
  src: string;
  /** Short display title (gallery card / caption heading). */
  title: string;
  /** Descriptive alt text — what the photo shows. */
  alt: string;
  /** City slug, only when the location is visible in the photo. */
  location?: string;
}

const images: ProjectImage[] = [
  // ----- Hero / feature photography -----
  {
    src: "/hero/bhikharam-chandmal-shop-sign-board.jpeg",
    title: "Bhikharam Chandmal Shopfront",
    alt: "Yellow ACP shop sign board with red lettering on the Bhikharam Chandmal storefront",
  },
  {
    src: "/hero/healing-touch-nursing-home-signage.webp",
    title: "Healing Touch Nursing Home",
    alt: "Building signage on the facade of Healing Touch Nursing Home, a multi-speciality and critical care centre",
  },
  {
    src: "/hero/i-love-kolkata-illuminated-letters.webp",
    title: "I ♥ Kolkata Illuminated Letters",
    alt: "Illuminated 3D \"I love Kolkata\" letters reflected in water at night",
    location: "kolkata",
  },
  {
    src: "/hero/shahjan-sons-showroom-facade-signage.webp",
    title: "Shahjan Sons & Co. Showroom",
    alt: "Illuminated facade signage on the Shahjan Sons & Co. family fashion showroom",
  },
  {
    src: "/about/ad-imperial-illuminated-letter-board.webp",
    title: "AD Imperial Letter Board",
    alt: "AD Imperial logo in illuminated gold dimensional letters on a dark wall",
  },

  // ----- Portfolio (public/services) -----
  {
    src: "/services/acp-cladding-boundary-wall.jpeg",
    title: "ACP Cladding — Boundary Wall",
    alt: "ACP cladding being installed on a boundary wall and gate structure",
  },
  {
    src: "/services/acp-cladding-building-facade.jpeg",
    title: "ACP Cladding — Building Facade",
    alt: "ACP cladding installation in progress on a multi-storey building facade",
  },
  {
    src: "/services/acp-sign-board-eastern-railway-asansol.jpeg",
    title: "Eastern Railway DRM Office, Asansol",
    alt: "Illuminated entrance signage at the Divisional Railway Manager's Office, Eastern Railway, Asansol",
    location: "asansol",
  },
  {
    src: "/services/acp-sign-board-bhikharam-chandmal.jpeg",
    title: "Bhikharam Chandmal ACP Sign Board",
    alt: "Yellow ACP sign board with red letters above a Bhikharam Chandmal sweets and fast-food shop",
  },
  {
    src: "/services/channel-letter-mall-food-court.jpeg",
    title: "Mall Food Outlet Channel Letters",
    alt: "Illuminated Bengali channel-letter sign above a food outlet inside a shopping mall",
  },
  {
    src: "/services/channel-letter-vrinam-menswear.jpeg",
    title: "Vrinam Menswear",
    alt: "Illuminated VRINAM MENS channel letters above a menswear store",
  },
  {
    src: "/services/channel-letter-al-baik-restaurant.jpeg",
    title: "Al-Baik Restaurant",
    alt: "Illuminated AL-BAIK channel letters on a red restaurant facade",
  },
  {
    src: "/services/channel-letter-vertical-hindi-sign.jpeg",
    title: "Vertical Illuminated Sign",
    alt: "Vertical illuminated Hindi lettering sign mounted on a building corner",
  },
  {
    src: "/services/gold-acrylic-letters-exclusive-jewellery.jpeg",
    title: "Exclusive Jewellery Store",
    alt: "Gold acrylic EXCLUSIVE letters above an artificial jewellery shop",
  },
  {
    src: "/services/gold-acrylic-letters-sindharam-sanwarmal.jpeg",
    title: "Sindharam Sanwarmal",
    alt: "Gold acrylic letters for Sindharam Sanwarmal food products above a sweet shop",
  },
  {
    src: "/services/gold-acrylic-directional-signage.jpeg",
    title: "Directional Signage",
    alt: "Vertical directional sign with gold acrylic lettering and arrows",
  },
  {
    src: "/services/led-letters-green-durgapur.jpeg",
    title: "Green Durgapur",
    alt: "Illuminated GREEN DURGAPUR LED letter sign installed at a roadside garden in Durgapur",
    location: "durgapur",
  },
  {
    src: "/services/led-letters-opportunity-cafe.jpeg",
    title: "Opportunity Café & Co-works",
    alt: "Warm-white illuminated OPPORTUNITY Café & Co-works letters on a building facade",
  },
  {
    src: "/services/led-letters-healthworld-hospitals.jpeg",
    title: "Healthworld Hospitals",
    alt: "Red illuminated HEALTHWORLD HOSPITALS LED letters on a hospital building at dusk",
  },
  {
    src: "/services/neon-sign-cafe-welcome.jpeg",
    title: "Café Welcome Neon",
    alt: "LED neon coffee-cup heartbeat sign and a Welcome to Opportunity Cafe neon script",
  },
  {
    src: "/services/neon-sign-coffee-to-go.jpeg",
    title: "Coffee To Go Neon",
    alt: "Blue and pink LED neon sign of a coffee cup reading Coffee To Go",
  },
  {
    src: "/services/neon-sign-burger-counter.jpeg",
    title: "Burger Counter Neon",
    alt: "Colourful LED neon burger icons on a restaurant order counter",
  },
  {
    src: "/services/neon-sign-pizza.jpeg",
    title: "Pizza Neon",
    alt: "White and pink LED neon pizza slice sign on a green wall",
  },
  {
    src: "/services/neon-sign-open.jpg",
    title: "OPEN Neon",
    alt: "Red and blue LED neon OPEN sign in a shop window",
  },
  {
    src: "/services/stainless-steel-letters-fashion-store.jpeg",
    title: "Fashion Store Metal Letters",
    alt: "Gold-finish metal letters on a decorated fashion store frontage",
  },
];

const bySrc = new Map(images.map((image) => [image.src, image]));

export function getProjectImage(src: string): ProjectImage | undefined {
  return bySrc.get(src);
}

/** Look up several images by path, skipping any that don't exist. */
export function getProjectImages(srcs: string[]): ProjectImage[] {
  return srcs
    .map((src) => bySrc.get(src))
    .filter((image): image is ProjectImage => Boolean(image));
}

export const projectImages = images;
