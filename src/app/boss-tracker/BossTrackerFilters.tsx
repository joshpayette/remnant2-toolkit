import isEqual from 'lodash/isEqual'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { BossCategory } from '@/app/(data)/enemies/types'
import {
  BossCategoryFilters,
  DEFAULT_BOSS_FILTERS,
} from '@/features/build/filters/parts/BossCategoryFilters'
import { FiltersContainer } from '@/features/ui/filters/FiltersContainer'
import { SearchInput } from '@/features/ui/SearchInput'

import { BossTrackerFilterFields } from './types'

export const DEFAULT_BOSS_TRACKER_FILTERS: BossTrackerFilterFields = {
  searchText: '',
  selectedBossCategories: DEFAULT_BOSS_FILTERS,
}

interface Props {
  onUpdateFilters: (newFilters: BossTrackerFilterFields) => void
}

export function BossTrackerFilters({ onUpdateFilters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get the filters from the URL
  const filters = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    let searchText = params.get('searchText')
    let bossCategory = params.get('bossCategory')

    // check if boss categories are valid
    if (bossCategory) {
      const allBossCategories: BossCategory[] =
        DEFAULT_BOSS_TRACKER_FILTERS['selectedBossCategories']
      const bossCategoriesArray = bossCategory.split(',')
      bossCategoriesArray.forEach((category) => {
        if (!allBossCategories.includes(category as BossCategory)) {
          bossCategory =
            DEFAULT_BOSS_TRACKER_FILTERS['selectedBossCategories'].join(',')
        }
      })
    }

    return {
      selectedBossCategories: bossCategory
        ? (bossCategory.split(',') as BossCategory[])
        : DEFAULT_BOSS_TRACKER_FILTERS['selectedBossCategories'],
      searchText: searchText || DEFAULT_BOSS_TRACKER_FILTERS['searchText'],
    } satisfies BossTrackerFilterFields
  }, [searchParams])

  // Tracks the filter changes by the user that are not yet applied
  // via clicking the Apply Filters button
  const [unappliedFilters, setUnappliedFilters] =
    useState<BossTrackerFilterFields>(filters)

  const areFiltersNowApplied = isEqual(filters, unappliedFilters)

  // This is used to check if the filters are applied
  // This is used to determine if the Apply Filters button should pulsate
  // for the user to indicate they need to apply the changes
  const [areFiltersApplied, setAreFiltersApplied] =
    useState(areFiltersNowApplied)

  // If the filters differ from the default filters,
  // the filters table should have a yellow outline to
  // indicate that
  const areAnyFiltersActive = useMemo(() => {
    return (
      (filters.selectedBossCategories.length > 0 &&
        filters.selectedBossCategories.length <
          DEFAULT_BOSS_TRACKER_FILTERS['selectedBossCategories'].length) ||
      filters.searchText !== DEFAULT_BOSS_TRACKER_FILTERS['searchText']
    )
  }, [filters])

  // Once the initial filters are parsed from the URL,
  // pass this information up to the page so it can render
  // the builds list with the correct filters
  // * useEffect necessary here to pass up the filters
  useEffect(() => {
    onUpdateFilters(filters)
  }, [filters, onUpdateFilters])

  function handleClearFilters() {
    setUnappliedFilters(DEFAULT_BOSS_TRACKER_FILTERS)
    handleApplyFilters(DEFAULT_BOSS_TRACKER_FILTERS)
  }

  function handleBossCategoryChange(category: BossCategory) {
    let newBossCategories = [...unappliedFilters.selectedBossCategories]

    if (newBossCategories.includes(category)) {
      newBossCategories = newBossCategories.filter(
        (newBossCategory) => newBossCategory !== category,
      )
    } else {
      newBossCategories.push(category)
    }

    const newFilters = {
      ...unappliedFilters,
      selectedBossCategories: newBossCategories,
    }
    setUnappliedFilters(newFilters)
    handleApplyFilters(newFilters)
    setAreFiltersApplied(areFiltersNowApplied)
    if (
      filters.selectedBossCategories.some((a) => !newBossCategories.includes(a))
    ) {
      setAreFiltersApplied(false)
    }
  }

  function handleSearchTextChange(searchQuery: string) {
    const newFilters = { ...unappliedFilters, searchText: searchQuery }
    setUnappliedFilters(newFilters)
    handleApplyFilters(newFilters)
    setAreFiltersApplied(areFiltersNowApplied)
  }

  function handleApplyFilters(newFilters: BossTrackerFilterFields) {
    let finalPath = `${pathname}?`
    if (newFilters.searchText !== DEFAULT_BOSS_TRACKER_FILTERS['searchText']) {
      finalPath += `searchText=${newFilters.searchText}&`
    }
    if (
      newFilters.selectedBossCategories.length <
      DEFAULT_BOSS_TRACKER_FILTERS['selectedBossCategories'].length
    ) {
      finalPath += `bossCategory=${newFilters.selectedBossCategories.join(
        ',',
      )}&`
    }

    if (finalPath.endsWith('&')) {
      finalPath = finalPath.slice(0, -1)
    }

    router.push(finalPath, { scroll: false })
  }

  return (
    <FiltersContainer<BossTrackerFilterFields>
      areAnyFiltersActive={areAnyFiltersActive}
      areFiltersApplied={areFiltersApplied}
      filters={unappliedFilters}
      onClearFilters={handleClearFilters}
    >
      <div className="col-span-full flex w-full flex-col items-start justify-start gap-x-4 gap-y-2 border-b border-b-primary-800 pb-4">
        <div className="grid w-full grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-0">
          <div className="col-span-full flex w-full flex-col items-start justify-end">
            <SearchInput
              onKeyDown={() => handleApplyFilters(unappliedFilters)}
              onChange={handleSearchTextChange}
              value={unappliedFilters.searchText}
              placeholder={'Search boss names'}
            />
          </div>
        </div>
      </div>
      <div className="col-span-full flex w-full flex-col items-start justify-start gap-x-4 gap-y-2 border-b border-b-primary-800 pb-4 pt-2">
        <BossCategoryFilters
          selectedBossCategories={unappliedFilters.selectedBossCategories}
          onUpdate={(category) => handleBossCategoryChange(category)}
        />
      </div>
    </FiltersContainer>
  )
}
