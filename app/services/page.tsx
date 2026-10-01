import Image from "next/image";
import Link from "next/link";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import ServiceVideo from "@/src/components/ServiceVideo";
import { services } from "@/src/data/services";
import JsonLd from "@/src/components/JsonLd";
import { industries } from "@/src/data/industries";
import { getServiceContent } from "@/src/data/serviceContent";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema } from "@/src/lib/schema";
import { buildMetadata } from "@/src/lib/seo";
import { getServiceLinks } from "@/src/lib/serviceLinks";

const TITLE = "Signage Services: Sign Boards, Letter Boards & LED";
const DESCRIPTION =
  "Letter boards, sign boards, ACP, LED, neon and back-lit signage, 3D letters, video walls and ACP cladding — designed and made by AD Imperial in Kolkata.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: routes.services,
});

/** Products with their own page but no card/photo in the list above yet. */
const moreProducts = getServiceLinks(["glow-sign-board", "acrylic-sign-board", "metal-letters"]);

const pillars = [
  getServiceContent("letter-board"),
  getServiceContent("sign-board"),
].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

const breadcrumbJsonLd = breadcrumbSchema([{ name: "Services", path: routes.services }]);

export default function ServicesPage() {
  return (
    <main id="main-content" className="page">
      <JsonLd data={breadcrumbJsonLd} />

      <PageHeader
        eyebrow="What We Create"
        title="Signage Services,"
        titleAccent="Crafted For Impact."
        intro="AD Imperial provides custom letter board, sign board and signage solutions for businesses, retail stores, offices and commercial properties across India. Explore each service below, or start with the two core categories: letter boards and sign boards."
        crumbs={[{ label: "Services" }]}
      />

      <section className="services-page">
        <div className="container">
          {/* Pillar / category pages */}
          <div className="services-pillars">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/services/${pillar.slug}`}
                className="services-pillar-card"
              >
                <span className="services-pillar-eyebrow">Core Category</span>
                <h2>{pillar.h1}</h2>
                <p>{pillar.intro}</p>
                <span className="services-pillar-link">
                  Explore {pillar.h1}
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <ul className="services-page-index">
            {services.map((service) => (
              <li key={service.slug}>
                <a href={`#${service.slug}`}>{service.title}</a>
              </li>
            ))}
          </ul>

          <div className="services-page-list">
            {services.map((service) => (
              <article
                key={service.slug}
                id={service.slug}
                className="services-page-item"
              >
                <div className="services-page-media">
                  {service.video ? (
                    <ServiceVideo
                      className="services-page-image service-media-video"
                      src={service.video}
                      ariaLabel={service.videoAlt}
                    />
                  ) : service.image ? (
                    <Image
                      src={service.image}
                      alt={service.imageAlt ?? service.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 45vw"
                      className="services-page-image"
                    />
                  ) : null}
                </div>

                <div className="services-page-body">
                  <span className="services-page-number">
                    {service.number} / {service.category}
                  </span>
                  <h2>{service.title}</h2>
                  <p className="services-page-lead">{service.description}</p>

                  <div className="services-page-actions">
                    <Link
                      href={`/services/${service.slug}`}
                      className="services-page-link"
                    >
                      <span>View full details</span>
                      <i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </Link>

                    <Link
                      href={`${routes.contact}?service=${service.slug}`}
                      className="services-page-link services-page-link-muted"
                    >
                      <span>Enquire about {service.title}</span>
                      <i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="service-detail-types">
            <h2>More Signage We Make</h2>
            <div className="related-services-grid">
              {moreProducts.map((link) => (
                <Link key={link.slug} href={link.href} className="related-service-card">
                  <span>{link.label}</span>
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="service-detail-types">
            <h2>Signage by Industry</h2>
            <div className="related-services-grid">
              {industries.map((industry) => (
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
        </div>
      </section>

      <PageCta
        title="Not sure which option fits your space?"
        text="Send us the location, rough dimensions or a photo of the wall. We'll recommend the right material and lighting for the result you're after."
      />
    </main>
  );
}
