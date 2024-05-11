import { allItems } from '@/app/(data)/items/all-items'
import { Item } from '@/app/(data)/items/types'
import { ItemCategory } from '@/app/(types)/builds'

/** We don't track these categories at all */
export const SKIPPED_ITEM_TRACKER_CATEGORIES: Array<ItemCategory> = [
  'skill',
  'perk',
]

/** All items that are trackable. */
export const ALL_TRACKABLE_ITEMS = allItems
  // We don't want to show the items that are in the skippedItemCategories
  .filter(
    (item) => SKIPPED_ITEM_TRACKER_CATEGORIES.includes(item.category) === false,
  )
  // Remove mods that have linked guns
  .filter((item) => {
    if (item.category !== 'mod') return true
    return item.linkedItems?.weapon === undefined
  })
  .map((item) => ({
    ...item,
    discovered: false,
  })) satisfies Item[]

export const TOTAL_TRACKABLE_ITEM_COUNT = ALL_TRACKABLE_ITEMS.length
