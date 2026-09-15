import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqAccordion from "@/src/components/FaqAccordion";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import ServiceVideo from "@/src/components/ServiceVideo";
import { getService } from "@/src/data/services";
import { allServiceSlugs, getServiceContent } from "@/src/data/serviceContent";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/src/lib/schema";
import { siteConfig, whatsappHref } from "@/src/lib/site";

export function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getServiceContent(slug);
  if (!content) return {};

  const path = `/services/${slug}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: path,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getServiceContent(slug);
  if (!content) notFound();

  // Present for the 8 physical services; undefined for the two pillar pages.
  const product = getService(slug);
  const image = product?.image ?? content.pillarImage;
  const imageAlt = product?.imageAlt ?? content.pillarImageAlt ?? content.h1;
  const video = product?.video;
  const videoAlt = product?.videoAlt;

  const related = content.relatedSlugs
    .map((relatedSlug) => getServiceContent(relatedSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const whatsapp = whatsappHref(
    `Hi ${siteConfig.name}, I'd like a quote for ${content.h1}.`,
  );

  const columns: Array<{ heading: string; items: string[] }> = [
    { heading: "Applications", items: content.applications },
    { heading: "Materials", items: content.materials },
    { heading: "Features", items: content.features },
    { heading: "Benefits", items: content.benefits },
  ];

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Services", path: routes.services },
              { name: content.h1, path: `/services/${slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: content.h1,
              description: content.metaDescription,
              path: `/services/${slug}`,
              image,
              providerName: siteConfig.name,
              areaCountry: siteConfig.serviceCountry,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(content.faqs)) }}
      />

      <PageHeader
        eyebrow={content.isPillar ? "Signage Solutions" : "Signage Solution"}
        title={content.h1}
        titleAccent={content.h1Accent}
        intro={content.intro}
        crumbs={[
          { label: "Services", href: routes.services },
          { label: content.h1 },
        ]}
      />

      <section className="service-detail">
        <div className="container">
          <div className="service-detail-grid">
            <div className="services-page-media service-detail-media">
              {video ? (
                <ServiceVideo
                  className="services-page-image service-media-video"
                  src={video}
                  ariaLabel={videoAlt}
                />
              ) : image ? (
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className="services-page-image"
                  priority
                />
              ) : null}
            </div>

            <div className="service-detail-columns">
              {columns.map((column) => (
                <div className="service-detail-col" key={column.heading}>
                  <h2>{column.heading}</h2>
                  <ul className="services-page-highlights">
                    {column.items.map((item) => (
                      <li key={item}>
                        <i className="bi bi-check-lg" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {content.types && content.types.length > 0 && (
            <div className="service-detail-types">
              <h2>Types of {content.typesLabel ?? content.h1}</h2>
              {content.usageContext && (
                <p className="service-detail-types-intro">{content.usageContext}</p>
              )}
              <div className="service-detail-types-grid">
                {content.types.map((type) => (
                  <div className="service-detail-type-card" key={type.name}>
                    <h3>{type.name}</h3>
                    <p>{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="service-detail-process">
            <h2>How We Deliver This</h2>
            <ol>
              {content.installation.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {content.maintenance && content.maintenance.length > 0 && (
            <div className="service-detail-maintenance">
              <h2>Maintenance</h2>
              <ul className="services-page-highlights">
                {content.maintenance.map((item) => (
                  <li key={item}>
                    <i className="bi bi-check-lg" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="service-detail-region-note">
            Available across{" "}
            <Link href="/locations/west-bengal">West Bengal</Link> and{" "}
            <Link href="/locations/jharkhand">Jharkhand</Link>, and nationally
            across India.
          </p>

          <div className="service-detail-ctas">
            <Link
              href={`${routes.contact}?service=${slug}`}
              className="service-detail-cta-primary"
            >
              <span>Get a Quote</span>
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>

            <Link href={routes.contact} className="service-detail-cta-secondary">
              <span>Request a Consultation</span>
              <i className="bi bi-arrow-right" aria-hidden="true" />
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

      {related.length > 0 && (
        <section className="service-detail-related">
          <div className="container">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Related Services</span>
            </div>
            <h2>You Might Also Need</h2>

            <div className="related-services-grid">
              {related.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/services/${entry.slug}`}
                  className="related-service-card"
                >
                  <span>{entry.h1}</span>
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
          <h2>{content.h1} — Frequently Asked Questions</h2>

          <FaqAccordion items={content.faqs} />
        </div>
      </section>

      <PageCta
        title={`Ready to start your ${content.h1.toLowerCase()} project?`}
        text="Share your requirement, location and any reference photos — our team will get back with a clear quote."
      />
    </main>
  );
}
