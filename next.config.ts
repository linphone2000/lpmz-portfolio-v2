import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config, { isServer }) => {
    // TensorFlow.js configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
