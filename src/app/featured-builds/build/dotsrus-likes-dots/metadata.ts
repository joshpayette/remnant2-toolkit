import { metadata as baseMetaData } from '@/app/metadata'

import { type PageInfo } from '../../types'

const title = `DoTs Я Us likes DoTs`
const creator = `DoTs Я Us`
const description = `Mixing the generic damage amp of Ritualist and Alchemist to end with a semi durable build that still melts bosses in a minute under stacked DoT`
const slug = 'dotsrus-likes-dots'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/dotsrus_likes_dots.png'
const classes = ['ritualist', 'alchemist']
// const tags = ['tag1', 'tag2'] // optional

export const pageInfo: PageInfo = {
  title,
  creator,
  description,
  slug,
  url,
  ogImageUrl,
  classes,
}

export const metadata = {
  ...baseMetaData,
  title,
  description,
  openGraph: {
    ...baseMetaData.openGraph,
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
  },
  twitter: {
    ...baseMetaData.twitter,
    title,
    description,
    images: [ogImageUrl],
  },
}
