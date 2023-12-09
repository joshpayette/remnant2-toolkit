'use client'

import { cn } from '@/lib/utils'
import { type Item, ItemCategory } from '@/types'
import Dialog from '@/components/Dialog'
import Image from 'next/image'

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
        className="flex flex-wrap items-stretch justify-start gap-2"
      >
        {itemList.map((item) => (
          <li key={item.name} className="mb-4 min-h-[70px] w-[70px]">
            <button
              className={cn(
                'flex h-full w-full flex-1 flex-col items-start justify-center gap-2 border-2 border-transparent bg-black hover:border-purple-500',
                `bg-[url('https://${process.env.NEXT_PUBLIC_IMAGE_URL}/card-body-bg.jpg')]`,
              )}
              onClick={() => onSelectItem(item)}
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
                width={64}
                height={64}
                alt={item.name}
              />
              <div className="flex h-full w-full items-center justify-center bg-purple-950 p-1 text-[10px] text-white">
                {item.name}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
