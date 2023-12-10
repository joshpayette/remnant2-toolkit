import type { ItemCategory } from '@/types'
import { useLocalStorage as useLS } from 'usehooks-ts'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: ItemCategory[]
  }
  builder: {
    showLabels: boolean
  }
}

const initialValue: LocalStorage = {
  tracker: {
    discoveredItemIds: [],
    collapsedCategories: [],
  },
  builder: {
    showLabels: false,
  },
}

export const useLocalStorage = () => {
  const [itemTracker, setItemTracker] = useLS<LocalStorage['tracker']>(
    'item-tracker',
    initialValue.tracker,
  )

  const [builder, setBuilder] = useLS<LocalStorage['builder']>(
    'builder',
    initialValue.builder,
  )

  return { itemTracker, setItemTracker, builder, setBuilder }
}
