'use client'

import { type Item, ItemCategory } from '@/types'
import Dialog from '@/app/(components)/Dialog'
import ImageBuilderButton from './ImageBuilderButton'

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
  if (!buildSlot) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Select ${buildSlot}`}
      maxWidthClass="max-w-6xl"
    >
      <ul
        role="list"
        className="flex flex-wrap items-start justify-center gap-4"
      >
        <li id="clear-item" className="mr-2 min-h-[70px] w-[90px]">
          <ImageBuilderButton
            item={{
              name: 'Clear Slot',
              category: buildSlot,
              id: buildSlot,
              imagePath: '/cancel-icon.png',
            }}
            showLabels={true}
            size="lg"
            onClick={() => onSelectItem(null)}
          />
        </li>
        {itemList.map((item) => (
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
