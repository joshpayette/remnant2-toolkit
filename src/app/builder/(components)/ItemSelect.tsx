'use client'

import { type Item, ItemCategory } from '@/types'
import Dialog from '@/app/(components)/Dialog'
import ImageBuilderButton from './ImageBuilderButton'
import { useIsClient } from 'usehooks-ts'
import { useState } from 'react'

export default function ItemSelect({
  itemList,
  buildSlot,
  open,
  onClose,
  onSelectItem,
}: {
  itemList: Item[]
  buildSlot: ItemCategory | null
  open: boolean
  onClose: () => void
  onSelectItem: (item: Item | null) => void
}) {
  const isClient = useIsClient()

  const [filter, setFilter] = useState('')
  const filteredItemList = itemList.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()),
  )

  if (!buildSlot) {
    return null
  }

  if (!isClient) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Select ${buildSlot}`}
      maxWidthClass="max-w-6xl"
    >
      <div className="mb-4 flex w-full items-end justify-end">
        <input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          className=" text-md rounded border border-green-500 bg-black p-2 text-white outline-none outline-offset-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search"
          value={filter}
        />
      </div>
      <ul
        role="list"
        className="flex flex-wrap items-start justify-center gap-4"
      >
        {buildSlot !== 'trait' && (
          <li id="clear-item" className="mr-2 min-h-[70px] w-[90px]">
            <ImageBuilderButton
              item={{
                name: 'Clear',
                category: buildSlot,
                imagePath: '/cancel-icon.png',
                id: '',
              }}
              showLabels={true}
              size="lg"
              onClick={() => onSelectItem(null)}
            />
          </li>
        )}
        {filteredItemList.map((item) => (
          <li key={item.name} className="mr-2 min-h-[70px] w-[90px]">
            <ImageBuilderButton
              item={item}
              showLabels={true}
              size="lg"
              onClick={() => onSelectItem(item)}
            />
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
