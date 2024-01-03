import { metadata as baseMetaData } from '@/app/metadata'

const title = "Mr. Nacho's Nightfall 100%+Crit Build"
const creator = 'Mr. Nacho'
const description =
  '100% crit chance maximizes the damage output of the nightfall. With this setup you get tons of lifesteal, guaranteed crits and the partial invulnerability - so what are you waiting for?'
const slug = 'mr-nachos-nightfall-build'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://remnant2toolkit.b-cdn.net/featured-builds/mr_nachos_nightfall_crit_build.png'
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
