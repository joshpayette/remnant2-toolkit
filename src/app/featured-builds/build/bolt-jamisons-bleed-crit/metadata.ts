import { metadata as baseMetaData } from '@/app/metadata'

const title = "Bolt Jamison's Bleed Crit Build"
const description =
  'A fun bleed crit build intended for burning bosses down quickly.'
const slug = 'bolt-jamisons-bleed-crit'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/bolt_jamisons_bleed_crit.png'

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
