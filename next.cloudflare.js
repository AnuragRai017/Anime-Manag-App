// next.cloudflare.js - Configuration for Cloudflare Pages deployment
// This file is used by the next-on-pages plugin

const { withCloudflareHeaders } = require('@cloudflare/next-on-pages/headers');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.mangadex.org",
        port: "",
        pathname: "/covers/**",
      },
      {
        protocol: "https",
        hostname: "**.mangadex.network",
        port: "",
        pathname: "/data/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production', // For Cloudflare Pages to work with Next.js images
  },
  // Configure for edge compatibility
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Improve compatibility with Cloudflare Pages
  output: 'standalone',
};

// Apply Cloudflare Pages specific transformations
module.exports = withCloudflareHeaders(nextConfig);
