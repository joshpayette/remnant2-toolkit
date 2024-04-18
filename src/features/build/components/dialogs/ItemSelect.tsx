'use client'

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { useCallback, useEffect, useState } from 'react'
import { useDebounceValue, useLocalStorage } from 'usehooks-ts'

import { BaseButton } from '@/app/(components)/_base/button'
import { ItemCategory } from '@/features/build/types'
import { ItemButton } from '@/features/items/components/ItemButton'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { ITEM_TAGS } from '@/features/items/constants'
import { itemMatchesSearchText } from '@/features/items/lib/itemMatchesSearchText'
import { Item } from '@/features/items/types'
import { Dialog } from '@/features/ui/Dialog'
import { capitalize } from '@/lib/capitalize'
import { cn } from '@/lib/classnames'

import { SearchTextAutocomplete } from '../../filters/parts/SearchTextAutocomplete'

function buildSearchTextOptions(): Array<{ id: string; name: string }> {
  let items = ITEM_TAGS.map((tag) => ({
    id: tag as string,
    name: tag as string,
  }))

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
  const searchTextOptions = buildSearchTextOptions()

  const [infoItem, setInfoItem] = useState<Item | null>(null)
  const isItemInfoOpen = Boolean(infoItem)

  const [filter, setFilter] = useState('')
  const [debouncedFilter] = useDebounceValue(filter, 500)

  const [sortingPreference, setSortingPreference] = useLocalStorage<
    'alphabetical' | 'in-game'
  >('sorting-preference', 'alphabetical', {
    initializeWithValue: false,
  })

  const getNewSortedItems = useCallback(() => {
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

    return sortedItems
  }, [buildSlot, debouncedFilter, itemList, sortingPreference])

  const [filteredItemList, setFilteredItemList] = useState(getNewSortedItems())

  // * useEffect appropriate here to react to changes
  useEffect(() => {
    setFilteredItemList(getNewSortedItems())
  }, [debouncedFilter, sortingPreference, getNewSortedItems])

  function handleSortingPreferenceToggle() {
    if (buildSlot !== 'trait') return

    const newSortingPreference =
      sortingPreference === 'alphabetical' ? 'in-game' : 'alphabetical'
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
        open={isItemInfoOpen}
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
              items={searchTextOptions}
              onChange={(newValue: string) => setFilter(newValue)}
              value={filter}
            />
          </div>
          {buildSlot === 'trait' && (
            <div className="col-span-1 flex items-end justify-start">
              <BaseButton
                plain
                className="flex items-center justify-center"
                aria-label="Toggle sorting preference"
                onClick={handleSortingPreferenceToggle}
              >
                <AdjustmentsHorizontalIcon className="mr-2 h-6 w-6" />
                {capitalize(sortingPreference)}
              </BaseButton>
            </div>
          )}
        </div>
      </div>

      <hr className="mb-8 mt-4 border-primary-500" />

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
              tooltipDisabled={isItemInfoOpen}
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
              tooltipDisabled={isItemInfoOpen}
            />
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
