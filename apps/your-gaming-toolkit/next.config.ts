import nextMDX from '@next/mdx';
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Configure `images` to support loading images from a remote server
  images: {
    //unoptimized: true,
    // minimumCacheTTL: 60 * 60 * 24 * 3, // 3 days
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2sqltdcj8czo5.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@repo/ygt/*', '@mantine/core', '@mantime/hooks'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  transpilePackages: ['@repo/ui'],
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    // silence webpack cache errors
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

export default nextConfig;
