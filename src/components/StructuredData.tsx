import {
  absoluteUrl,
  hasAnyContactChannel,
  siteConfig,
} from "@/src/lib/site";
import { services } from "@/src/data/services";
import { serviceContent } from "@/src/data/serviceContent";

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
    // The physical studio/registered address is Kolkata (see `address`
    // below) — genuinely true. `areaServed` separately and honestly
    // reflects real service coverage: Kolkata city first, then West Bengal
    // and Jharkhand as the primary service states, then India nationally.
    // None of this claims a branch office outside Kolkata.
    areaServed: [
      { "@type": "City", name: siteConfig.area.split(",")[0] },
      { "@type": "State", name: "West Bengal" },
      { "@type": "State", name: "Jharkhand" },
      { "@type": "Country", name: siteConfig.serviceCountry },
    ],
    makesOffer: [
      ...serviceContent
        .filter((entry) => entry.isPillar)
        .map((entry) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: entry.h1,
            url: absoluteUrl(`/services/${entry.slug}`),
          },
        })),
      ...services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    ],
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

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en-IN",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
