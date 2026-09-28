import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqAccordion from "@/src/components/FaqAccordion";
import IndustryDetail from "@/src/components/IndustryDetail";
import JsonLd from "@/src/components/JsonLd";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import ServiceVideo from "@/src/components/ServiceVideo";
import { allIndustrySlugs, getIndustry } from "@/src/data/industries";
import { cities, cityPath, statePath, states } from "@/src/data/locations";
import { getProjectImage } from "@/src/data/projectImages";
import { getService } from "@/src/data/services";
import { allServiceSlugs, getServiceContent } from "@/src/data/serviceContent";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/src/lib/schema";
import { buildMetadata } from "@/src/lib/seo";
import { getServiceLinks } from "@/src/lib/serviceLinks";
import { siteConfig, whatsappHref } from "@/src/lib/site";

// Products, pillar categories and industry pages share this route; any
// other slug is a genuine 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...allServiceSlugs, ...allIndustrySlugs].map((slug) => ({ slug }));
}

/** Cities linked from every service page — one or two per state. */
const FEATURED_CITY_SLUGS = ["kolkata", "howrah", "asansol", "ranchi", "jamshedpur", "patna"];

function imageFor(slug: string) {
  const content = getServiceContent(slug);
  const product = getService(slug);
  const src = product?.image ?? content?.pillarImage;
  if (!src) return undefined;
  const described = getProjectImage(src);
  return {
    src,
    alt: described?.alt ?? product?.imageAlt ?? content?.pillarImageAlt ?? content?.h1 ?? "",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = `/services/${slug}`;

  const industry = getIndustry(slug);
  if (industry) {
    const lead = getProjectImage(industry.projectImages[0] ?? "");
    return buildMetadata({
      title: industry.metaTitle,
      description: industry.metaDescription,
      path,
      keywords: industry.keywords,
      image: lead ? { url: lead.src, alt: lead.alt } : undefined,
    });
  }

  const content = getServiceContent(slug);
  if (!content) return {};

  const image = imageFor(slug);
  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path,
    image: image ? { url: image.src, alt: image.alt } : undefined,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const industry = getIndustry(slug);
  if (industry) return <IndustryDetail industry={industry} />;

  const content = getServiceContent(slug);
  if (!content) notFound();

  // Present for the 8 physical services; undefined for pillar pages and
  // products that don't have a photo yet.
  const product = getService(slug);
  const media = imageFor(slug);
  const image = media?.src;
  const imageAlt = media?.alt ?? content.h1;
  const video = product?.video;
  const videoAlt = product?.videoAlt;
  const hasMedia = Boolean(video || image);

  const related = getServiceLinks(content.relatedSlugs);
  const featuredCities = FEATURED_CITY_SLUGS.map((citySlug) =>
    cities.find((city) => city.slug === citySlug),
  ).filter((city): city is NonNullable<typeof city> => Boolean(city));

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
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: routes.services },
            { name: content.h1, path: `/services/${slug}` },
          ]),
          serviceSchema({
            name: content.h1,
            description: content.metaDescription,
            path: `/services/${slug}`,
            image,
            areaServed: [
              ...states.map((state) => ({ type: "State" as const, name: state.name })),
              { type: "Country" as const, name: siteConfig.serviceCountry },
            ],
          }),
          faqSchema(content.faqs),
        ]}
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
          <div className={hasMedia ? "service-detail-grid" : "service-detail-grid-full"}>
            {hasMedia && (
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
                  preload
                />
              ) : null}
            </div>
            )}

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
            Made at our Kolkata studio and installed across{" "}
            {states.map((state, index) => (
              <span key={state.slug}>
                {index > 0 && (index === states.length - 1 ? " and " : ", ")}
                <Link href={statePath(state.slug)}>{state.name}</Link>
              </span>
            ))}
            , including{" "}
            {featuredCities.map((city, index) => (
              <span key={city.slug}>
                {index > 0 && (index === featuredCities.length - 1 ? " and " : ", ")}
                <Link href={cityPath(city)}>{city.name}</Link>
              </span>
            ))}
            {" "}— and nationally across India.
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
                  href={entry.href}
                  className="related-service-card"
                >
                  <span>{entry.label}</span>
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
        title={`Get a Quote for ${getServiceLinks([slug])[0]?.label ?? content.h1}`}
        text="Share your requirement, location and any reference photos — our team will get back with a clear quote."
      />
    </main>
  );
}
