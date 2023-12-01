'use client'

import { remnantItems } from '@/data/items'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Fragment, useState } from 'react'
import type { Filters } from './types'
import dynamic from 'next/dynamic'
import { ItemType } from '@/types'

const ListItems = dynamic(() => import('./ListItems'), {
  ssr: false,
})

export default function TrackerPage() {
  const { itemTracker, setItemTracker } = useLocalStorage()
  const { discoveredItemIds } = itemTracker

  const skipItemTypes: ItemType[] = ['concoction', 'consumable']

  const undiscoveredItems = remnantItems
    .filter((item) => discoveredItemIds.includes(item.id) === false)
    .filter((item) => skipItemTypes.includes(item.type) === false)
  const discoveredItems = remnantItems
    .filter((item) => discoveredItemIds.includes(item.id))
    .filter((item) => skipItemTypes.includes(item.type) === false)

  const [filters, setFilters] = useState<Filters>({
    undiscovered: true,
    discovered: true,
    archtype: true,
    concoction: true,
    consumable: true,
    mutator: true,
    relicfragment: true,
    ring: true,
    trait: true,
    helm: true,
    torso: true,
    legs: true,
    gloves: true,
    relic: true,
    amulet: true,
    mainhand: true,
    offhand: true,
    melee: true,
    mod: true,
  })

  return (
    <Fragment>
      {/* <TrackerFilters
        filters={filters}
        onFiltersChange={(newFilters: Filters) => setFilters(newFilters)}
      /> */}

      <div className="w-full">
        {filters.undiscovered && (
          <div className="mb-12">
            <ListItems
              variant="undiscovered"
              skipItemTypes={skipItemTypes}
              filters={filters}
              items={undiscoveredItems}
              onClick={(itemId: string) => {
                if (discoveredItemIds.includes(itemId)) return
                const newDiscoveredItemIds = [...discoveredItemIds, itemId]
                setItemTracker({
                  ...itemTracker,
                  discoveredItemIds: newDiscoveredItemIds,
                })
              }}
            />
          </div>
        )}
        {filters.discovered && (
          <ListItems
            variant="discovered"
            skipItemTypes={skipItemTypes}
            filters={filters}
            items={discoveredItems}
            onClick={(itemId: string) => {
              const newDiscoveredItemIds = discoveredItemIds.filter(
                (id) => id !== itemId,
              )
              setItemTracker({
                ...itemTracker,
                discoveredItemIds: newDiscoveredItemIds,
              })
            }}
          />
        )}
      </div>
    </Fragment>
  )
}
