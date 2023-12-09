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
        className="flex flex-wrap items-center justify-start gap-2"
      >
        {itemList.map((item) => (
          <li key={item.name}>
            <div className={cn('group overflow-hidden bg-black')}>
              <button
                className={`h-[64px] w-[64px] bg-[url('https://${process.env.NEXT_PUBLIC_IMAGE_URL}/card-body-bg.jpg')] relative h-full w-full rounded-md border-2 border-transparent bg-black hover:border-purple-500`}
                onClick={() => onSelectItem(item)}
              >
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
                  width={64}
                  height={64}
                  alt={item.name}
                  className=""
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
