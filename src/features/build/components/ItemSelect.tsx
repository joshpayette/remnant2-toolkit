'use client'

import Dialog from '@/features/ui/Dialog'
import BuilderButton from './BuilderButton'
import { useDebounce, useIsClient } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import SearchInput from '@/features/ui/SearchInput'
import { GenericItem } from '@/features/items/types/GenericItem'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { cn } from '@/lib/classnames'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { capitalize } from '@/lib/capitalize'
import SearchTagsFilter from '@/features/filters/components/parts/SearchTagsFilter'

function sortByPreference({
  items,
  buildSlot,
  sortingPreference,
}: {
  items: GenericItem[]
  buildSlot: GenericItem['category'] | null
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
  const { sortingPreference, setSortingPreference } = useLocalStorage()

  const [filteredItemList, setFilteredItemList] = useState(itemList)
  const debouncedFilter = useDebounce(filter, 500)

  const [selectedTag, setSelectedTag] = useState('[A]')
  function handleSelectedTagChange(newValue: string) {
    setSelectedTag(newValue)
  }
  function handleAddTagToSearchText() {
    setFilter((prev) => `${prev} ${selectedTag}`)
  }

  useEffect(() => {
    const filteredItems = itemList.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedFilter.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(debouncedFilter.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(debouncedFilter.toLowerCase()),
        ),
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
  if (!isClient) return null

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
              buildSlot === 'trait' ? 'col-span-2' : 'col-span-full',
            )}
          >
            <SearchInput
              onChange={(newValue: string) => setFilter(newValue)}
              value={filter}
            />
            <div className="flex items-start justify-start text-left">
              <SearchTagsFilter
                selectedSearchTag={selectedTag}
                onSearchTagChange={handleSelectedTagChange}
                onSearchTagApply={handleAddTagToSearchText}
              />
            </div>
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
