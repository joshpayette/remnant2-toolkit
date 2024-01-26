'use client'

import Dialog from '@/features/ui/Dialog'
import BuilderButton from './BuilderButton'
import { useDebounce, useIsClient } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import SearchInput from '@/features/ui/SearchInput'
import { GenericItem } from '@/features/items/types/GenericItem'
import ItemInfo from '@/features/items/components/ItemInfo'

export default function ItemSelect({
  itemList,
  buildSlot,
  open,
  onClose,
  onSelectItem,
}: {
  itemList: GenericItem[]
  buildSlot: GenericItem['category'] | null
  open: boolean
  onClose: () => void
  onSelectItem: (item: GenericItem | null) => void
}) {
  const isClient = useIsClient()

  const [infoItem, setInfoItem] = useState<GenericItem | null>(null)

  const [filter, setFilter] = useState('')
  const [filteredItemList, setFilteredItemList] = useState(itemList)
  const debouncedFilter = useDebounce(filter, 500)

  useEffect(() => {
    const filteredItems = itemList.filter((item) =>
      item.name.toLowerCase().includes(debouncedFilter.toLowerCase()),
    )
    setFilteredItemList(filteredItems)
  }, [debouncedFilter, itemList])

  // Reset filter when dialog is opened/closed
  useEffect(() => {
    setFilter('')
  }, [open])

  if (!buildSlot) return null

  if (!isClient) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Select ${buildSlot}`}
      maxWidthClass="max-w-6xl"
      zIndex="z-20"
    >
      <ItemInfo
        item={infoItem}
        open={Boolean(infoItem)}
        onClose={() => setInfoItem(null)}
      />
      <div className="mb-4 flex w-full items-end justify-end">
        <SearchInput
          onChange={(newValue: string) => setFilter(newValue)}
          value={filter}
        />
      </div>
      <ul
        role="list"
        className="flex flex-wrap items-start justify-center gap-4"
      >
        {buildSlot !== 'trait' && (
          <li id="clear-item" className="min-h-[70px] w-[100px]">
            <BuilderButton
              item={{
                name: 'Clear',
                category: buildSlot,
                imagePath: '/cancel-icon.png',
                id: '',
              }}
              size="lg"
              onClick={() => onSelectItem(null)}
            />
          </li>
        )}
        {filteredItemList.map((item) => (
          <li key={item.name} className="min-h-[70px] w-[100px]">
            <BuilderButton
              item={item}
              size="lg"
              onClick={() => onSelectItem(item)}
              onItemInfoClick={() => setInfoItem(item)}
            />
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
