import JsonLd from "@/src/components/JsonLd";
import GalleryGrid from "@/src/components/GalleryGrid";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import { routes } from "@/src/lib/navigation";
import { buildMetadata } from "@/src/lib/seo";
import { breadcrumbSchema, imageGallerySchema } from "@/src/lib/schema";
import { getServiceGallery } from "@/src/lib/serviceGallery";
import { siteConfig } from "@/src/lib/site";

export const metadata = buildMetadata({
  title: "Signage Gallery — Sign Board & Letter Board Projects",
  description: `Real signage projects by ${siteConfig.name}: ACP boards and cladding, gold acrylic and steel letters, LED, channel and neon signs for shops, cafés and hospitals.`,
  path: routes.gallery,
});

const breadcrumbJsonLd = breadcrumbSchema([{ name: "Gallery", path: routes.gallery }]);

export default function GalleryPage() {
  const { items, categories } = getServiceGallery();

  return (
    <main id="main-content" className="page">
      <JsonLd
        data={[
          breadcrumbJsonLd,
          imageGallerySchema({
            name: `Signage projects by ${siteConfig.name}`,
            path: routes.gallery,
            images: items.map((item) => ({ src: item.image, alt: item.alt, title: item.title })),
          }),
        ]}
      />

      <PageHeader
        eyebrow="Selected Projects"
        title="Signs Made To"
        titleAccent="Stand Out."
        intro="A cross-section of our signage work — different materials, finishes and lighting, all built with the same attention to detail. Filter by type below."
        crumbs={[{ label: "Gallery" }]}
      />

      <section className="gallery-page">
        <div className="container">
          <GalleryGrid items={items} categories={categories} />
        </div>
      </section>

      <PageCta
        title="Have a similar project in mind?"
        text="Share a reference and your location — we'll show you how we'd approach it."
      />
    </main>
  );
}
