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

  const filteredItems = useMemo(() => {
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(filters.searchText.toLowerCase()),
        ),
    )
  }, [filters])

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
        <div className="w-full max-w-3xl">
          <ItemLookupFilters onUpdateFilters={handleUpdateFilters} />
        </div>

        <MasonryItemList key={new Date().getTime()} items={filteredItems} />
      </div>
    </div>
  )
}
