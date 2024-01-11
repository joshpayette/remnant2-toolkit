import { type PageInfo } from '@/app/(types)'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `SenorCerveza's INCENDIARY KING`
const creator = `SenorCerveza`
const description = `If you like to nuke and burn down everything on your run through the Worlds of Remnant 2, this Build is DEFINATELY for YOU! So the Inciernary KING is back! `
const slug = 'senorcervezas-incendiary-king'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/senorcervezas_incendiary_king.png'
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
