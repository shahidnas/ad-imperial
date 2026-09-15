import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";
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

const SITE_TITLE = "Letter Board & Sign Board Manufacturer in West Bengal & Jharkhand";
const SITE_DESCRIPTION =
  "AD Imperial designs, manufactures and installs custom letter boards, sign boards, LED letters, channel letters, acrylic and ACP signage for businesses across West Bengal and Jharkhand, and nationally across India — from our studio in Kolkata.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${SITE_TITLE} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: siteConfig.name,
  keywords: [
    "letter board manufacturer West Bengal",
    "sign board manufacturer West Bengal",
    "signage company West Bengal",
    "letter board manufacturer Jharkhand",
    "sign board manufacturer Jharkhand",
    "signage company Jharkhand",
    "letter board Kolkata",
    "sign board Kolkata",
    "letter board Durgapur",
    "sign board Durgapur",
    "letter board Asansol",
    "sign board Asansol",
    "letter board Ranchi",
    "sign board Ranchi",
    "letter board Jamshedpur",
    "sign board Jamshedpur",
    "letter board manufacturer India",
    "sign board manufacturer India",
    "signage company India",
    "custom signage India",
    "ACP sign board",
    "LED sign board",
    "LED letters",
    "channel letters",
    "acrylic letters",
    "gold acrylic letters",
    "stainless steel letters",
    "neon signage",
    "commercial signage",
    "corporate signage",
    "outdoor signage",
    "shop sign board",
    "video wall",
    "ACP cladding",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${SITE_TITLE} | ${siteConfig.name}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/hero/bhikaram.jpeg",
        width: 1200,
        height: 630,
        alt: `Custom letter board and signage installation by ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} | ${siteConfig.name}`,
    description: SITE_DESCRIPTION,
    images: ["/hero/bhikaram.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}>
      <body>
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
