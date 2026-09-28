export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceContentEntry {
  slug: string;
  /** True for umbrella/category pages that aren't a single physical product. */
  isPillar?: boolean;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Accent?: string;
  intro: string;
  applications: string[];
  materials: string[];
  features: string[];
  benefits: string[];
  installation: string[];
  /** Only set where it materially helps buyers choose — e.g. the two pillar pages. */
  types?: { name: string; description: string }[];
  /** Plain plural noun for the "Types of X" heading, e.g. "Letter Boards". Defaults to h1. */
  typesLabel?: string;
  /** Short paragraph on where/how the product is typically used — indoor vs outdoor. */
  usageContext?: string;
  /** Only set where it materially helps buyers plan — e.g. the two pillar pages. */
  maintenance?: string[];
  faqs: ServiceFaq[];
  /** Slugs of related /services/[slug] pages, for internal linking. */
  relatedSlugs: string[];
  /** Only set for pillar pages — product pages use the image from services.ts. */
  pillarImage?: string;
  pillarImageAlt?: string;
}

export const serviceContent: ServiceContentEntry[] = [
  {
    slug: "letter-board",
    isPillar: true,
    metaTitle: "Letter Board Manufacturer in India",
    metaDescription:
      "AD Imperial is a letter board company that designs, fabricates and installs custom letter boards — ACP, acrylic, stainless steel and illuminated LED — for businesses across India, from our studio in Kolkata.",
    h1: "Letter Board",
    h1Accent: "Manufacturer in India.",
    typesLabel: "Letter Boards",
    intro:
      "AD IMPERIAL designs, fabricates and installs custom letter boards for shops, offices, showrooms and commercial buildings across India. A letter board is the fascia sign that carries a business's name and identity, built in ACP, acrylic, stainless steel or illuminated LED letters depending on the look, budget and visibility a location needs. Every letter board is designed and fabricated at our Kolkata studio before being installed at your location, in Kolkata or anywhere else in India.",
    applications: [
      "Shopfronts and retail stores",
      "Corporate offices and reception areas",
      "Showrooms and shopping malls",
      "Restaurants and cafes",
      "Clinics, schools and institutions",
      "Residential complexes and societies",
    ],
    materials: [
      "ACP (aluminium composite panel)",
      "Acrylic — clear, frosted or coloured",
      "Stainless steel — brushed or mirror-polished",
      "LED-illuminated letter modules",
      "Vinyl and digital print overlays",
    ],
    features: [
      "Flat or three-dimensional raised lettering",
      "Front-lit, back-lit (halo) or non-illuminated options",
      "Weatherproof, outdoor-grade construction",
      "Custom fonts, colours and sizing to match your brand",
      "Structural mounting engineered for facades and fascia frames",
    ],
    benefits: [
      "Improves storefront visibility and brand recall",
      "Durable finishes that hold their colour and shape for years",
      "Matched precisely to your existing brand identity",
      "Professional installation with structural safety in mind",
    ],
    installation: [
      "Site visit, or photos and dimensions shared remotely",
      "Design concept and material recommendation",
      "In-house fabrication",
      "Structural mounting and electrical wiring, if illuminated",
      "Final inspection and handover",
    ],
    types: [
      {
        name: "ACP Letter Board",
        description:
          "A flat, cost-effective panel finish — the most common choice for shopfronts and budget-conscious fascia signage.",
      },
      {
        name: "Acrylic Letter Board",
        description:
          "Lightweight, colour-rich lettering in clear, frosted or coloured acrylic — suited to reception walls and sheltered storefronts.",
      },
      {
        name: "Stainless Steel Letter Board",
        description:
          "Brushed or mirror-polished metal lettering for a premium, architectural finish on corporate and upscale retail facades.",
      },
      {
        name: "LED-Illuminated Letter Board",
        description:
          "Front-lit or halo-lit letters — built in ACP, acrylic or metal — for day-and-night visibility.",
      },
      {
        name: "3D / Dimensional Letter Board",
        description:
          "Raised, built-up lettering that adds depth and a shadow-line effect compared to flat-cut letters.",
      },
    ],
    usageContext:
      "Letter boards work both indoors and outdoors. Indoors, they're used on reception walls, lobbies and showroom interiors, where the material choice can prioritise finish over weather resistance. Outdoors — on shopfronts, facades and building entrances — we use weatherproof materials such as ACP, stainless steel or UV-stable acrylic with sealed, structural mounting built to handle sun, rain and wind over years of use.",
    maintenance: [
      "Wipe non-illuminated letter boards periodically with a soft cloth and mild cleaner to keep the surface free of dust and grime",
      "For illuminated letter boards, schedule periodic electrical checks to confirm LED modules and wiring remain in good condition",
      "Inspect structural mounting points annually, especially for outdoor installations exposed to wind and rain",
      "Avoid abrasive cleaners on acrylic or mirror-polished stainless steel surfaces to prevent scratching",
    ],
    faqs: [
      {
        question: "What is a letter board?",
        answer:
          "A letter board is a fascia signage panel that displays a business's name and branding, usually mounted above a shopfront or building entrance. It can be built from ACP, acrylic, stainless steel or illuminated LED letters.",
      },
      {
        question: "Does AD Imperial manufacture and install letter boards across India?",
        answer:
          "Yes. Our design and fabrication studio is based in Kolkata, and we work with businesses across India — from initial consultation and design through to fabrication and on-site installation.",
      },
      {
        question: "How long does a custom letter board take to make?",
        answer:
          "Timelines depend on size, material and finish. A straightforward ACP or acrylic letter board typically takes less time than an illuminated stainless steel installation with custom lighting — we confirm an estimated timeline after reviewing your requirement.",
      },
      {
        question: "Can I order a fully custom letter board design?",
        answer:
          "Yes. Every letter board we make is custom to your brand — size, material, colour, font and lighting are tailored to your space and signage requirements. Share your logo or a reference image and our team will design a custom letter board around it.",
      },
    ],
    relatedSlugs: ["sign-board", "acp-sign-boards", "led-letters", "channel-letters"],
    pillarImage: "/hero/bhikaram.jpeg",
    pillarImageAlt: "Illuminated custom letter board signage above a shop entrance",
  },
  {
    slug: "sign-board",
    isPillar: true,
    metaTitle: "Sign Board Manufacturer & Signage Company in India",
    metaDescription:
      "AD Imperial manufactures and installs custom sign boards — ACP, LED, acrylic, stainless steel and channel-letter — for shops, corporate offices and commercial buildings across India.",
    h1: "Sign Board Manufacturer",
    h1Accent: "& Signage Company in India.",
    typesLabel: "Sign Boards",
    intro:
      "A sign board is the broader category of signage that identifies a business, directs customers or displays information — from a simple flat board to a fully illuminated architectural installation. AD IMPERIAL manufactures and installs sign boards in ACP, LED, acrylic, stainless steel and channel-letter formats for businesses, retail chains, corporate offices and commercial properties across India.",
    applications: [
      "Shop and storefront signage",
      "Commercial and office buildings",
      "Retail chains and showrooms",
      "Corporate branding and directories",
      "Outdoor and building-mounted signage",
    ],
    materials: [
      "ACP panels",
      "Acrylic sheet",
      "Stainless steel",
      "LED modules and neon-style lighting",
      "Vinyl, print and lamination finishes",
    ],
    features: [
      "Flat, raised or fully dimensional lettering",
      "Illuminated and non-illuminated formats",
      "Custom sizing for any facade or frontage",
      "Weather-resistant outdoor construction",
      "Structural mounting engineered for safety",
    ],
    benefits: [
      "A single point of contact for design, fabrication and installation",
      "Consistent quality across every material type",
      "Built to withstand outdoor conditions year-round",
      "Tailored to a single shop or a multi-location brand",
    ],
    installation: [
      "Requirement discussion by call, WhatsApp or site visit",
      "Design concept and material selection",
      "In-house fabrication",
      "On-site structural mounting and wiring",
      "Quality check and handover",
    ],
    types: [
      {
        name: "ACP Sign Board",
        description:
          "A flat, seamless panel finish — the most common, cost-effective format for shop and commercial fascia signage.",
      },
      {
        name: "LED Sign Board",
        description:
          "Illuminated signage using LED modules or LED neon, for day-and-night visibility on shops and corporate buildings.",
      },
      {
        name: "Acrylic Sign Board",
        description:
          "Lightweight, precisely cut signage suited to indoor branding, reception areas and sheltered outdoor use.",
      },
      {
        name: "Stainless Steel Sign Board",
        description:
          "Premium brushed or mirror-polished metal signage for corporate buildings and upscale retail frontages.",
      },
      {
        name: "Channel Letter Sign Board",
        description:
          "Dimensional, built-up lettering that gives a facade three-dimensional presence and depth.",
      },
    ],
    usageContext:
      "Sign boards are used both indoors — for office directories, reception branding and retail interiors — and outdoors, on shopfronts, building facades and commercial complexes. Outdoor sign boards are built from weatherproof materials such as ACP, LED modules and stainless steel with sealed, structurally engineered mounting, while indoor sign boards allow a broader range of finishes since they don't face direct weather exposure.",
    maintenance: [
      "Clean non-illuminated sign boards periodically with a soft cloth and mild cleaner to maintain a fresh appearance",
      "Schedule periodic electrical checks for illuminated sign boards to confirm LED modules and wiring are functioning correctly",
      "Inspect outdoor structural mounts annually, particularly after monsoon or high-wind conditions",
      "Avoid harsh solvents on printed or laminated ACP surfaces to prevent finish damage",
    ],
    faqs: [
      {
        question: "What is the difference between a sign board and a letter board?",
        answer:
          "\"Letter board\" usually refers to fascia signage carrying a business name, while \"sign board\" is the broader term covering any signage — including directional, informational and building signage. AD Imperial manufactures both.",
      },
      {
        question: "Does AD Imperial supply sign boards outside Kolkata?",
        answer:
          "Yes — we design and fabricate from our Kolkata studio and serve businesses across India, coordinating installation for out-of-town and multi-location projects.",
      },
      {
        question: "Can you match an existing brand's sign board style across multiple locations?",
        answer:
          "Yes. We work from your existing brand guidelines, logo files and reference photos to keep sign boards consistent across every location.",
      },
    ],
    relatedSlugs: ["letter-board", "acp-sign-boards", "led-neon-signage", "channel-letters"],
    pillarImage: "/hero/kolkata.webp",
    pillarImageAlt: "Commercial building signage and sign boards across a city street",
  },
  {
    slug: "acp-sign-boards",
    metaTitle: "ACP Sign Board — Fabrication & Installation",
    metaDescription:
      "Custom ACP sign boards fabricated and installed by AD Imperial — weatherproof, seamless facade signage for shops and commercial buildings across India.",
    h1: "ACP Sign Board",
    intro:
      "ACP (aluminium composite panel) sign boards give a storefront a flat, seamless, contemporary finish that holds its colour and shape for years. AD Imperial fabricates the panel, routes the graphics or lettering, and mounts everything to a level, weather-ready frame.",
    applications: [
      "Shopfront fascia",
      "Office and corporate signage",
      "Retail and showroom branding",
      "Building name boards",
      "Directional and wayfinding boards",
    ],
    materials: [
      "Aluminium composite panel (ACP)",
      "Vinyl or digital print lamination",
      "Acrylic letter overlays",
      "Aluminium or stainless trim framing",
    ],
    features: [
      "Flat, seamless panel finish",
      "Matte, gloss or metallic finish options",
      "Router-cut lettering and logos",
      "Weatherproof and fade-resistant",
      "Lightweight yet rigid construction",
    ],
    benefits: [
      "Cost-effective for large signage surfaces",
      "Holds colour and shape for years outdoors",
      "A clean, contemporary look suited to most brands",
      "Fast fabrication turnaround",
    ],
    installation: [
      "Measurement and design approval",
      "ACP panel routing and print or lamination",
      "Frame fabrication",
      "Wall or facade mounting",
      "Edge sealing and finishing check",
    ],
    faqs: [
      {
        question: "What is an ACP sign board?",
        answer:
          "An ACP sign board is a fascia sign made from aluminium composite panel — two thin aluminium sheets bonded to a polymer core — giving a flat, rigid, weather-resistant surface for lettering, logos and graphics.",
      },
      {
        question: "Is ACP signage suitable for outdoor use?",
        answer:
          "Yes. ACP is one of the most common outdoor signage materials because it resists fading, warping and moisture damage over years of sun and rain exposure.",
      },
      {
        question: "Can ACP sign boards be illuminated?",
        answer:
          "Yes — ACP boards can be paired with front-lit or back-lit LED modules, or combined with separately illuminated acrylic or LED letters mounted on the panel.",
      },
    ],
    relatedSlugs: ["sign-board", "acp-cladding", "channel-letters", "led-letters"],
  },
  {
    slug: "stainless-steel-letters",
    metaTitle: "Stainless Steel Letters — Premium Metal Signage",
    metaDescription:
      "Brushed and mirror-polished stainless steel letters, precision-cut and installed by AD Imperial for premium building and office signage across India.",
    h1: "Stainless Steel Letters",
    intro:
      "Brushed or mirror-polished stainless steel letters add a solid, architectural weight to a facade. Each letter is cut, finished and stud-mounted for a crisp shadow line and a lasting premium look.",
    applications: [
      "Corporate office facades",
      "Premium retail and hospitality branding",
      "Reception and lobby signage",
      "Building name plates",
      "Heritage and institutional signage",
    ],
    materials: [
      "Brushed stainless steel",
      "Mirror-polished stainless steel",
      "Powder-coated or coloured stainless steel",
      "Optional LED halo-lighting components",
    ],
    features: [
      "Precision-cut lettering",
      "Brushed, mirror or coloured finish options",
      "Stud-mounted for a raised shadow-line effect",
      "Corrosion-resistant for outdoor exposure",
      "Optional back-lit (halo) illumination",
    ],
    benefits: [
      "A premium, architectural finish that signals quality",
      "Long-lasting with minimal maintenance",
      "Distinct shadow-line depth versus flat signage",
      "Suited to indoor reception walls and outdoor facades alike",
    ],
    installation: [
      "Design and font/size finalisation",
      "Precision cutting of each letter",
      "Finishing — brushing, polishing or coating",
      "Stud-mounting with calculated wall spacing",
      "Halo lighting wiring, if selected",
    ],
    faqs: [
      {
        question: "Are stainless steel letters good for outdoor signage?",
        answer:
          "Yes. Stainless steel resists corrosion, weather damage and fading, making it a durable option for building facades and outdoor installations.",
      },
      {
        question: "What is the difference between brushed and mirror-polished finishes?",
        answer:
          "Brushed steel has a soft, matte-textured look that hides fingerprints and minor scratches, while mirror-polished steel gives a reflective, high-shine finish for a bolder statement.",
      },
      {
        question: "Can stainless steel letters be illuminated?",
        answer:
          "Yes, they're commonly paired with halo (back-lit) LED lighting for a glowing outline effect after dark.",
      },
    ],
    relatedSlugs: ["gold-acrylic-letters", "channel-letters", "led-letters", "sign-board"],
  },
  {
    slug: "gold-acrylic-letters",
    metaTitle: "Gold Acrylic Letters — Premium Acrylic Signage",
    metaDescription:
      "Precision-cut gold and metallic-finish acrylic letters for reception walls, showrooms and shopfronts — fabricated and installed by AD Imperial.",
    h1: "Gold Acrylic Letters",
    intro:
      "Acrylic letters are lightweight, colour-rich and easy to shape into custom typography. They work equally well indoors for reception walls and outdoors for shopfronts, with or without lighting.",
    applications: [
      "Reception and lobby branding",
      "Retail and showroom signage",
      "Restaurant and hospitality signage",
      "Logo walls",
      "Indoor and sheltered outdoor signage",
    ],
    materials: [
      "Gold and metallic-finish acrylic sheet",
      "Mirror-gold acrylic",
      "Clear and frosted acrylic combinations",
      "Optional LED backlighting",
    ],
    features: [
      "Sharp, precisely cut lettering",
      "Smooth, polished edges",
      "Lightweight for easy mounting",
      "Wide range of thicknesses and finishes",
      "Can be combined with LED illumination",
    ],
    benefits: [
      "A premium look at lower weight and cost than metal letters",
      "Easy to customise for logos and typography",
      "Suitable for indoor and sheltered outdoor use",
      "Fast fabrication and installation",
    ],
    installation: [
      "Artwork and font finalisation",
      "Precision cutting of acrylic letters",
      "Edge polishing and finishing",
      "Stud or flush wall mounting",
      "Final alignment check",
    ],
    faqs: [
      {
        question: "Are acrylic letters durable?",
        answer:
          "Quality acrylic letters are strong, UV-stable and resistant to yellowing when properly finished, making them suitable for years of indoor or sheltered outdoor use.",
      },
      {
        question: "Can acrylic letters be lit up?",
        answer:
          "Yes — acrylic letters can be paired with LED modules for front-lit or back-lit illumination.",
      },
      {
        question: "Is gold acrylic suitable for outdoor signage?",
        answer:
          "It performs best in covered or sheltered outdoor locations; for fully exposed facades we typically recommend stainless steel or ACP for maximum weather resistance.",
      },
    ],
    relatedSlugs: ["stainless-steel-letters", "led-letters", "letter-board", "channel-letters"],
  },
  {
    slug: "led-neon-signage",
    metaTitle: "LED & Neon Signage — Custom Illuminated Signs",
    metaDescription:
      "Custom LED neon signage fabricated and installed by AD Imperial — energy-efficient, weatherproof illuminated signs for shops and commercial spaces.",
    h1: "LED & Neon Signage",
    intro:
      "From flexible LED neon to back-lit and edge-lit boards, illuminated signage keeps your brand visible after dark. We size the lighting for even brightness and a clean, low-maintenance installation.",
    applications: [
      "Shopfront and storefront branding",
      "Restaurants, cafes and nightlife venues",
      "Retail window displays",
      "Event and exhibition branding",
      "Building facade illumination",
    ],
    materials: [
      "Flexible LED neon strip",
      "Acrylic or metal backing panels",
      "Weatherproof LED modules",
      "Custom-bent neon-style tubing",
    ],
    features: [
      "Custom script, logos and shapes",
      "Even, flicker-free illumination",
      "Energy-efficient LED technology",
      "Indoor and outdoor-rated options",
      "Low-maintenance, long-life components",
    ],
    benefits: [
      "Stands out day and night",
      "Lower running cost than traditional neon gas tubing",
      "A safer, more durable alternative to glass neon",
      "Highly customisable to any brand shape or script",
    ],
    installation: [
      "Design and shape/script finalisation",
      "LED neon fabrication and backing panel preparation",
      "Weatherproofing for outdoor units",
      "Mounting and electrical connection",
      "Testing for even illumination",
    ],
    faqs: [
      {
        question: "Is LED neon signage different from traditional neon?",
        answer:
          "Yes — LED neon uses flexible LED strips shaped to mimic traditional glass neon tubing. It's more durable, energy-efficient and safer, without glass or gas.",
      },
      {
        question: "Can LED neon signs be used outdoors?",
        answer:
          "Yes, with weatherproof-rated components and proper sealing, LED neon signage performs reliably outdoors.",
      },
      {
        question: "How much power does LED signage use?",
        answer:
          "LED signage is significantly more energy-efficient than traditional lighting. We can confirm the specific running cost for your design during consultation.",
      },
    ],
    relatedSlugs: ["led-letters", "channel-letters", "video-wall", "sign-board"],
  },
  {
    slug: "channel-letters",
    metaTitle: "Channel Letters — Dimensional Facade Signage",
    metaDescription:
      "Custom front-lit and halo-lit channel letters, fabricated letter-by-letter and installed by AD Imperial for storefronts and corporate facades.",
    h1: "Channel Letters",
    intro:
      "Built-up channel letters give depth and presence to a facade. Faces, returns and trim caps are assembled per letter, with front-lit or halo-lit options for round-the-clock visibility.",
    applications: [
      "Building facade signage",
      "Retail storefronts",
      "Corporate headquarters branding",
      "Shopping mall storefronts",
      "Franchise and multi-location branding",
    ],
    materials: [
      "Aluminium letter returns",
      "Acrylic letter faces",
      "Trim cap edging",
      "LED front-lit or halo-lit modules",
    ],
    features: [
      "Fully three-dimensional, built-up lettering",
      "Front-lit, back-lit (halo) or combination illumination",
      "Custom depth, colour and typography",
      "Individually fabricated letter-by-letter",
      "Engineered for secure facade mounting",
    ],
    benefits: [
      "Maximum visual impact and depth versus flat signage",
      "Strong day and night visibility",
      "A premium, corporate-grade appearance",
      "Suited to franchise brand consistency across locations",
    ],
    installation: [
      "Site survey and structural assessment",
      "Letter-by-letter fabrication of returns, faces and trim",
      "LED wiring and power supply installation",
      "Facade mounting and electrical connection",
      "Illumination testing and handover",
    ],
    faqs: [
      {
        question: "What are channel letters?",
        answer:
          "Channel letters are individually fabricated, three-dimensional letters — each with a metal return (side wall) and an acrylic or metal face — commonly used for building and storefront signage.",
      },
      {
        question: "Front-lit or halo-lit — what's the difference?",
        answer:
          "Front-lit channel letters glow through the acrylic face; halo-lit letters have an opaque face and glow around the edges, creating a soft outline against the wall.",
      },
      {
        question: "Are channel letters suitable for large facades?",
        answer:
          "Yes — channel letters are engineered and structurally mounted to suit the scale of the facade, from a single shopfront to a large corporate building.",
      },
    ],
    relatedSlugs: ["led-letters", "stainless-steel-letters", "led-neon-signage", "sign-board"],
  },
  {
    slug: "led-letters",
    metaTitle: "LED Letters — Illuminated Dimensional Signage",
    metaDescription:
      "Bright, energy-efficient LED letters designed, fabricated and installed by AD Imperial for storefronts, offices and commercial buildings.",
    h1: "LED Letters",
    intro:
      "LED letters combine dimensional lettering with energy-efficient illumination for a clean, premium look. They are ideal for storefronts, building facades, reception areas and commercial spaces.",
    applications: [
      "Storefronts and shop signage",
      "Building facades",
      "Reception and office branding",
      "Retail and commercial spaces",
      "Franchise signage",
    ],
    materials: [
      "Acrylic or metal letter bodies",
      "Embedded LED modules",
      "Weatherproof wiring and power supplies",
      "Aluminium backing and mounting plates",
    ],
    features: [
      "Bright, even LED illumination",
      "Front-lit or halo-lit options",
      "Custom fonts, sizes and finishes",
      "Energy-efficient LED components",
      "Durable for continuous outdoor operation",
    ],
    benefits: [
      "Strong visibility after dark",
      "Lower energy consumption than traditional lighting",
      "A clean, modern, premium look",
      "Long operational lifespan with low maintenance",
    ],
    installation: [
      "Design and lighting-style approval",
      "Letter fabrication with embedded LED modules",
      "Wiring and power supply setup",
      "Facade or wall mounting",
      "Illumination and safety testing",
    ],
    faqs: [
      {
        question: "How long do LED letters last?",
        answer:
          "Quality LED modules are rated for tens of thousands of hours of use, meaning years of reliable operation with minimal maintenance.",
      },
      {
        question: "Do LED letters need regular maintenance?",
        answer:
          "LED signage is largely maintenance-free; occasional cleaning and periodic electrical checks are usually all that's needed.",
      },
      {
        question: "Can LED letters be dimmed or set on a timer?",
        answer:
          "Depending on the driver and control setup specified for your project, LED letters can be wired to a timer or dimmer — we can advise on options during consultation.",
      },
    ],
    relatedSlugs: ["channel-letters", "gold-acrylic-letters", "led-neon-signage", "letter-board"],
  },
  {
    slug: "acp-cladding",
    metaTitle: "ACP Cladding — Building Facade Solutions",
    metaDescription:
      "ACP cladding fabrication and installation by AD Imperial — a seamless, weatherproof facade finish for commercial buildings and storefronts across India.",
    h1: "ACP Cladding",
    intro:
      "ACP cladding creates a seamless architectural facade while protecting the exterior surface. We provide custom fabrication, precision cutting and professional installation for commercial buildings and storefronts.",
    applications: [
      "Building facade renovation",
      "Commercial complex exteriors",
      "Retail store frontages",
      "Corporate office exteriors",
      "Column and parapet cladding",
    ],
    materials: [
      "Aluminium composite panel (ACP)",
      "Aluminium framing and structural supports",
      "Sealants and weatherproofing components",
    ],
    features: [
      "Seamless, modern facade finish",
      "Wide range of colours and textures",
      "Lightweight yet structurally rigid",
      "Weather and UV resistant",
      "Conceals uneven or ageing wall surfaces",
    ],
    benefits: [
      "Transforms a building's appearance cost-effectively",
      "Protects the underlying exterior surface",
      "Low maintenance over its service life",
      "A consistent, professional finish across large facades",
    ],
    installation: [
      "Site survey and substrate assessment",
      "Framing and support structure installation",
      "ACP panel cutting and fixing",
      "Sealing and weatherproofing",
      "Final finish inspection",
    ],
    faqs: [
      {
        question: "What is ACP cladding used for?",
        answer:
          "ACP cladding is used to give a building's exterior a clean, modern, seamless finish while also protecting the underlying wall surface from weather.",
      },
      {
        question: "Is ACP cladding durable in Indian weather conditions?",
        answer:
          "Yes — ACP is widely used across India's varied climates because it resists UV fading, moisture and temperature changes when properly installed.",
      },
      {
        question: "Can ACP cladding be combined with signage?",
        answer:
          "Yes, ACP cladding and ACP, LED or acrylic signage are frequently combined on the same facade for a cohesive look.",
      },
    ],
    relatedSlugs: ["acp-sign-boards", "sign-board", "stainless-steel-letters", "channel-letters"],
  },
  {
    slug: "video-wall",
    metaTitle: "Video Wall — Large-Format LED Display Installation",
    metaDescription:
      "Outdoor and indoor LED video wall installation by AD Imperial — large-format dynamic displays for retail, corporate and commercial facades.",
    h1: "Video Wall",
    intro:
      "Video walls are built from weatherproof LED panels, structurally mounted to the facade and calibrated for even brightness and colour — ideal where a static sign isn't enough for a busy commercial street front.",
    applications: [
      "Retail storefronts and flagship stores",
      "Corporate lobbies and reception areas",
      "Shopping malls and commercial complexes",
      "Event and exhibition displays",
      "Outdoor advertising facades",
    ],
    materials: [
      "Weatherproof LED display panels",
      "Structural mounting frames",
      "Control and media processing systems",
    ],
    features: [
      "Bright, full-colour dynamic display",
      "Outdoor and indoor-rated panel options",
      "Seamless multi-panel configuration",
      "Content can be updated remotely",
      "Engineered structural mounting",
    ],
    benefits: [
      "Far higher visual impact than static signage",
      "Content can change without refabrication",
      "Visible day and night in outdoor conditions",
      "Suited to advertising, branding or wayfinding content",
    ],
    installation: [
      "Site survey and structural assessment",
      "Panel and pixel-pitch selection",
      "Structural frame and mounting installation",
      "Panel installation and calibration",
      "Content system setup and testing",
    ],
    faqs: [
      {
        question: "What is a video wall used for?",
        answer:
          "A video wall is a large-format digital display built from LED panels, used for dynamic advertising, branding or information display on a building facade or indoor space.",
      },
      {
        question: "Can a video wall be installed outdoors?",
        answer:
          "Yes, with weatherproof-rated LED panels engineered for outdoor brightness and weather exposure.",
      },
      {
        question: "Can the content on a video wall be changed after installation?",
        answer:
          "Yes — video walls are built around a media/content system, so displayed content can be updated without any physical rework of the signage.",
      },
    ],
    relatedSlugs: ["led-neon-signage", "channel-letters", "sign-board", "led-letters"],
  },
];

export function getServiceContent(slug: string): ServiceContentEntry | undefined {
  return serviceContent.find((entry) => entry.slug === slug);
}

/** All slugs that should be statically generated under /services/[slug]. */
export const allServiceSlugs = serviceContent.map((entry) => entry.slug);
