import Link from "next/link";
import PortfolioCard from "@/src/components/PortfolioCard";
import { routes } from "@/src/lib/navigation";
import { getFeaturedGallery } from "@/src/lib/serviceGallery";

export default function OurWork() {
  const featured = getFeaturedGallery(6);

  return (
    <section className="our-work-section" id="work">
      <div className="container">
        <div className="our-work-header">
          <div className="our-work-heading">
            <div className="section-eyebrow work-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Selected Projects</span>
            </div>

            <h2 className="our-work-title">
              Signs Made To
              <span> Stand Out.</span>
            </h2>
          </div>

          <div className="our-work-intro">
            <p>
              A selection of premium signage projects created with precision,
              creativity and attention to every detail.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {featured.length > 0 ? (
          <div className="work-grid">
            {featured.map((item) => (
              <PortfolioCard
                key={item.key}
                item={item}
                respectSize={false}
                fit="contain"
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            ))}
          </div>
        ) : (
          <p className="work-empty">Projects coming soon.</p>
        )}

        <div className="work-footer">
          <div className="work-footer-line" />

          <Link href={routes.gallery} className="work-view-all">
            <span>View Complete Portfolio</span>
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>

          <div className="work-footer-line" />
        </div>
      </div>
    </section>
  );
}
