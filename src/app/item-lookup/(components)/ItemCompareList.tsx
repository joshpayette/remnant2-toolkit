import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { ItemCard } from '@/features/items/components/ItemCard'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { allItems } from '@/features/items/data/allItems'
import { Item } from '@/features/items/types'
import { cn } from '@/lib/classnames'

interface Props {}

export function ItemCompareList({}: Props) {
  const [itemsToCompare, setItemsToCompare] = useLocalStorage<string[]>(
    'item-lookup-compare',
    getArrayOfLength(5).map(() => ''),
    { initializeWithValue: false },
  )

  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const infoOpen = selectedItem !== null

  function handleMoreInfoClick(item: Item) {
    setSelectedItem(item)
  }

  return (
    <>
      <ItemInfoDialog
        item={selectedItem}
        open={infoOpen}
        onClose={() => setSelectedItem(null)}
      />
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
    </>
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
