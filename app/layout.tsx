import type { Metadata } from "next";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import { siteConfig } from "@/src/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium Letter Boards & Signage in ${siteConfig.area.split(",")[0]}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "letter board Kolkata",
    "letter board",
    "ACP letter board",
    "3D letter signage",
    "channel letters Kolkata",
    "LED signage Kolkata",
    "neon signage Kolkata",
    "acrylic letters",
    "stainless steel letters",
    "custom signage Kolkata",
    "shop sign board Kolkata",
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
    title: `${siteConfig.name} | Premium Letter Boards & Signage`,
    description: siteConfig.description,
    images: [
      {
        url: "/hero/bhikaram.jpeg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} signage`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Premium Letter Boards & Signage`,
    description: siteConfig.description,
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
    <html lang="en">
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
