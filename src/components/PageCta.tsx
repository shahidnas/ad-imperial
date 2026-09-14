import Link from "next/link";
import { routes } from "@/src/lib/navigation";

interface PageCtaProps {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageCta({
  title = "Ready to make your brand impossible to ignore?",
  text = "Tell us about your signage requirement and our team will turn your idea into a premium visual statement.",
  ctaLabel = "Get a Free Quote",
  ctaHref = routes.contact,
}: PageCtaProps) {
  return (
    <section className="page-cta">
      <div className="container">
        <div className="page-cta-inner">
          <div>
            <span className="section-eyebrow page-cta-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Start Your Project</span>
            </span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>

          <Link href={ctaHref} className="page-cta-button">
            <span>{ctaLabel}</span>
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
