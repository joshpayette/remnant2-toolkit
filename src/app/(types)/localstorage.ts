import { BossCategory } from '@/app/(data)/enemies/types'
import { ItemTrackerCategory } from '@/app/tracker/types'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'

export const LOCALSTORAGE_KEY = {
  BOSS_TRACKER: 'boss-tracker',
  ITEM_COMPARE: 'item-lookup-compare',
  ITEM_TRACKER: 'item-tracker',
  SORT_PREFERENCE: 'sorting-preference',
}

export interface BossTrackerLocalStorage {
  discoveredBossIds: string[]
  collapsedBossCategories: Array<BossCategory>
}

export interface ItemTrackerLocalStorage {
  discoveredItemIds: string[]
  collapsedCategories: Array<ItemTrackerCategory>
}

export const DEFAULT_ITEM_COMPARE_LIST = getArrayOfLength(5).map(() => '')

export const SORTING_PREFERENCES = ['alphabetical', 'in-game']
export type SortingPreference = (typeof SORTING_PREFERENCES)[number]
