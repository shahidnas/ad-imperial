import Link from "next/link";
import BrandLogo from "@/src/components/BrandLogo";
import FaqAccordion from "@/src/components/FaqAccordion";
import { faqs } from "@/src/data/faq";
import { routes } from "@/src/lib/navigation";

export default function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-header">
          <div>
            <div className="section-eyebrow faq-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Frequently Asked</span>
            </div>

            <h2 className="faq-title">
              Questions,
              <span> Answered.</span>
            </h2>
          </div>

          <p className="faq-intro">
            Everything you need to know before starting your next signage project
            with AD IMPERIAL.
          </p>
        </div>

        <div className="faq-layout">
          <div className="faq-side">
            <div className="faq-side-logo">
              <BrandLogo tone="light" className="faq-side-logo-image" />
              <span className="faq-side-logo-text brand-lockup-text" aria-hidden="true">
                Imperial
              </span>
            </div>

            <div className="faq-side-line" />

            <p>
              Have a different question? Our team is ready to discuss your signage
              requirements.
            </p>

            <Link href={routes.contact} className="faq-contact-link">
              <span>Talk To Our Team</span>
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
          </div>

          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
