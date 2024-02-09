'use client'

import PageHeader from '@/features/ui/PageHeader'
import { useMemo, useState } from 'react'
import { BossTrackerFilterFields } from '@/features/filters/types'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { remnantBosses } from '@/features/bosses/remnantBosses'
import BossTrackerFilters, {
  DEFAULT_BOSS_TRACKER_FILTERS,
} from '@/features/filters/components/BossTrackerFilters'
import { BossCategory } from '@/features/bosses/types'
import ListBosses from './ListBosses'

const allBosses = remnantBosses.map((boss) => ({
  ...boss,
  discovered: false,
}))

export default function Page() {
  const [filters, setFilters] = useState<BossTrackerFilterFields>(
    DEFAULT_BOSS_TRACKER_FILTERS,
  )

  const { discoveredBossIds, setDiscoveredBossIds } = useLocalStorage()

  const filteredBosses = useMemo(() => {
    let filteredBosses = allBosses.map((boss) => ({
      ...boss,
      discovered: discoveredBossIds.includes(boss.id),
    }))

    // Filter by search text
    filteredBosses = filteredBosses.filter((boss) =>
      boss.name.toLowerCase().includes(filters.searchText.toLowerCase()),
    )

    // Filter out the categories
    filteredBosses = filteredBosses.filter((boss) => {
      if (boss.category === undefined) {
        return true
      }

      return filters.selectedBossCategories.includes(
        boss.category as BossCategory,
      )
    })

    return filteredBosses
  }, [filters, discoveredBossIds])

  const handleListItemClicked = (bossId: string) => {
    // If the boss is already discovered, undiscover it
    if (discoveredBossIds.includes(bossId)) {
      const newDiscoveredBossIds = discoveredBossIds.filter(
        (id) => id !== bossId,
      )
      setDiscoveredBossIds({ ids: newDiscoveredBossIds })
      // We need to set the user item insert needed flag
      // so that the next time they filter builds by collection,
      // their items will be updated
      return
    }

    const newDiscoveredBossIds = [...discoveredBossIds, bossId]
    setDiscoveredBossIds({ ids: newDiscoveredBossIds })
    // We need to set the user item insert needed flag
    // so that the next time they filter builds by collection,
    // their items will be updated
  }

  function handleUpdateFilters(newFilters: BossTrackerFilterFields) {
    setFilters(newFilters)
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <PageHeader
        title="Remnant 2 Boss Tracker"
        subtitle="Discover all the bosses in Remnant 2"
      />

      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-xl">
          <BossTrackerFilters onUpdateFilters={handleUpdateFilters} />
        </div>
      </div>

      <div className="my-8 w-full">
        <ListBosses
          bosses={filteredBosses}
          // onShowItemInfo={handleShowItemInfo}
          onClick={handleListItemClicked}
        />
      </div>
    </div>
  )
}
