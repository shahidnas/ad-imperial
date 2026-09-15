import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/src/components/FaqAccordion";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import { faqs } from "@/src/data/faq";
import { routes } from "@/src/lib/navigation";
import { breadcrumbSchema, faqSchema } from "@/src/lib/schema";
import { siteConfig } from "@/src/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about letter boards, sign boards, LED signage, materials, installation, timelines, quotations and pan-India service availability — answered.",
  alternates: { canonical: routes.faq },
  openGraph: {
    title: `FAQ | ${siteConfig.name}`,
    description:
      "Everything to know before starting a signage project with " +
      siteConfig.name,
    url: routes.faq,
  },
};

const faqJsonLd = faqSchema(faqs);
const breadcrumbJsonLd = breadcrumbSchema([{ name: "FAQ", path: routes.faq }]);

export default function FaqPage() {
  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="Frequently Asked"
        title="Questions,"
        titleAccent="Answered."
        intro="Everything you need to know before starting your next signage project. If your question isn't covered here, get in touch and we'll help."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="faq-page">
        <div className="container">
          <div className="faq-page-layout">
            <FaqAccordion items={faqs} />

            <aside className="faq-page-aside">
              <h2>Still have a question?</h2>
              <p>
                Our team is happy to talk through materials, sizing, lighting and
                installation for your specific project.
              </p>
              <Link href={routes.contact} className="faq-page-aside-link">
                <span>Talk to our team</span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <PageCta />
    </main>
  );
}
