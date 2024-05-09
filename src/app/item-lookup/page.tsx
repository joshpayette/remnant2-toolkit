'use client'

import { Suspense } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button'
import { ItemLookupFilters } from '@/app/(components)/filters/item-lookup/item-lookup-filters'
import { allItems } from '@/app/(data)/items/all-items'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import {
  DEFAULT_ITEM_COMPARE_LIST,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { ItemCompareList } from '@/app/item-lookup/item-compare'
import { ItemList } from '@/app/item-lookup/item-list'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { PageHeader } from '@/features/ui/PageHeader'
import { Skeleton } from '@/features/ui/Skeleton'

const csvItems = allItems
  // Modify the data for use. Adds a discovered flag,
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
  const [itemsToCompare, setItemsToCompare] = useLocalStorage<string[]>(
    LOCALSTORAGE_KEY.ITEM_COMPARE,
    DEFAULT_ITEM_COMPARE_LIST,
    { initializeWithValue: false },
  )
  const areAnyItemsBeingCompared = itemsToCompare.some(
    (itemId) => itemId !== '',
  )

  return (
    <>
      <div className="flex w-full items-start justify-start sm:items-center sm:justify-center">
        <PageHeader
          title="Remnant 2 Item Lookup"
          subtitle="Find extended item information and interactions."
        />
      </div>
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center">
          <div className="w-full max-w-4xl">
            <Suspense fallback={<Skeleton className="h-[497px] w-full" />}>
              <ItemLookupFilters />
            </Suspense>
          </div>

          {areAnyItemsBeingCompared ? (
            <div className="mt-2 flex w-full items-center justify-center">
              <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
                <ItemCompareList />
              </Suspense>
            </div>
          ) : null}

          <div className="mt-2 flex w-full items-center justify-center">
            <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
              <ItemList />
            </Suspense>
          </div>

          <div className="mt-6 flex w-full flex-col items-center justify-center">
            <div className="max-w-[200px]">
              <hr className="mb-4 w-full border-t border-primary" />
              <ToCsvButton
                data={csvItems}
                filename="remnant2toolkit_iteminfo"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
