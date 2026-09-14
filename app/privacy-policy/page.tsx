import type { Metadata } from "next";
import LegalContent from "@/src/components/LegalContent";
import PageHeader from "@/src/components/PageHeader";
import { privacyPolicy } from "@/src/data/legal";
import { routes } from "@/src/lib/navigation";
import { siteConfig } from "@/src/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles information submitted through this website.`,
  alternates: { canonical: routes.privacyPolicy },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="page">
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        titleAccent="Policy."
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="legal-page">
        <div className="container">
          <LegalContent doc={privacyPolicy} />
        </div>
      </section>
    </main>
  );
}
