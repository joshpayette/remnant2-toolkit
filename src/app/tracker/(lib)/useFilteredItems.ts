import { useCallback, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { LocalStorage } from '@/app/tracker/(lib)/types'

import { Item } from '../../../features/items/types'

export type FilteredItem = Item & {
  discovered: boolean
}

export function useFilteredItems(items: Item[]) {
  const [tracker] = useLocalStorage<LocalStorage>(
    'item-tracker',
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { discoveredItemIds } = tracker

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
