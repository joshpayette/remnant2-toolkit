import { metadata as baseMetaData } from '@/app/metadata'

const title = "Mr. Nacho's EGG Build"
const creator = 'Mr. Nacho'
const description =
  "Embrace the power of + all damage and free bulwark stacks of the EGG! The easiest DPS build to play and it's not even close!"
const slug = 'mr-nachos-egg-build'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://remnant2toolkit.b-cdn.net/featured-builds/mr_nachos_egg_build.png'
const classes = ['hunter', 'gunslinger']

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
