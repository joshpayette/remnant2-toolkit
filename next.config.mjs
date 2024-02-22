import nextMDX from '@next/mdx'

const withMDX = nextMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Configure `images` to support loading images from a remote server
  images: {
    //unoptimized: true,
    //minimumCacheTTL: 60 * 60 * 24 * 3, // 3 days
    quality: 74,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2sqltdcj8czo5.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default withMDX(nextConfig)
