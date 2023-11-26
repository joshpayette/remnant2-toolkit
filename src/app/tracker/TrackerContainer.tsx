import ItemCard from '@/components/ItemCard'
import { cn } from '@/lib/utils'
import { remnantItems } from '@/data/items'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Fragment, useState } from 'react'
import FilterCheckbox from './FilterCheckbox'
import type { Item } from '@/types'

export default function TrackerContainer() {
  const { builds, itemTracker, setItemTracker } = useLocalStorage()
  const { discoveredItemIds } = itemTracker

  const undiscoveredItems: Item[] = remnantItems.filter(
    (item) => discoveredItemIds.includes(item.id) === false,
  )
  const discoveredItems: Item[] = remnantItems.filter((item) =>
    discoveredItemIds.includes(item.id),
  )

  const [filters, setFilters] = useState({
    undiscovered: true,
    discovered: true,
  })

  function handleDiscoverItem(itemId: string): void {
    if (discoveredItemIds.includes(itemId)) return

    const newDiscoveredItemIds = [...discoveredItemIds, itemId]
    setItemTracker({
      ...itemTracker,
      discoveredItemIds: newDiscoveredItemIds,
    })
  }

  function handleUndiscoverItem(itemId: string): void {
    const newDiscoveredItemIds = discoveredItemIds.filter((id) => id !== itemId)
    setItemTracker({
      ...itemTracker,
      discoveredItemIds: newDiscoveredItemIds,
    })
  }

  const gridTemplate =
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'

  return (
    <Fragment>
      <div className="rounded border border-purple-700  p-4">
        <fieldset>
          <legend className="text-base font-semibold leading-6 text-white">
            Filters
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mt-4 divide-y divide-purple-400 border-b border-t border-purple-400">
              <FilterCheckbox
                key="filter-type-undiscovered"
                label={`Show undiscovered items`}
                id={`filter-type-undiscovered`}
                checked={filters.undiscovered}
                onClick={() => {
                  setFilters({
                    ...filters,
                    undiscovered: !filters.undiscovered,
                  })
                }}
              />
              <FilterCheckbox
                key="filter-type-discovered"
                label={`Show discovered items`}
                id={`filter-type-discovered`}
                checked={filters.discovered}
                onClick={() => {
                  setFilters({
                    ...filters,
                    discovered: !filters.discovered,
                  })
                }}
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-12">
        {filters.undiscovered && (
          <div id="undiscovered-items" className="mb-6">
            <div className="border-b border-purple-700 pb-4">
              <h1 className="text-2xl font-semibold leading-6 text-white">
                Undiscovered Items
              </h1>
            </div>
            <div className={cn(gridTemplate)}>
              {undiscoveredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleDiscoverItem(item.id)}
                  className="grayscale hover:grayscale-0"
                >
                  <ItemCard item={item} />
                </button>
              ))}
            </div>
          </div>
        )}
        {filters.discovered && (
          <div id="discovered-items">
            <div className="border-b border-purple-700 pb-4">
              <h1 className="text-2xl font-semibold leading-6 text-white">
                Discovered Items
              </h1>
            </div>
            <div className={cn(gridTemplate)}>
              {discoveredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleUndiscoverItem(item.id)}
                  className="grayscale-0 hover:grayscale"
                >
                  <ItemCard item={item} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}
