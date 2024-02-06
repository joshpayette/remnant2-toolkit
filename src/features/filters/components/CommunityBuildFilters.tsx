import { Archetype, ReleaseKey } from '@/features/items/types'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import FiltersContainer from '@/features/filters/components/FiltersContainer'
import ArchetypeFilters from '@/features/filters/components/ArchetypeFilters'
import WeaponFilters from '@/features/filters/components/WeaponFilters'
import ReleaseFilters from './ReleaseFilters'
import JewelryFilters from './JewelryFilters'
import SearchBuildsFilter from './SearchBuildsFilter'
import useCommunityBuildFilters from '../hooks/useCommunityBuildFilters'

interface Props {
  onUpdateFilters: (newFilters: CommunityBuildFilterProps) => void
}

export default function CommunityBuildFilters({ onUpdateFilters }: Props) {
  const {
    areAnyFiltersActive,
    areFiltersApplied,
    unappliedFilters,
    handleAmuletChange,
    handleApplyFilters,
    handleArchetypeChange,
    handleClearFilters,
    handleReleaseChange,
    handleRingChange,
    handleSearchTextChange,
    handleWeaponChange,
  } = useCommunityBuildFilters(onUpdateFilters)

  return (
    <FiltersContainer<CommunityBuildFilterProps>
      areAnyFiltersActive={areAnyFiltersActive}
      areFiltersApplied={areFiltersApplied}
      filters={unappliedFilters}
      onApplyFilters={handleApplyFilters}
      onClearFilters={handleClearFilters}
    >
      <SearchBuildsFilter
        searchText={unappliedFilters.searchText}
        onChange={(newSearchText: string) =>
          handleSearchTextChange(newSearchText)
        }
      />
      <ArchetypeFilters
        selectedArchetypes={unappliedFilters.archetypes}
        onChange={(archtype: Archetype) => handleArchetypeChange(archtype)}
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
        selectedRing={unappliedFilters.ring}
        selectedAmulet={unappliedFilters.amulet}
        onChangeRing={(ring: string) => handleRingChange(ring)}
        onChangeAmulet={(amulet: string) => handleAmuletChange(amulet)}
      />
      <ReleaseFilters
        selectedReleases={unappliedFilters.selectedReleases}
        onChange={(release: ReleaseKey) => handleReleaseChange(release)}
      />
    </FiltersContainer>
  )
}
