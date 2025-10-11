import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Compression
  compress: true,

  // Power optimizations
  poweredByHeader: false,

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || `1.0.5-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
    JWT_SECRET: process.env.JWT_SECRET,
  },

  // Webpack configuration to handle Node.js modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Externalize Node.js modules for client-side builds
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        dns: false,
        tls: false,
        assert: false,
        path: false,
        url: false,
        util: false,
        querystring: false,
        stream: false,
        crypto: false,
        http: false,
        https: false,
        os: false,
        zlib: false,
        child_process: false,
        events: false,
        buffer: false,
        string_decoder: false,
      };

      // Mark these modules as external
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'supports-color': 'commonjs supports-color',
        'bufferutil': 'commonjs bufferutil',
      });
    }

    return config;
  },

  // Server external packages for better compatibility
  serverExternalPackages: ['nodemailer'],
};

export default nextConfig;
