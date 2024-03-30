import { itemCategories } from '@/features/items/lib/getItemCategories'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { Item } from '@/features/items/types'
import { TraitItem } from '@/features/items/types/TraitItem'

import { BuildState } from '../types'

/**
 * Converts the build state into a CSV file
 */
export function buildStateToCsvData(buildState: BuildState) {
  return itemCategories
    .map((category) => {
      const itemOrItems = buildState.items[category]

      const emptyItem = {
        name: '',
        category,
        description: '',
        wikiLinks: '',
      }

      if (!itemOrItems) return emptyItem

      if (Array.isArray(itemOrItems)) {
        // If the category is a trait, we need to add the trait amount to the name
        if (category === 'trait') {
          return itemOrItems.map((item) => {
            if (!item) return emptyItem
            if (!TraitItem.isTraitItem(item)) return itemToCsvItem(item)
            const { name, ...csvItem } = itemToCsvItem(item)
            return {
              name: `${name} - ${item.amount}`,
              ...csvItem,
            }
          })
        }

        return itemOrItems
          .filter((item) => item !== null)
          .map((item) => itemToCsvItem(item as Item))
      }

      if (itemOrItems.category === 'trait') {
        if (!Array.isArray(itemOrItems)) {
          return {
            name: '',
            category,
            description: '',
            wikiLinks: '',
          }
        }
        return itemOrItems.map((item) => itemToCsvItem(item.item))
      }
    })
    .flat()
    .filter((item) => item !== undefined)
}
