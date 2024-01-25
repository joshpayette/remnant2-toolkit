import { type PageInfo } from '@/types'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `Mr. Nacho's & SenorCerveza's COOP Elemental DOTS`
const creator = [`Mr. Nacho`, `SenorCerveza`]
const description = `Multiple elemental DOT builds intended to be played together in a group. The builds are designed to work together to maximize damage and survivability.`
const slug = 'mr-nacho-senorcerveza-coop-elemental-dots'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/mr_nachos_handler_eruption.png'
// const classes = ['class1', 'class2']
const tags = ['coop']

export const pageInfo: PageInfo = {
  title,
  creator,
  description,
  slug,
  url,
  ogImageUrl,
  // classes,
  tags,
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
