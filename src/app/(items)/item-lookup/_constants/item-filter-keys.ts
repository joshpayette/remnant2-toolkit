import { type ItemLookupFilters } from '@/app/(items)/item-lookup/_types/item-lookup-filters';

/** The keys used in the URL for the filters */
export const ITEM_FILTER_KEYS = {
  CATEGORIES: 'categories',
  COLLECTIONS: 'collections',
  RELEASES: 'releases',
  SEARCHTEXT: 'searchText',
  WORLD: 'world',
  DUNGEON: 'dungeon',
} as const satisfies Record<string, keyof ItemLookupFilters>;
