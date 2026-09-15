import Link from "next/link";
import BrandLogo from "@/src/components/BrandLogo";
import { footerNav, legalNav, routes } from "@/src/lib/navigation";
import { services } from "@/src/data/services";
import { mailtoHref, siteConfig, telHref } from "@/src/lib/site";

export default function Footer() {
  const tel = telHref();
  const mail = mailtoHref();
  const { address, gstin } = siteConfig.contact;

  return (
    <footer className="luxury-footer">
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <div>
              <span className="footer-cta-label">Have a project in mind?</span>
              <h2>
                Let&apos;s Create Something
                <span> Remarkable.</span>
              </h2>
            </div>

            <Link href={routes.contact} className="footer-cta-button">
              <span>Start Your Project</span>
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href={routes.home} className="footer-logo">
                <BrandLogo tone="light" className="footer-logo-image" />
                <span className="footer-logo-text brand-lockup-text" aria-hidden="true">
                  Imperial
                </span>
              </Link>

              <p>
                Premium signage crafted with precision, creativity and attention
                to every detail. We help businesses make a lasting first
                impression.
              </p>

              {siteConfig.socials.length > 0 && (
                <div className="footer-socials">
                  {siteConfig.socials.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`bi ${social.icon}`} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="footer-column">
              <span className="footer-heading">Explore</span>
              <div className="footer-links">
                {footerNav.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="footer-column">
              <span className="footer-heading">Services</span>
              <div className="footer-links">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`${routes.services}#${service.slug}`}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="footer-column footer-contact">
              <span className="footer-heading">Get In Touch</span>

              {tel && (
                <div className="footer-contact-item">
                  <small>CALL US</small>
                  <a href={tel}>{siteConfig.contact.phone}</a>
                </div>
              )}

              {mail && (
                <div className="footer-contact-item">
                  <small>EMAIL</small>
                  <a href={mail}>{siteConfig.contact.email}</a>
                </div>
              )}

              <div className="footer-contact-item">
                <small>LOCATION</small>
                <address className="footer-address">
                  {address.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>

              {gstin && (
                <div className="footer-contact-item footer-gstin">
                  <small>GSTIN</small>
                  <p>{gstin}</p>
                </div>
              )}
            </div>
          </div>

          <div className="footer-large-brand">
            AD <span>IMPERIAL</span>
          </div>

          <div className="footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} {siteConfig.legalName}. All
              rights reserved.
            </span>

            <div>
              {legalNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>

            <span className="footer-crafted">Designed with precision.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
