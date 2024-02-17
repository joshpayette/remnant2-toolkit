'use client'

import { Masonry, useInfiniteLoader } from 'masonic'
import { Suspense, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { Skeleton } from '@/features/ui/Skeleton'

import { Item } from '../types'
import { ItemInfoDialog } from './ItemInfoDialog'
import { MasonryCard } from './MasonryCard'

const MINIMUM_BATCH_SIZE = 10

type Props = {
  label?: string
  items: Item[]
  infiniteScroll?: boolean
}

export function MasonryItemList({
  items,
  label = 'Items',
  infiniteScroll = true,
}: Props) {
  const isClient = useIsClient()
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const infoOpen = selectedItem !== null

  function getBatchOfItems(
    start: number = 0,
    end: number = MINIMUM_BATCH_SIZE,
  ) {
    return items.slice(start, end)
  }

  const [visibleItems, setVisibleItems] = useState<Item[]>(getBatchOfItems)

  const maybeLoadMore = useInfiniteLoader(
    async (startIndex, stopIndex, currentItems) => {
      const nextItems = await Promise.resolve(
        getBatchOfItems(startIndex, stopIndex),
      )
      setVisibleItems((current) => [...current, ...nextItems])
    },
    {
      isItemLoaded: (index, visibleItems) => !!visibleItems[index],
      minimumBatchSize: MINIMUM_BATCH_SIZE,
      threshold: 3,
    },
  )

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
            items={infiniteScroll ? visibleItems : items}
            onRender={infiniteScroll ? maybeLoadMore : undefined}
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
            overscanBy={infiniteScroll ? 1.25 : undefined}
          />
        </div>
      </Suspense>
    </>
  )
}

function Loading() {
  return (
    <div className="flex h-[500px] w-full flex-row flex-wrap items-center justify-center gap-4 p-4 sm:h-[1000px]">
      {getArrayOfLength(10).map((_, i) => (
        <Skeleton key={i} className="h-[300px] w-[250px]" />
      ))}
    </div>
  )
}
