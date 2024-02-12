import { metadata as baseMetaData } from '@/app/metadata'

import { type PageInfo } from '../../types'

const title = `SenorCerveza's 160k DPS Meme Build`
const creator = `SenorCerveza`
const description = `This is more like a Meme than anything else... I almost cracked up when first using this to kill a Boss like Venom in around 4 Seconds.`
const slug = 'senorcervezas-160k-dps-meme'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/senorcervezas_160k_meme.png'
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
