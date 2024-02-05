import { Archetype, ReleaseKey } from '@/features/items/types'
import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_COMMUNITY_BUILD_FILTERS } from '@/features/filters/constants'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import FiltersContainer from '@/features/filters/components/FiltersContainer'
import ArchetypeFilters from '@/features/filters/components/ArchetypeFilters'
import WeaponFilters from '@/features/filters/components/WeaponFilters'
import ReleaseFilters from './ReleaseFilters'
import JewelryFilters from './JewelryFilters'
import SearchBuildsFilter from './SearchBuildsFilter'

interface Props {
  showBorder?: boolean
  onUpdate: (filters: CommunityBuildFilterProps) => void
}

export default function CommunityBuildFilters({ onUpdate }: Props) {
  const [filters, setFilters] = useState<CommunityBuildFilterProps>(
    DEFAULT_COMMUNITY_BUILD_FILTERS,
  )
  // If filters are changed but the apply button is not pressed
  // the filters are not applied. We use this to draw attention
  // to the apply button
  const [areFiltersApplied, setAreFiltersApplied] = useState(true)

  function handleClearFilters() {
    setFilters(DEFAULT_COMMUNITY_BUILD_FILTERS)
    setAreFiltersApplied(true)
    onUpdate(DEFAULT_COMMUNITY_BUILD_FILTERS)
  }

  const areAnyFiltersActive = useCallback(() => {
    return (
      filters.archetypes.length > 0 ||
      filters.longGun !== DEFAULT_COMMUNITY_BUILD_FILTERS['longGun'] ||
      filters.handGun !== DEFAULT_COMMUNITY_BUILD_FILTERS['handGun'] ||
      filters.melee !== DEFAULT_COMMUNITY_BUILD_FILTERS['melee'] ||
      filters.ring !== DEFAULT_COMMUNITY_BUILD_FILTERS['ring'] ||
      filters.amulet !== DEFAULT_COMMUNITY_BUILD_FILTERS['amulet'] ||
      filters.searchText !== DEFAULT_COMMUNITY_BUILD_FILTERS['searchText'] ||
      filters.selectedReleases.length < 2
    )
  }, [filters])

  // If the filters are changed, but back to the default state
  // we should consider the filters as applied
  useEffect(() => {
    if (!areFiltersApplied && !areAnyFiltersActive()) setAreFiltersApplied(true)
  }, [areFiltersApplied, areAnyFiltersActive])

  function handleArchtypeChange(archtype: Archetype) {
    let newArchtypes = [...filters.archetypes]

    if (newArchtypes.includes(archtype)) {
      newArchtypes = newArchtypes.filter((a) => a !== archtype)
    } else {
      // Only allow two archtypes to be selected at a time
      if (filters.archetypes.length === 2) {
        return
      }
      newArchtypes.push(archtype)
    }

    setFilters({
      ...filters,
      archetypes: newArchtypes,
    })
    setAreFiltersApplied(false)
  }

  function handleWeaponChange(
    weapon: string,
    type: 'longGun' | 'handGun' | 'melee',
  ) {
    setFilters({
      ...filters,
      [type]: weapon,
    })
    setAreFiltersApplied(false)
  }

  function handleRingChange(ring: string) {
    setFilters({
      ...filters,
      ring: ring,
    })
    setAreFiltersApplied(false)
  }

  function handleAmuletChange(amulet: string) {
    setFilters({
      ...filters,
      amulet: amulet,
    })
    setAreFiltersApplied(false)
  }

  function handleReleaseChange(release: ReleaseKey) {
    let newReleases = [...filters.selectedReleases]

    if (newReleases.includes(release)) {
      newReleases = newReleases.filter((r) => r !== release)
    } else {
      newReleases.push(release)
    }

    setFilters({
      ...filters,
      selectedReleases: newReleases,
    })
    setAreFiltersApplied(false)
  }

  function handleSearchTextChange(searchQuery: string) {
    setFilters({
      ...filters,
      searchText: searchQuery,
    })
    setAreFiltersApplied(false)
  }

  return (
    <FiltersContainer<CommunityBuildFilterProps>
      areAnyFiltersActive={areAnyFiltersActive()}
      areFiltersApplied={areFiltersApplied}
      filters={filters}
      onApplyFilters={(filters) => {
        setAreFiltersApplied(true)
        onUpdate(filters)
      }}
      onClearFilters={handleClearFilters}
    >
      <SearchBuildsFilter
        searchText={filters.searchText}
        onChange={(newSearchText: string) =>
          handleSearchTextChange(newSearchText)
        }
      />
      <ArchetypeFilters
        selectedArchetypes={filters.archetypes}
        onChange={(archtype: Archetype) => handleArchtypeChange(archtype)}
      />
      <WeaponFilters
        selectedLongGun={filters.longGun}
        selectedHandGun={filters.handGun}
        selectedMelee={filters.melee}
        onChange={(weapon: string, type: 'longGun' | 'handGun' | 'melee') =>
          handleWeaponChange(weapon, type)
        }
      />
      <JewelryFilters
        selectedRing={filters.ring}
        selectedAmulet={filters.amulet}
        onChangeRing={(ring: string) => handleRingChange(ring)}
        onChangeAmulet={(amulet: string) => handleAmuletChange(amulet)}
      />
      <ReleaseFilters
        selectedReleases={filters.selectedReleases}
        onChange={(release: ReleaseKey) => handleReleaseChange(release)}
      />
    </FiltersContainer>
  )
}
