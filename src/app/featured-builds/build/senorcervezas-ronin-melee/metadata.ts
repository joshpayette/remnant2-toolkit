import { type PageInfo } from '@/app/(types)'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `SenorCerveza's "The Ronin" S-Tier Melee Build`
const creator = `SenorCerveza`
const description = `The "Ronin" is a HARD hitter! This Melee Build is able to Kill Bosses in under 40 Seconds. And it's probably the best add clearer for all Worlds in the Game as well!`
const slug = 'senorcervezas-ronin-melee'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/senorcervezas_ronin_melee.png'
const classes = ['ritualist', 'challenger']
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
