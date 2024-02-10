'use client'

import ToCsvButton from '@/features/csv/ToCsvButton'
import PageHeader from '@/features/ui/PageHeader'
import { remnantItems } from '@/features/items/data/remnantItems'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import MasonryItemList from '@/features/items/components/MasonryItemList'
import ItemLookupFilters, {
  DEFAULT_ITEM_LOOKUP_FILTERS,
} from '@/features/filters/components/ItemLookupFilters'
import { useMemo, useState } from 'react'
import { ItemLookupFilterFields } from '@/features/filters/types'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { ItemCategory } from '@/features/build/types'
import { ReleaseKey } from '@/features/items/types'
import { itemMatchesSearchText } from '@/features/items/lib/itemMatchesSearchText'

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

export default function Page() {
  const [filters, setFilters] = useState<ItemLookupFilterFields>(
    DEFAULT_ITEM_LOOKUP_FILTERS,
  )

  const { discoveredItemIds } = useLocalStorage()

  const filteredItems = useMemo(() => {
    let filteredItems = allItems.map((item) => ({
      ...item,
      discovered: discoveredItemIds.includes(item.id),
    }))

    // Filter by search text
    filteredItems = filteredItems.filter((item) =>
      itemMatchesSearchText({ item, searchText: filters.searchText }),
    )

    // Filter out the collections
    filteredItems = filteredItems.filter((item) => {
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
    filteredItems = filteredItems.filter((item) => {
      if (item.dlc === undefined) {
        return filters.selectedReleases.includes('base')
      }

      return filters.selectedReleases.includes(item.dlc as ReleaseKey)
    })

    // Filter out the categories
    filteredItems = filteredItems.filter((item) => {
      if (item.category === undefined) {
        return true
      }

      return filters.itemCategories.includes(item.category as ItemCategory)
    })

    return filteredItems
  }, [filters, discoveredItemIds])

  function handleUpdateFilters(newFilters: ItemLookupFilterFields) {
    setFilters(newFilters)
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <PageHeader
        title="Remnant 2 Item Lookup"
        subtitle="Look up info on all the items in Remnant 2"
      >
        <div className="mb-4 flex items-center justify-center">
          <ToCsvButton data={csvItems} filename="remnant2toolkit_iteminfo" />
        </div>
      </PageHeader>

      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-4xl">
          <ItemLookupFilters onUpdateFilters={handleUpdateFilters} />
        </div>

        <MasonryItemList key={new Date().getTime()} items={filteredItems} />
      </div>
    </div>
  )
}
