import { allTrackerItems } from '@/app/tracker/constants'

export function getDiscoveredCount(discoveredItemIds: string[]) {
  return allTrackerItems.reduce((acc, item) => {
    if (discoveredItemIds.includes(item.id)) return acc + 1
    return acc
  }, 0)
}
