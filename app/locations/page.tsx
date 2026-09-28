import Link from "next/link";
import JsonLd from "@/src/components/JsonLd";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import { citiesInState, cityPath, statePath, states } from "@/src/data/locations";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema } from "@/src/lib/schema";
import { buildMetadata } from "@/src/lib/seo";
import { siteConfig } from "@/src/lib/site";

export const metadata = buildMetadata({
  title: "Service Areas: West Bengal, Jharkhand & Bihar",
  description:
    "AD Imperial makes and installs letter boards, sign boards and signage for businesses across West Bengal, Jharkhand and Bihar — from one studio in Kolkata.",
  path: routes.locations,
  keywords: [
    "sign board manufacturer West Bengal",
    "sign board manufacturer Jharkhand",
    "sign board manufacturer Bihar",
  ],
});

export default function LocationsPage() {
  return (
    <main id="main-content" className="page">
      <JsonLd data={breadcrumbSchema([{ name: "Locations", path: routes.locations }])} />

      <PageHeader
        eyebrow="Service Areas"
        title="Signage Across"
        titleAccent="West Bengal, Jharkhand & Bihar."
        intro="AD Imperial is based in Kolkata and serves businesses across West Bengal, Jharkhand and Bihar, with signage delivered nationally across India from the same studio."
        crumbs={[{ label: "Locations" }]}
      />

      <section className="service-detail">
        <div className="container">
          <div className="location-context">
            <h2>How We Serve Businesses Outside Kolkata</h2>
            <p>
              {siteConfig.name} has one studio, at{" "}
              {siteConfig.contact.address.lines.join(", ")}. Every sign is designed
              and fabricated there. For projects in other cities we plan from the
              photos, measurements and details you share (or a site visit where
              needed), transport the finished signage by road, and install it on
              site. We don&apos;t operate branch offices — the city pages below
              describe the places we serve and what businesses there typically need.
            </p>
          </div>

          {states.map((state) => {
            const cities = citiesInState(state.slug);

            return (
              <div className="location-context" key={state.slug}>
                <h2>
                  <Link href={statePath(state.slug)}>{state.name}</Link>
                </h2>
                <p>{state.intro}</p>

                <div className="related-services-grid">
                  <Link href={statePath(state.slug)} className="related-service-card">
                    <span>{state.name} Overview</span>
                    <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  </Link>
                  {cities.map((city) => (
                    <Link key={city.slug} href={cityPath(city)} className="related-service-card">
                      <span>{city.name}</span>
                      <i className="bi bi-arrow-up-right" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="location-gallery-note">
            Don&apos;t see your city? We also deliver signage elsewhere in India —
            explore our <Link href={routes.services}>full range of services</Link> or{" "}
            <Link href={routes.contact}>send us your requirement</Link>.
          </p>
        </div>
      </section>

      <PageCta
        title="Have a signage project in West Bengal, Jharkhand or Bihar?"
        text="Share your requirement and location — our team will get back with a clear quote."
      />
    </main>
  );
}
