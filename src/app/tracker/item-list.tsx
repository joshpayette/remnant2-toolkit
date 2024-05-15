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
import { DEFAULT_ITEM_TRACKER_FILTERS } from '@/app/(components)/filters/item-tracker/item-tracker-filters'
import {
  getCategoryProgressLabel,
  getFilteredItemCategories,
  getFilteredItemList,
  getFilteredItemsForCategory,
  parseUrlFilters,
} from '@/app/(components)/filters/item-tracker/utils'
import { Item } from '@/app/(data)/items/types'
import {
  ItemTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { capitalize } from '@/app/(utils)/capitalize'
import { cn } from '@/app/(utils)/classnames'
import { ALL_TRACKABLE_ITEMS } from '@/app/tracker/constants'
import { ItemTrackerCategory } from '@/app/tracker/types'

interface Props {
  discoveredItemIds: string[]
  handleSetDiscoveredItems: (discoveredItemIds: string[]) => void
}

// #region Component

export function ItemList({
  discoveredItemIds,
  handleSetDiscoveredItems,
}: Props) {
  // #region Data

  const [tracker, setTracker] = useLocalStorage<ItemTrackerLocalStorage>(
    LOCALSTORAGE_KEY.ITEM_TRACKER,
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { collapsedCategories } = tracker

  // #region Filters
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

  const filteredItems = getFilteredItemList(filters, discoveredItemIds)
  // Remove the categories not found in the filtered items
  const visibleItemCategories = getFilteredItemCategories(filteredItems)

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

  async function handleListItemClicked(itemId: string) {
    let newDiscoveredItemIds: string[] = []

    // If the item is already discovered, undiscover it
    if (discoveredItemIds.includes(itemId)) {
      newDiscoveredItemIds = discoveredItemIds.filter((id) => id !== itemId)
    } else {
      newDiscoveredItemIds = [...discoveredItemIds, itemId]
    }

    handleSetDiscoveredItems(newDiscoveredItemIds)
  }

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const handleShowItemInfo = (itemId: string) => {
    const item = ALL_TRACKABLE_ITEMS.find((item) => item.id === itemId)
    if (item) setItemInfo(item)
  }

  // #region Render
  const isClient = useIsClient()
  if (!isClient) return null

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
            <h2 className="mt-4 text-center text-2xl font-bold text-primary-400">
              Apply a filter, or...
            </h2>
            <BaseButton onClick={() => setAreFiltersApplied(true)}>
              Show All Items
            </BaseButton>
          </div>
        )}
        {filteredItems.length > 0 && areFiltersApplied && (
          <h2 className="my-4 w-full text-center text-2xl font-bold text-primary-400">
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
                    className="flex w-full justify-start border-b border-secondary-700 p-4 text-left hover:border-primary-400 hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-primary-500/75"
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
                        'h-5 w-5 text-white',
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
