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
  },
  // Control asset preloading to fix preload warnings
  httpAgentOptions: {
    keepAlive: true,
  },
  // Optimize CSS loading
  optimizeFonts: true,
  // Improve CSS module handling
  webpack: (config) => {
    // Ensure CSS files use correct preload attributes
    if (!config.module) {
      config.module = { rules: [] };
    }
    
    // Add a rule to handle CSS preload links
    const cssRule = config.module.rules.find(rule => 
      rule.oneOf && Array.isArray(rule.oneOf) && 
      rule.oneOf.some(r => r.test && r.test.test && r.test.test('.css'))
    );
    
    if (cssRule && cssRule.oneOf) {
      cssRule.oneOf.forEach(rule => {
        if (rule.use && Array.isArray(rule.use)) {
          const cssLoader = rule.use.find(u => 
            typeof u === 'object' && u.loader && u.loader.includes('css-loader')
          );
          
          if (cssLoader && typeof cssLoader === 'object') {
            // Ensure CSS modules are properly configured
            if (!cssLoader.options) cssLoader.options = {};
            if (!cssLoader.options.modules) cssLoader.options.modules = {};
            cssLoader.options.modules.exportOnlyLocals = false;
          }
        }
      });
    }
    
    return config;
  },
};

// Export the configuration
module.exports = nextConfig;
