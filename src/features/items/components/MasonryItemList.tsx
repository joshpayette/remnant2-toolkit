'use client'

import { Masonry } from 'masonic'
import { useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { ItemCard } from '@/app/(components)/cards/item-card'
import { ItemInfoDialog } from '@/app/(components)/dialogs/item-info-dialog'
import { Item } from '@/app/(data)/items/types'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { Skeleton } from '@/features/ui/Skeleton'

interface Props {
  allowItemCompare?: boolean
  label?: string
  items: Item[]
}

export function MasonryItemList({
  allowItemCompare = false,
  items,
  label,
}: Props) {
  const isClient = useIsClient()
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const infoOpen = selectedItem !== null

  function handleMoreInfoClick(item: Item) {
    setSelectedItem(item)
  }

  if (!isClient) return <Loading />
  if (items.length === 0) return null

  return (
    <>
      <ItemInfoDialog
        item={selectedItem}
        open={infoOpen}
        onClose={() => setSelectedItem(null)}
      />
      <div className="flex w-full flex-col items-center justify-center overflow-auto p-4">
        {label && (
          <h3 className="mb-4 text-2xl font-bold text-primary">{label}</h3>
        )}

        <Masonry
          items={items}
          render={({ index, data, width }) => (
            <ItemCard
              index={index}
              allowItemCompare={allowItemCompare}
              data={data}
              width={width}
              onMoreInfoClick={handleMoreInfoClick}
            />
          )}
          columnGutter={8}
          rowGutter={8}
        />
      </div>
    </>
  )
}

function Loading() {
  return (
    <div className="flex h-[500px] w-full flex-row flex-wrap items-center justify-center gap-4 p-4 sm:h-[1000px]">
      {getArrayOfLength(12).map((_, i) => (
        <Skeleton key={i} className="h-[300px] w-[250px]" />
      ))}
    </div>
  )
}
