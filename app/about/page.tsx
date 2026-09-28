import Image from "next/image";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import { companyStats } from "@/src/lib/constants";
import { routes } from "@/src/lib/navigation";
import { buildMetadata } from "@/src/lib/seo";
import { breadcrumbSchema } from "@/src/lib/schema";
import { siteConfig } from "@/src/lib/site";

const breadcrumbJsonLd = breadcrumbSchema([{ name: "About", path: routes.about }]);

export const metadata = buildMetadata({
  title: "About Us — Signage Studio in Kolkata",
  description: `${siteConfig.name} is a signage studio in ${siteConfig.area} that designs, fabricates and installs letter boards and sign boards for businesses across eastern India.`,
  path: routes.about,
});

const values = [
  {
    number: "01",
    title: "Premium Materials",
    text: "We work with carefully selected ACP, stainless steel, acrylic and lighting components chosen for durability, finish and visual impact.",
  },
  {
    number: "02",
    title: "Precision Craftsmanship",
    text: "Every letter, edge and joint is produced with attention to detail so the finished signage looks clean and considered up close.",
  },
  {
    number: "03",
    title: "Made For Your Brand",
    text: "Each project is designed around your identity, your space and how your customers will actually see the sign — day and night.",
  },
  {
    number: "04",
    title: "Handled End To End",
    text: "From the first conversation to installation, one team manages design, fabrication and fitting so nothing falls through the gaps.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="About AD Imperial"
        title="We Turn Ideas Into"
        titleAccent="Remarkable Signage."
        intro={`Your sign is often the first thing people notice about your business. We design, fabricate and install premium letter boards and signage for businesses across India, from our studio in ${siteConfig.area}.`}
        crumbs={[{ label: "About" }]}
      />

      <section className="about-page-story">
        <div className="container">
          <div className="about-page-grid">
            <div className="about-page-media">
              <Image
                src="/about/ad-imperial-illuminated-letter-board.webp"
                alt="AD Imperial logo in illuminated gold dimensional letters on a dark wall"
                width={720}
                height={820}
                className="about-page-image"
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>

            <div className="about-page-copy">
              <div className="section-eyebrow">
                <span className="section-eyebrow-line" />
                <span>Our Story</span>
              </div>

              <h2>Signage built to be looked at closely.</h2>

              <p>
                AD Imperial is a signage studio focused on one thing: making
                businesses look established. From elegant stainless-steel letters
                and acrylic signage to illuminated boards and 3D channel letters,
                every project is designed and crafted to represent a brand with
                confidence — for clients across India, not just Kolkata.
              </p>

              <p>
                We keep the process straightforward — understand the brief, agree
                the design, fabricate with premium materials and install it
                properly. The result is signage that still looks sharp years
                after it goes up.
              </p>

              <div className="about-page-stats">
                {companyStats.map((stat) => (
                  <div key={stat.label} className="about-page-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-page-values">
        <div className="container">
          <div className="section-eyebrow">
            <span className="section-eyebrow-line" />
            <span>How We Work</span>
          </div>

          <h2 className="about-page-values-title">
            What every project gets.
          </h2>

          <div className="about-page-values-grid">
            {values.map((value) => (
              <article key={value.number} className="about-value-card">
                <span className="about-value-number">{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </main>
  );
}
