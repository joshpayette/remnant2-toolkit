import { getDiscoveredCount } from '@/app/(utils)/tracker/get-discovered-count'
import { Item } from '@/features/items/types'

export function getTrackerProgressLabel({
  discoveredItemIds,
  items,
  percentOnly = false,
}: {
  discoveredItemIds: string[]
  items: Item[]
  percentOnly?: boolean
}) {
  const totalItems = items.length
  const discoveredCount = getDiscoveredCount(discoveredItemIds)
  const discoveredPercent = parseFloat(
    ((discoveredCount / totalItems) * 100).toFixed(2),
  )

  return percentOnly
    ? `${discoveredPercent}%`
    : `${discoveredCount}/${totalItems} (${discoveredPercent}%)`
}
