import { useLocalStorage as useLS } from 'usehooks-ts'
import { BaseItem } from '../(types)/BaseItem'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: BaseItem['category'][]
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

  function setDiscoveredItemIds(ids: string[]) {
    setItemTrackerStorage({ ...itemTrackerStorage, discoveredItemIds: ids })
  }

  return {
    itemTrackerStorage,
    setItemTrackerStorage,
    setDiscoveredItemIds,
    builderStorage,
    setBuilderStorage,
  }
}
