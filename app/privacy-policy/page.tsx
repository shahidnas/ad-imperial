import LegalContent from "@/src/components/LegalContent";
import PageHeader from "@/src/components/PageHeader";
import { privacyPolicy } from "@/src/data/legal";
import { routes } from "@/src/lib/navigation";
import { buildMetadata } from "@/src/lib/seo";
import { siteConfig } from "@/src/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles information submitted through this website.`,
  path: routes.privacyPolicy,
});

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
