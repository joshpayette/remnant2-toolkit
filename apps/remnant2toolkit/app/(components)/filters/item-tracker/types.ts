import { DefaultFilter } from '@/app/(components)/filters/types'

export interface ItemTrackerFilters {
  categories: string[] | [DefaultFilter]
  collections: string[] | [DefaultFilter]
  releases: string[] | [DefaultFilter]
  searchText: string | ''
  world: string | DefaultFilter
  dungeon: string | DefaultFilter
}

export const ITEM_TRACKER_KEYS = {
  CATEGORIES: 'categories',
  COLLECTIONS: 'collections',
  RELEASES: 'releases',
  SEARCHTEXT: 'searchText',
  WORLD: 'world',
  DUNGEON: 'dungeon',
} as const satisfies Record<string, keyof ItemTrackerFilters>
