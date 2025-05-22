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
    // Fix for CSS preload warnings
    optimizeCss: true
  },  // Control asset preloading to fix preload warnings
  httpAgentOptions: {
    keepAlive: true,
  }
};

// Export the configuration
module.exports = nextConfig;
