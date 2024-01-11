'use client'

import { remnantItems } from '@/app/(data)'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import PageHeader from '@/app/(components)/PageHeader'
import { itemToCsvItem } from '@/app/(lib)/utils'
import { MutatorItem } from '../(types)/items/MutatorItem'
import useFilteredItems from '../(hooks)/useFilteredItems'
import MasonryItemList from '../(components)/MasonryItemList'
import Filters from '../(components)/Filters'

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
