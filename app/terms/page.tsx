import type { Metadata } from "next";
import LegalContent from "@/src/components/LegalContent";
import PageHeader from "@/src/components/PageHeader";
import { termsAndConditions } from "@/src/data/legal";
import { routes } from "@/src/lib/navigation";
import { siteConfig } from "@/src/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern use of the ${siteConfig.name} website.`,
  alternates: { canonical: routes.terms },
  robots: { index: true, follow: true },
};

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
