import type { ItemCategory } from '@/types'
import { useLocalStorage as useLS } from 'usehooks-ts'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: ItemCategory[]
  }
}

const initialValue: LocalStorage = {
  tracker: {
    discoveredItemIds: [],
    collapsedCategories: [],
  },
}

export const useLocalStorage = () => {
  const [itemTracker, setItemTracker] = useLS<LocalStorage['tracker']>(
    'item-tracker',
    initialValue.tracker,
  )

  return { itemTracker, setItemTracker }
}
