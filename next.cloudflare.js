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
    unoptimized: true, // Required for Cloudflare Pages
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Required for Cloudflare Pages
  output: 'export',
  distDir: '.vercel/output',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

// Apply Cloudflare-specific headers
module.exports = withCloudflareHeaders(nextConfig);

// Apply Cloudflare Pages specific transformations
module.exports = withCloudflareHeaders(nextConfig);
