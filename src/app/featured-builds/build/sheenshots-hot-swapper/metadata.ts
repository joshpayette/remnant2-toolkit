import { metadata as baseMetaData } from '@/app/metadata'

import { type PageInfo } from '../../types'

const title = `SheenShots' Hot Swapper Build`
const creator = `SheenShots`
const description = `Sporebloom builds do CRAZY DAMAGE. And what's really cool is you can get the gun to turn into a sniper. Decreasing its critical so much that you have a tiny dot to aim with.`
const slug = 'sheenshots-hot-swapper'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/sheenshots_hot_swapper.png'
const classes = ['hunter', 'gunslinger']
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
