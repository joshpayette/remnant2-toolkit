/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add my S3 bucket remnant2-toolkit
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2sqltdcj8czo5.cloudfront.net',
        pathname: '/**/*',
      },
    ],
  },
}

module.exports = nextConfig
