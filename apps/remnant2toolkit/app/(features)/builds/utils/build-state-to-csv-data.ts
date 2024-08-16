import { Item } from '@/app/(data)/items/types'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { BuildState } from '@/app/(types)/builds'
import { itemCategories } from '@/app/(utils)/items/get-item-categories'
import { itemToCsvItem } from '@/app/(utils)/items/item-to-csv-item'

/**
 * Converts the build state into a CSV file
 */
export function buildStateToCsvData(buildState: BuildState) {
  return itemCategories
    .map((category) => {
      const itemOrItems = buildState.items[category]

      const emptyItem = {
        id: '',
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
            if (!item || !item.id) return emptyItem
            if (!TraitItem.isTraitItem(item)) return itemToCsvItem(item)
            const { name, ...csvItem } = itemToCsvItem(item)
            return {
              name: `${name} - ${item.amount}`,
              ...csvItem,
            }
          })
        }

        return itemOrItems
          .filter((item) => item !== null && item?.id)
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
