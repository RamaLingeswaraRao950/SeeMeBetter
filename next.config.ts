import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    // Required for static export (Firebase Hosting).
    unoptimized: true,
    remotePatterns: []
  }
};

export default nextConfig;
