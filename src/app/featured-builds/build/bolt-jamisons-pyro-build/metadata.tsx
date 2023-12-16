import { metadata as baseMetaData } from '@/app/metadata'

const title = "Bolt Jamison's PYRO Build"
const description = 'Archon and Summoner combine for an unbelievable DoT build.'
const slug = 'bolt-jamisons-pyro-build'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/bolt_jamisons_PYRO.png'

export const pageInfo = {
  title,
  description,
  slug,
  url,
  ogImageUrl,
}

export const metadata = {
  ...baseMetaData,
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: baseMetaData.openGraph?.siteName ?? 'Remnant 2 Toolkit',
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
    card: 'summary_large_image',
    title,
    description,
    siteId: '1696952720974888960',
    creator: '@josh_payette',
    creatorId: '1696952720974888960',
    images: [ogImageUrl],
  },
}
