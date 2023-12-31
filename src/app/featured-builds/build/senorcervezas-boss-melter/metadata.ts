import { metadata as baseMetaData } from '@/app/metadata'

const title = "SenorCerveza's Boss Melter"
const creator = 'SenorCerveza'
const description = `This is the BOSS MELTER! Literally... We are going to take down Annihilation or Ravager in around 1 Minute and 30 Seconds each with this extremely powerfull Plasma Cutter Build.`
const slug = 'senorcervezas-boss-melter'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/senorcervezas_boss_melter.png'
const classes = ['gunslinger', 'challenger']

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
