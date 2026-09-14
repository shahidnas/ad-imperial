import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // All imagery is served locally from /public; no remote patterns needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
