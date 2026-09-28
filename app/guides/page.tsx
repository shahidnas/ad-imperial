import Link from "next/link";
import JsonLd from "@/src/components/JsonLd";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import { guides } from "@/src/data/guides";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema } from "@/src/lib/schema";
import { buildMetadata } from "@/src/lib/seo";

export const metadata = buildMetadata({
  title: "Signage Guides — Costs, Choosing & Maintenance",
  description:
    "Practical signage guides: what decides the cost of a sign board, how to choose a shop sign, and how to look after signage through dust, heat and monsoon.",
  path: routes.guides,
});

export default function GuidesPage() {
  return (
    <main id="main-content" className="page">
      <JsonLd data={breadcrumbSchema([{ name: "Guides", path: routes.guides }])} />

      <PageHeader
        eyebrow="Signage Guides"
        title="Know Before"
        titleAccent="You Order."
        intro="Practical answers to common questions about choosing, pricing and looking after sign boards and letter boards."
        crumbs={[{ label: "Guides" }]}
      />

      <section className="service-detail">
        <div className="container">
          <div className="service-detail-types-grid">
            {guides.map((guide) => (
              <div className="service-detail-type-card" key={guide.slug}>
                <h2>
                  <Link href={`${routes.guides}/${guide.slug}`}>{guide.title}</Link>
                </h2>
                <p>{guide.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title="Have a question that isn't covered here?"
        text="Ask us directly — share your requirement and we'll give you a straight answer and a clear quote."
      />
    </main>
  );
}
