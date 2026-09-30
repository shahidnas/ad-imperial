import Link from "next/link";
import FaqAccordion from "@/src/components/FaqAccordion";
import JsonLd from "@/src/components/JsonLd";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import PortfolioCard from "@/src/components/PortfolioCard";
import { industries, type IndustryEntry } from "@/src/data/industries";
import { getGuidesForService } from "@/src/data/guides";
import { cities, cityPath, statePath, states } from "@/src/data/locations";
import { getProjectImages } from "@/src/data/projectImages";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/src/lib/schema";
import { getServiceLink } from "@/src/lib/serviceLinks";
import { siteConfig, whatsappHref } from "@/src/lib/site";

/** Industry (sector) signage page, rendered at /services/[slug]. */
export default function IndustryDetail({ industry }: { industry: IndustryEntry }) {
  const path = `/services/${industry.slug}`;

  const recommended = industry.recommended
    .map((item) => {
      const link = getServiceLink(item.slug);
      return link ? { ...link, note: item.note } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const images = getProjectImages(industry.projectImages);

  // Cities whose pages list this industry — real internal links, not a stuffed list.
  const servingCities = cities.filter((city) => city.industries.includes(industry.slug));

  const otherIndustries = industries.filter((entry) => entry.slug !== industry.slug);

  const relatedGuides = getGuidesForService(industry.slug);

  const whatsapp = whatsappHref(
    `Hi ${siteConfig.name}, I'd like a quote for ${industry.name.toLowerCase()}.`,
  );

  return (
    <main id="main-content" className="page">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: routes.services },
            { name: industry.name, path },
          ]),
          serviceSchema({
            name: industry.name,
            description: industry.metaDescription,
            path,
            image: images[0]?.src,
            areaServed: [
              ...states.map((state) => ({ type: "State" as const, name: state.name })),
              { type: "Country" as const, name: siteConfig.serviceCountry },
            ],
          }),
          faqSchema(industry.faqs),
        ]}
      />

      <PageHeader
        eyebrow="Signage by Industry"
        title={industry.h1}
        titleAccent={industry.h1Accent}
        intro={industry.intro}
        crumbs={[{ label: "Services", href: routes.services }, { label: industry.name }]}
      />

      <section className="service-detail">
        <div className="container">
          <div className="location-context">
            <h2>Why {industry.name} Matters</h2>
            <p>{industry.context}</p>
          </div>

          <div className="service-detail-columns">
            <div className="service-detail-col">
              <h2>Who We Make It For</h2>
              <ul className="services-page-highlights">
                {industry.audience.map((item) => (
                  <li key={item}>
                    <i className="bi bi-check-lg" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="service-detail-col">
              <h2>Planning Considerations</h2>
              <ul className="services-page-highlights">
                {industry.considerations.map((item) => (
                  <li key={item}>
                    <i className="bi bi-check-lg" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="service-detail-types">
            <h2>Types of {industry.name}</h2>
            <div className="service-detail-types-grid">
              {industry.signageTypes.map((type) => (
                <div className="service-detail-type-card" key={type.name}>
                  <h3>{type.name}</h3>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="service-detail-types">
            <h2>Recommended Signage Products</h2>
            <div className="service-detail-types-grid">
              {recommended.map((item) => (
                <div className="service-detail-type-card" key={item.slug}>
                  <h3>
                    <Link href={item.href}>{item.label}</Link>
                  </h3>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {images.length > 0 && (
            <div className="service-detail-types">
              <h2>Recent {industry.name} Projects</h2>
              <div className="work-grid">
                {images.map((image) => (
                  <PortfolioCard
                    key={image.src}
                    item={{
                      title: image.title,
                      category: industry.name,
                      image: image.src,
                      alt: image.alt,
                    }}
                    respectSize={false}
                    fit="contain"
                  />
                ))}
              </div>
            </div>
          )}

          <p className="service-detail-region-note">
            Fabricated at our Kolkata studio and installed across{" "}
            {states.map((state, index) => (
              <span key={state.slug}>
                {index > 0 && (index === states.length - 1 ? " and " : ", ")}
                <Link href={statePath(state.slug)}>{state.name}</Link>
              </span>
            ))}
            .
          </p>

          <div className="service-detail-ctas">
            <Link href={routes.contact} className="service-detail-cta-primary">
              <span>Get a Quote</span>
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

      {servingCities.length > 0 && (
        <section className="service-detail-related">
          <div className="container">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Where We Serve</span>
            </div>
            <h2>{industry.name} by City</h2>

            <div className="related-services-grid">
              {servingCities.map((city) => (
                <Link key={city.slug} href={cityPath(city)} className="related-service-card">
                  <span>{city.name}</span>
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="service-detail-related">
        <div className="container">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line" />
            <span>Other Industries</span>
          </div>
          <h2>Signage for Other Sectors</h2>

          <div className="related-services-grid">
            {otherIndustries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/services/${entry.slug}`}
                className="related-service-card"
              >
                <span>{entry.name}</span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {relatedGuides.length > 0 && (
        <section className="service-detail-related">
          <div className="container">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Related Guides</span>
            </div>
            <h2>Helpful Before You Order</h2>

            <div className="related-services-grid">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`${routes.guides}/${guide.slug}`}
                  className="related-service-card"
                >
                  <span>{guide.title}</span>
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              ))}
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
          <h2>{industry.name} — Frequently Asked Questions</h2>

          <FaqAccordion items={industry.faqs} />
        </div>
      </section>

      <PageCta
        title={`Planning ${industry.name.toLowerCase()}?`}
        text="Send us photos of the site, rough dimensions and your logo — we'll recommend the right signage and send a clear quote."
      />
    </main>
  );
}
