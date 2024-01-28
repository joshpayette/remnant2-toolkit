import { Archtype, ReleaseKey } from '@/features/items/types'
import { useState } from 'react'
import { DEFAULT_GUN } from '@/features/filters/constants'
import FiltersContainer from '@/features/filters/components/FiltersContainer'
import ArchtypeFilters from '@/features/filters/components/ArchtypeFilters'
import WeaponFilters from '@/features/filters/components/WeaponFilters'
import ReleaseFilters from './ReleaseFilters'
import {
  ByReleaseFilters,
  DEFAULT_BY_RELEASE_FILTERS,
} from '@/app/community-builds/by-release/page'

interface Props {
  showBorder?: boolean
  onUpdate: (filters: ByReleaseFilters) => void
}

export default function ByReleaseBuildFilters({ onUpdate }: Props) {
  const [filters, setFilters] = useState<ByReleaseFilters>(
    DEFAULT_BY_RELEASE_FILTERS,
  )

  function handleClearFilters() {
    setFilters(DEFAULT_BY_RELEASE_FILTERS)
    onUpdate(DEFAULT_BY_RELEASE_FILTERS)
  }

  function areAnyFiltersActive() {
    return (
      filters.archtypes.length > 0 ||
      filters.longGun !== DEFAULT_GUN ||
      filters.handGun !== DEFAULT_GUN ||
      filters.melee !== DEFAULT_GUN ||
      filters.selectedReleases.length < 2
    )
  }

  function handleArchtypeChange(archtype: Archtype) {
    let newArchtypes = [...filters.archtypes]

    if (newArchtypes.includes(archtype)) {
      newArchtypes = newArchtypes.filter((a) => a !== archtype)
    } else {
      // Only allow two archtypes to be selected at a time
      if (filters.archtypes.length === 2) {
        return
      }
      newArchtypes.push(archtype)
    }

    setFilters({
      ...filters,
      archtypes: newArchtypes,
    })
  }

  function handleWeaponChange(
    weapon: string,
    type: 'longGun' | 'handGun' | 'melee',
  ) {
    setFilters({
      ...filters,
      [type]: weapon,
    })
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
  }

  return (
    <FiltersContainer<ByReleaseFilters>
      areAnyFiltersActive={areAnyFiltersActive()}
      filters={filters}
      onApplyFilters={onUpdate}
      onClearFilters={handleClearFilters}
    >
      <ArchtypeFilters
        selectedArchtypes={filters.archtypes}
        onChange={(archtype: Archtype) => handleArchtypeChange(archtype)}
      />
      <WeaponFilters
        selectedLongGun={filters.longGun}
        selectedHandGun={filters.handGun}
        selectedMelee={filters.melee}
        onChange={(weapon: string, type: 'longGun' | 'handGun' | 'melee') =>
          handleWeaponChange(weapon, type)
        }
      />
      <ReleaseFilters
        selectedReleases={filters.selectedReleases}
        onChange={(release: ReleaseKey) => handleReleaseChange(release)}
      />
    </FiltersContainer>
  )
}
