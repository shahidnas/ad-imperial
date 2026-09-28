/**
 * Buyer guides, rendered at /guides/[slug].
 *
 * Each guide answers a real pre-purchase question and links to the service
 * and location pages it relates to. Paragraphs support inline links written
 * as [label](/path). Keep guides factual: no invented prices, statistics or
 * project claims. Update `dateModified` whenever a guide is edited.
 */

export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  datePublished: string;
  dateModified: string;
  summary: string;
  sections: GuideSection[];
  relatedServices: string[];
  /** City slugs (see src/data/locations). */
  relatedCities: string[];
  /** Real project photo used as the share image. */
  image?: string;
}

export const guides: Guide[] = [
  {
    slug: "sign-board-cost-factors",
    title: "What Decides the Cost of a Sign Board?",
    metaTitle: "Sign Board Cost: What Decides the Price?",
    description:
      "What decides the cost of a sign board or letter board — size, material, lighting, fabrication detail and installation — and how to get an accurate quote.",
    datePublished: "2026-09-28",
    dateModified: "2026-09-28",
    summary:
      "There's no single price for a sign board, because two boards that look similar can differ a lot in size, material, lighting and installation. This guide explains what drives the cost, so you can compare quotes fairly and decide where it's worth spending.",
    image: "/hero/bhikharam-chandmal-shop-sign-board.jpeg",
    sections: [
      {
        heading: "1. Size",
        body: [
          "Size is the biggest single factor. Most signage is quoted by area (for boards and cladding) or by letter height and number of letters (for 3D and illuminated letters). A board that runs the full width of a frontage needs more material, a stronger frame and more fixing points than a compact name board.",
          "Measure the full frontage before asking for a quote. It's better to size the sign to the building than to pick a size first and fit the building around it.",
        ],
      },
      {
        heading: "2. Material",
        body: [
          "Each material has a different cost, look and lifespan:",
        ],
        bullets: [
          "[ACP sign boards](/services/acp-sign-boards) — durable and weatherproof; the most common base for shop fascias.",
          "[Acrylic sign boards](/services/acrylic-sign-board) and [gold acrylic letters](/services/gold-acrylic-letters) — a polished, modern finish; best indoors or on a protected fascia.",
          "[Stainless steel letters](/services/stainless-steel-letters) — premium and long-lasting, typically at the higher end.",
          "Back-lit boards ([LED & neon signage](/services/led-neon-signage)) — an economical way to get an illuminated sign.",
        ],
      },
      {
        heading: "3. Illumination",
        body: [
          "Lighting adds LED modules, power supplies, wiring and more fabrication work. A non-lit board is the cheapest; a back-lit board is a cost-effective lit option; individually lit [LED letters](/services/led-letters) and [channel letters](/services/channel-letters) cost more but give a premium, dimensional look.",
          "If your business trades in the evening, lighting is usually worth it — a sign that can't be seen after dark only works for half the day.",
        ],
      },
      {
        heading: "4. Fabrication detail",
        body: [
          "Complex logos, script fonts, small letter details, layered designs, mixed materials and special finishes all take more cutting and hand-finishing time. A simple, bold design is not only cheaper — it's usually easier to read from a distance too.",
        ],
      },
      {
        heading: "5. Installation and access",
        body: [
          "Installation height, the condition of the wall, whether scaffolding or a ladder is needed, and whether electrical work is involved all affect the final price. A ground-floor shop fascia is quicker to install than a rooftop building name.",
          "For projects outside Kolkata, transport and travel for installation are part of the cost. We fabricate at our Kolkata studio and install across [West Bengal](/locations/west-bengal), [Jharkhand](/locations/jharkhand) and [Bihar](/locations/bihar).",
        ],
      },
      {
        heading: "How to get an accurate quote",
        body: [
          "Send photos of the wall or frontage (including one showing the whole building), rough measurements, your logo or business name, whether you need illumination, and the exact address. With that, a signage maker can give you a realistic quote instead of a rough range.",
          "When comparing quotes, check that they specify the same size, material thickness, type of lighting and whether installation and electrical work are included.",
        ],
      },
    ],
    relatedServices: ["sign-board", "acp-sign-boards", "acrylic-sign-board", "led-letters"],
    relatedCities: ["kolkata", "ranchi", "patna"],
  },
  {
    slug: "choosing-a-shop-sign-board",
    title: "How to Choose the Right Sign Board for Your Shop",
    metaTitle: "How to Choose a Shop Sign Board: ACP, Acrylic or LED?",
    description:
      "How to choose a shop sign board — ACP vs acrylic vs LED and back-lit signs, sizing, readability and night-time visibility — from a signage maker.",
    datePublished: "2026-09-28",
    dateModified: "2026-09-28",
    summary:
      "The right shop sign depends on your frontage, your street, your trading hours and your brand. Here's how to think it through, and how the common options compare.",
    image: "/services/channel-letter-vrinam-menswear.jpeg",
    sections: [
      {
        heading: "Start with how customers see your shop",
        body: [
          "Stand where most customers first notice your shop — across the road, at the corner, or walking along the pavement. How far away are they? Do they see the front straight on or at an angle? Is the street busy after dark? The answers decide letter size, whether the sign should project from the wall, and whether it needs lighting.",
        ],
      },
      {
        heading: "The common options compared",
        body: ["Most shop signs fall into one of these types:"],
        bullets: [
          "ACP fascia board — flat, weatherproof, durable and good value. Works well with printed or raised letters. [ACP sign boards](/services/acp-sign-boards).",
          "Acrylic or gold acrylic letters — a polished, premium finish popular with jewellers, sweet shops and fashion stores. [Gold acrylic letters](/services/gold-acrylic-letters).",
          "Back-lit board — lit from behind so the face glows evenly at night; economical and ideal for smaller or projecting signs. [LED & neon signage](/services/led-neon-signage).",
          "LED or channel letters — individually lit, dimensional letters for maximum visibility and a premium look. [Channel letters](/services/channel-letters).",
          "LED neon — decorative signs for windows and interiors, especially cafés and lifestyle stores. [LED & neon signage](/services/led-neon-signage).",
        ],
      },
      {
        heading: "LED vs acrylic: which is better?",
        body: [
          "They aren't really alternatives — acrylic is a material, LED is a light source, and many of the best shop signs combine both (for example, acrylic-faced letters lit by LEDs). The real question is whether you need illumination. If you trade after dark or your street is poorly lit, choose an illuminated option. If your shop closes at sunset and the frontage is well lit, a non-illuminated acrylic or ACP sign may be all you need.",
        ],
      },
      {
        heading: "Make it readable",
        body: [
          "Keep the wording short — usually just the business name and, at most, a short line about what you sell. Use high contrast between letters and background, and avoid thin script fonts for anything that must be read from a distance. Phone numbers and long lists of services are better placed on a smaller secondary board near the entrance.",
        ],
      },
      {
        heading: "Check the practical details",
        body: [
          "Ask your landlord, market association or mall whether there are rules on sign size, projection or lighting. Make sure there's a safe power point near the sign if it's illuminated. And use your actual logo files, so the sign matches your packaging and interiors.",
          "See our [shop and showroom signage](/services/shop-sign-board) page for sector-specific advice, or browse real shop signs in our [gallery](/gallery).",
        ],
      },
    ],
    relatedServices: ["shop-sign-board", "acp-sign-boards", "channel-letters", "gold-acrylic-letters"],
    relatedCities: ["kolkata", "howrah", "asansol", "bhagalpur"],
  },
  {
    slug: "sign-board-maintenance",
    title: "Sign Board Maintenance: Keeping Signage Bright Through Dust, Heat and Monsoon",
    metaTitle: "Sign Board Maintenance Guide for Dust, Heat & Monsoon",
    description:
      "How to maintain sign boards, LED letters and back-lit signs in eastern India's conditions — cleaning, monsoon checks, electrical safety and when to call for repair.",
    datePublished: "2026-09-28",
    dateModified: "2026-09-28",
    summary:
      "A well-made sign needs very little attention, but a few simple habits keep it looking sharp and working safely for years — especially through dusty summers and heavy monsoons.",
    image: "/services/led-letters-healthworld-hospitals.jpeg",
    sections: [
      {
        heading: "Regular cleaning",
        body: [
          "Dust and grime make a sign look older than it is and dull illuminated faces. Wipe ACP, acrylic and metal surfaces with a soft cloth and mild soapy water, then rinse and dry. Avoid abrasive pads and harsh solvents — they scratch acrylic and can damage printed graphics and paint finishes.",
          "In dusty areas — industrial and mining towns such as [Dhanbad](/locations/jharkhand/dhanbad) and [Asansol](/locations/west-bengal/asansol), or busy roadside frontages — clean more often. Smooth ACP and stainless steel surfaces are easiest to keep presentable.",
        ],
      },
      {
        heading: "Before and after the monsoon",
        body: ["Heavy rain is the biggest test for outdoor signage. Before the monsoon, check:"],
        bullets: [
          "Fixings and brackets are tight and not rusting.",
          "Sealing around illuminated letters and back-lit sign boxes is intact.",
          "Cable entry points and junction boxes are covered and weatherproof.",
          "Nothing is blocking drainage from the top of box signs.",
        ],
      },
      {
        heading: "Heat and sun",
        body: [
          "Strong sun gradually fades printed graphics and some colours. UV-stable materials slow this considerably, and the printed face of a back-lit box sign can usually be replaced without replacing the whole box. In very hot regions, make sure power supplies have ventilation and aren't sealed inside unventilated spaces.",
        ],
      },
      {
        heading: "Electrical safety for illuminated signs",
        body: [
          "If LEDs flicker, a section goes dark or a sign trips the power, switch it off and have it checked — don't open the sign yourself. Most problems are a single power supply or connection, which is a quick fix for a signage technician. A timer switch reduces running hours and extends LED life.",
        ],
      },
      {
        heading: "Care by material",
        body: ["A quick reference:"],
        bullets: [
          "ACP boards — wipe clean; check edges and fixings after storms.",
          "Acrylic and gold acrylic — soft cloth only; never abrasive cleaners.",
          "Stainless steel — wipe with the grain; a stainless cleaner restores shine.",
          "LED letters and back-lit signs — keep faces clean; have electrical checks done by a professional.",
        ],
      },
      {
        heading: "When to repair or replace",
        body: [
          "Loose fixings, water inside an illuminated sign, persistent flickering or a badly faded face are signs it's time for a repair. If you're rebranding or the sign is beyond economical repair, a new sign can often reuse the existing mounting points. [Contact us](/contact) with photos and we'll advise.",
        ],
      },
    ],
    relatedServices: ["led-letters", "led-neon-signage", "acp-sign-boards", "stainless-steel-letters"],
    relatedCities: ["dhanbad", "asansol", "siliguri", "gaya"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
