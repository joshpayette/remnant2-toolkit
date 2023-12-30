import { Build } from '@prisma/client'
import { GenericItem } from './items/GenericItem'

/**
 * The minimum information that should be
 * written in a CSV export for each item
 */
export interface CsvItem {
  name: string
  category: GenericItem['category']
  description: string
  howToGet: string
  wikiLinks: string
}

/**
 * The information provided by the metadata for
 * each featured-build page
 */
export interface PageInfo {
  title: string
  creator?: string | string[]
  description: string
  slug: string
  url: string
  ogImageUrl: string
  classes?: string[]
  tags?: string[]
}

export interface DBBuild extends Build {
  createdByDisplayName: string
  reported: boolean
  upvoted: boolean
  totalUpvotes: number
}
