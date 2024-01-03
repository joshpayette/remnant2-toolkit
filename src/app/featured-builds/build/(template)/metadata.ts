import { type PageInfo } from '@/app/(types)'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `YOUR BUILD NAME`
const creator = `YOUR NAME`
const description = `YOUR BUILD DESCRIPTION`
const slug = 'build-folder-name'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://remnant2toolkit.b-cdn.net/featured-builds/YOUR_BUILD_IMAGE_NAME.png'
const classes = ['class1', 'class2']
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
