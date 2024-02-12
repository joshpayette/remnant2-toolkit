import { useLocalStorage as useLS } from 'usehooks-ts'

import { BossCategory } from '../bosses/types'
import { ItemCategory } from '../build/types'

// The type of the database in LocalStorage
interface LocalStorage {
  bossTracker: {
    discoveredBossIds: string[]
    collapsedBossCategories: BossCategory[]
  }
  tracker: {
    discoveredItemIds: string[]
    collapsedCategories: Array<ItemCategory>
  }
  // used just for selecting traits at the moment
  sortingPreference: 'alphabetical' | 'in-game'
}

const initialValue: LocalStorage = {
  bossTracker: {
    discoveredBossIds: [],
    collapsedBossCategories: [],
  },
  tracker: {
    discoveredItemIds: [],
    collapsedCategories: [],
  },
  sortingPreference: 'alphabetical',
}

export const useLocalStorage = () => {
  // ----------------------------------------
  // Boss Tracker
  // ----------------------------------------

  const [bossTrackerStorage, setBossTrackerStorage] = useLS<
    LocalStorage['bossTracker']
  >('boss-tracker', initialValue.bossTracker)

  function setDiscoveredBossIds({
    ids,
  }: {
    ids: LocalStorage['bossTracker']['discoveredBossIds']
  }) {
    setBossTrackerStorage({ ...bossTrackerStorage, discoveredBossIds: ids })
  }
  const discoveredBossIds = bossTrackerStorage.discoveredBossIds

  function setCollapsedBossCategories({
    categories,
  }: {
    categories: LocalStorage['bossTracker']['collapsedBossCategories']
  }) {
    setBossTrackerStorage({
      ...bossTrackerStorage,
      collapsedBossCategories: categories,
    })
  }
  const collapsedBossCategories = bossTrackerStorage.collapsedBossCategories

  // ----------------------------------------
  // Item Tracker
  // ----------------------------------------

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

  // ----------------------------------------
  // Sorting Preference
  // ----------------------------------------

  const [sortingPreference, setSortingPreference] = useLS<
    LocalStorage['sortingPreference']
  >('sorting-preference', initialValue.sortingPreference)

  return {
    collapsedBossCategories,
    setCollapsedBossCategories,
    discoveredBossIds,
    setDiscoveredBossIds,

    collapsedCategories,
    setCollapsedCategories,
    discoveredItemIds,
    setDiscoveredItemIds,

    sortingPreference,
    setSortingPreference,
  }
}
