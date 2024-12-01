import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@ygt/ui/*'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    //unoptimized: true,
    // minimumCacheTTL: 60 * 60 * 24 * 3, // 3 days
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dbv3oah7mgkxy.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
