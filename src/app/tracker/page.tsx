'use client'

import { remnantItemCategories, remnantItems } from '@/data'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Fragment, useMemo, useState } from 'react'
import type { Filters } from './(components)/Filters'
import { type Item, type ItemCategory } from '@/types'
import TrackerFilters from './(components)/Filters'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import { useIsClient } from 'usehooks-ts'
import PageHeader from '@/app/(components)/PageHeader'
import ItemInfo from '@/app/(components)/ItemInfo'
import { itemToCsvItem } from '@/lib/utils'
import ListItems from './(components)/ListItems'

const skippedItemCategories: ItemCategory[] = [
  'concoction',
  'consumable',
  'skill',
]
const itemList = remnantItems.filter(
  (item) => skippedItemCategories.includes(item.category) === false,
)
const itemCategories = remnantItemCategories.filter(
  (category) => skippedItemCategories.includes(category) === false,
)

export default function TrackerPage() {
  const isClient = useIsClient()

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const { itemTrackerStorage, setItemTrackerStorage } = useLocalStorage()
  const { discoveredItemIds } = itemTrackerStorage

  const [filters, setFilters] = useState<Filters>({
    undiscovered: true,
    discovered: true,
  })

  // We need to add the discovered flag to the items based on the discoveredItemIds
  // fetched from localstorage
  const items = useMemo(
    () =>
      itemList.map((item) => ({
        ...item,
        discovered: discoveredItemIds.includes(item.id),
      })),
    [discoveredItemIds],
  )

  // We only provide the relevant item data, not the internal image paths, etc.
  // We could maybe provide the ids as well, in case users wanted to dynamically
  // generate the build urls, but that's not a priority right now.
  const csvItems = useMemo(() => {
    return items.map((item) => {
      const csvItem = itemToCsvItem(item)
      return {
        ...csvItem,
        discovered: item.discovered,
      }
    })
  }, [items])

  // Provider the tracker progress
  const discoveredCount = discoveredItemIds.length
  const discoveredPercent = Math.round(
    (discoveredItemIds.length / items.length) * 100,
  )
  const progress = isClient
    ? `${discoveredCount} / ${items.length} (${discoveredPercent}%)`
    : 'Calculating...'

  const handleShowItemInfo = (itemId: string) => {
    const item = itemList.find((item) => item.id === itemId)
    if (item) setItemInfo(item)
  }

  return (
    <Fragment>
      <div className="flex w-full flex-col items-center justify-center">
        <ItemInfo
          item={itemInfo}
          open={isShowItemInfoOpen}
          onClose={() => setItemInfo(null)}
        />
        <PageHeader
          title="Remnant 2 Item Tracker"
          subtitle="Discover all the items in Remnant 2"
        >
          <h2>Progress</h2>
          <span className="mb-12 text-2xl font-bold text-green-400">
            {progress}
          </span>
          <ToCsvButton data={csvItems} filename="remnant2toolkit_tracker" />
        </PageHeader>
        <TrackerFilters
          filters={filters}
          onFiltersChange={(newFilters: Filters) => {
            setFilters(newFilters)
          }}
        />
        <div className="my-12 w-full">
          <ListItems
            filters={filters}
            items={items}
            itemCategories={itemCategories}
            onShowItemInfo={handleShowItemInfo}
            onClick={(itemId: string) => {
              // If the item is already discovered, undiscover it
              if (discoveredItemIds.includes(itemId)) {
                const newDiscoveredItemIds = discoveredItemIds.filter(
                  (id) => id !== itemId,
                )
                setItemTrackerStorage({
                  ...itemTrackerStorage,
                  discoveredItemIds: newDiscoveredItemIds,
                })
                return
              }

              const newDiscoveredItemIds = [...discoveredItemIds, itemId]
              setItemTrackerStorage({
                ...itemTrackerStorage,
                discoveredItemIds: newDiscoveredItemIds,
              })
            }}
          />
        </div>
      </div>
    </Fragment>
  )
}
