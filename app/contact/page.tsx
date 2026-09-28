import ContactForm from "@/src/components/ContactForm";
import PageHeader from "@/src/components/PageHeader";
import { routes } from "@/src/lib/navigation";
import { buildMetadata } from "@/src/lib/seo";
import { breadcrumbSchema } from "@/src/lib/schema";
import {
  hasAnyContactChannel,
  mailtoHref,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/src/lib/site";

export const metadata = buildMetadata({
  title: "Contact & Free Signage Quote",
  description: `Request a free quote for letter boards, sign boards or LED signage from ${siteConfig.name}'s Kolkata studio — serving West Bengal, Jharkhand and Bihar.`,
  path: routes.contact,
});

const breadcrumbJsonLd = breadcrumbSchema([{ name: "Contact", path: routes.contact }]);

type SearchParams = Promise<{ service?: string | string[] }>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const rawService = params.service;
  const defaultService = Array.isArray(rawService) ? rawService[0] : rawService;

  const tel = telHref();
  const mail = mailtoHref();
  const whatsapp = whatsappHref(
    `Hi ${siteConfig.name}, I'd like a quote for signage.`,
  );
  const channelsConfigured = hasAnyContactChannel();

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="Start Your Project"
        title="Your Brand Deserves To"
        titleAccent="Stand Out."
        intro="Tell us about your signage requirement and our team will turn your idea into a premium visual statement. No obligation — just professional guidance and a clear quote."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="contact-page">
        <div className="container">
          <div className="contact-page-layout">
            <div className="contact-page-form">
              <h2>Request a free quote</h2>
              <p className="contact-page-form-intro">
                Fields marked <span aria-hidden="true">*</span> are required.
                We&apos;ll get back to you with next steps.
              </p>
              <ContactForm defaultService={defaultService} />
            </div>

            <aside className="contact-page-aside">
              <h2>Get in touch</h2>

              {channelsConfigured ? (
                <ul className="contact-channels">
                  {tel && (
                    <li>
                      <span className="contact-channel-label">Call</span>
                      <a href={tel}>{siteConfig.contact.phone}</a>
                    </li>
                  )}
                  {whatsapp && (
                    <li>
                      <span className="contact-channel-label">WhatsApp</span>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Message us
                      </a>
                    </li>
                  )}
                  {mail && (
                    <li>
                      <span className="contact-channel-label">Email</span>
                      <a href={mail}>{siteConfig.contact.email}</a>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="contact-channels-empty">
                  The quickest way to reach us right now is the form. Send your
                  details and we&apos;ll respond directly.
                </p>
              )}

              <div className="contact-aside-meta">
                <span className="contact-channel-label">Visit us</span>
                <address className="contact-address">
                  {siteConfig.contact.address.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>

              <div className="contact-aside-meta">
                <span className="contact-channel-label">Service area</span>
                <p>{siteConfig.area}</p>
              </div>

              {siteConfig.contact.gstin && (
                <div className="contact-aside-meta contact-aside-gstin">
                  <span className="contact-channel-label">GSTIN</span>
                  <p>{siteConfig.contact.gstin}</p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
