import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { ItemCard } from '@/app/(components)/cards/item-card'
import { ItemInfoDialog } from '@/app/(components)/dialogs/item-info-dialog'
import { allItems } from '@/app/(data)/items/all-items'
import { Item } from '@/app/(data)/items/types'
import {
  DEFAULT_ITEM_COMPARE_LIST,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { cn } from '@/lib/classnames'

interface Props {}

export function ItemCompareList({}: Props) {
  const [itemsToCompare, setItemsToCompare] = useLocalStorage<string[]>(
    LOCALSTORAGE_KEY.ITEM_COMPARE,
    DEFAULT_ITEM_COMPARE_LIST,
    { initializeWithValue: false },
  )

  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const infoOpen = selectedItem !== null

  function handleMoreInfoClick(item: Item) {
    setSelectedItem(item)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <ItemInfoDialog
        item={selectedItem}
        open={infoOpen}
        onClose={() => setSelectedItem(null)}
      />

      <h2 className="mt-4 text-center text-2xl font-bold text-primary">
        Item Comparison
      </h2>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {itemsToCompare.map((itemId, index) => {
          if (itemId === '') {
            return <EmptyItemCard key={index} />
          }

          const item = allItems.find((item) => item.id === itemId)
          if (!item) {
            return <EmptyItemCard key={index} />
          }
          return (
            <ItemCard
              key={index}
              data={item}
              onMoreInfoClick={handleMoreInfoClick}
              allowItemCompare={true}
            />
          )
        })}
      </div>
    </div>
  )
}

function EmptyItemCard() {
  return (
    <div
      className={cn(
        'col-span-1 flex h-full min-h-[300px] flex-col items-center justify-start rounded-lg border-4 border-dashed border-gray-500 bg-black text-center shadow',
      )}
    >
      <p className="mt-8 p-4 text-2xl font-semibold text-gray-700">
        No item to compare.
      </p>
    </div>
  )
}
