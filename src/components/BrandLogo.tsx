import Image from "next/image";
import { cx } from "@/src/lib/utils";

interface BrandLogoProps {
  className?: string;
  /**
   * "dark" (default) renders the logo's original ink colour — for light
   * backgrounds (e.g. the header). "light" knocks it out to white via a
   * CSS filter, for use on the site's dark sections — the artwork itself
   * is never recoloured or redrawn, only its on-screen presentation.
   */
  tone?: "dark" | "light";
  priority?: boolean;
}

/**
 * The official AD Imperial logo — single source of truth for every brand
 * mark on the site. Source asset: /public/brand/ad-imperial-logo.png.
 */
export default function BrandLogo({
  className,
  tone = "dark",
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/brand/ad-imperial-logo.png"
      alt="AD Imperial"
      width={414}
      height={228}
      priority={priority}
      className={cx("brand-logo", tone === "light" && "brand-logo-light", className)}
    />
  );
}
