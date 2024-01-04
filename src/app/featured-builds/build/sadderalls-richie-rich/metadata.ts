import { type PageInfo } from '@/app/(types)'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `Sadderall's Richie Rich`
const creator = `Sadderall`
const description = `This is a balanced, tanky, Ritualist/Challenger build that'll suit all your needs! Take hits, deal tons of shooting damage, and watch health bars disappear from the volume of DoTs you'll be inflicting. Have fun!`
const slug = 'sadderalls-richie-rich'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://remnant2toolkit.b-cdn.net/featured-builds/sadderalls_richie_rich.png'
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
