import { type Metadata } from 'next'

const title = 'Hades 2 Toolkit'
const description = 'Hades 2 toolkit for creating and sharing builds.'
const url = 'https://hades2.forlinatoolkits.com'

export const metadata: Metadata = {
  metadataBase: new URL('https://d2sqltdcj8czo5.cloudfront.net'),
  title,
  description,
  manifest: '/site.webmanifest',
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
    index: true,
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
        url: 'https://d2sqltdcj8czo5.cloudfront.net/remnant2/misc/forlina-sm.jpg',
        width: 150,
        height: 150,
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
    images: [
      {
        url: 'https://d2sqltdcj8czo5.cloudfront.net/remnant2/misc/forlina-sm.jpg',
        width: 150,
        height: 150,
      },
    ],
  },
}
