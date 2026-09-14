import Link from "next/link";
import { routes } from "@/src/lib/navigation";
import { siteConfig, telHref } from "@/src/lib/site";

export default function Contact() {
  const tel = telHref();
  const { address, gstin, phone } = siteConfig.contact;

  return (
    <section className="quote-section" id="contact">
      <div className="quote-section-glow" />

      <div className="container">
        <div className="quote-inner">

          {/* TOP LABEL */}
          <div className="quote-top">
            <div className="section-eyebrow quote-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Start Your Project</span>
            </div>

            <span className="quote-top-number">AD / 01</span>
          </div>


          {/* MAIN CONTENT */}
          <div className="quote-content">

            <div className="quote-heading">
              <h2>
                Your Brand
                <span> Deserves To</span>
                <strong> Stand Out.</strong>
              </h2>
            </div>


            <div className="quote-description">
              <p>
                Tell us about your signage requirement and
                let our team turn your idea into a premium
                visual statement.
              </p>

              <Link
                href={routes.contact}
                className="quote-button"
              >
                <span>Get a Free Quote</span>

                <span className="quote-button-icon">
                  <i className="bi bi-arrow-up-right" />
                </span>
              </Link>

              <span className="quote-note">
                No obligation · Custom solutions · Professional guidance
              </span>
            </div>

          </div>


          {/* CONTACT DETAILS */}
          <div className="quote-contact">
            {tel && (
              <div className="quote-contact-item">
                <span className="quote-contact-label">Call Us</span>
                <a href={tel}>{phone}</a>
              </div>
            )}

            <div className="quote-contact-item">
              <span className="quote-contact-label">Visit Us</span>
              <address className="quote-contact-address">
                {address.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            {gstin && (
              <div className="quote-contact-item">
                <span className="quote-contact-label">GSTIN</span>
                <p>{gstin}</p>
              </div>
            )}
          </div>


          {/* BOTTOM BRAND STRIP */}
          <div className="quote-bottom">

            <div className="quote-brand">
              <span>AD</span>
              <strong>IMPERIAL</strong>
            </div>

            <div className="quote-bottom-line" />

            <div className="quote-bottom-text">
              Premium Signage
              <span>Designed. Crafted. Installed.</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
