import { metadata as baseMetaData } from '@/app/metadata'

const title = "Dudley's Blood Hunter"
const creator = 'Dudley'
const description = `The Blood Hunter is a hybrid DPS/support build with high carry potential. If you’re looking to try a fun and fresh build for the upcoming Awakened King DLC, look no further.`
const slug = 'dudleys-blood-hunter'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/dudleys_blood_hunter.png'
const classes = ['handler', 'alchemist']

export const pageInfo = {
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
