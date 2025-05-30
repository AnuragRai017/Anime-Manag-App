import { NextConfig } from 'next';

/**
 * Configure Next.js for Cloudflare Pages deployment
 */
const nextConfig: NextConfig = {
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
  },
  // Configure for edge compatibility
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
