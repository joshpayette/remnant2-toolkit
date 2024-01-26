'use client'

import ToCsvButton from '@/features/csv/components/ToCsvButton'
import PageHeader from '@/features/ui/PageHeader'
import { remnantItems } from '@/features/items/data'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import useFilteredItems from '@/features/items/hooks/useFilteredItems'
import MasonryItemList from '@/features/items/components/MasonryItemList'
import Filters from '@/features/items/item-lookup/components/Filters'

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
  const { filteredItems, handleUpdateFilters } = useFilteredItems(allItems)

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
        <div className="max-w-3xl">
          <Filters allItems={allItems} onUpdate={handleUpdateFilters} />
        </div>

        <MasonryItemList key={new Date().getTime()} items={filteredItems} />
      </div>
    </div>
  )
}
