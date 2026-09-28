import { isPendingConfirmation } from "@/src/data/productStatus";

export interface Service {
  /** URL-safe identifier (used for anchors and enquiry pre-fill). */
  slug: string;
  number: string;
  title: string;
  /** Short one-line label. */
  category: string;
  /** Card / summary description. */
  description: string;
  /** Longer description shown on the services page. */
  detail: string;
  /** Key talking points. */
  highlights: string[];
  /**
   * Representative photo. Provide either `image` or `video` (not both) —
   * the media card renders whichever is present, preferring `video` when
   * both happen to be set.
   */
  image?: string;
  imageAlt?: string;
  /** Representative video, used instead of `image` when set. */
  video?: string;
  /** Accessible description of the video, for `aria-label`. */
  videoAlt?: string;
}

export const services: Service[] = [
  {
    slug: "acp-sign-boards",
    number: "01",
    title: "ACP Sign Boards",
    category: "Signage Solution",
    description:
      "Clean, contemporary and durable signage crafted with premium ACP materials for a refined business presence.",
    detail:
      "Aluminium composite panel boards give your storefront a flat, seamless finish that holds its colour and shape for years. We fabricate the base, route the graphics and mount everything to a level, weather-ready frame.",
    highlights: [
      "Weather and fade resistant",
      "Seamless matte or gloss finishes",
      "Ideal for shopfronts and building fascias",
    ],
    image: "/services/acp-sign-board-bhikharam-chandmal.jpeg",
    imageAlt: "Yellow ACP sign board with red letters above a Bhikharam Chandmal sweets and fast-food shop",
  },
  {
    slug: "stainless-steel-letters",
    number: "02",
    title: "Stainless Steel Letters",
    category: "Signage Solution",
    description:
      "Premium metallic lettering designed to deliver depth, elegance and a sophisticated architectural finish.",
    detail:
      "Brushed or mirror-polished stainless steel letters add a solid, architectural weight to a facade. Each letter is cut, finished and stud-mounted for a crisp shadow line and a lasting premium look.",
    highlights: [
      "Brushed, polished or coloured finishes",
      "Corrosion resistant for outdoor use",
      "Optional halo (back-lit) illumination",
    ],
    image: "/services/stainless-steel-letters-fashion-store.jpeg",
    imageAlt: "Gold-finish metal letters on a decorated fashion store frontage",
  },
  {
    slug: "gold-acrylic-letters",
    number: "03",
    title: "Gold Acrylic Letters",
    category: "Signage Solution",
    description:
      "Modern acrylic signage with precise detailing, smooth finishes and a distinctive premium appearance.",
    detail:
      "Acrylic letters are lightweight, colour-rich and easy to shape into custom typography. They work equally well indoors for reception walls and outdoors for shopfronts, with or without lighting.",
    highlights: [
      "Wide colour and thickness range",
      "Sharp edges and smooth faces",
      "Great for logos and reception branding",
    ],
    image: "/services/gold-acrylic-letters-sindharam-sanwarmal.jpeg",
    imageAlt: "Gold acrylic letters for Sindharam Sanwarmal food products above a sweet shop",
  },
  {
    slug: "led-neon-signage",
    number: "04",
    title: "LED & Neon Signage",
    category: "Signage Solution",
    description:
      "Eye-catching illuminated signage designed to make your brand stand out from day to night.",
    detail:
      "From flexible LED neon to back-lit and edge-lit boards, illuminated signage keeps your brand visible after dark. We size the lighting for even brightness and a clean, low-maintenance install.",
    highlights: [
      "Energy-efficient LED modules",
      "Custom neon-style bends and script",
      "Even, flicker-free illumination",
    ],
    image: "/services/neon-sign-cafe-welcome.jpeg",
    imageAlt: "LED neon coffee-cup heartbeat sign and a Welcome to Opportunity Cafe neon script",
  },
  {
    slug: "channel-letters",
    number: "05",
    title: "Channel Letters",
    category: "Signage Solution",
    description:
      "Dimensional channel lettering engineered for maximum visual impact and a strong brand presence.",
    detail:
      "Built-up channel letters give depth and presence to a facade. Faces, returns and trim caps are assembled per letter, with front-lit or halo-lit options for round-the-clock visibility.",
    highlights: [
      "Front-lit or halo-lit options",
      "Custom depth and typography",
      "High daytime and nighttime impact",
    ],
    image: "/services/channel-letter-vrinam-menswear.jpeg",
    imageAlt: "Illuminated VRINAM MENS channel letters above a menswear store",
  },
  {
  slug: "led-letters",
  number: "06",
  title: "LED Letters",
  category: "Signage Solution",
  description:
    "Premium illuminated LED letters crafted to give your brand a bold, modern and highly visible presence.",
  detail:
    "LED letters combine dimensional lettering with energy-efficient illumination for a clean and premium look. They are ideal for storefronts, building facades, reception areas and commercial spaces.",
  highlights: [
    "Bright and energy-efficient LED lighting",
    "Front-lit or halo-lit options",
    "Custom fonts, sizes and finishes",
  ],
  image: "/services/led-letters-healthworld-hospitals.jpeg",
  imageAlt: "Red illuminated HEALTHWORLD HOSPITALS LED letters on a hospital building at dusk",
},
{
  slug: "acp-cladding",
  number: "07",
  title: "ACP Cladding",
  category: "Architectural Solution",
  description:
    "Modern ACP cladding solutions designed to transform building facades with a clean, elegant and contemporary finish.",
  detail:
    "ACP cladding creates a seamless architectural facade while protecting the exterior surface. We provide custom fabrication, precision cutting and professional installation for commercial buildings and storefronts.",
  highlights: [
    "Modern and seamless facade finish",
    "Weather-resistant and durable panels",
    "Custom colours, patterns and designs",
  ],
  image: "/services/acp-cladding-boundary-wall.jpeg",
  imageAlt: "ACP cladding being installed on a boundary wall and gate structure",
},
  {
    slug: "video-wall",
    number: "08",
    title: "Video Wall",
    category: "Video Wall",
    description:
      "Large-format outdoor LED video walls that turn a building facade into a bright, dynamic display for your brand.",
    detail:
      "Video walls are built from weatherproof LED panels, structurally mounted to the facade and calibrated for even brightness and colour — ideal where a static sign isn't enough for a busy commercial street front.",
    highlights: [
      "Bright, full-colour LED display, visible day and night",
      "Weatherproof panels built for outdoor installation",
      "Professional structural mounting and calibration",
    ],
    video: "/services/video-wall.mp4",
    videoAlt: "Installation footage of an outdoor LED video wall mounted on a commercial building facade",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/**
 * Options for the contact form's "Service" dropdown, keyed by the same slug
 * used in `/contact?service=<slug>`. The two pillar pages (letter-board,
 * sign-board) aren't physical products in `services`, so they're listed here
 * explicitly so they can be pre-selected too.
 */
export const enquiryServiceOptions: Array<{ slug: string; title: string }> = [
  { slug: "letter-board", title: "Letter Board" },
  { slug: "sign-board", title: "Sign Board" },
  ...services.map(({ slug, title }) => ({ slug, title })),
  { slug: "glow-sign-board", title: "Glow Sign Board" },
  { slug: "acrylic-sign-board", title: "Acrylic Sign Board" },
  { slug: "metal-letters", title: "Brass & Aluminium Letters" },
  { slug: "other", title: "Something else" },
].filter((option) => !isPendingConfirmation(option.slug));

/** Human-readable label for an enquiry service slug, if it's a known one. */
export function getEnquiryServiceLabel(slug: string): string | undefined {
  return enquiryServiceOptions.find((option) => option.slug === slug)?.title;
}
