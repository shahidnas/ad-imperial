import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import ServiceVideo from "@/src/components/ServiceVideo";
import { services } from "@/src/data/services";
import { routes } from "@/src/lib/navigation";
import { siteConfig } from "@/src/lib/site";

export const metadata: Metadata = {
  title: "Signage Services",
  description:
    "ACP letter boards, stainless steel letters, acrylic letters, LED & neon signage, 3D channel letters and fully custom business signage — designed, fabricated and installed.",
  alternates: { canonical: routes.services },
  openGraph: {
    title: `Signage Services | ${siteConfig.name}`,
    description:
      "Premium letter boards, illuminated signage and custom fabrication in " +
      siteConfig.area,
    url: routes.services,
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader
        eyebrow="What We Create"
        title="Signage,"
        titleAccent="Crafted For Impact."
        intro="A full range of services covering everything from flat fascia boards to fully illuminated, dimensional lettering. Every option below is designed, fabricated and installed by our own team."
        crumbs={[{ label: "Services" }]}
      />

      <section className="services-page">
        <div className="container">
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
                  <p className="services-page-lead">{service.detail}</p>

                  <ul className="services-page-highlights">
                    {service.highlights.map((highlight) => (
                      <li key={highlight}>
                        <i className="bi bi-check-lg" aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`${routes.contact}?service=${service.slug}`}
                    className="services-page-link"
                  >
                    <span>Enquire about {service.title}</span>
                    <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  </Link>
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
