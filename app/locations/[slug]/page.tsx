import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqAccordion from "@/src/components/FaqAccordion";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import {
  allLocationSlugs,
  getLocationContent,
} from "@/src/data/locationContent";
import { getServiceContent } from "@/src/data/serviceContent";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/src/lib/schema";
import { siteConfig, whatsappHref } from "@/src/lib/site";

export function generateStaticParams() {
  return allLocationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getLocationContent(slug);
  if (!content) return {};

  const path = `/locations/${slug}`;

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

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getLocationContent(slug);
  if (!content) notFound();

  const relevantServices = content.serviceSlugs
    .map((s) => getServiceContent(s))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const relatedLocations = content.relatedLocationSlugs
    .map((s) => getLocationContent(s))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const isCity = content.type === "city";

  const crumbs = isCity
    ? [
        { label: content.stateName, href: `/locations/${content.stateSlug}` },
        { label: content.name },
      ]
    : [{ label: content.name }];

  const schemaName = `${content.h1}${
    content.h1Accent ? ` ${content.h1Accent.replace(/\.$/, "")}` : ""
  }`;

  const whatsapp = whatsappHref(
    `Hi ${siteConfig.name}, I'd like a signage quote for ${content.name}.`,
  );

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(
              isCity
                ? [
                    { name: content.stateName, path: `/locations/${content.stateSlug}` },
                    { name: content.name, path: `/locations/${slug}` },
                  ]
                : [{ name: content.name, path: `/locations/${slug}` }],
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: schemaName,
              description: content.metaDescription,
              path: `/locations/${slug}`,
              providerName: siteConfig.name,
              areaCountry: siteConfig.serviceCountry,
              areaServed: {
                type: isCity ? "City" : "State",
                name: content.name,
              },
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(content.faqs)) }}
      />

      <PageHeader
        eyebrow={isCity ? "Local Service Area" : "Service Area"}
        title={content.h1}
        titleAccent={content.h1Accent}
        intro={content.intro}
        crumbs={crumbs}
      />

      <section className="service-detail">
        <div className="container">
          <div className="location-context">
            <h2>Signage in {content.name}</h2>
            <p>{content.regionalContext}</p>
          </div>

          <div className="service-detail-types">
            <h2>Signage Services in {content.name}</h2>
            <div className="related-services-grid">
              {relevantServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="related-service-card"
                >
                  <span>{service.h1}</span>
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="service-detail-process">
            <h2>How to Get a Quote in {content.name}</h2>
            <ol>
              <li>
                <span>01</span>
                <p>Share your requirement, location and any reference photos by call, WhatsApp or the contact form.</p>
              </li>
              <li>
                <span>02</span>
                <p>Get a design concept, material recommendation and a clear quote.</p>
              </li>
              <li>
                <span>03</span>
                <p>Fabrication takes place at our Kolkata studio.</p>
              </li>
              <li>
                <span>04</span>
                <p>Delivery and professional on-site installation in {content.name}.</p>
              </li>
            </ol>
          </div>

          <p className="location-gallery-note">
            See examples of our signage work in our{" "}
            <Link href={routes.gallery}>project gallery</Link>.
          </p>

          <div className="service-detail-ctas">
            <Link
              href={`${routes.contact}?location=${slug}`}
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

      {relatedLocations.length > 0 && (
        <section className="service-detail-related">
          <div className="container">
            <div className="section-eyebrow">
              <span className="section-eyebrow-line" />
              <span>{isCity ? "Other Locations We Serve" : "Cities We Serve"}</span>
            </div>
            <h2>{isCity ? "Nearby Service Areas" : `Cities in ${content.name}`}</h2>

            <div className="related-services-grid">
              {relatedLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="related-service-card"
                >
                  <span>{loc.name}</span>
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              ))}
              {isCity && (
                <Link
                  href={`/locations/${content.stateSlug}`}
                  className="related-service-card"
                >
                  <span>All of {content.stateName}</span>
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
          <h2>{content.name} — Frequently Asked Questions</h2>

          <FaqAccordion items={content.faqs} />
        </div>
      </section>

      <PageCta
        title={`Ready to start your signage project in ${content.name}?`}
        text="Share your requirement and location — our team will get back with a clear quote."
      />
    </main>
  );
}
