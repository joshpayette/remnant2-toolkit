'use client'

import { useState } from 'react'
import { Masonry } from 'masonic'
import { useIsClient } from 'usehooks-ts'
import { Item } from '../types'
import { ItemInfoDialog } from './ItemInfoDialog'
import { MasonryCard } from './MasonryCard'

type Props = {
  label?: string
  items: Item[]
}

export default function MasonryItemList({ items, label = 'Items' }: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const infoOpen = selectedItem !== null

  const isClient = useIsClient()

  function handleMoreInfoClick(item: Item) {
    setSelectedItem(item)
  }

  if (!isClient) return null

  return (
    <>
      <ItemInfoDialog
        item={selectedItem}
        open={infoOpen}
        onClose={() => setSelectedItem(null)}
      />
      {items.length > 0 && (
        <div className="flex w-full flex-col items-center justify-center p-4">
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
      )}
    </>
  )
}
