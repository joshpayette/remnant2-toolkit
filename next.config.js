const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Configure `images` to support loading images from a remote server
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2sqltdcj8czo5.cloudfront.net',
        pathname: '/**/*',
      },
    ],
  },
}

module.exports = withMDX(nextConfig)
