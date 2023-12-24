import { useLocalStorage as useLS } from 'usehooks-ts'
import { GenericItem } from '../(types)/GenericItem'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: Array<GenericItem['category']>
  }
  builder: {
    showControls: boolean
    showLabels: boolean
    //* Used to transfer this information to the builder when
    //* you click on edit build
    tempDescription: string | null
    tempPublic: boolean | null
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
    tempDescription: null,
    tempPublic: null,
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
