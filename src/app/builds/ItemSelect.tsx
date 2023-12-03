'use client'

import { cn, loadoutItemTypeToItemType } from '@/lib/utils'
import type { Item, LoadoutItemType, LoadoutItem } from '@/types'
import ItemCard from '../../components/ItemCard'
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
                size="sm"
                actions={
                  <div className="flex w-full items-center justify-end">
                    <button
                      onClick={() =>
                        onSelectItem({
                          ...item,
                          type: loadoutSlot,
                        })
                      }
                      className="text-green-400 hover:text-green-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
