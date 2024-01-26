import { type PageInfo } from '../../types'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `CHAOS GAMING'S TANKUALIST`
const creator = `CHAOS GAMING`
const description = `This build has it all: the best dodge mechanic in the game (misty step), insane healing, insane status damage, crazy ad-clear potential and great total DR.`
const slug = 'chaos-gamings-tankualist'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/chaos_gamings_tankualist.png'
const classes = ['medic', 'ritualist']
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
