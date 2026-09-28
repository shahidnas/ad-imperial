import Image from "next/image";
import { cx } from "@/src/lib/utils";

export interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  alt: string;
  /** Layout hint for the home mosaic grid. */
  size?: "large" | "small";
}

interface PortfolioCardProps {
  item: PortfolioItem;
  /** When false, the card always uses the "small" footprint (e.g. the gallery grid). */
  respectSize?: boolean;
  /**
   * "cover" fills the tile (home mosaic). "contain" shows the whole photo with
   * no cropping — used in the gallery where every image must be fully visible.
   */
  fit?: "cover" | "contain";
  sizes?: string;
  preload?: boolean;
  /** Heading level for the card title — h2 when cards sit directly under the page h1. */
  headingLevel?: "h2" | "h3";
}

export default function PortfolioCard({
  item,
  respectSize = true,
  fit = "cover",
  sizes = "(max-width: 767px) 100vw, 50vw",
  preload = false,
  headingLevel: Heading = "h3",
}: PortfolioCardProps) {
  const sizeClass =
    respectSize && item.size === "large" ? "work-card-large" : "work-card-small";

  return (
    <article
      className={cx("work-card", sizeClass, fit === "contain" && "work-card-contain")}
    >
      <div className="work-image-wrapper">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={sizes}
          className="work-image"
          preload={preload}
        />
        <div className="work-overlay" />

        <div className="work-card-category">{item.category}</div>

        <div className="work-card-content">
          <div>
            <span className="work-card-label">AD IMPERIAL</span>
            <Heading>{item.title}</Heading>
          </div>

          <div className="work-card-arrow" aria-hidden="true">
            <i className="bi bi-arrow-up-right" />
          </div>
        </div>
      </div>
    </article>
  );
}
