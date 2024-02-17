'use client'

import { Masonry } from 'masonic'
import { Suspense, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { Skeleton } from '@/features/ui/Skeleton'

import { Item } from '../types'
import { ItemInfoDialog } from './ItemInfoDialog'
import { MasonryCard } from './MasonryCard'

type Props = {
  label?: string
  items: Item[]
}

export function MasonryItemList({ items, label = 'Items' }: Props) {
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
      <Suspense fallback={<Loading />}>
        <div className="flex w-full flex-col items-center justify-center overflow-auto p-4">
          <h2 className="my-4 text-4xl font-bold text-green-500">{label}</h2>

          <Masonry
            key={new Date().getTime()}
            items={items}
            render={({ index, data, width }) => (
              <MasonryCard
                index={index}
                data={data}
                width={width}
                onMoreInfoClick={handleMoreInfoClick}
              />
            )}
            columnGutter={8}
            rowGutter={8}
          />
        </div>
      </Suspense>
    </>
  )
}

function Loading() {
  return (
    <div className="flex h-[500px] w-full flex-row flex-wrap items-center justify-center gap-4 overflow-auto p-4 sm:h-[1000px]">
      {getArrayOfLength(10).map((_, i) => (
        <Skeleton key={i} className="h-[350px] w-[250px]" />
      ))}
    </div>
  )
}
