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
  },
  // Configure for edge compatibility
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

// Check if we're running a Cloudflare Pages production build
if (process.env.CF_PAGES === '1') {
  // Use dynamic import with require
  const { withCloudflarePages } = require('@cloudflare/next-on-pages');
  module.exports = withCloudflarePages(nextConfig);
} else {
  module.exports = nextConfig;
}
