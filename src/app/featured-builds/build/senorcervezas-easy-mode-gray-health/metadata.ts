import { metadata as baseMetaData } from '@/app/metadata'

const title = `SenorCerveza's Easy Mode Gray Health Build`
const creator = `SenorCerveza`
const description = `Everything that makes Remnant 2 a challenging Game, get's completely removed. Period. Turn any encounter into Easy mode with this unstoppable Gray Health Allround Build.`
const slug = 'senorcervezas-easy-mode-gray-health'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://remnant2toolkit.b-cdn.net/featured-builds/senorcervezas_gray_health.png'
const classes = ['archon', 'medic']

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
