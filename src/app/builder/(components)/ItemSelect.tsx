'use client'

import Dialog from '@/app/(components)/Dialog'
import BuilderButton from './BuilderButton'
import { useDebounce, useIsClient } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import SearchInput from '@/app/(components)/SearchInput'
import { GenericItem } from '@/app/(types)/items/GenericItem'

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
    >
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
          <li id="clear-item" className="mr-2 min-h-[70px] w-[90px]">
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
          <li key={item.name} className="mr-2 min-h-[70px] w-[90px]">
            <BuilderButton
              item={item}
              size="lg"
              onClick={() => onSelectItem(item)}
            />
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
