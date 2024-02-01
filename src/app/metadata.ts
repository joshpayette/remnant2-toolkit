import { type Metadata } from 'next'

const title = 'Remnant 2 Toolkit'
const description =
  'Remnant 2 item tracking, build sharing, item database, and more!'
const url = 'https://remnant2toolkit.com'
const ogImageUrl = 'https://d2sqltdcj8czo5.cloudfront.net/og_image_small.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://d2sqltdcj8czo5.cloudfront.net'),
  title,
  description,
  manifest: '/site.webmanifest',
  themeColor: '#3b0764',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      new URL('/favicon-32x32.png', url),
    ],
    shortcut: ['/favicon-32x32.png'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: ogImageUrl,
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title,
    description,
    siteId: '1696952720974888960',
    creator: '@josh_payette',
    creatorId: '1696952720974888960',
    images: [ogImageUrl],
  },
}
