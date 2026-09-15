import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import ServiceVideo from "@/src/components/ServiceVideo";
import { services } from "@/src/data/services";
import { getServiceContent } from "@/src/data/serviceContent";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema } from "@/src/lib/schema";
import { siteConfig } from "@/src/lib/site";

const TITLE = "Signage Services — Letter Boards, Sign Boards & LED Signage";
const DESCRIPTION =
  "Explore AD Imperial's signage services — letter boards, sign boards, ACP, LED and neon signage, channel letters, acrylic and stainless steel letters, video walls and ACP cladding — for businesses across India.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: routes.services },
  openGraph: {
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: routes.services,
  },
};

const pillars = [
  getServiceContent("letter-board"),
  getServiceContent("sign-board"),
].filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

const breadcrumbJsonLd = breadcrumbSchema([{ name: "Services", path: routes.services }]);

export default function ServicesPage() {
  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="What We Create"
        title="Signage,"
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
            {services.map((service, index) => (
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
                      priority={index === 0}
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
        </div>
      </section>

      <PageCta
        title="Not sure which option fits your space?"
        text="Send us the location, rough dimensions or a photo of the wall. We'll recommend the right material and lighting for the result you're after."
      />
    </main>
  );
}
