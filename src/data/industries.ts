/**
 * Industry (sector) signage pages, rendered under /services/[slug].
 *
 * These describe how AD Imperial's existing products are applied to a
 * sector — they are not separate products. Every project photo referenced
 * here is a real AD Imperial job from src/data/projectImages.ts.
 */

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface IndustryEntry {
  slug: string;
  /** Short name used in links and cards, e.g. "Hospital & Clinic Signage". */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Accent?: string;
  intro: string;
  /** Who this page is for. */
  audience: string[];
  /** Why signage matters in this sector — practical, not generic. */
  context: string;
  /** Signage zones/types typical for the sector. */
  signageTypes: { name: string; description: string }[];
  /** Products that suit the sector, with a sector-specific reason. */
  recommended: { slug: string; note: string }[];
  /** Planning considerations specific to the sector. */
  considerations: string[];
  projectImages: string[];
  faqs: IndustryFaq[];
  keywords: string[];
}

export const industries: IndustryEntry[] = [
  {
    slug: "shop-sign-board",
    name: "Shop & Showroom Signage",
    metaTitle: "Shop Sign Board & Showroom Signage Manufacturer",
    metaDescription:
      "Shop sign boards and showroom signage — ACP fascia boards, illuminated letters, gold acrylic and back-lit boards — designed and installed by AD Imperial.",
    h1: "Shop Sign Boards &",
    h1Accent: "Showroom Signage.",
    intro:
      "For a shop or showroom, the sign board is the first thing a customer reads and often the reason they stop. AD Imperial designs, fabricates and installs shop sign boards and showroom fascia signage for retailers, sweet shops, jewellers, fashion stores and franchise outlets — from a single storefront to a multi-storey showroom facade.",
    audience: [
      "Retail shops and neighbourhood stores",
      "Fashion, jewellery and lifestyle showrooms",
      "Sweet shops, bakeries and food retail",
      "Franchise and multi-outlet brands",
    ],
    context:
      "Retail frontages compete for attention on crowded streets, so a shop sign has to stay legible from across the road, at an angle, and after dark. The right choice depends on the width of your fascia, how far away customers first see it, whether the street is busy at night, and how much weather the board will face. We look at all of these before recommending a material.",
    signageTypes: [
      {
        name: "Main fascia board",
        description:
          "The primary name board above the shopfront — usually ACP with raised or illuminated letters, sized to the full width of the frontage.",
      },
      {
        name: "Illuminated shop letters",
        description:
          "Channel letters or LED letters mounted on the fascia so the shop name stays visible in the evening, when many high streets are busiest.",
      },
      {
        name: "Premium showroom lettering",
        description:
          "Gold acrylic or stainless steel letters for jewellers, fashion showrooms and brands that want a high-end finish.",
      },
      {
        name: "Back-lit boards",
        description:
          "Boards lit from behind so the face glows evenly at night — a cost-effective way to keep a smaller frontage visible after dark.",
      },
      {
        name: "Neon accents and window signs",
        description:
          "LED neon logos, OPEN signs and feature pieces for windows and interiors, especially for cafés, fashion and lifestyle stores.",
      },
    ],
    recommended: [
      { slug: "acp-sign-boards", note: "The most common fascia base for shops — weatherproof, flat and easy to keep clean." },
      { slug: "channel-letters", note: "Dimensional, illuminated shop names that read clearly from a distance, day and night." },
      { slug: "gold-acrylic-letters", note: "A premium, polished look for jewellery, sweets and fashion showrooms." },
      { slug: "glow-sign-board", note: "An economical backlit board for smaller shops and projecting signs." },
      { slug: "led-neon-signage", note: "Eye-catching window and interior pieces that suit cafés and lifestyle stores." },
    ],
    considerations: [
      "Measure the full fascia width and height — the board should be sized to the frontage, not the other way round.",
      "Check whether your market, mall or building has rules on sign size, projection or illumination.",
      "Decide whether the sign needs to work at night; if so, choose illuminated letters or a back-lit board.",
      "Use your brand colours and logo files so the sign matches your packaging and interiors.",
      "For multi-outlet brands, keep one approved design so every store looks consistent.",
    ],
    projectImages: [
      "/hero/bhikharam-chandmal-shop-sign-board.jpeg",
      "/services/channel-letter-vrinam-menswear.jpeg",
      "/services/gold-acrylic-letters-exclusive-jewellery.jpeg",
      "/hero/shahjan-sons-showroom-facade-signage.webp",
    ],
    faqs: [
      {
        question: "Which sign board is best for a shop?",
        answer:
          "For most shops, an ACP fascia board with raised or illuminated letters gives the best balance of durability, visibility and cost. If your shop trades in the evening, illuminated channel letters or a back-lit board keep the name visible after dark. For jewellers and premium showrooms, gold acrylic or stainless steel letters give a more upmarket finish.",
      },
      {
        question: "Can you make matching signage for all our outlets?",
        answer:
          "Yes. Once a design is approved we fabricate to the same specification for each outlet, adjusting only the size to suit each frontage, so every store looks consistent.",
      },
      {
        question: "Do you install shop signs outside Kolkata?",
        answer:
          "Yes. We fabricate at our Kolkata studio and deliver and install shop signage for businesses across West Bengal, Jharkhand and Bihar.",
      },
    ],
    keywords: [
      "shop sign board manufacturer",
      "showroom signage",
      "shop name board",
      "retail signage Kolkata",
    ],
  },
  {
    slug: "hospitality-signage",
    name: "Restaurant, Café & Hotel Signage",
    metaTitle: "Restaurant, Café & Hotel Signage Manufacturer",
    metaDescription:
      "Restaurant, café and hotel signage — illuminated facade letters, LED neon signs and counter pieces — designed and fabricated by AD Imperial in Kolkata.",
    h1: "Restaurant, Café &",
    h1Accent: "Hotel Signage.",
    intro:
      "Restaurants, cafés and hotels do much of their business in the evening, and their signage has to carry the brand's personality as well as its name. AD Imperial fabricates illuminated facade letters, LED neon signs and interior feature pieces for food and hospitality businesses — from a single café counter to a full restaurant frontage.",
    audience: [
      "Restaurants and quick-service outlets",
      "Cafés, bakeries and dessert brands",
      "Hotels, guest houses and banquet venues",
      "Food courts and mall outlets",
    ],
    context:
      "In hospitality, signage does two jobs: it gets people through the door, and it shapes how the space feels once they're inside. A facade sign needs to be bright and legible from the street at night, while interior neon and counter signage set the mood and can double as the photo spot customers share online.",
    signageTypes: [
      {
        name: "Illuminated facade letters",
        description:
          "Channel letters or LED letters for the main frontage so the restaurant or hotel name stands out after dark.",
      },
      {
        name: "LED neon feature signs",
        description:
          "Custom neon logos, taglines and illustrations for walls and counters — a strong fit for cafés and quick-service brands.",
      },
      {
        name: "Order counter and menu area signage",
        description:
          "Neon icons, backlit panels and lettering around the counter to guide customers and reinforce the brand.",
      },
      {
        name: "Hotel entrance and reception lettering",
        description:
          "Stainless steel or gold acrylic letters for hotel entrances, reception walls and banquet areas.",
      },
    ],
    recommended: [
      { slug: "led-neon-signage", note: "The signature piece for many cafés and restaurants — bright, colourful and brand-specific." },
      { slug: "channel-letters", note: "Durable illuminated letters for the street-facing facade." },
      { slug: "led-letters", note: "Clean, energy-efficient lighting for building-front lettering that runs every evening." },
      { slug: "metal-letters", note: "A premium finish for hotel reception walls and entrances." },
    ],
    considerations: [
      "Plan the facade sign for night-time visibility — that's when most footfall arrives.",
      "Keep neon and counter pieces consistent with your menu, packaging and interior colours.",
      "For kitchens and food courts, choose sealed LED components and wipe-clean surfaces.",
      "Agree running hours early so power supplies and timers are specified correctly.",
    ],
    projectImages: [
      "/services/channel-letter-al-baik-restaurant.jpeg",
      "/services/led-letters-opportunity-cafe.jpeg",
      "/services/neon-sign-cafe-welcome.jpeg",
      "/services/neon-sign-burger-counter.jpeg",
    ],
    faqs: [
      {
        question: "Can you make a custom neon sign of our café logo?",
        answer:
          "Yes. Share your logo or artwork and we'll prepare a layout for an LED neon version, sized for the wall or counter where it will be mounted.",
      },
      {
        question: "Is LED neon safe to run all evening in a restaurant?",
        answer:
          "LED neon runs at low voltage and stays cool compared with traditional glass neon, which makes it well suited to long evening hours in cafés and restaurants.",
      },
      {
        question: "Do you make signage for hotels as well as restaurants?",
        answer:
          "Yes — facade letters, reception wall lettering and interior signage for hotels, guest houses and banquet venues, alongside restaurant and café signage.",
      },
    ],
    keywords: [
      "restaurant signage",
      "cafe neon sign",
      "hotel signage manufacturer",
      "restaurant sign board",
    ],
  },
  {
    slug: "hospital-signage",
    name: "Hospital & Clinic Signage",
    metaTitle: "Hospital, Clinic & Nursing Home Signage Manufacturer",
    metaDescription:
      "Hospital, clinic and nursing home signage — illuminated building names, facade boards and interior directional signs — made and installed by AD Imperial.",
    h1: "Hospital, Clinic &",
    h1Accent: "Nursing Home Signage.",
    intro:
      "Healthcare signage has to be readable at a glance, day and night, by people who may be stressed or in a hurry. AD Imperial fabricates building name signage, illuminated facade letters and interior directional boards for hospitals, nursing homes, diagnostic centres and clinics.",
    audience: [
      "Hospitals and multi-speciality centres",
      "Nursing homes and critical care centres",
      "Clinics and diagnostic centres",
      "Pharmacies and healthcare retail",
    ],
    context:
      "Patients, families and ambulances need to find a hospital quickly, often at night, so the building name should be illuminated and visible from the main road. Inside, clear directional and department signage reduces confusion at reception, emergency, OPD and pharmacy counters. Durability and easy cleaning matter as much as appearance.",
    signageTypes: [
      {
        name: "Illuminated building name",
        description:
          "Large LED or channel letters on the facade or rooftop so the hospital can be found from the main road at any hour.",
      },
      {
        name: "Entrance and emergency signage",
        description:
          "Clearly lit boards for main entrances, emergency and ambulance access points.",
      },
      {
        name: "Department and directional boards",
        description:
          "ACP or acrylic directional signs for reception, OPD, diagnostics, wards and pharmacy — wipe-clean and legible.",
      },
      {
        name: "Facade service listing",
        description:
          "Fascia boards listing the key services — ICU, diagnostics, pharmacy — as seen on many nursing home frontages.",
      },
    ],
    recommended: [
      { slug: "led-letters", note: "Bright, energy-efficient building name lettering that stays lit through the night." },
      { slug: "acp-sign-boards", note: "Durable facade and entrance boards that are easy to keep clean." },
      { slug: "acrylic-sign-board", note: "Clean, wipeable interior department and directional signs." },
      { slug: "channel-letters", note: "Dimensional illuminated letters for the main frontage." },
    ],
    considerations: [
      "Make the building name visible from the main approach road, and illuminated for night arrivals.",
      "Use high-contrast colours and large, simple fonts for directional signs.",
      "If your facility follows NABH or another accreditation's signage guidelines, share them and we'll fabricate to that specification.",
      "Choose materials that tolerate frequent cleaning and disinfectants for interior signs.",
    ],
    projectImages: [
      "/hero/healing-touch-nursing-home-signage.webp",
      "/services/led-letters-healthworld-hospitals.jpeg",
      "/services/gold-acrylic-directional-signage.jpeg",
    ],
    faqs: [
      {
        question: "What signage does a hospital or nursing home need?",
        answer:
          "Most facilities need an illuminated building name visible from the road, clearly marked entrance and emergency signage, and interior directional and department boards. The exact list depends on the size of the facility and any accreditation guidelines it follows.",
      },
      {
        question: "Can you fabricate signage to NABH or other accreditation guidelines?",
        answer:
          "Yes — share the signage requirements or specification you've been given, and we'll fabricate the boards to those sizes, colours and wording.",
      },
      {
        question: "Which material is best for hospital interior signs?",
        answer:
          "Acrylic and ACP are both good choices for interiors: they're smooth, wipe-clean and hold printed or cut lettering well.",
      },
    ],
    keywords: [
      "hospital signage manufacturer",
      "nursing home sign board",
      "clinic signage",
      "hospital directional signage",
    ],
  },
  {
    slug: "office-signage",
    name: "Office, Corporate & Industrial Signage",
    metaTitle: "Office, Corporate & Industrial Signage Manufacturer",
    metaDescription:
      "Office, corporate and industrial signage — reception letters, building names, gate signs and ACP cladding — made and installed by AD Imperial.",
    h1: "Office, Corporate &",
    h1Accent: "Industrial Signage.",
    intro:
      "Corporate and industrial signage needs to look professional and last for years with little attention. AD Imperial fabricates reception wall letters, building name signage, entrance boards and ACP cladding for offices, co-working spaces, government and PSU premises, factories and industrial facilities.",
    audience: [
      "Corporate offices and co-working spaces",
      "Government, railway and PSU premises",
      "Factories, plants and industrial facilities",
      "Institutions and commercial buildings",
    ],
    context:
      "In an office, signage sets the first impression for clients and visitors at reception. On industrial and government premises it's about identification and durability — entrance gates, building names and facility boards that face dust, heat and heavy rain for years. We work with both, and have supplied illuminated entrance signage for railway premises and signage for industrial clients including SAIL.",
    signageTypes: [
      {
        name: "Reception wall lettering",
        description:
          "Stainless steel or acrylic letters for the reception or lobby wall, with optional halo lighting.",
      },
      {
        name: "Building name and entrance gate signage",
        description:
          "Illuminated or non-lit building names and gate signage that identify the premises clearly from the road.",
      },
      {
        name: "Facility and department boards",
        description:
          "ACP boards for plant areas, departments, blocks and administrative buildings.",
      },
      {
        name: "Facade cladding",
        description:
          "ACP cladding to give an office or commercial building a clean, modern exterior finish.",
      },
    ],
    recommended: [
      { slug: "stainless-steel-letters", note: "Long-lasting, professional lettering for reception walls and building fronts." },
      { slug: "metal-letters", note: "Brass or aluminium letters for a distinctive corporate finish." },
      { slug: "acp-sign-boards", note: "Durable boards for gates, blocks and industrial facilities." },
      { slug: "acp-cladding", note: "A modern exterior finish for office and commercial buildings." },
    ],
    considerations: [
      "Use your official brand guidelines (logo, colours, fonts) so signage matches stationery and digital assets.",
      "For industrial sites, specify weatherproof materials and fixings suited to dust, heat and heavy rain.",
      "Plan illumination for gates and building names that must be identifiable at night.",
      "Coordinate with your facilities or civil team early for mounting surfaces and power points.",
    ],
    projectImages: [
      "/services/acp-sign-board-eastern-railway-asansol.jpeg",
      "/services/acp-cladding-building-facade.jpeg",
      "/about/ad-imperial-illuminated-letter-board.webp",
    ],
    faqs: [
      {
        question: "What's the best material for office reception letters?",
        answer:
          "Stainless steel letters give the most premium, long-lasting result; acrylic letters are a lighter, cost-effective alternative that still looks professional. Halo lighting can be added to either for extra depth.",
      },
      {
        question: "Do you take on signage for government, railway or PSU premises?",
        answer:
          "Yes. Our work includes illuminated entrance signage at the Divisional Railway Manager's Office, Eastern Railway, Asansol, and signage for SAIL. We fabricate to the specification and approvals your organisation requires.",
      },
      {
        question: "Can you handle signage for a factory or industrial site?",
        answer:
          "Yes — weatherproof ACP and stainless steel boards for gates, blocks and facilities, plus ACP cladding for administrative buildings.",
      },
    ],
    keywords: [
      "office signage manufacturer",
      "corporate signage Kolkata",
      "reception letters",
      "industrial signage",
    ],
  },
];

export function getIndustry(slug: string): IndustryEntry | undefined {
  return industries.find((entry) => entry.slug === slug);
}

export const allIndustrySlugs = industries.map((entry) => entry.slug);
