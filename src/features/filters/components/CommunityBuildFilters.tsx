import { Archetype, ReleaseKey } from '@/features/items/types'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import FiltersContainer from '@/features/filters/components/FiltersContainer'
import ArchetypeFilters from '@/features/filters/components/ArchetypeFilters'
import WeaponFilters from '@/features/filters/components/WeaponFilters'
import ReleaseFilters from './ReleaseFilters'
import JewelryFilters from './JewelryFilters'
import SearchBuildsFilter from './SearchBuildsFilter'

interface Props {
  areAnyFiltersActive: boolean
  areFiltersApplied: boolean
  filters: CommunityBuildFilterProps
  onAmuletChange: (amulet: string) => void
  onApplyFilters: (newFilters: CommunityBuildFilterProps) => void
  onArchetypeChange: (archetype: Archetype) => void
  onClearFilters: () => void
  onReleaseChange: (release: ReleaseKey) => void
  onRingChange: (ring: string) => void
  onSearchTextChange: (searchText: string) => void
  onWeaponChange: (
    weapon: string,
    type: 'longGun' | 'handGun' | 'melee',
  ) => void
}

export default function CommunityBuildFilters({
  areAnyFiltersActive,
  areFiltersApplied,
  filters,
  onAmuletChange,
  onApplyFilters,
  onArchetypeChange,
  onClearFilters,
  onReleaseChange,
  onRingChange,
  onSearchTextChange,
  onWeaponChange,
}: Props) {
  // If the filters are changed, but back to the default state
  // we should consider the filters as applied
  // useEffect(() => {
  //   if (!areFiltersApplied && !areAnyFiltersActive()) setAreFiltersApplied(true)
  // }, [areFiltersApplied, areAnyFiltersActive])

  return (
    <FiltersContainer<CommunityBuildFilterProps>
      areAnyFiltersActive={areAnyFiltersActive}
      areFiltersApplied={areFiltersApplied}
      filters={filters}
      onApplyFilters={onApplyFilters}
      onClearFilters={onClearFilters}
    >
      <SearchBuildsFilter
        searchText={filters.searchText}
        onChange={(newSearchText: string) => onSearchTextChange(newSearchText)}
      />
      <ArchetypeFilters
        selectedArchetypes={filters.archetypes}
        onChange={(archtype: Archetype) => onArchetypeChange(archtype)}
      />
      <WeaponFilters
        selectedLongGun={filters.longGun}
        selectedHandGun={filters.handGun}
        selectedMelee={filters.melee}
        onChange={(weapon: string, type: 'longGun' | 'handGun' | 'melee') =>
          onWeaponChange(weapon, type)
        }
      />
      <JewelryFilters
        selectedRing={filters.ring}
        selectedAmulet={filters.amulet}
        onChangeRing={(ring: string) => onRingChange(ring)}
        onChangeAmulet={(amulet: string) => onAmuletChange(amulet)}
      />
      <ReleaseFilters
        selectedReleases={filters.selectedReleases}
        onChange={(release: ReleaseKey) => onReleaseChange(release)}
      />
    </FiltersContainer>
  )
}
