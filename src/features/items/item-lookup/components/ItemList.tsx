import { useSearchParams } from 'next/navigation'
import { useIsClient, useLocalStorage } from 'usehooks-ts'

import { MasonryItemList } from '@/features/items/components/MasonryItemList'
import { allItems } from '@/features/items/data/allItems'
import { parseItemLookupFilters } from '@/features/items/item-lookup/lib/parseItemLookupFilters'
import { itemMatchesSearchText } from '@/features/items/lib/itemMatchesSearchText'
import { ItemLookupFilterFields, ReleaseKey } from '@/features/items/types'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { capitalize } from '@/lib/capitalize'

import { LocalStorage } from '../../item-tracker/types'

const allItemsWithDiscovered = allItems.map((item) => ({
  ...item,
  discovered: false,
}))

function getFilteredItems(
  filters: ItemLookupFilterFields,
  discoveredItemIds: string[],
) {
  let newFilteredItems = allItemsWithDiscovered.map((item) => ({
    ...item,
    discovered: discoveredItemIds.includes(item.id),
  }))

  // Filter out the collections
  newFilteredItems = newFilteredItems.filter((item) => {
    if (
      filters.collectionKeys.includes('Discovered') &&
      filters.collectionKeys.includes('Undiscovered')
    ) {
      return true
    } else if (filters.collectionKeys.includes('Undiscovered')) {
      return item.discovered === false
    } else if (filters.collectionKeys.includes('Discovered')) {
      return item.discovered === true
    } else {
      return false
    }
  })

  // Filter out the DLCs
  newFilteredItems = newFilteredItems.filter((item) => {
    if (item.dlc === undefined) {
      return filters.selectedReleases.includes('base')
    }

    return filters.selectedReleases.includes(item.dlc as ReleaseKey)
  })

  // Filter out the categories
  newFilteredItems = newFilteredItems.filter((item) => {
    if (item.category === undefined) {
      return true
    }

    return filters.itemCategories.some((itemCategory) => {
      if (itemCategory === 'Long Gun' && WeaponItem.isWeaponItem(item)) {
        return item.category === 'weapon' && item.type === 'long gun'
      }
      if (itemCategory === 'Hand Gun' && WeaponItem.isWeaponItem(item)) {
        return item.category === 'weapon' && item.type === 'hand gun'
      }
      if (itemCategory === 'Melee' && WeaponItem.isWeaponItem(item)) {
        return item.category === 'weapon' && item.type === 'melee'
      }
      if (itemCategory === 'Mutator (Gun)' && MutatorItem.isMutatorItem(item)) {
        return item.category === 'mutator' && item.type === 'gun'
      }
      if (
        itemCategory === 'Mutator (Melee)' &&
        MutatorItem.isMutatorItem(item)
      ) {
        return item.category === 'mutator' && item.type === 'melee'
      }
      return capitalize(item.category) === itemCategory
    })
  })

  // Sort alphabetically by item.category and item.name
  newFilteredItems = newFilteredItems.sort((a, b) => {
    if (a.category < b.category) return -1
    if (a.category > b.category) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  // Filter by search text
  newFilteredItems = newFilteredItems.filter((item) =>
    itemMatchesSearchText({ item, searchText: filters.searchText }),
  )

  return newFilteredItems
}

export function ItemList() {
  const [tracker] = useLocalStorage<LocalStorage>(
    'item-tracker',
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { discoveredItemIds } = tracker

  const isClient = useIsClient()

  const searchParams = useSearchParams()
  const filters = parseItemLookupFilters(searchParams)
  const filteredItems = getFilteredItems(filters, discoveredItemIds)

  return filteredItems.length === allItems.length || !isClient ? (
    <h2 className="text-center text-4xl font-bold text-primary-500">
      Apply a filter to see items
    </h2>
  ) : (
    <MasonryItemList
      key={filteredItems.length}
      label={`Items (${filteredItems.length} Total)`}
      items={filteredItems}
    />
  )
}
