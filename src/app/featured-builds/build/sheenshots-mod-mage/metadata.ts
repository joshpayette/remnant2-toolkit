import { type PageInfo } from '@/app/(types)'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `SheenShot's Mod Mage`
const creator = `SheenShots`
const description = `This makes use of explosive damage and the good old firestorm to grant infinite mod regen and extremely high crit. Of all the build types mod mage is by far the most "easy mode" thing we have because it is so little effort for such high damage.`
const slug = 'sheenshots-mod-mage'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/sheenshots_mod_mage.png'
const classes = ['archon', 'ritualist']
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
