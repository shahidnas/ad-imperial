import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "@/src/styles/bootstrap-icons-subset.css";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import StructuredData from "@/src/components/StructuredData";
import { buildMetadata, seoConfig } from "@/src/lib/seo";
import { siteConfig } from "@/src/lib/site";

// Self-hosted, preloaded via next/font — replaces the render-blocking
// Google Fonts @import that used to live in globals.css. Same two
// families/weights as before; globals.css maps --font-heading/--font-body
// to these variables, so no other typography changes anywhere.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Keep in sync with the homepage metadata (app/page.tsx).
const SITE_TITLE = "Signage Company in Kolkata";
const SITE_DESCRIPTION =
  "AD Imperial is a Kolkata signage company designing, fabricating and installing sign boards, LED letters and ACP signage across West Bengal, Jharkhand and Bihar.";

/**
 * Site-wide defaults. Every page overrides title/description/canonical/
 * openGraph/twitter through `buildMetadata()` (src/lib/seo.ts). There is
 * deliberately no canonical here: a layout-level canonical would be
 * inherited by any page that forgot its own and point it at the homepage.
 */
const defaults = buildMetadata({
  title: `${SITE_TITLE} | ${siteConfig.name}`,
  absoluteTitle: true,
  description: SITE_DESCRIPTION,
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${SITE_TITLE} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: defaults.openGraph,
  twitter: defaults.twitter,
  robots: defaults.robots,
  category: "business",
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={seoConfig.language} className={`${manrope.variable} ${dmSans.variable}`}>
      <body>
        <StructuredData />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
