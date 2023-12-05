'use client'

import { cn, loadoutItemTypeToItemType } from '@/lib/utils'
import type { Item, LoadoutItemType, LoadoutItem } from '@/types'
import ItemCard from '../../components/ItemCard'
import Dialog from '@/components/Dialog'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

interface ItemSelectProps {
  itemList: Item[]
  loadoutSlot: LoadoutItemType | null
  open: boolean
  onClose: () => void
  onSelectItem: (item: LoadoutItem) => void
}

export default function ItemSelect({
  itemList,
  loadoutSlot,
  open,
  onClose,
  onSelectItem,
}: ItemSelectProps) {
  if (!loadoutSlot) {
    return null
  }

  const itemType = loadoutItemTypeToItemType(loadoutSlot)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Select ${itemType}`}
      maxWidthClass="max-w-6xl"
    >
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {itemList.map((item) => (
          <li key={item.name}>
            <div
              className={cn(
                'group flex items-center justify-center overflow-hidden bg-black',
              )}
            >
              <ItemCard
                item={{
                  ...item,
                  type: itemType,
                }}
                size="md"
                onClick={() =>
                  onSelectItem({
                    ...item,
                    type: loadoutSlot,
                  })
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
