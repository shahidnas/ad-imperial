export interface LocationFaq {
  question: string;
  answer: string;
}

export interface LocationContentEntry {
  slug: string;
  type: "state" | "city";
  /** Display name, e.g. "Durgapur" or "West Bengal". */
  name: string;
  /** Slug of the parent state page. For state entries this is their own slug. */
  stateSlug: string;
  stateName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Accent?: string;
  intro: string;
  /** Honest paragraph on the region's business character — used to make each page genuinely unique. */
  regionalContext: string;
  /** Slugs of /services/[slug] pages relevant to this location's page. */
  serviceSlugs: string[];
  faqs: LocationFaq[];
  /** For state pages: their city slugs. For city pages: sibling city slugs in the same state. */
  relatedLocationSlugs: string[];
}

const CORE_SERVICE_SLUGS = [
  "letter-board",
  "sign-board",
  "led-letters",
  "acp-sign-boards",
  "channel-letters",
  "gold-acrylic-letters",
  "stainless-steel-letters",
];

export const locationContent: LocationContentEntry[] = [
  // ===================== STATE PAGES =====================
  {
    slug: "west-bengal",
    type: "state",
    name: "West Bengal",
    stateSlug: "west-bengal",
    stateName: "West Bengal",
    metaTitle: "Letter Board & Sign Board Manufacturer in West Bengal",
    metaDescription:
      "AD Imperial designs, fabricates and installs letter boards, sign boards, LED letters and ACP signage for businesses across West Bengal, from our studio in Kolkata.",
    h1: "Letter Board & Sign Board",
    h1Accent: "Manufacturer in West Bengal.",
    intro:
      "AD IMPERIAL is based in Kolkata and serves businesses across West Bengal — from the state capital's commercial districts to the industrial belt around Asansol and Durgapur, the trading towns of Bardhaman, and the North Bengal gateway city of Siliguri. Every letter board, sign board and illuminated sign is designed and fabricated at our Kolkata studio, then delivered and installed at your location.",
    regionalContext:
      "West Bengal's signage needs vary sharply by region: Kolkata's dense retail high streets and corporate towers call for a different signage approach than the steel and coal belt around Asansol-Durgapur, or the trade and transit hub of Siliguri that serves North Bengal, Sikkim and the Northeast. We work across all of these — matching material, illumination and mounting to what each location genuinely needs, rather than a one-size-fits-all board.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial serve businesses outside Kolkata in West Bengal?",
        answer:
          "Yes. Our design and fabrication studio is in Kolkata, and we regularly deliver and install letter boards, sign boards and signage for businesses across West Bengal, including Durgapur, Asansol, Bardhaman and Siliguri.",
      },
      {
        question: "Do you have branch offices in other West Bengal cities?",
        answer:
          "No — AD Imperial operates from a single studio in Kolkata. We coordinate design, fabrication and on-site installation for clients across the state from this base, so you get the same team and quality wherever your business is located.",
      },
      {
        question: "How does installation work for a project outside Kolkata?",
        answer:
          "We fabricate the signage at our Kolkata studio, then our team travels to your location for professional on-site installation, or coordinates with a vetted local installation partner for the mounting and electrical work where required.",
      },
    ],
    relatedLocationSlugs: ["kolkata", "durgapur", "asansol", "bardhaman", "siliguri"],
  },
  {
    slug: "jharkhand",
    type: "state",
    name: "Jharkhand",
    stateSlug: "jharkhand",
    stateName: "Jharkhand",
    metaTitle: "Letter Board & Sign Board Manufacturer in Jharkhand",
    metaDescription:
      "AD Imperial designs, fabricates and installs letter boards, sign boards, LED letters and ACP signage for businesses across Jharkhand, including Ranchi, Jamshedpur, Dhanbad and Bokaro.",
    h1: "Letter Board & Sign Board",
    h1Accent: "Manufacturer in Jharkhand.",
    intro:
      "AD IMPERIAL designs and fabricates letter boards, sign boards and illuminated signage at our Kolkata studio and delivers them to businesses across Jharkhand — the state capital Ranchi, the steel city of Jamshedpur, the coal belt around Dhanbad, and the industrial township of Bokaro.",
    regionalContext:
      "Jharkhand's economy is built around some of India's largest steel, coal and heavy-industry operations, alongside a growing corporate and retail presence in Ranchi. That mix means demand ranges from rugged, weatherproof ACP and stainless steel signage for industrial and corporate facades, to premium illuminated letter boards for showrooms and offices in the state capital. We fabricate to the material and durability standard each project needs.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial deliver signage to Jharkhand?",
        answer:
          "Yes. We design and fabricate at our Kolkata studio and deliver and install letter boards, sign boards and illuminated signage for businesses across Jharkhand, including Ranchi, Jamshedpur, Dhanbad and Bokaro.",
      },
      {
        question: "Does AD Imperial have an office in Ranchi or Jamshedpur?",
        answer:
          "No — we operate from a single studio in Kolkata and serve Jharkhand clients from there, coordinating delivery and on-site installation for every project in the state.",
      },
      {
        question: "Can you supply signage for industrial or factory premises in Jharkhand?",
        answer:
          "Yes. We regularly fabricate ACP cladding, stainless steel letters and weatherproof sign boards suited to industrial and corporate facades, in addition to retail and showroom signage.",
      },
    ],
    relatedLocationSlugs: ["ranchi", "jamshedpur", "dhanbad", "bokaro"],
  },

  // ===================== WEST BENGAL CITIES =====================
  {
    slug: "kolkata",
    type: "city",
    name: "Kolkata",
    stateSlug: "west-bengal",
    stateName: "West Bengal",
    metaTitle: "Letter Board & Sign Board Manufacturer in Kolkata",
    metaDescription:
      "AD Imperial is a Kolkata-based letter board and sign board manufacturer — ACP, acrylic, stainless steel and LED signage designed, fabricated and installed across the city.",
    h1: "Letter Board & Sign Board",
    h1Accent: "Manufacturer in Kolkata.",
    intro:
      "Kolkata is home to our design and fabrication studio at 43, B.B. Ganguly Street, near Central Metro Station. Being based here means faster site visits, quicker turnaround and direct on-site installation for shops, offices, showrooms and commercial buildings across the city.",
    regionalContext:
      "From the crowded retail stretches of Central and North Kolkata to corporate parks in Salt Lake and New Town, and the showroom belts of South Kolkata, the city's signage needs are diverse. Being based here lets us visit your site directly, take precise measurements and recommend the material and lighting that suits your specific frontage — without the coordination delay of an out-of-town project.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Where is AD Imperial's studio located in Kolkata?",
        answer:
          "Our studio is at 43, B.B. Ganguly Street, near Central Metro Station, Kolkata – 700012. You're welcome to visit for a consultation, or we can arrange a site visit to your location.",
      },
      {
        question: "How quickly can a letter board or sign board be installed in Kolkata?",
        answer:
          "Being based in the city, we can usually schedule a site visit faster than for out-of-town projects. The fabrication and installation timeline still depends on size, material and design complexity — we'll confirm this after reviewing your requirement.",
      },
      {
        question: "Can I visit your studio to discuss my signage requirement?",
        answer:
          "Yes — you're welcome to visit our Kolkata studio near Central Metro Station, or share your requirement by call, WhatsApp or the contact form and we'll take it from there.",
      },
    ],
    relatedLocationSlugs: ["durgapur", "asansol", "bardhaman", "siliguri"],
  },
  {
    slug: "durgapur",
    type: "city",
    name: "Durgapur",
    stateSlug: "west-bengal",
    stateName: "West Bengal",
    metaTitle: "Letter Board Manufacturer in Durgapur",
    metaDescription:
      "Custom letter boards, sign boards and ACP signage designed and fabricated by AD Imperial in Kolkata, delivered and installed for businesses in Durgapur.",
    h1: "Letter Board",
    h1Accent: "Manufacturer in Durgapur.",
    intro:
      "Durgapur is a major industrial city in West Bengal's steel belt, and home to a growing base of corporate offices, showrooms and retail businesses. AD Imperial designs and fabricates letter boards and sign boards at our Kolkata studio and delivers them to Durgapur for on-site installation.",
    regionalContext:
      "As an industrial township built around Durgapur Steel Plant and a wider manufacturing base, the city has a mix of factory and corporate-office signage needs alongside an expanding commercial and retail district. We fabricate accordingly — durable ACP and stainless steel for facades exposed to industrial-area weather and dust, and illuminated acrylic or LED letters for shopfronts and showrooms in the city's commercial areas.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial deliver letter boards and sign boards to Durgapur?",
        answer:
          "Yes. We design and fabricate at our Kolkata studio and deliver, then install, letter boards, sign boards and illuminated signage for businesses in Durgapur.",
      },
      {
        question: "Do you have an office or branch in Durgapur?",
        answer:
          "No — AD Imperial operates from a single studio in Kolkata and serves Durgapur clients from there, coordinating delivery and on-site installation for every project.",
      },
      {
        question: "Can you supply signage for factory or industrial premises in Durgapur?",
        answer:
          "Yes. We regularly fabricate ACP cladding and weatherproof sign boards suited to industrial facades, alongside retail and showroom signage for the city's commercial areas.",
      },
    ],
    relatedLocationSlugs: ["kolkata", "asansol", "bardhaman", "siliguri"],
  },
  {
    slug: "asansol",
    type: "city",
    name: "Asansol",
    stateSlug: "west-bengal",
    stateName: "West Bengal",
    metaTitle: "Letter Board & Sign Board Services in Asansol",
    metaDescription:
      "AD Imperial provides letter board, sign board and LED signage services in Asansol — designed and fabricated in Kolkata, delivered and installed on-site.",
    h1: "Letter Board & Sign Board",
    h1Accent: "Services in Asansol.",
    intro:
      "Asansol, West Bengal's second-largest city and a key railway and industrial hub, has a busy commercial high street alongside its coal and industrial base. AD Imperial designs, fabricates and delivers letter boards and sign boards for businesses across the city.",
    regionalContext:
      "As part of the wider Asansol-Durgapur industrial belt with a major railway junction running through it, Asansol combines heavy-industry signage needs with a dense retail and commercial high street. We supply both — rugged ACP and stainless steel signage for industrial and corporate premises, and illuminated letter boards for shops, showrooms and offices along the city's commercial corridors.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial serve businesses in Asansol?",
        answer:
          "Yes. We design and fabricate letter boards, sign boards and illuminated signage at our Kolkata studio and deliver them to Asansol for professional on-site installation.",
      },
      {
        question: "Is there an AD Imperial branch in Asansol?",
        answer:
          "No — we operate from a single Kolkata studio and coordinate delivery and installation for Asansol projects from there.",
      },
      {
        question: "What signage materials suit Asansol's industrial environment?",
        answer:
          "For facades exposed to industrial-area conditions, ACP and stainless steel hold up well; for shopfronts and showrooms, illuminated acrylic or LED letters give strong visibility on busy commercial streets.",
      },
    ],
    relatedLocationSlugs: ["kolkata", "durgapur", "bardhaman", "siliguri"],
  },
  {
    slug: "bardhaman",
    type: "city",
    name: "Bardhaman",
    stateSlug: "west-bengal",
    stateName: "West Bengal",
    metaTitle: "Letter Board & Sign Board Manufacturer in Bardhaman",
    metaDescription:
      "Custom letter boards, sign boards and shop signage fabricated by AD Imperial in Kolkata and installed for businesses in Bardhaman.",
    h1: "Letter Board & Sign Board",
    h1Accent: "Manufacturer in Bardhaman.",
    intro:
      "Bardhaman (Burdwan) is a district headquarters town and an established trading and educational centre in West Bengal. AD Imperial designs and fabricates letter boards and sign boards at our Kolkata studio, delivered and installed for businesses across the town.",
    regionalContext:
      "As a district hub with an active local trading community and a significant student population around its university and colleges, Bardhaman's commercial signage needs centre on clear, durable shop and institutional signage rather than large-scale industrial facades. We fabricate ACP and acrylic letter boards and sign boards sized and priced for this kind of high street and institutional presence.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial supply signage to Bardhaman?",
        answer:
          "Yes. We design and fabricate letter boards and sign boards at our Kolkata studio and deliver them to Bardhaman for on-site installation.",
      },
      {
        question: "Do you serve educational institutions or offices in Bardhaman?",
        answer:
          "Yes, alongside retail and shop signage, we fabricate signage for institutional and office premises — name boards, directories and branded fascia signage.",
      },
      {
        question: "Is there a local AD Imperial office in Bardhaman?",
        answer:
          "No — we operate from a single studio in Kolkata and coordinate delivery and installation for Bardhaman projects from there.",
      },
    ],
    relatedLocationSlugs: ["kolkata", "durgapur", "asansol", "siliguri"],
  },
  {
    slug: "siliguri",
    type: "city",
    name: "Siliguri",
    stateSlug: "west-bengal",
    stateName: "West Bengal",
    metaTitle: "Sign Board & Signage Company in Siliguri",
    metaDescription:
      "AD Imperial designs and fabricates sign boards, letter boards and LED signage at our Kolkata studio, delivered and installed for businesses in Siliguri.",
    h1: "Sign Board & Signage",
    h1Accent: "Company in Siliguri.",
    intro:
      "Siliguri is the gateway to North Bengal, Sikkim and the Northeast, with a business base built around trade, transit and tourism. AD Imperial designs and fabricates sign boards and letter boards at our Kolkata studio and delivers them to Siliguri for installation.",
    regionalContext:
      "As a transit and trade hub for the wider North Bengal, Sikkim and Northeast region, Siliguri has a strong concentration of hotels, tourism-related businesses, wholesale trading premises and logistics operations alongside its retail high streets. We fabricate signage suited to this mix — illuminated shop and hotel signage for visibility on busy streets, and durable ACP or stainless steel boards for warehouses and trading premises.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial deliver signage to Siliguri?",
        answer:
          "Yes. We design and fabricate sign boards, letter boards and illuminated signage at our Kolkata studio and deliver them to Siliguri for professional on-site installation.",
      },
      {
        question: "Can you supply signage for hotels or hospitality businesses in Siliguri?",
        answer:
          "Yes. We fabricate illuminated letter boards and sign boards suited to hotel and hospitality frontages, alongside standard retail and commercial signage.",
      },
      {
        question: "Is there an AD Imperial office in Siliguri?",
        answer:
          "No — we operate from a single studio in Kolkata and coordinate delivery and installation for Siliguri projects from there.",
      },
    ],
    relatedLocationSlugs: ["kolkata", "durgapur", "asansol", "bardhaman"],
  },

  // ===================== JHARKHAND CITIES =====================
  {
    slug: "ranchi",
    type: "city",
    name: "Ranchi",
    stateSlug: "jharkhand",
    stateName: "Jharkhand",
    metaTitle: "Sign Board & Signage Company in Ranchi",
    metaDescription:
      "AD Imperial designs and fabricates sign boards, letter boards and LED signage at our Kolkata studio, delivered and installed for businesses in Ranchi.",
    h1: "Sign Board & Signage",
    h1Accent: "Company in Ranchi.",
    intro:
      "Ranchi, the capital of Jharkhand, has a growing base of corporate offices, retail showrooms and commercial developments. AD Imperial designs and fabricates sign boards and letter boards at our Kolkata studio and delivers them to Ranchi for on-site installation.",
    regionalContext:
      "As the state capital, Ranchi's commercial growth is concentrated in corporate offices, government-adjacent business premises, and an expanding retail and showroom sector. We fabricate premium stainless steel and acrylic letter boards for corporate reception and office branding, alongside illuminated sign boards for retail frontages.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial deliver signage to Ranchi?",
        answer:
          "Yes. We design and fabricate sign boards, letter boards and illuminated signage at our Kolkata studio and deliver them to Ranchi for professional on-site installation.",
      },
      {
        question: "Can you provide corporate office signage in Ranchi?",
        answer:
          "Yes. We fabricate stainless steel and acrylic letters suited to corporate reception areas and office branding, in addition to retail and shopfront signage.",
      },
      {
        question: "Is there an AD Imperial office in Ranchi?",
        answer:
          "No — we operate from a single studio in Kolkata and coordinate delivery and installation for Ranchi projects from there.",
      },
    ],
    relatedLocationSlugs: ["jamshedpur", "dhanbad", "bokaro"],
  },
  {
    slug: "jamshedpur",
    type: "city",
    name: "Jamshedpur",
    stateSlug: "jharkhand",
    stateName: "Jharkhand",
    metaTitle: "Letter Board & Sign Board Manufacturer in Jamshedpur",
    metaDescription:
      "Custom letter boards, sign boards and ACP cladding designed and fabricated by AD Imperial in Kolkata, delivered and installed for businesses in Jamshedpur.",
    h1: "Letter Board & Sign Board",
    h1Accent: "Manufacturer in Jamshedpur.",
    intro:
      "Jamshedpur, India's first planned industrial city and home to Tata Steel, has a distinct mix of large corporate campuses, planned commercial districts and retail markets. AD Imperial designs and fabricates letter boards and sign boards at our Kolkata studio, delivered and installed across the city.",
    regionalContext:
      "Jamshedpur's planned layout and industrial base mean signage needs range from large-scale corporate and institutional branding to well-organised commercial market signage. We fabricate ACP cladding and stainless steel letters for corporate and industrial facades, and illuminated acrylic or LED letters for the city's retail and market areas.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial deliver signage to Jamshedpur?",
        answer:
          "Yes. We design and fabricate letter boards, sign boards and illuminated signage at our Kolkata studio and deliver them to Jamshedpur for on-site installation.",
      },
      {
        question: "Can you supply signage for corporate or industrial premises in Jamshedpur?",
        answer:
          "Yes. We regularly fabricate ACP cladding and stainless steel letters suited to corporate and industrial facades, alongside retail and market signage.",
      },
      {
        question: "Is there an AD Imperial branch in Jamshedpur?",
        answer:
          "No — we operate from a single studio in Kolkata and coordinate delivery and installation for Jamshedpur projects from there.",
      },
    ],
    relatedLocationSlugs: ["ranchi", "dhanbad", "bokaro"],
  },
  {
    slug: "dhanbad",
    type: "city",
    name: "Dhanbad",
    stateSlug: "jharkhand",
    stateName: "Jharkhand",
    metaTitle: "Letter Board & Sign Board Services in Dhanbad",
    metaDescription:
      "AD Imperial provides letter board, sign board and LED signage services in Dhanbad — designed and fabricated in Kolkata, delivered and installed on-site.",
    h1: "Letter Board & Sign Board",
    h1Accent: "Services in Dhanbad.",
    intro:
      "Dhanbad, known as the coal capital of India, has a commercial base built around the coal and mining sector alongside its retail and trading markets. AD Imperial designs and fabricates letter boards and sign boards at our Kolkata studio, delivered and installed for businesses in Dhanbad.",
    regionalContext:
      "With a business community closely tied to the coal and mining industry, Dhanbad has demand for durable, weatherproof signage for offices and commercial premises, alongside standard shop and market signage. We fabricate ACP and stainless steel boards built to hold up in this environment, and illuminated letter boards for retail visibility.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial deliver signage to Dhanbad?",
        answer:
          "Yes. We design and fabricate letter boards, sign boards and illuminated signage at our Kolkata studio and deliver them to Dhanbad for professional on-site installation.",
      },
      {
        question: "Is there an AD Imperial office in Dhanbad?",
        answer:
          "No — we operate from a single studio in Kolkata and coordinate delivery and installation for Dhanbad projects from there.",
      },
      {
        question: "What signage works best for Dhanbad's business environment?",
        answer:
          "For offices and commercial premises tied to the coal and mining sector, durable ACP and stainless steel signage holds up well; for shops and markets, illuminated acrylic or LED letters give strong day-and-night visibility.",
      },
    ],
    relatedLocationSlugs: ["ranchi", "jamshedpur", "bokaro"],
  },
  {
    slug: "bokaro",
    type: "city",
    name: "Bokaro",
    stateSlug: "jharkhand",
    stateName: "Jharkhand",
    metaTitle: "Letter Board & Sign Board Manufacturer in Bokaro",
    metaDescription:
      "Custom letter boards, sign boards and ACP signage designed and fabricated by AD Imperial in Kolkata, delivered and installed for businesses in Bokaro.",
    h1: "Letter Board & Sign Board",
    h1Accent: "Manufacturer in Bokaro.",
    intro:
      "Bokaro is a planned steel city built around the Bokaro Steel Plant, with organised commercial sectors serving its residential and industrial population. AD Imperial designs and fabricates letter boards and sign boards at our Kolkata studio, delivered and installed across the city.",
    regionalContext:
      "As a planned industrial township, Bokaro's commercial areas are organised into distinct sectors, with signage needs spanning corporate and plant-adjacent offices to neighbourhood retail markets. We fabricate durable ACP and stainless steel signage for industrial and corporate premises, and illuminated letter boards for shops and showrooms in the city's commercial sectors.",
    serviceSlugs: CORE_SERVICE_SLUGS,
    faqs: [
      {
        question: "Does AD Imperial deliver signage to Bokaro?",
        answer:
          "Yes. We design and fabricate letter boards, sign boards and illuminated signage at our Kolkata studio and deliver them to Bokaro for on-site installation.",
      },
      {
        question: "Is there an AD Imperial branch in Bokaro?",
        answer:
          "No — we operate from a single studio in Kolkata and coordinate delivery and installation for Bokaro projects from there.",
      },
      {
        question: "Can you supply signage for plant or industrial-adjacent offices in Bokaro?",
        answer:
          "Yes. We fabricate ACP cladding and stainless steel letters suited to industrial and corporate facades, alongside retail signage for commercial sectors.",
      },
    ],
    relatedLocationSlugs: ["ranchi", "jamshedpur", "dhanbad"],
  },
];

export function getLocationContent(slug: string): LocationContentEntry | undefined {
  return locationContent.find((entry) => entry.slug === slug);
}

export const allLocationSlugs = locationContent.map((entry) => entry.slug);

export const stateLocationSlugs = locationContent
  .filter((entry) => entry.type === "state")
  .map((entry) => entry.slug);
