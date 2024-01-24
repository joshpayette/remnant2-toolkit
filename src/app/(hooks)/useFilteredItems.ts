import { useCallback, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Item } from '@/features/item/types'

export type FilteredItem = Item & {
  discovered: boolean
}

export default function useFilteredItems(items: Item[]) {
  const { itemTrackerStorage } = useLocalStorage()
  const { discoveredItemIds } = itemTrackerStorage

  const [filteredItems, setFilteredItems] = useState<FilteredItem[]>(
    items.map((item) => ({
      ...item,
      discovered: discoveredItemIds.includes(item.id),
    })),
  )

  const handleUpdateFilters = useCallback(
    (filteredItems: FilteredItem[]) => {
      setFilteredItems(
        filteredItems.map((item) => ({
          ...item,
          discovered: discoveredItemIds.includes(item.id),
        })),
      )
    },
    [discoveredItemIds],
  )

  return { filteredItems, handleUpdateFilters }
}
