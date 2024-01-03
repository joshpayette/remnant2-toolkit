'use client'

import { remnantItems } from '@/app/(data)'
import { useCallback, useMemo, useState } from 'react'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import PageHeader from '@/app/(components)/PageHeader'
import ItemInfo from '@/app/(components)/ItemInfo'
import { itemToCsvItem } from '@/app/(lib)/utils'
import ItemCard from '../tracker/(components)/ItemCard'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { MutatorItem } from '../(types)/items/MutatorItem'
import { GenericItem } from '../(types)/items/GenericItem'
import Filters from '../(components)/Filters'
import useFilteredItems from '../(hooks)/useFilteredItems'
import PageActions from '../(components)/PageActions'
import BackToTopButton from '../(components)/BackToTopButton'

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
  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<GenericItem | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const { filteredItems, handleUpdateFilters } = useFilteredItems(allItems)

  const handleShowItemInfo = (itemId: string) => {
    const item = remnantItems.find((item) => item.id === itemId)
    if (item) setItemInfo(item)
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <PageActions>
        <Filters allItems={allItems} onUpdate={handleUpdateFilters} />
        <BackToTopButton />
      </PageActions>
      <ItemInfo
        item={itemInfo}
        open={isShowItemInfoOpen}
        onClose={() => setItemInfo(null)}
      />
      <PageHeader
        title="Remnant 2 Item Lookup"
        subtitle="Look up info on all the items in Remnant 2"
      />
      <div className="w-full">
        <div className="flex items-center justify-end">
          <ToCsvButton data={csvItems} filename="remnant2toolkit_iteminfo" />
        </div>
        <div className="grid w-full grid-cols-2 gap-4 py-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <ItemCard item={item} />
              <div className="flex items-end justify-end bg-black">
                <button
                  className="flex w-auto items-center gap-1 rounded-md px-2 py-1 text-xs text-green-500 hover:bg-green-500 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
                  onClick={() => handleShowItemInfo(item.id)}
                >
                  <InformationCircleIcon className="h-5 w-5" /> Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
