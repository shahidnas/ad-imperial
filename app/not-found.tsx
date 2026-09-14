import type { Metadata } from "next";
import Link from "next/link";
import { primaryNav, routes } from "@/src/lib/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="page">
      <section className="not-found">
        <div className="container">
          <span className="section-eyebrow">
            <span className="section-eyebrow-line" />
            <span>Error 404</span>
          </span>

          <h1 className="not-found-title">
            This page
            <span> doesn&apos;t exist.</span>
          </h1>

          <p className="not-found-text">
            The link may be broken or the page may have moved. Try one of these
            instead:
          </p>

          <div className="not-found-links">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href={routes.contact}>Contact</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
