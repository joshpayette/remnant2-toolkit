import { useLocalStorage as useLS } from 'usehooks-ts'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
  }
}

const initialValue: LocalStorage = {
  tracker: {
    discoveredItemIds: [],
  },
}

export const useLocalStorage = () => {
  const [itemTracker, setItemTracker] = useLS<LocalStorage['tracker']>(
    'item-tracker',
    initialValue.tracker,
  )

  return { itemTracker, setItemTracker }
}
