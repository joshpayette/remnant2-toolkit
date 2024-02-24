'use client'

import { Suspense } from 'react'

import { ItemLookupFilters } from '@/app/item-lookup/ItemLookupFilters'
import { ToCsvButton } from '@/features/csv/ToCsvButton'
import { remnantItems } from '@/features/items/data/remnantItems'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { PageHeader } from '@/features/ui/PageHeader'
import { Skeleton } from '@/features/ui/Skeleton'

import { ItemList } from './ItemList'

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
export default function Page() {
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
          <Suspense fallback={<Skeleton className="h-[497px] w-full" />}>
            <ItemLookupFilters />
          </Suspense>
        </div>

        <div className="mt-12 flex w-full items-center justify-center">
          <Suspense fallback={<Skeleton className="h-[50px] w-full" />}>
            <ItemList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
