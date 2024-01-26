'use client'

import Dialog from '@/features/ui/Dialog'
import BuilderButton from './BuilderButton'
import { useDebounce, useIsClient } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import SearchInput from '@/features/ui/SearchInput'
import { GenericItem } from '@/features/items/types/GenericItem'
import ItemInfo from '@/features/items/components/ItemInfo'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { cn } from '@/lib/classnames'

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
  const [sortingMethod, setSortingMethod] = useState<
    'alphabetical' | 'in-game'
  >('alphabetical')

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

  function toggleSortingMethod() {
    const newSortingMethod =
      sortingMethod === 'alphabetical' ? 'in-game' : 'alphabetical'

    if (buildSlot !== 'trait') return

    if (newSortingMethod === 'alphabetical') {
      setFilteredItemList((prev) =>
        [...prev].sort((a, b) => a.name.localeCompare(b.name)),
      )
    } else {
      const archtypeTraits = filteredItemList
        .filter((item) => item.linkedItems?.archtype)
        .sort((a, b) => a.name.localeCompare(b.name))

      const nonArchtypeTraits = filteredItemList
        .filter((item) => !item.linkedItems?.archtype)
        .sort((a, b) => a.name.localeCompare(b.name))

      setFilteredItemList([...archtypeTraits, ...nonArchtypeTraits])
    }

    setSortingMethod(newSortingMethod)
  }

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
      <div className="flex w-full items-center justify-center">
        <div className="mb-4 grid w-full max-w-lg grid-cols-3 gap-x-4">
          <div
            className={cn(
              buildSlot === 'trait' ? 'col-span-2' : 'col-span-full',
            )}
          >
            <SearchInput
              onChange={(newValue: string) => setFilter(newValue)}
              value={filter}
            />
          </div>
          {buildSlot === 'trait' && (
            <div className="col-span-1 flex items-center justify-start">
              <button
                className="flex items-center justify-center text-sm text-gray-400 hover:text-green-500"
                onClick={toggleSortingMethod}
              >
                <AdjustmentsHorizontalIcon className="mr-2 h-6 w-6" />
                {sortingMethod === 'alphabetical'
                  ? 'Alphabetical'
                  : 'In-Game Ordering'}
              </button>
            </div>
          )}
        </div>
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
