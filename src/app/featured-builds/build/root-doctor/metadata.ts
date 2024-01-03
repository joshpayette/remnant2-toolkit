import { metadata as baseMetaData } from '@/app/metadata'

const title = 'Root Doctor - Support Medic Summoner'
const description = `This build is designed to keep you and your allies while also dealing damage to enemies. It's a great build for solo play and co-op.`
const slug = 'root-doctor'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://remnant2toolkit.b-cdn.net/featured-builds/root_doctor.png'

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
