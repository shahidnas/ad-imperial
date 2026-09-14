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
              Premium signage solutions designed to give your business a
              distinctive presence and a lasting first impression.
            </p>
            <div className="services-heading-line" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="services-list">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
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
