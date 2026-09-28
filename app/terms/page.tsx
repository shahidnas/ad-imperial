import LegalContent from "@/src/components/LegalContent";
import PageHeader from "@/src/components/PageHeader";
import { termsAndConditions } from "@/src/data/legal";
import { routes } from "@/src/lib/navigation";
import { buildMetadata } from "@/src/lib/seo";
import { siteConfig } from "@/src/lib/site";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `The terms that govern use of the ${siteConfig.name} website.`,
  path: routes.terms,
});

export default function TermsPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader
        eyebrow="Legal"
        title="Terms &"
        titleAccent="Conditions."
        crumbs={[{ label: "Terms & Conditions" }]}
      />

      <section className="legal-page">
        <div className="container">
          <LegalContent doc={termsAndConditions} />
        </div>
      </section>
    </main>
  );
}
