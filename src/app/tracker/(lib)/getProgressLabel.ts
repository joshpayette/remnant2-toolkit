import { Item } from '@/features/items/types'

export function getProgressLabel({
  discoveredItemIds,
  items,
  percentOnly = false,
}: {
  discoveredItemIds: string[]
  items: Item[]
  percentOnly?: boolean
}) {
  const totalItems = items.length
  const discoveredCount = items.reduce((acc, item) => {
    if (discoveredItemIds.includes(item.id)) return acc + 1
    return acc
  }, 0)
  const discoveredPercent = Math.round((discoveredCount / totalItems) * 100)

  return percentOnly
    ? `${discoveredPercent}%`
    : `${discoveredCount}/${totalItems} (${discoveredPercent}%)`
}
