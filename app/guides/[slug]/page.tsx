import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/src/components/JsonLd";
import { renderParagraph } from "@/src/components/LegalContent";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import { getGuide, guides } from "@/src/data/guides";
import { cityPath, getCityBySlug } from "@/src/data/locations";
import { getProjectImage } from "@/src/data/projectImages";
import { routes } from "@/src/lib/navigation";
import { articleSchema, breadcrumbSchema } from "@/src/lib/schema";
import { buildMetadata } from "@/src/lib/seo";
import { getServiceLinks } from "@/src/lib/serviceLinks";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const image = guide.image ? getProjectImage(guide.image) : undefined;

  return buildMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: `${routes.guides}/${guide.slug}`,
    type: "article",
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
    image: image ? { url: image.src, alt: image.alt } : undefined,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" });

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `${routes.guides}/${guide.slug}`;
  const services = getServiceLinks(guide.relatedServices);
  const relatedCities = guide.relatedCities
    .map((citySlug) => getCityBySlug(citySlug))
    .filter((city): city is NonNullable<typeof city> => Boolean(city));

  return (
    <main id="main-content" className="page">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Guides", path: routes.guides },
            { name: guide.title, path },
          ]),
          articleSchema({
            headline: guide.title,
            description: guide.description,
            path,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            image: guide.image,
          }),
        ]}
      />

      <PageHeader
        eyebrow="Signage Guide"
        title={guide.title}
        intro={guide.summary}
        crumbs={[{ label: "Guides", href: routes.guides }, { label: guide.title }]}
      />

      <section className="legal-page">
        <div className="container">
          <article className="legal-content">
            <p className="legal-summary">
              Updated{" "}
              <time dateTime={guide.dateModified}>
                {dateFormat.format(new Date(guide.dateModified))}
              </time>{" "}
              · AD Imperial, Kolkata
            </p>

            {guide.sections.map((section) => (
              <section key={section.heading} className="legal-section">
                <h2>{section.heading}</h2>
                {section.body.map((paragraph, index) => (
                  <p key={index}>{renderParagraph(paragraph)}</p>
                ))}
                {section.bullets && (
                  <ul className="services-page-highlights">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>
                        <i className="bi bi-check-lg" aria-hidden="true" />
                        <span>{renderParagraph(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>

      <section className="service-detail-related">
        <div className="container">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line" />
            <span>Related</span>
          </div>
          <h2>Related Services and Locations</h2>

          <div className="related-services-grid">
            {services.map((service) => (
              <Link key={service.slug} href={service.href} className="related-service-card">
                <span>{service.label}</span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            ))}
            {relatedCities.map((city) => (
              <Link key={city.slug} href={cityPath(city)} className="related-service-card">
                <span>Signage in {city.name}</span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title="Want advice on your own sign?"
        text="Send photos of your frontage and your requirement — we'll recommend the right option and send a clear quote."
      />
    </main>
  );
}
