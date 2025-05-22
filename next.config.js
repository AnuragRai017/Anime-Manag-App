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
  // Control asset preloading to fix preload warnings
  httpAgentOptions: {
    keepAlive: true,
  },
  // Optimize CSS loading
  optimizeFonts: true,
  // Improve CSS module handling
  webpack: (config) => {
    // Ensure proper CSS handling
    const oneOfRule = config.module.rules.find((rule) => typeof rule.oneOf === 'object');
    if (oneOfRule) {
      const moduleSassRule = oneOfRule.oneOf.find(
        (rule) => rule.test?.toString().includes('module\\.(scss|sass)')
      );
      if (moduleSassRule) {
        const cssLoader = moduleSassRule.use.find(({ loader }) => loader.includes('css-loader'));
        if (cssLoader) {
          cssLoader.options.modules.exportOnlyLocals = false;
        }
      }
    }
    return config;
  },
};

// Export config, handling Cloudflare integration conditionally
module.exports = nextConfig;
