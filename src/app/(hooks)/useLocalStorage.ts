import { useLocalStorage as useLS } from 'usehooks-ts'
import { GenericItem } from '../(types)/items/GenericItem'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: Array<GenericItem['category']>
  }
  builder: {
    //* Used to transfer this information to the builder when
    //* you click on edit build
    tempDescription: string | null
    tempIsPublic: boolean | null
    tempBuildId: string | null
    tempCreatedById: string | null
  }
}

const initialValue: LocalStorage = {
  tracker: {
    discoveredItemIds: [],
    collapsedCategories: [],
  },
  builder: {
    tempDescription: null,
    tempIsPublic: null,
    tempBuildId: null,
    tempCreatedById: null,
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
