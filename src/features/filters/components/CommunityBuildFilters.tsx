import { Archetype, ReleaseKey } from '@/features/items/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_COMMUNITY_BUILD_FILTERS } from '@/features/filters/constants'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import FiltersContainer from '@/features/filters/components/FiltersContainer'
import ArchetypeFilters from '@/features/filters/components/ArchetypeFilters'
import WeaponFilters from '@/features/filters/components/WeaponFilters'
import ReleaseFilters from './ReleaseFilters'
import JewelryFilters from './JewelryFilters'
import SearchBuildsFilter from './SearchBuildsFilter'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { remnantItems } from '@/features/items/data/remnantItems'
import { RELEASE_TO_NAME } from '@/features/items/constants'
import { WeaponItem } from '@/features/items/types/WeaponItem'

interface Props {
  showBorder?: boolean
  onUpdate: (filters: CommunityBuildFilterProps) => void
}

export default function CommunityBuildFilters({ onUpdate }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   * Creates a new query string by adding or updating a parameter.
   */
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams)
      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams],
  )

  const [filters, setFilters] = useState<CommunityBuildFilterProps>(
    DEFAULT_COMMUNITY_BUILD_FILTERS,
  )

  // If filters are changed but the apply button is not pressed
  // the filters are not applied. We use this to draw attention
  // to the apply button
  const [areFiltersApplied, setAreFiltersApplied] = useState(true)

  // When the URL changes, update the filters
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    let archetypes = params.get('archetypes')
    let longGun = params.get('longGun')
    let handGun = params.get('handGun')
    let melee = params.get('melee')
    let ring = params.get('ring')
    let amulet = params.get('amulet')
    let searchText = params.get('searchText')
    let releases = params.get('releases')

    // check if archetypes are valid
    if (archetypes) {
      const allArchetypes: Archetype[] = remnantItems
        .filter((item) => item.category === 'archetype')
        .map((item) => item.name.toLowerCase() as Archetype)
      const archetypesArray = archetypes.split(',')
      archetypesArray.forEach((archetype) => {
        if (!allArchetypes.includes(archetype as Archetype)) {
          archetypes = null
        }
      })
    }
    // check if longGun is valid
    if (longGun) {
      const allLongGuns: string[] = remnantItems
        .filter(
          (item) => WeaponItem.isWeaponItem(item) && item.type === 'long gun',
        )
        .map((item) => item.name.toLowerCase())
      if (!allLongGuns.includes(longGun.toLowerCase())) {
        longGun = null
      }
    }
    // check if handGun is valid
    if (handGun) {
      const allHandGuns: string[] = remnantItems
        .filter(
          (item) => WeaponItem.isWeaponItem(item) && item.type === 'hand gun',
        )
        .map((item) => item.name.toLowerCase())
      if (!allHandGuns.includes(handGun.toLowerCase())) {
        handGun = null
      }
    }
    // check if melee is valid
    if (melee) {
      const allMelees: string[] = remnantItems
        .filter(
          (item) => WeaponItem.isWeaponItem(item) && item.type === 'melee',
        )
        .map((item) => item.name.toLowerCase())
      if (!allMelees.includes(melee.toLowerCase())) {
        melee = null
      }
    }
    // check if ring is valid
    if (ring) {
      const allRings: string[] = remnantItems
        .filter((item) => item.category === 'ring')
        .map((item) => item.name.toLowerCase())
      if (!allRings.includes(ring.toLowerCase())) {
        ring = null
      }
    }
    // check if amulet is valid
    if (amulet) {
      const allAmulets: string[] = remnantItems
        .filter((item) => item.category === 'amulet')
        .map((item) => item.name.toLowerCase())
      if (!allAmulets.includes(amulet.toLowerCase())) {
        amulet = null
      }
    }
    // check if releases are valid
    if (!releases) {
      releases = Object.keys(RELEASE_TO_NAME).join(',')
    } else {
      const allReleases: ReleaseKey[] = Object.keys(
        RELEASE_TO_NAME,
      ) as ReleaseKey[]
      const releasesArray = releases.split(',')
      releasesArray.forEach((release) => {
        if (!allReleases.includes(release as ReleaseKey)) {
          releases = null
        }
      })
      if (!releases) {
        releases = Object.keys(RELEASE_TO_NAME).join(',')
      }
    }

    const parsedFilters = {
      archetypes: archetypes ? (archetypes.split(',') as Archetype[]) : [],
      longGun: longGun || DEFAULT_COMMUNITY_BUILD_FILTERS['longGun'],
      handGun: handGun || DEFAULT_COMMUNITY_BUILD_FILTERS['handGun'],
      melee: melee || DEFAULT_COMMUNITY_BUILD_FILTERS['melee'],
      ring: ring || DEFAULT_COMMUNITY_BUILD_FILTERS['ring'],
      amulet: amulet || DEFAULT_COMMUNITY_BUILD_FILTERS['amulet'],
      searchText: searchText || DEFAULT_COMMUNITY_BUILD_FILTERS['searchText'],
      selectedReleases: releases ? (releases.split(',') as ReleaseKey[]) : [],
    }

    setFilters(parsedFilters)
    setAreFiltersApplied(true)
    onUpdate(parsedFilters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  function handleClearFilters() {
    setFilters(DEFAULT_COMMUNITY_BUILD_FILTERS)
    handleApplyFilters(DEFAULT_COMMUNITY_BUILD_FILTERS)
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
  // useEffect(() => {
  //   if (!areFiltersApplied && !areAnyFiltersActive()) setAreFiltersApplied(true)
  // }, [areFiltersApplied, areAnyFiltersActive])

  function handleArchtypeChange(archtype: Archetype) {
    let newArchetypes = [...filters.archetypes]

    if (newArchetypes.includes(archtype)) {
      newArchetypes = newArchetypes.filter((a) => a !== archtype)
    } else {
      // Only allow two archtypes to be selected at a time
      if (filters.archetypes.length === 2) {
        return
      }
      newArchetypes.push(archtype)
    }

    setFilters({ ...filters, archetypes: newArchetypes })
    setAreFiltersApplied(false)
  }

  function handleWeaponChange(
    weapon: string,
    type: 'longGun' | 'handGun' | 'melee',
  ) {
    setFilters({ ...filters, [type]: weapon })
    setAreFiltersApplied(false)
  }

  function handleRingChange(ring: string) {
    setFilters({ ...filters, ring })
    setAreFiltersApplied(false)
  }

  function handleAmuletChange(amulet: string) {
    router.push(`${pathname}?${createQueryString('amulet', amulet)}`, {
      scroll: false,
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

    setFilters({ ...filters, selectedReleases: newReleases })
    setAreFiltersApplied(false)
  }

  function handleSearchTextChange(searchQuery: string) {
    setFilters({ ...filters, searchText: searchQuery })
    setAreFiltersApplied(false)
  }

  function handleApplyFilters(filtersToApply: CommunityBuildFilterProps) {
    let finalPath = `${pathname}?`
    if (filtersToApply.archetypes.length > 0) {
      finalPath += `archetypes=${filtersToApply.archetypes.join(',')}&`
    }
    if (filtersToApply.longGun !== DEFAULT_COMMUNITY_BUILD_FILTERS['longGun']) {
      finalPath += `longGun=${filtersToApply.longGun}&`
    }
    if (filtersToApply.handGun !== DEFAULT_COMMUNITY_BUILD_FILTERS['handGun']) {
      finalPath += `handGun=${filtersToApply.handGun}&`
    }
    if (filtersToApply.melee !== DEFAULT_COMMUNITY_BUILD_FILTERS['melee']) {
      finalPath += `melee=${filtersToApply.melee}&`
    }
    if (filtersToApply.ring !== DEFAULT_COMMUNITY_BUILD_FILTERS['ring']) {
      finalPath += `ring=${filtersToApply.ring}&`
    }
    if (filtersToApply.amulet !== DEFAULT_COMMUNITY_BUILD_FILTERS['amulet']) {
      finalPath += `amulet=${filtersToApply.amulet}&`
    }
    if (
      filtersToApply.searchText !==
      DEFAULT_COMMUNITY_BUILD_FILTERS['searchText']
    ) {
      finalPath += `searchText=${filtersToApply.searchText}&`
    }
    if (filtersToApply.selectedReleases.length < 2) {
      finalPath += `releases=${filtersToApply.selectedReleases.join(',')}&`
    }

    if (finalPath.endsWith('&')) {
      finalPath = finalPath.slice(0, -1)
    }

    router.push(finalPath, { scroll: false })
  }

  return (
    <FiltersContainer<CommunityBuildFilterProps>
      areAnyFiltersActive={areAnyFiltersActive()}
      areFiltersApplied={areFiltersApplied}
      filters={filters}
      onApplyFilters={(filters) => {
        handleApplyFilters(filters)
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
