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
