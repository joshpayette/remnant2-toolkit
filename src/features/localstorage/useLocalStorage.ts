import { GenericItem } from '@/features/items/types/GenericItem'
import { useLocalStorage as useLS } from 'usehooks-ts'

// The type of the database in LocalStorage
interface LocalStorage {
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: Array<GenericItem['category']>
  }
  // used just for selecting traits at the moment
  sortingPreference: 'alphabetical' | 'in-game'
  // When searching builds by collection, previously we were deleting and adding
  // the user's collection to the database every time for efficient searching.
  // This includes when the user applied filters on that page.
  // This is a flag to indicate that the user's collection needs to be inserted
  // The goalis to only insert the user's collection when it changes,
  // notably when they add or remove items from their collection on the item tracker.
  userItemInsertNeeded: boolean
}

const initialValue: LocalStorage = {
  tracker: {
    discoveredItemIds: [],
    collapsedCategories: [],
  },
  sortingPreference: 'alphabetical',
  userItemInsertNeeded: true,
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

  const [sortingPreference, setSortingPreference] = useLS<
    LocalStorage['sortingPreference']
  >('sorting-preference', initialValue.sortingPreference)

  const [userItemInsertNeeded, setUserItemInsertNeeded] = useLS<
    LocalStorage['userItemInsertNeeded']
  >('user-item-insert-needed', initialValue.userItemInsertNeeded)

  return {
    collapsedCategories,
    setCollapsedCategories,
    discoveredItemIds,
    setDiscoveredItemIds,
    sortingPreference,
    setSortingPreference,
    userItemInsertNeeded,
    setUserItemInsertNeeded,
  }
}
