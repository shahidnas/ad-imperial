import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/src/components/FaqAccordion";
import JsonLd from "@/src/components/JsonLd";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import { getIndustry } from "@/src/data/industries";
import {
  cityPath,
  getCityBySlug,
  statePath,
  type CityLocation,
  type LocationEntry,
  type StateLocation,
} from "@/src/data/locations";
import { getProjectImages } from "@/src/data/projectImages";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/src/lib/schema";
import { getServiceLink } from "@/src/lib/serviceLinks";
import { siteConfig, whatsappHref } from "@/src/lib/site";

/** Reasons that are true for every project — no invented claims. */
const WHY_CHOOSE = [
  "Design, fabrication and finishing done in-house at our Kolkata studio",
  "One team from first drawing to final installation",
  "Material and lighting advice matched to your site and local conditions",
  "A clear layout and quote for approval before fabrication begins",
  "Experience across retail, hospitality, healthcare, corporate and railway projects",
];

interface LocationDetailProps {
  entry: LocationEntry;
  /** Parent state (city pages only). */
  state?: StateLocation;
  /** Cities within the state (state pages only). */
  stateCities?: CityLocation[];
}

export default function LocationDetail({ entry, state, stateCities = [] }: LocationDetailProps) {
  const isCity = entry.type === "city";
  const path = isCity ? cityPath(entry) : statePath(entry.slug);

  const highlights = entry.serviceHighlights
    .map((item) => {
      const link = getServiceLink(item.slug);
      return link ? { ...link, note: item.note } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const industryLinks = entry.industries
    .map((slug) => getIndustry(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const images = getProjectImages(entry.projectImages ?? []);
  const leadImage = images[0];

  const nearby = isCity
    ? entry.nearby
        .map((slug) => getCityBySlug(slug))
        .filter((city): city is CityLocation => Boolean(city))
    : [];

  const crumbs =
    isCity && state
      ? [
          { label: "Locations", href: routes.locations },
          { label: state.name, href: statePath(state.slug) },
          { label: entry.name },
        ]
      : [{ label: "Locations", href: routes.locations }, { label: entry.name }];

  const breadcrumbTrail =
    isCity && state
      ? [
          { name: "Locations", path: routes.locations },
          { name: state.name, path: statePath(state.slug) },
          { name: entry.name, path },
        ]
      : [
          { name: "Locations", path: routes.locations },
          { name: entry.name, path },
        ];

  const displayName =
    isCity && entry.altNames?.length
      ? `${entry.name} (${entry.altNames.join(", ")})`
      : entry.name;

  const whatsapp = whatsappHref(
    `Hi ${siteConfig.name}, I'd like a signage quote for ${entry.name}.`,
  );

  return (
    <main id="main-content" className="page">
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbTrail),
          serviceSchema({
            name: `Signage design, fabrication and installation in ${entry.name}`,
            serviceType: "Sign board and letter board manufacturing",
            description: entry.metaDescription,
            path,
            image: leadImage?.src,
            areaServed: { type: isCity ? "City" : "State", name: entry.name },
          }),
          faqSchema(entry.faqs),
        ]}
      />

      <PageHeader
        eyebrow={isCity ? `Serving ${state?.name ?? ""} from Kolkata` : "Service Area"}
        title={entry.h1}
        titleAccent={entry.h1Accent}
        intro={entry.intro}
        crumbs={crumbs}
      />

      <section className="service-detail">
        <div className="container">
          <div className="location-context">
            <h2>Signage for Businesses in {displayName}</h2>
            <p>{entry.regionalContext}</p>

            {isCity && entry.commercialAreas.length > 0 && (
              <>
                <h3>Areas we cover in {entry.name}</h3>
                <ul className="services-page-highlights">
                  {entry.commercialAreas.map((area) => (
                    <li key={area}>
                      <i className="bi bi-geo-alt" aria-hidden="true" />
                      {area}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="service-detail-types">
            <h2>Signage We Make for {entry.name}</h2>
            <p className="service-detail-types-intro">
              Every sign is designed and fabricated at our Kolkata studio. These
              options suit the kind of businesses and conditions found in{" "}
              {entry.name} — each page covers materials, features and FAQs.
            </p>
            <div className="service-detail-types-grid">
              {highlights.map((item) => (
                <div className="service-detail-type-card" key={item.slug}>
                  <h3>
                    <Link href={item.href}>{item.label}</Link>
                  </h3>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {leadImage && (
            <div className="service-detail-grid">
              <div className="services-page-media service-detail-media">
                <Image
                  src={leadImage.src}
                  alt={leadImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className="services-page-image"
                />
              </div>
              <div className="service-detail-col">
                <h2>Our Work in {entry.name}</h2>
                <ul className="services-page-highlights">
                  {images.map((image) => (
                    <li key={image.src}>
                      <i className="bi bi-check-lg" aria-hidden="true" />
                      {image.title}
                    </li>
                  ))}
                </ul>
                <p>
                  See more finished projects in our{" "}
                  <Link href={routes.gallery}>signage gallery</Link>.
                </p>
              </div>
            </div>
          )}

          {industryLinks.length > 0 && (
            <div className="service-detail-types">
              <h2>Industries We Serve in {entry.name}</h2>
              <div className="related-services-grid">
                {industryLinks.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/services/${industry.slug}`}
                    className="related-service-card"
                  >
                    <span>{industry.name}</span>
                    <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="service-detail-process">
            <h2>How a Project in {entry.name} Works</h2>
            <ol>
              <li>
                <span>01</span>
                <p>Share your requirement, photos of the site and rough measurements by call, WhatsApp or the contact form.</p>
              </li>
              <li>
                <span>02</span>
                <p>We send a design layout, material recommendation and a clear quote for approval.</p>
              </li>
              <li>
                <span>03</span>
                <p>Your signage is fabricated and quality-checked at our Kolkata studio.</p>
              </li>
              <li>
                <span>04</span>
                <p>Delivery and professional on-site installation in {entry.name}.</p>
              </li>
            </ol>
            <p className="service-detail-types-intro">
              {isCity ? entry.installationNote : entry.coverageNote}
            </p>
          </div>

          <div className="service-detail-maintenance">
            <h2>Why Businesses in {entry.name} Choose {siteConfig.name}</h2>
            <ul className="services-page-highlights">
              {WHY_CHOOSE.map((item) => (
                <li key={item}>
                  <i className="bi bi-check-lg" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="service-detail-region-note">
            {siteConfig.name} operates from one studio at{" "}
            {siteConfig.contact.address.lines.join(", ")}, and serves{" "}
            {isCity ? entry.name : `businesses across ${entry.name}`} from there — we
            don&apos;t have branch offices outside Kolkata.
          </p>

          <div className="service-detail-ctas">
            <Link href={routes.contact} className="service-detail-cta-primary">
              <span>Get a Quote for {entry.name}</span>
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>

            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="service-detail-cta-secondary"
              >
                <i className="bi bi-whatsapp" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {!isCity && stateCities.length > 0 && (
        <section className="service-detail-related">
          <div className="container">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Cities We Serve</span>
            </div>
            <h2>Signage Across {entry.name}</h2>

            <div className="related-services-grid">
              {stateCities.map((city) => (
                <Link key={city.slug} href={cityPath(city)} className="related-service-card">
                  <span>{city.name}</span>
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {isCity && (
        <section className="service-detail-related">
          <div className="container">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Nearby Service Areas</span>
            </div>
            <h2>Also Serving Near {entry.name}</h2>

            <div className="related-services-grid">
              {nearby.map((city) => (
                <Link key={city.slug} href={cityPath(city)} className="related-service-card">
                  <span>{city.name}</span>
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              ))}
              {state && (
                <Link href={statePath(state.slug)} className="related-service-card">
                  <span>All of {state.name}</span>
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="service-detail-faq">
        <div className="container">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line" />
            <span>FAQ</span>
          </div>
          <h2>Signage in {entry.name} — Frequently Asked Questions</h2>

          <FaqAccordion items={entry.faqs} />
        </div>
      </section>

      <PageCta
        title={`Ready to start your signage project in ${entry.name}?`}
        text="Share your requirement, location and any reference photos — our team will get back with a clear quote."
      />
    </main>
  );
}
