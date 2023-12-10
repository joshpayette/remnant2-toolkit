'use client'

import { cn } from '@/lib/utils'
import { type Item, ItemCategory } from '@/types'
import Dialog from '@/components/Dialog'
import Image from 'next/image'
import BuildButton from './BuildButton'

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
  onSelectItem: (item: Item) => void
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
        {itemList.map((item) => (
          <li key={item.name} className="mr-2 min-h-[70px] w-[90px]">
            <BuildButton
              onClick={() => onSelectItem(item)}
              itemName={item.name}
              showLabels={true}
              size="lg"
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
                width={64}
                height={64}
                alt={item.name}
              />
            </BuildButton>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
