import Link from "next/link";
import ServiceCard from "@/src/components/ServiceCard";
import { services } from "@/src/data/services";
import { routes } from "@/src/lib/navigation";

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-heading">
          <div className="services-heading-left">
            <div className="section-eyebrow services-eyebrow">
              <span className="section-eyebrow-line" />
              <span>What We Create</span>
            </div>

            <h2 className="services-title">
              Crafted For
              <span> Impact.</span>
            </h2>
          </div>

          <div className="services-heading-right">
            <p>
              <Link href="/services/letter-board">Letter boards</Link>,{" "}
              <Link href="/services/sign-board">sign boards</Link> and illuminated
              signage designed, fabricated and installed for{" "}
              <Link href="/services/shop-sign-board">shops</Link>,{" "}
              <Link href="/services/hospitality-signage">restaurants</Link>,{" "}
              <Link href="/services/hospital-signage">hospitals</Link> and{" "}
              <Link href="/services/office-signage">offices</Link> across{" "}
              <Link href={routes.locations}>West Bengal, Jharkhand and Bihar</Link>,
              and nationally across India.
            </p>
            <div className="services-heading-line" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="services-list">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="services-bottom">
          <div>
            <span className="services-bottom-label">HAVE A PROJECT IN MIND?</span>
            <h3>
              Let&apos;s create something
              <span> remarkable.</span>
            </h3>
          </div>

          <Link href={routes.contact} className="services-cta">
            <span>Start Your Project</span>
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
