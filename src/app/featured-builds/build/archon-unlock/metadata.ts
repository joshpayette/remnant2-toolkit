import { metadata as baseMetaData } from '@/app/metadata'

const title = `Archon Unlock Build`
const description = `This build is needed to unlock the Archon archtype.`
const slug = 'archon-unlock'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://remnant2toolkit.b-cdn.net/featured-builds/archon_unlock.png'

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
