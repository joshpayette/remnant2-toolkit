import { type PageInfo } from '../../types'
import { metadata as baseMetaData } from '@/app/metadata'

const title = `Bolt Jamison's Fargazer Madness Mage`
const creator = `Bolt Jamison`
const description = `Even without the glitch, this build still slaps and will remain relevant if they decide to fix it! Is this the new strongest build after the fix to the broken pyro build?`
const slug = 'bolt-jamisons-fargazer-mage'
const url = `https://remnant2toolkit.com/featured-builds/build/${slug}`
const ogImageUrl =
  'https://d2sqltdcj8czo5.cloudfront.net/featured-builds/bolt_jamisons_fargazer_madness_mage.png'
const classes = ['archon', 'ritualist']
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
