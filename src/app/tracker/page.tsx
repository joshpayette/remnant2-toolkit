'use client'

import { remnantItemTypes, remnantItems } from '@/data/items'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Fragment, useMemo, useState } from 'react'
import type { Filters } from './Filters'
import dynamic from 'next/dynamic'
import { ItemType } from '@/types'
import TrackerFilters from './Filters'
import ToCsvButton from '@/components/ToCsvButton'
import { useIsClient } from 'usehooks-ts'

const skippedItemTypes: ItemType[] = ['concoction', 'consumable']
const relevantItems = remnantItems.filter(
  (item) => skippedItemTypes.includes(item.type) === false,
)
const itemTypes = remnantItemTypes.filter(
  (item) => skippedItemTypes.includes(item) === false,
)

const ListItems = dynamic(() => import('./ListItems'), {
  ssr: false,
})

export default function TrackerPage() {
  const isClient = useIsClient()

  const { itemTracker, setItemTracker } = useLocalStorage()
  const { discoveredItemIds } = itemTracker

  const [filters, setFilters] = useState<Filters>({
    undiscovered: true,
    discovered: true,
  })

  // We need to add the discovered flag to the items based on the discoveredItemIds
  // fetched from localstorage
  const items = useMemo(
    () =>
      relevantItems.map((item) => ({
        ...item,
        discovered: discoveredItemIds.includes(item.id),
      })),
    [discoveredItemIds],
  )

  // We only provide the relevant item data, not the internal image paths, etc.
  // We could maybe provide the ids as well, in case users wanted to dynamically
  // generate the build urls, but that's not a priority right now.
  const csvItems = useMemo(() => {
    return items.map((item) => ({
      type: item.type,
      name: item.name,
      discovered: item.discovered,
    }))
  }, [items])

  // Provider the tracker progress
  const discoveredCount = discoveredItemIds.length
  const discoveredPercent = Math.round(
    (discoveredItemIds.length / items.length) * 100,
  )
  const progress = isClient
    ? `${discoveredCount} / ${items.length} (${discoveredPercent}%)`
    : 'Calculating...'

  return (
    <Fragment>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-4 flex max-w-md flex-col p-4 text-center">
          <h1 className="w-full text-2xl font-semibold leading-6 text-white">
            Remnant 2 Item Tracker
          </h1>
          <p className="mb-8 w-full text-sm text-gray-400">
            Discover all the items in Remnant 2
          </p>
          <h2>Progress</h2>
          <span className="mb-8 text-2xl font-bold text-green-400">
            {progress}
          </span>
          <ToCsvButton data={csvItems} filename="remnant2toolkit_tracker" />
        </div>
        <TrackerFilters
          filters={filters}
          onFiltersChange={(newFilters: Filters) => {
            setFilters(newFilters)
          }}
        />
        <div className="mb-12">
          <ListItems
            filters={filters}
            items={items}
            itemTypes={itemTypes}
            onClick={(itemId: string) => {
              // If the item is already discovered, undiscover it
              if (discoveredItemIds.includes(itemId)) {
                const newDiscoveredItemIds = discoveredItemIds.filter(
                  (id) => id !== itemId,
                )
                setItemTracker({
                  ...itemTracker,
                  discoveredItemIds: newDiscoveredItemIds,
                })
                return
              }

              const newDiscoveredItemIds = [...discoveredItemIds, itemId]
              setItemTracker({
                ...itemTracker,
                discoveredItemIds: newDiscoveredItemIds,
              })
            }}
          />
        </div>
      </div>
    </Fragment>
  )
}
