import { type PageInfo } from '../../types'
import { metadata as baseMetaData } from '@/app/metadata'

const title = "Bolt Jamison's PYRO Build"
const creator = 'Bolt Jamison'
const description = 'Archon and Summoner combine for an unbelievable DoT build.'
const slug = 'bolt-jamisons-pyro'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/bolt_jamisons_PYRO.png'
const classes = ['archon', 'summoner']
const tags = ['shotgun', 'fire', 'explosive']

export const pageInfo: PageInfo = {
  title,
  creator,
  description,
  slug,
  url,
  ogImageUrl,
  classes,
  tags,
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
