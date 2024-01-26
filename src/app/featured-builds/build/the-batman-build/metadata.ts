import { type PageInfo } from '../../types'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `The Batman Build`
const creator = `Mr. Nacho`
const description = `I wanted to make this video to immortalize my dear friend that went by the nick DangItsBatman. He was there since the beginning of the channel and it will be very difficult to continue without him.`
const slug = 'the-batman-build'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/the_batman_build.png'
const classes = ['alchemist', 'challenger']
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
