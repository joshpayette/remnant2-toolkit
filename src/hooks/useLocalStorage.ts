import { ItemType } from '@/types'
import { useLocalStorage as useLS } from 'usehooks-ts'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedItemTypes: ItemType[]
  }
}

const initialValue: LocalStorage = {
  tracker: {
    discoveredItemIds: [],
    collapsedItemTypes: [],
  },
}

export const useLocalStorage = () => {
  const [itemTracker, setItemTracker] = useLS<LocalStorage['tracker']>(
    'item-tracker',
    initialValue.tracker,
  )

  return { itemTracker, setItemTracker }
}
