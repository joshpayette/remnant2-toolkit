import type { ItemCategory } from '@/app/(types)'
import { useLocalStorage as useLS } from 'usehooks-ts'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: ItemCategory[]
  }
  builder: {
    showControls: boolean
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
    showControls: true,
  },
}

export const useLocalStorage = () => {
  const [itemTrackerStorage, setItemTrackerStorage] = useLS<
    LocalStorage['tracker']
  >('item-tracker', initialValue.tracker)

  const [builderStorage, setBuilderStorage] = useLS<LocalStorage['builder']>(
    'builder',
    initialValue.builder,
  )

  return {
    itemTrackerStorage,
    setItemTrackerStorage,
    builderStorage,
    setBuilderStorage,
  }
}
