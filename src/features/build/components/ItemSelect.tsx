'use client'

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { SearchTextAutocomplete } from '@/features/filters/components/parts/SearchTextAutocomplete'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { DESCRIPTION_TAGS, ITEM_TAGS } from '@/features/items/constants'
import { itemMatchesSearchText } from '@/features/items/lib/itemMatchesSearchText'
import { Item } from '@/features/items/types'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { Dialog } from '@/features/ui/Dialog'
import { capitalize } from '@/lib/capitalize'
import { cn } from '@/lib/classnames'

import { ItemButton } from '../../items/components/ItemButton'
import { ItemCategory } from '../types'

function buildItemList(): Array<{ id: string; name: string }> {
  let items = DESCRIPTION_TAGS.map((tag) => ({
    id: tag.token as string,
    name: tag.type as string,
  }))

  items = ITEM_TAGS.map((tag) => ({
    id: tag as string,
    name: tag as string,
  })).concat(items)

  items = items.sort((a, b) => a.name.localeCompare(b.name))

  // remove duplicates
  items = items.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.name === item.name),
  )

  return items
}

function sortByPreference({
  items,
  buildSlot,
  sortingPreference,
}: {
  items: Item[]
  buildSlot: ItemCategory | null
  sortingPreference: 'alphabetical' | 'in-game'
}) {
  if (buildSlot !== 'trait') return items

  if (sortingPreference === 'alphabetical') {
    return [...items].sort((a, b) => a.name.localeCompare(b.name))
  } else {
    const archetypeTraits = items
      .filter((item) => item.linkedItems?.archetype)
      .sort((a, b) => a.name.localeCompare(b.name))

    const nonArchtypeTraits = items
      .filter((item) => !item.linkedItems?.archetype)
      .sort((a, b) => a.name.localeCompare(b.name))

    return [...archetypeTraits, ...nonArchtypeTraits]
  }
}

export function ItemSelect({
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
  const filterItems = buildItemList()

  const [infoItem, setInfoItem] = useState<Item | null>(null)

  const [filter, setFilter] = useState('')
  const { sortingPreference, setSortingPreference } = useLocalStorage()

  const [filteredItemList, setFilteredItemList] = useState(itemList)
  const [debouncedFilter, setDebouncedFilter] = useDebounceValue(filter, 500)

  useEffect(() => {
    const filteredItems = itemList.filter((item) =>
      itemMatchesSearchText({ item, searchText: debouncedFilter }),
    )

    const sortedItems =
      buildSlot === 'trait'
        ? sortByPreference({
            items: filteredItems,
            buildSlot,
            sortingPreference,
          })
        : filteredItems

    setFilteredItemList(sortedItems)
  }, [debouncedFilter, itemList, buildSlot, sortingPreference])

  // Reset filter when dialog is opened/closed
  useEffect(() => {
    setFilter('')
  }, [open])

  function handleSortingPreferenceToggle() {
    if (buildSlot !== 'trait') return

    const newSortingPreference =
      sortingPreference === 'alphabetical' ? 'in-game' : 'alphabetical'

    const sortedItems = sortByPreference({
      items: filteredItemList,
      buildSlot,
      sortingPreference: newSortingPreference,
    })

    setFilteredItemList(sortedItems)
    setSortingPreference(newSortingPreference)
  }

  if (!buildSlot) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Select ${
        buildSlot === 'relicfragment' ? 'Relic Fragment' : capitalize(buildSlot)
      }`}
      maxWidthClass="max-w-6xl"
      zIndex="z-20"
    >
      <ItemInfoDialog
        item={infoItem}
        open={Boolean(infoItem)}
        onClose={() => setInfoItem(null)}
      />
      <div className="flex w-full items-center justify-center">
        <div className="mb-4 grid w-full max-w-lg grid-cols-3 gap-x-4">
          <div
            className={cn(
              'text-left',
              buildSlot === 'trait' ? 'col-span-2' : 'col-span-full',
            )}
          >
            <SearchTextAutocomplete
              items={filterItems}
              onChange={(newValue: string) => setFilter(newValue)}
              value={filter}
            />
          </div>
          {buildSlot === 'trait' && (
            <div className="col-span-1 flex items-center justify-start">
              <button
                className="flex items-center justify-center text-sm text-gray-400 hover:text-green-500"
                onClick={handleSortingPreferenceToggle}
              >
                <AdjustmentsHorizontalIcon className="mr-2 h-6 w-6" />
                {capitalize(sortingPreference)}
              </button>
            </div>
          )}
        </div>
      </div>

      <hr className="mb-8 mt-4 border-green-500" />

      <ul
        role="list"
        className="flex flex-wrap items-start justify-center gap-4"
      >
        {buildSlot !== 'trait' && (
          <li id="clear-item" className="min-h-[70px] w-[100px]">
            <ItemButton
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
            <ItemButton
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
