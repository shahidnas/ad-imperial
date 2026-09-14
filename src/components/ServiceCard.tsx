import Image from "next/image";
import Link from "next/link";
import ServiceVideo from "@/src/components/ServiceVideo";
import type { Service } from "@/src/data/services";
import { routes } from "@/src/lib/navigation";

interface ServiceCardProps {
  service: Service;
  /** Index used only for the image `priority` hint. */
  index?: number;
}

/**
 * A single row in the services list. Shared by the home "Services" section
 * and the dedicated /services page.
 */
export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <article className="service-item" id={service.slug}>
      <div className="service-number">{service.number}</div>

      <div className="service-image-wrapper">
        {service.video ? (
          <ServiceVideo
            className="service-image service-media-video"
            src={service.video}
            ariaLabel={service.videoAlt}
          />
        ) : service.image ? (
          <Image
            src={service.image}
            alt={service.imageAlt ?? service.title}
            fill
            sizes="(max-width: 767px) 100vw, 38vw"
            className="service-image"
            priority={index === 0}
          />
        ) : null}
        <div className="service-image-overlay" />
        <div className="service-image-label">AD IMPERIAL</div>
      </div>

      <div className="service-content">
        <div className="service-content-top">
          <span className="service-category">{service.category}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>

        <Link
          href={`${routes.contact}?service=${service.slug}`}
          className="service-link"
          aria-label={`Enquire about ${service.title}`}
        >
          <span>Enquire About This</span>
          <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
