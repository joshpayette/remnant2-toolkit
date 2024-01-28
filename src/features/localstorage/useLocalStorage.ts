import { GenericItem } from '@/features/items/types/GenericItem'
import { useLocalStorage as useLS } from 'usehooks-ts'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: Array<GenericItem['category']>
  }
}

const initialValue: LocalStorage = {
  tracker: {
    discoveredItemIds: [],
    collapsedCategories: [],
  },
}

export const useLocalStorage = () => {
  const [itemTrackerStorage, setItemTrackerStorage] = useLS<
    LocalStorage['tracker']
  >('item-tracker', initialValue.tracker)

  function setDiscoveredItemIds({
    ids,
  }: {
    ids: LocalStorage['tracker']['discoveredItemIds']
  }) {
    setItemTrackerStorage({ ...itemTrackerStorage, discoveredItemIds: ids })
  }
  const discoveredItemIds = itemTrackerStorage.discoveredItemIds

  function setCollapsedCategories({
    categories,
  }: {
    categories: LocalStorage['tracker']['collapsedCategories']
  }) {
    setItemTrackerStorage({
      ...itemTrackerStorage,
      collapsedCategories: categories,
    })
  }
  const collapsedCategories = itemTrackerStorage.collapsedCategories

  return {
    collapsedCategories,
    setCollapsedCategories,
    discoveredItemIds,
    setDiscoveredItemIds,
  }
}
