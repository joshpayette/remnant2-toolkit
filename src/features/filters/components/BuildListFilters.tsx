'use client'

import isEqual from 'lodash/isEqual'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import {
  ArchetypeFilters,
  DEFAULT_ARCHETYPE_FILTERS,
} from '@/features/filters/components/parts/ArchetypeFilters'
import { FiltersContainer } from '@/features/filters/components/parts/FiltersContainer'
import {
  DEFAULT_WEAPON_FILTERS,
  WeaponFilters,
} from '@/features/filters/components/parts/WeaponFilters'
import { Archetype, ReleaseKey } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'

import { parseBuildListFilters } from '../lib/parseBuildListFilters'
import { BuildListFilterFields } from '../types'
import { DEFAULT_JEWELRY_FILTERS, JewelryFilters } from './parts/JewelryFilters'
import { DEFAULT_RELEASE_FILTERS, ReleaseFilters } from './parts/ReleaseFilters'
import { SearchBuildsFilter } from './parts/SearchBuildsFilter'

export const DEFAULT_BUILD_LIST_FILTERS: BuildListFilterFields = {
  amulet: DEFAULT_JEWELRY_FILTERS.amulet,
  archetypes: DEFAULT_ARCHETYPE_FILTERS,
  handGun: DEFAULT_WEAPON_FILTERS.handGun,
  longGun: DEFAULT_WEAPON_FILTERS.longGun,
  melee: DEFAULT_WEAPON_FILTERS.melee,
  ring1: DEFAULT_JEWELRY_FILTERS.ring,
  ring2: DEFAULT_JEWELRY_FILTERS.ring,
  ring3: DEFAULT_JEWELRY_FILTERS.ring,
  ring4: DEFAULT_JEWELRY_FILTERS.ring,
  searchText: '',
  selectedReleases: DEFAULT_RELEASE_FILTERS,
  includePatchAffectedBuilds: false,
}

export function BuildListFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = parseBuildListFilters(searchParams)

  // Tracks the filter changes by the user that are not yet applied
  // via clicking the Apply Filters button
  const [unappliedFilters, setUnappliedFilters] =
    useState<BuildListFilterFields>(filters)

  // This is used to check if the filters are applied
  // This is used to determine if the Apply Filters button should pulsate
  // for the user to indicate they need to apply the changes
  const [areFiltersApplied, setAreFiltersApplied] = useState(
    isEqual(filters, unappliedFilters),
  )

  // If the filters differ from the default filters,
  // the filters table should have a yellow outline to
  // indicate that
  const areAnyFiltersActive = useMemo(() => {
    return (
      filters.archetypes.length !==
        DEFAULT_BUILD_LIST_FILTERS['archetypes'].length ||
      filters.longGun !== DEFAULT_BUILD_LIST_FILTERS['longGun'] ||
      filters.handGun !== DEFAULT_BUILD_LIST_FILTERS['handGun'] ||
      filters.melee !== DEFAULT_BUILD_LIST_FILTERS['melee'] ||
      filters.ring1 !== DEFAULT_BUILD_LIST_FILTERS['ring1'] ||
      filters.ring2 !== DEFAULT_BUILD_LIST_FILTERS['ring2'] ||
      filters.ring3 !== DEFAULT_BUILD_LIST_FILTERS['ring3'] ||
      filters.ring4 !== DEFAULT_BUILD_LIST_FILTERS['ring4'] ||
      filters.amulet !== DEFAULT_BUILD_LIST_FILTERS['amulet'] ||
      filters.searchText !== DEFAULT_BUILD_LIST_FILTERS['searchText'] ||
      filters.selectedReleases.length !==
        DEFAULT_BUILD_LIST_FILTERS['selectedReleases'].length ||
      filters.includePatchAffectedBuilds !==
        DEFAULT_BUILD_LIST_FILTERS['includePatchAffectedBuilds']
    )
  }, [filters])

  function handleClearFilters() {
    setUnappliedFilters(DEFAULT_BUILD_LIST_FILTERS)
    handleApplyFilters(DEFAULT_BUILD_LIST_FILTERS)
  }

  function handleAmuletChange(amulet: string) {
    setUnappliedFilters({ ...unappliedFilters, amulet })
    if (amulet !== filters.amulet) {
      setAreFiltersApplied(false)
    }
  }

  function handleArchetypeChange(archetype: Archetype) {
    let newArchetypes = [...unappliedFilters.archetypes]

    if (newArchetypes.includes(archetype)) {
      newArchetypes = newArchetypes.filter(
        (newArchetype) => newArchetype !== archetype,
      )
    } else {
      newArchetypes.push(archetype)
    }

    setUnappliedFilters({ ...unappliedFilters, archetypes: newArchetypes })
    if (filters.archetypes.some((a) => !newArchetypes.includes(a))) {
      setAreFiltersApplied(false)
    }
  }

  function handleSelectAllArchetypes() {
    setUnappliedFilters({
      ...unappliedFilters,
      archetypes: DEFAULT_ARCHETYPE_FILTERS,
    })
    setAreFiltersApplied(true)
  }

  function handleSelectNoArchetypes() {
    setUnappliedFilters({ ...unappliedFilters, archetypes: [] })
    setAreFiltersApplied(false)
  }

  function handleReleaseChange(release: ReleaseKey) {
    let newReleases = [...unappliedFilters.selectedReleases]

    if (newReleases.includes(release)) {
      newReleases = newReleases.filter((r) => r !== release)
    } else {
      newReleases.push(release)
    }

    setUnappliedFilters({ ...unappliedFilters, selectedReleases: newReleases })

    if (filters.selectedReleases.some((r) => !newReleases.includes(r))) {
      setAreFiltersApplied(false)
    }
  }

  function handleRingChange(ring: string, ringIndex: number) {
    setUnappliedFilters({ ...unappliedFilters, [`ring${ringIndex}`]: ring })
    if (ring !== filters[`ring${ringIndex}` as keyof BuildListFilterFields]) {
      setAreFiltersApplied(false)
    }
  }

  function handleSearchTextChange(searchQuery: string) {
    setUnappliedFilters({ ...unappliedFilters, searchText: searchQuery })
    if (searchQuery !== filters.searchText) {
      setAreFiltersApplied(false)
    }
  }

  function handleWeaponChange(
    weapon: string,
    type: 'longGun' | 'handGun' | 'melee',
  ) {
    setUnappliedFilters({ ...unappliedFilters, [type]: weapon })
    if (weapon !== filters[type]) {
      setAreFiltersApplied(false)
    }
  }

  function handlePatchAffectedBuildsChange() {
    setUnappliedFilters({
      ...unappliedFilters,
      includePatchAffectedBuilds: !unappliedFilters.includePatchAffectedBuilds,
    })
    setAreFiltersApplied(false)
  }

  function handleApplyFilters(newFilters: BuildListFilterFields) {
    let finalPath = `${pathname}?`
    if (
      newFilters.archetypes.length > 0 &&
      newFilters.archetypes.length <
        DEFAULT_BUILD_LIST_FILTERS['archetypes'].length
    ) {
      finalPath += `archetypes=${newFilters.archetypes.join(',')}&`
    }
    if (newFilters.longGun !== DEFAULT_BUILD_LIST_FILTERS['longGun']) {
      finalPath += `longGun=${newFilters.longGun}&`
    }
    if (newFilters.handGun !== DEFAULT_BUILD_LIST_FILTERS['handGun']) {
      finalPath += `handGun=${newFilters.handGun}&`
    }
    if (newFilters.melee !== DEFAULT_BUILD_LIST_FILTERS['melee']) {
      finalPath += `melee=${newFilters.melee}&`
    }
    if (newFilters.ring1 !== DEFAULT_BUILD_LIST_FILTERS['ring1']) {
      finalPath += `ring1=${newFilters.ring1}&`
    }
    if (newFilters.ring2 !== DEFAULT_BUILD_LIST_FILTERS['ring2']) {
      finalPath += `ring2=${newFilters.ring2}&`
    }
    if (newFilters.ring3 !== DEFAULT_BUILD_LIST_FILTERS['ring3']) {
      finalPath += `ring3=${newFilters.ring3}&`
    }
    if (newFilters.ring4 !== DEFAULT_BUILD_LIST_FILTERS['ring4']) {
      finalPath += `ring4=${newFilters.ring4}&`
    }
    if (newFilters.amulet !== DEFAULT_BUILD_LIST_FILTERS['amulet']) {
      finalPath += `amulet=${newFilters.amulet}&`
    }
    if (newFilters.searchText !== DEFAULT_BUILD_LIST_FILTERS['searchText']) {
      finalPath += `searchText=${newFilters.searchText}&`
    }
    if (newFilters.selectedReleases.length < 2) {
      finalPath += `releases=${newFilters.selectedReleases.join(',')}&`
    }
    if (
      newFilters.includePatchAffectedBuilds !==
      DEFAULT_BUILD_LIST_FILTERS['includePatchAffectedBuilds']
    ) {
      finalPath += `includePatchAffectedBuilds=${newFilters.includePatchAffectedBuilds}&`
    }

    if (finalPath.endsWith('&')) {
      finalPath = finalPath.slice(0, -1)
    }

    router.push(finalPath, { scroll: false })
  }

  return (
    <FiltersContainer<BuildListFilterFields>
      areAnyFiltersActive={areAnyFiltersActive}
      areFiltersApplied={areFiltersApplied}
      filters={unappliedFilters}
      onApplyFilters={handleApplyFilters}
      onClearFilters={handleClearFilters}
    >
      <SearchBuildsFilter
        searchText={unappliedFilters.searchText}
        onApplyFilters={() => handleApplyFilters(unappliedFilters)}
        onChange={(newSearchText: string) =>
          handleSearchTextChange(newSearchText)
        }
      />
      <ArchetypeFilters
        selectedArchetypes={unappliedFilters.archetypes}
        onChange={(archtype: Archetype) => handleArchetypeChange(archtype)}
        onSelectAll={handleSelectAllArchetypes}
        onSelectNone={handleSelectNoArchetypes}
      />
      <WeaponFilters
        selectedLongGun={unappliedFilters.longGun}
        selectedHandGun={unappliedFilters.handGun}
        selectedMelee={unappliedFilters.melee}
        onChange={(weapon: string, type: 'longGun' | 'handGun' | 'melee') =>
          handleWeaponChange(weapon, type)
        }
      />
      <JewelryFilters
        selectedRings={{
          ring1: unappliedFilters.ring1,
          ring2: unappliedFilters.ring2,
          ring3: unappliedFilters.ring3,
          ring4: unappliedFilters.ring4,
        }}
        selectedAmulet={unappliedFilters.amulet}
        onChangeRing={handleRingChange}
        onChangeAmulet={(amulet: string) => handleAmuletChange(amulet)}
      />
      <ReleaseFilters
        selectedReleases={unappliedFilters.selectedReleases}
        onChange={(release: ReleaseKey) => handleReleaseChange(release)}
      />

      <div className="col-span-full pt-2">
        <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
          <div className="flex w-full flex-col items-start justify-start text-left text-sm font-bold text-primary-500">
            By Patch
            <span className="text-sm font-normal text-gray-300">
              Whether to show builds that depend on an item or interaction that
              was affected by a patch after the build was created
            </span>
          </div>
          <div className="w-full text-left">
            <Checkbox
              label="Include Patch Affected Builds?"
              name="include-patch-affected-builds"
              checked={unappliedFilters.includePatchAffectedBuilds}
              onChange={handlePatchAffectedBuildsChange}
            />
          </div>
        </div>
      </div>
    </FiltersContainer>
  )
}
