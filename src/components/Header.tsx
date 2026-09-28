"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/src/components/BrandLogo";
import { primaryNav, routes } from "@/src/lib/navigation";
import { cx } from "@/src/lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === routes.home ? pathname === href : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="container">
        <nav className="header-nav" aria-label="Primary">
          <Link href={routes.home} className="site-logo" onClick={closeMenu}>
            <BrandLogo className="site-logo-image" preload />
            <span className="site-logo-text brand-lockup-text" aria-hidden="true">
              Imperial
            </span>
          </Link>

          <div className="desktop-nav">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link href={routes.contact} className="header-cta">
            <span>Get a Quote</span>
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>

          <button
            type="button"
            className={cx("mobile-menu-btn", menuOpen && "menu-active")}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        <div
          id="mobile-nav"
          className={cx("mobile-nav", menuOpen && "mobile-nav-open")}
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href={routes.contact}
            className="mobile-cta"
            onClick={closeMenu}
          >
            Get a Quote
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
