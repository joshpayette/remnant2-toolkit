import { DefaultFilter } from '@/app/(components)/filters/types'

export interface ItemTrackerFilters {
  categories: string[] | [DefaultFilter]
  collections: string[] | [DefaultFilter]
  releases: string[] | [DefaultFilter]
  searchText: string | ''
}

export const ITEM_TRACKER_KEYS = {
  CATEGORIES: 'categories',
  COLLECTIONS: 'collections',
  RELEASES: 'releases',
  SEARCHTEXT: 'searchText',
} as const satisfies Record<string, keyof ItemTrackerFilters>
