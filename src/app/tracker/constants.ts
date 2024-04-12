import { allItems } from '@/app/(data)/items/allItems'
import { ItemCategory } from '@/features/build/types'
import { Item } from '@/features/items/types'

/** We don't track these categories at all */
export const skippedItemCategories: Array<ItemCategory> = ['skill', 'perk']

/** All items that are trackable. */
export const allTrackerItems = allItems
  // We don't want to show the items that are in the skippedItemCategories
  .filter((item) => skippedItemCategories.includes(item.category) === false)
  // Remove mods that have linked guns
  .filter((item) => {
    if (item.category !== 'mod') return true
    return item.linkedItems?.weapon === undefined
  })
  .map((item) => ({
    ...item,
    discovered: false,
  })) satisfies Item[]

export const TOTAL_TRACKABLE_ITEM_COUNT = allTrackerItems.length
