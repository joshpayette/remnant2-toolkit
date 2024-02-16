'use client'

import { useMemo, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { remnantEnemies } from '@/features/enemies/data/remnantEnemies'
import { BossCategory } from '@/features/enemies/types'
import {
  BossTrackerFilters,
  DEFAULT_BOSS_TRACKER_FILTERS,
} from '@/features/filters/components/BossTrackerFilters'
import { BossTrackerFilterFields } from '@/features/filters/types'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { PageHeader } from '@/features/ui/PageHeader'

import { ListBosses } from './ListBosses'

const allBosses = remnantEnemies
  .filter(
    (enemy) =>
      enemy.category === 'boss' ||
      enemy.category === 'world boss' ||
      enemy.category === 'aberration',
  )
  .filter((enemy) => enemy.showOnTracker !== false)
  .map((boss) => ({
    ...boss,
    discovered: false,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export default function Page() {
  const isClient = useIsClient()

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

  const totalItems = filteredBosses.length

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

  // Provider the tracker progress
  const discoveredCount = filteredBosses.reduce((acc, item) => {
    if (discoveredBossIds.includes(item.id)) return acc + 1
    return acc
  }, 0)
  const discoveredPercent = Math.round((discoveredCount / totalItems) * 100)
  const progress = `${discoveredCount} / ${totalItems} (${
    isNaN(discoveredPercent) ? '0' : discoveredPercent
  }%)`

  function handleUpdateFilters(newFilters: BossTrackerFilterFields) {
    setFilters(newFilters)
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <PageHeader
        title="Remnant 2 Boss Tracker"
        subtitle="Discover all the bosses in Remnant 2"
      >
        <div className="flex flex-col items-center justify-center text-4xl font-bold text-green-400">
          <h2 className="text-4xl font-bold">Progress</h2>
          <span
            className="text-2xl font-bold text-white"
            suppressHydrationWarning
          >
            {isClient ? progress : 'Calculating...'}
          </span>
        </div>
      </PageHeader>

      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-xl">
          <BossTrackerFilters onUpdateFilters={handleUpdateFilters} />
        </div>
      </div>

      <div className="my-8 w-full">
        <ListBosses bosses={filteredBosses} onClick={handleListItemClicked} />
      </div>
    </div>
  )
}
