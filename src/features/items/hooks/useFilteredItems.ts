import { useCallback, useState } from 'react'

import { useLocalStorage } from '../../localstorage/useLocalStorage'
import { Item } from '../types'

export type FilteredItem = Item & {
  discovered: boolean
}

export function useFilteredItems(items: Item[]) {
  const { discoveredItemIds } = useLocalStorage()

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
