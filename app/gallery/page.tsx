import type { Metadata } from "next";
import GalleryGrid from "@/src/components/GalleryGrid";
import PageCta from "@/src/components/PageCta";
import PageHeader from "@/src/components/PageHeader";
import { routes } from "@/src/lib/navigation";
import { getServiceGallery } from "@/src/lib/serviceGallery";
import { siteConfig } from "@/src/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Signage work by ${siteConfig.name} — ACP sign boards and cladding, stainless steel and acrylic letters, LED and neon signage and channel letters. Filter by type.`,
  alternates: { canonical: routes.gallery },
  openGraph: {
    title: `Gallery | ${siteConfig.name}`,
    description: "Premium signage projects — designed, crafted and installed.",
    url: routes.gallery,
  },
};

export default function GalleryPage() {
  const { items, categories } = getServiceGallery();

  return (
    <main id="main-content" className="page">
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
