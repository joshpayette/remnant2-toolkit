'use client'

import { cn, loadoutItemTypeToItemType } from '@/lib/utils'
import type { Item, LoadoutItemType, LoadoutItem } from '@/types'
import ItemCardButton from '../../components/ItemCardButton'
import Dialog from '@/components/Dialog'

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
    <Dialog open={open} onClose={onClose} title={`Select ${itemType}`}>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
      >
        {itemList.map((item) => (
          <li key={item.name}>
            <div
              className={cn(
                'group flex items-center justify-center overflow-hidden bg-black',
              )}
            >
              <ItemCardButton
                item={{
                  ...item,
                  type: itemType,
                }}
                onClick={() =>
                  onSelectItem({
                    ...item,
                    type: loadoutSlot,
                  })
                }
                size="sm"
              />
            </div>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
