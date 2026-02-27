import nextMDX from '@next/mdx';

const withMDX = nextMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactCompiler: true,
  images: {
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2sqltdcj8czo5.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [100, 90, 75],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    // silence webpack cache errors
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

export default withMDX(nextConfig);
