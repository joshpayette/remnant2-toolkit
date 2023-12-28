import { metadata as baseMetaData } from '@/app/metadata'

const title = "Dudley's Eldritch Knight"
const creator = 'Dudley'
const description = `(Updated 2023-12-27) The Eldritch Knight is a versatile Ritualist build with a fun playstyle centered on inflicting status effects. This hybrid Tank/DPS build is able to shrug off damage from Apocalypse-level enemies, all while dealing substantial Ranged and Status Effect Damage of its own.`
const slug = 'dudleys-eldritch-knight'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/dudleys_eldritch_knight.png'
const classes = ['ritualist', 'challenger']

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
