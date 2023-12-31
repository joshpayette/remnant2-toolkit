import { metadata as baseMetaData } from '@/app/metadata'

const title = "SheenShots' Acidic Berserker Build"
const description =
  'Now that status has been fixed in Remnant 2, MELEE IS OP. This build makes use of a new mutator to apply tons of corrosion.'
const slug = 'sheenshots-acidic-berserker'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/sheenshots_acidic_berserker.png'

export const pageInfo = {
  title,
  description,
  slug,
  url,
  ogImageUrl,
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
