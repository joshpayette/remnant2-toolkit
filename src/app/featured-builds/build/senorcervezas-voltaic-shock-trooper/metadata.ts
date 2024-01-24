import { type PageInfo } from '@/types'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `SenorCerveza's Voltaic Shock Trooper`
const creator = `SenorCerveza`
const description = `I'm going to focus on what really matters in Remnant 2. Enjoying and having a good time while playing with friends in Co-op!
With this fun Build you are going to energize the sh** out your enemys and it will put a smile on your face.`
const slug = 'senorcervezas-voltaic-shock-trooper'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/senorcervezas_voltaic_shock_trooper.png'
const classes = ['archon', 'challenger']
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
