import type { NextConfig } from "next";

/**
 * City pages moved from /locations/<city> to /locations/<state>/<city>.
 * Permanent redirects keep old links and any indexed URLs working.
 * (Kept inline: next.config can't import the app's path-aliased data files.)
 */
const LEGACY_CITY_PATHS: Record<string, string> = {
  kolkata: "west-bengal",
  durgapur: "west-bengal",
  asansol: "west-bengal",
  bardhaman: "west-bengal",
  siliguri: "west-bengal",
  ranchi: "jharkhand",
  jamshedpur: "jharkhand",
  dhanbad: "jharkhand",
  bokaro: "jharkhand",
};

/** Images and video renamed to descriptive filenames. */
const RENAMED_ASSETS: Record<string, string> = {
  "/hero/bhikaram.jpeg": "/hero/bhikharam-chandmal-shop-sign-board.jpeg",
  "/hero/nursing.png": "/hero/healing-touch-nursing-home-signage.webp",
  "/hero/kolkata.png": "/hero/i-love-kolkata-illuminated-letters.webp",
  "/hero/market.png": "/hero/shahjan-sons-showroom-facade-signage.webp",
  "/about/about.png": "/about/ad-imperial-illuminated-letter-board.webp",
  "/services/acp-cladding-1.jpeg": "/services/acp-cladding-boundary-wall.jpeg",
  "/services/acp-cladding-2.jpeg": "/services/acp-cladding-building-facade.jpeg",
  "/services/acp1.jpeg": "/services/acp-sign-board-eastern-railway-asansol.jpeg",
  "/services/acp2.jpeg": "/services/acp-sign-board-bhikharam-chandmal.jpeg",
  "/services/channel-letter-1.jpeg": "/services/channel-letter-mall-food-court.jpeg",
  "/services/channel-letter-2.jpeg": "/services/channel-letter-vrinam-menswear.jpeg",
  "/services/channel-letter-3.jpeg": "/services/channel-letter-al-baik-restaurant.jpeg",
  "/services/channel-letter-4.jpeg": "/services/channel-letter-vertical-hindi-sign.jpeg",
  "/services/gold-acrylic-letter-1.jpeg": "/services/gold-acrylic-letters-exclusive-jewellery.jpeg",
  "/services/gold-acrylic-letter-2.jpeg": "/services/gold-acrylic-letters-sindharam-sanwarmal.jpeg",
  "/services/gold-acrylic-letter-3.jpeg": "/services/gold-acrylic-directional-signage.jpeg",
  "/services/led-letter-1.jpeg": "/services/led-letters-green-durgapur.jpeg",
  "/services/led-letter-2.jpeg": "/services/led-letters-opportunity-cafe.jpeg",
  "/services/led-letter-3.jpeg": "/services/led-letters-healthworld-hospitals.jpeg",
  "/services/neon-sign-1.jpeg": "/services/neon-sign-cafe-welcome.jpeg",
  "/services/neon-sign-2.jpeg": "/services/neon-sign-coffee-to-go.jpeg",
  "/services/neon-sign-3.jpeg": "/services/neon-sign-burger-counter.jpeg",
  "/services/neon-sign-4.jpeg": "/services/neon-sign-pizza.jpeg",
  "/services/neon.jpg": "/services/neon-sign-open.jpg",
  "/services/stainless-steel-letters.jpeg": "/services/stainless-steel-letters-fashion-store.jpeg",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // All imagery is served locally from /public; no remote patterns needed.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...Object.entries(LEGACY_CITY_PATHS).map(([city, state]) => ({
        source: `/locations/${city}`,
        destination: `/locations/${state}/${city}`,
        permanent: true,
      })),
      ...Object.entries(RENAMED_ASSETS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
