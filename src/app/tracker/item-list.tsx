'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import isEqual from 'lodash.isequal'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useIsClient, useLocalStorage } from 'usehooks-ts'

import { BaseButton } from '@/app/(components)/_base/button'
import { ItemTrackerCard } from '@/app/(components)/cards/item-tracker-card'
import { ItemInfoDialog } from '@/app/(components)/dialogs/item-info-dialog'
import { VALID_ITEM_CATEGORIES } from '@/app/(components)/filters/item-tracker/categories-filter'
import { DEFAULT_ITEM_TRACKER_FILTERS } from '@/app/(components)/filters/item-tracker/item-tracker-filters'
import { ItemTrackerFilters } from '@/app/(components)/filters/item-tracker/types'
import {
  getFilteredItemsForCategory,
  parseUrlFilters,
} from '@/app/(components)/filters/item-tracker/utils'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { Item } from '@/app/(data)/items/types'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { ItemCategory } from '@/app/(types)/builds'
import {
  ItemTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { ALL_TRACKABLE_ITEMS } from '@/app/tracker/constants'
import { ItemTrackerCategory } from '@/app/tracker/types'
import { capitalize } from '@/lib/capitalize'
import { cn } from '@/lib/classnames'

function getCategoryProgressLabel({
  filteredItems,
  discoveredItemIds,
}: {
  filteredItems: Item[]
  discoveredItemIds: string[]
}) {
  const undiscoveredCount = filteredItems.reduce(
    (acc, item) => (discoveredItemIds.includes(item.id) ? acc : acc + 1),
    0,
  )
  const filteredItemsCount = filteredItems.length
  return `${(
    ((filteredItemsCount - undiscoveredCount) / filteredItemsCount) *
    100
  ).toFixed(2)}% (${undiscoveredCount} undiscovered)`
}

function getFilteredItemList(
  filters: ItemTrackerFilters,
  discoveredItemIds: string[],
): Array<Item & { discovered: boolean }> {
  let filteredItems = ALL_TRACKABLE_ITEMS.map((i) => {
    return {
      ...i,
      discovered: discoveredItemIds.includes(i.id),
    }
  })

  // if categories are not default, filter by categories
  if (
    filters.categories.length > 0 &&
    !filters.categories.some((c) => c === DEFAULT_FILTER)
  ) {
    filteredItems = filteredItems.filter((item) => {
      if (item.category === undefined) {
        return true
      }

      return filters.categories.some((itemCategory) => {
        if (itemCategory === 'Long Gun' && WeaponItem.isWeaponItem(item)) {
          return item.category === 'weapon' && item.type === 'long gun'
        }
        if (itemCategory === 'Hand Gun' && WeaponItem.isWeaponItem(item)) {
          return item.category === 'weapon' && item.type === 'hand gun'
        }
        if (itemCategory === 'Melee' && WeaponItem.isWeaponItem(item)) {
          return item.category === 'weapon' && item.type === 'melee'
        }
        if (
          itemCategory === 'Mutator (Gun)' &&
          MutatorItem.isMutatorItem(item)
        ) {
          return item.category === 'mutator' && item.type === 'gun'
        }
        if (
          itemCategory === 'Mutator (Melee)' &&
          MutatorItem.isMutatorItem(item)
        ) {
          return item.category === 'mutator' && item.type === 'melee'
        }
        if (
          itemCategory === 'Relic Fragment' &&
          RelicFragmentItem.isRelicFragmentItem(item)
        ) {
          return item.category === 'relicfragment'
        }

        return capitalize(item.category) === itemCategory
      })
    })
  }

  // if collections are not default, filter by collections
  if (
    filters.collections.length > 0 &&
    !filters.collections.some((c) => c === DEFAULT_FILTER)
  ) {
    filteredItems = filteredItems.filter((item) => {
      if (
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Discovered') &&
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Undiscovered')
      ) {
        return true
      } else if (
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Undiscovered')
      ) {
        return item.discovered === false
      } else if (
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Discovered')
      ) {
        return item.discovered === true
      } else {
        return false
      }
    })
  }

  // if releases are not default, filter by releases
  if (
    filters.releases.length > 0 &&
    !filters.releases.some((r) => r === DEFAULT_FILTER)
  ) {
    filteredItems = filteredItems.filter((item) =>
      filters.releases
        .filter((release) => release !== DEFAULT_FILTER)
        .includes(item.dlc),
    )
  }

  // if search text is not empty, filter by search text
  if (filters.searchText.length > 0) {
    filteredItems = filteredItems.filter((i) =>
      i.name.toLowerCase().includes(filters.searchText.toLowerCase()),
    )
  }

  // Sort alphabetically by item.category and item.name
  filteredItems = filteredItems.sort((a, b) => {
    if (a.category < b.category) return -1
    if (a.category > b.category) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  return filteredItems
}

interface Props {}

// #region Component

export function ItemList({}: Props) {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState(parseUrlFilters(searchParams))

  const [areFiltersApplied, setAreFiltersApplied] = useState(
    !isEqual(filters, DEFAULT_ITEM_TRACKER_FILTERS),
  )

  useEffect(() => {
    setFilters(parseUrlFilters(searchParams))
  }, [searchParams])

  useEffect(() => {
    if (!isEqual(filters, DEFAULT_ITEM_TRACKER_FILTERS)) {
      setAreFiltersApplied(true)
    }
  }, [filters])

  const [tracker, setTracker] = useLocalStorage<ItemTrackerLocalStorage>(
    LOCALSTORAGE_KEY.ITEM_TRACKER,
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { discoveredItemIds, collapsedCategories } = tracker

  const filteredItems = getFilteredItemList(filters, discoveredItemIds)

  // Limit to only the visible categories
  let visibleItemCategories: ItemTrackerCategory[] = VALID_ITEM_CATEGORIES.map(
    (i) => i.toLowerCase(),
  )

  // Remove the categories not found in the filtered items
  const filteredItemCategories = Array.from(
    new Set(filteredItems.map((i) => i.category)),
  )
  visibleItemCategories = visibleItemCategories.filter((category) => {
    let itemCategory: ItemCategory
    if (category === 'long gun') {
      itemCategory = 'weapon'
    } else if (category === 'hand gun') {
      itemCategory = 'weapon'
    } else if (category === 'melee') {
      itemCategory = 'weapon'
    } else if (category === 'mutator (gun)') {
      itemCategory = 'mutator'
    } else if (category === 'mutator (melee)') {
      itemCategory = 'mutator'
    } else if (category === 'relic fragment') {
      itemCategory = 'relicfragment'
    } else {
      itemCategory = category as ItemCategory
    }
    return filteredItemCategories.includes(itemCategory)
  })

  // Remove the categories not filtered for
  if (!filters.categories.includes(DEFAULT_FILTER)) {
    visibleItemCategories = visibleItemCategories.filter((category) =>
      filters.categories
        .filter((i) => i !== DEFAULT_FILTER)
        .map((i) => i.toLowerCase())
        .includes(category.toLowerCase()),
    )
  }

  // #region Handlers

  function handleCategoryToggle(itemCategory: ItemTrackerCategory) {
    const newCollapsedItemCategories = collapsedCategories.includes(
      itemCategory,
    )
      ? collapsedCategories.filter((type) => type !== itemCategory)
      : [...collapsedCategories, itemCategory]

    setTracker({
      ...tracker,
      collapsedCategories: newCollapsedItemCategories,
    })
  }

  function handleListItemClicked(itemId: string) {
    // If the item is already discovered, undiscover it
    if (discoveredItemIds.includes(itemId)) {
      const newDiscoveredItemIds = discoveredItemIds.filter(
        (id) => id !== itemId,
      )
      setTracker({ ...tracker, discoveredItemIds: newDiscoveredItemIds })
      // We need to set the user item insert needed flag
      // so that the next time they filter builds by collection,
      // their items will be updated
      return
    }

    const newDiscoveredItemIds = [...discoveredItemIds, itemId]
    setTracker({ ...tracker, discoveredItemIds: newDiscoveredItemIds })
  }

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const handleShowItemInfo = (itemId: string) => {
    const item = ALL_TRACKABLE_ITEMS.find((item) => item.id === itemId)
    if (item) setItemInfo(item)
  }

  const isClient = useIsClient()
  if (!isClient) return null

  // #region Render

  return (
    <>
      <ItemInfoDialog
        item={itemInfo}
        open={isShowItemInfoOpen}
        onClose={() => setItemInfo(null)}
      />
      <div className="w-full">
        {!areFiltersApplied && (
          <div className="flex flex-col items-center justify-center gap-y-2">
            <h2 className="mt-4 text-center text-2xl font-bold text-primary">
              Apply a filter, or...
            </h2>
            <BaseButton onClick={() => setAreFiltersApplied(true)}>
              Show All Items
            </BaseButton>
          </div>
        )}
        {filteredItems.length > 0 && areFiltersApplied && (
          <h2 className="my-4 w-full text-center text-2xl font-bold text-primary">
            Filtered Items ({filteredItems.length} Results)
          </h2>
        )}
        {areFiltersApplied &&
          visibleItemCategories.map((itemCategory) => (
            <Disclosure
              key={itemCategory as string}
              defaultOpen={!collapsedCategories.includes(itemCategory)}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    onClick={() => handleCategoryToggle(itemCategory)}
                    className="flex w-full justify-start border-b border-secondary p-4 text-left bg-background hover:border-primary hover:bg-background-container focus:outline-none focus-visible:ring focus-visible:ring-primary/75"
                  >
                    <div className="w-full">
                      <h2 className="text-lg font-semibold">
                        {capitalize(itemCategory as string)} -{' '}
                        {getCategoryProgressLabel({
                          filteredItems: getFilteredItemsForCategory(
                            ALL_TRACKABLE_ITEMS,
                            itemCategory,
                          ),
                          discoveredItemIds,
                        })}
                      </h2>
                    </div>
                    <ChevronDownIcon
                      className={cn(
                        'h-5 w-5 text-on-background',
                        open ? 'rotate-180 transform' : '',
                      )}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="grid w-full grid-cols-3 gap-4 py-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-9 xl:grid-cols-10">
                    {getFilteredItemsForCategory(
                      filteredItems,
                      itemCategory,
                    ).map((item) => (
                      <ItemTrackerCard
                        key={item.id}
                        item={item}
                        onClick={handleListItemClicked}
                        onShowItemInfo={handleShowItemInfo}
                        tooltipDisabled={isShowItemInfoOpen}
                      />
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
      </div>
    </>
  )
}
