import ItemCard from '@/components/ItemCard'
import { cn } from '@/lib/utils'
import { remnantItems } from '@/data/items'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function TrackerContainer() {
  const { builds, itemTracker, setItemTracker } = useLocalStorage()

  const { discoveredItemIds } = itemTracker
  const undiscoveredItems = remnantItems.filter(
    (item) => discoveredItemIds.includes(item.id) === false,
  )
  const discoveredItems = remnantItems.filter((item) =>
    discoveredItemIds.includes(item.id),
  )

  function handleDiscoverItem(itemId: string) {
    // if id is already in discoveredItemIds, do nothing
    if (discoveredItemIds.includes(itemId)) return

    const newDiscoveredItemIds = [...discoveredItemIds, itemId]
    setItemTracker({
      ...itemTracker,
      discoveredItemIds: newDiscoveredItemIds,
    })
  }

  function handleUndiscoverItem(itemId: string) {
    const newDiscoveredItemIds = discoveredItemIds.filter((id) => id !== itemId)
    setItemTracker({
      ...itemTracker,
      discoveredItemIds: newDiscoveredItemIds,
    })
  }

  const gridTemplate =
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'

  return (
    <div>
      <h1 className="col-span-7 text-2xl font-bold">Undiscovered Items</h1>
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
      <h1 className="col-span-7 text-2xl font-bold">Discovered Items</h1>
      <div className={cn(gridTemplate)}>
        {discoveredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleUndiscoverItem(item.id)}
            className="grayscale-0 hover:grayscale"
          >
            <ItemCard key={item.id} item={item} />
          </button>
        ))}
      </div>
    </div>
  )
}
