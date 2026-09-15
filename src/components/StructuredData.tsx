import {
  absoluteUrl,
  hasAnyContactChannel,
  siteConfig,
} from "@/src/lib/site";
import { services } from "@/src/data/services";

/**
 * LocalBusiness structured data. Only emits contact fields that are actually
 * configured, so it never advertises placeholder details.
 */
export default function StructuredData() {
  const { phone, email, address, gstin } = siteConfig.contact;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl("/hero/bhikaram.jpeg"),
    logo: absoluteUrl("/brand/ad-imperial-logo.png"),
    areaServed: siteConfig.area,
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
  };

  if (hasAnyContactChannel()) {
    if (phone) data.telephone = phone;
    if (email) data.email = email;
  }

  if (gstin) {
    data.taxID = gstin;
    data.vatID = gstin;
  }

  data.address = {
    "@type": "PostalAddress",
    streetAddress: address.lines.slice(0, -1).join(", "),
    addressLocality: address.locality,
    addressRegion: address.region,
    postalCode: address.postalCode,
    addressCountry: address.country,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
