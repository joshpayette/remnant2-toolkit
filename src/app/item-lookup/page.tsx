'use client'

import { useSearchParams } from 'next/navigation'

import { ItemLookupFilters } from '@/app/item-lookup/ItemLookupFilters'
import { ToCsvButton } from '@/features/csv/ToCsvButton'
import { parseItemLookupFilters } from '@/features/filters/lib/parseItemLookupFilters'
import { ItemLookupFilterFields } from '@/features/filters/types'
import { MasonryItemList } from '@/features/items/components/MasonryItemList'
import { remnantItems } from '@/features/items/data/remnantItems'
import { itemMatchesSearchText } from '@/features/items/lib/itemMatchesSearchText'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { ReleaseKey } from '@/features/items/types'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { PageHeader } from '@/features/ui/PageHeader'
import { capitalize } from '@/lib/capitalize'

const csvItems = remnantItems // Modify the data for use. Adds a discovered flag,
  // modifies the description for mutators
  .map((item) => {
    let csvItem = itemToCsvItem(item)

    // For mutators, we need to combine the description
    // and the max level bonus
    if (MutatorItem.isMutatorItem(item)) {
      const description = item.description
      const maxLevelBonus = item.maxLevelBonus
      csvItem = itemToCsvItem({
        ...item,
        description: `${description}. At Max Level: ${maxLevelBonus}`,
      })
    }

    return csvItem
  })
  // sort items by category then name alphabetically
  .sort((a, b) => {
    if (a.category < b.category) return -1
    if (a.category > b.category) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

const allItems = remnantItems.map((item) => ({
  ...item,
  discovered: false,
}))

function getFilteredItems(
  filters: ItemLookupFilterFields,
  discoveredItemIds: string[],
) {
  let newFilteredItems = allItems.map((item) => ({
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

export default function Page() {
  const { discoveredItemIds } = useLocalStorage()

  const searchParams = useSearchParams()
  const filters = parseItemLookupFilters(searchParams)

  const filteredItems = getFilteredItems(filters, discoveredItemIds)

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <PageHeader
        title="Remnant 2 Item Lookup"
        subtitle="Find extended item information and interactions."
      >
        <div className="mb-4 flex items-center justify-center">
          <ToCsvButton data={csvItems} filename="remnant2toolkit_iteminfo" />
        </div>
      </PageHeader>

      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-4xl">
          <ItemLookupFilters filters={filters} />
        </div>

        <MasonryItemList key={filteredItems.length} items={filteredItems} />
      </div>
    </div>
  )
}
