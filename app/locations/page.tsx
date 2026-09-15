import type { Metadata } from "next";
import Link from "next/link";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import {
  getLocationContent,
  stateLocationSlugs,
} from "@/src/data/locationContent";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema } from "@/src/lib/schema";
import { siteConfig } from "@/src/lib/site";

const TITLE = "Locations We Serve — West Bengal & Jharkhand";
const DESCRIPTION =
  "AD Imperial designs, fabricates and installs letter boards, sign boards and signage for businesses across West Bengal and Jharkhand, and nationally across India, from our studio in Kolkata.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: routes.locations },
  openGraph: {
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: routes.locations,
  },
};

const breadcrumbJsonLd = breadcrumbSchema([{ name: "Locations", path: routes.locations }]);

export default function LocationsPage() {
  const states = stateLocationSlugs
    .map((slug) => getLocationContent(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="Service Areas"
        title="Signage Across"
        titleAccent="West Bengal & Jharkhand."
        intro="AD Imperial is based in Kolkata and serves businesses across West Bengal and Jharkhand, with signage delivered nationally across India from the same studio."
        crumbs={[{ label: "Locations" }]}
      />

      <section className="service-detail">
        <div className="container">
          {states.map((state) => {
            const cities = state.relatedLocationSlugs
              .map((slug) => getLocationContent(slug))
              .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

            return (
              <div className="location-context" key={state.slug}>
                <h2>{state.name}</h2>
                <p>{state.intro}</p>

                <div className="related-services-grid">
                  <Link href={`/locations/${state.slug}`} className="related-service-card">
                    <span>{state.name} Overview</span>
                    <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  </Link>
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/locations/${city.slug}`}
                      className="related-service-card"
                    >
                      <span>{city.name}</span>
                      <i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="location-gallery-note">
            We also deliver signage nationally across India — explore our{" "}
            <Link href={routes.services}>full range of services</Link>.
          </p>
        </div>
      </section>

      <PageCta
        title="Have a signage project in West Bengal or Jharkhand?"
        text="Share your requirement and location — our team will get back with a clear quote."
      />
    </main>
  );
}
