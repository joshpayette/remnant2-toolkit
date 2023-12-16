import nextMDX from '@next/mdx'

const withMDX = nextMDX()

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

export default withMDX(nextConfig)
