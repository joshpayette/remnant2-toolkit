import { Archetype, ReleaseKey } from '@/features/items/types'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import FiltersContainer from '@/features/filters/components/FiltersContainer'
import ArchetypeFilters from '@/features/filters/components/ArchetypeFilters'
import WeaponFilters from '@/features/filters/components/WeaponFilters'
import ReleaseFilters from './ReleaseFilters'
import JewelryFilters from './JewelryFilters'
import SearchBuildsFilter from './SearchBuildsFilter'
import { DEFAULT_COMMUNITY_BUILD_FILTERS } from '../constants'
import { useEffect, useMemo, useState } from 'react'
import { RELEASE_TO_NAME } from '@/features/items/constants'
import { remnantItems } from '@/features/items/data/remnantItems'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import isEqual from 'lodash/isEqual'

// TODO Apply Filters not pulsating when first visiting the page and checking boxes

interface Props {
  onUpdateFilters: (newFilters: CommunityBuildFilterProps) => void
}

export default function CommunityBuildFilters({ onUpdateFilters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get the filters from the URL
  const filters = useMemo(() => {
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
          archetypes = DEFAULT_COMMUNITY_BUILD_FILTERS['archetypes'].join(',')
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
        longGun = DEFAULT_COMMUNITY_BUILD_FILTERS['longGun']
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
        handGun = DEFAULT_COMMUNITY_BUILD_FILTERS['handGun']
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
        melee = DEFAULT_COMMUNITY_BUILD_FILTERS['melee']
      }
    }
    // check if ring is valid
    if (ring) {
      const allRings: string[] = remnantItems
        .filter((item) => item.category === 'ring')
        .map((item) => item.name.toLowerCase())
      if (!allRings.includes(ring.toLowerCase())) {
        ring = DEFAULT_COMMUNITY_BUILD_FILTERS['ring']
      }
    }
    // check if amulet is valid
    if (amulet) {
      const allAmulets: string[] = remnantItems
        .filter((item) => item.category === 'amulet')
        .map((item) => item.name.toLowerCase())
      if (!allAmulets.includes(amulet.toLowerCase())) {
        amulet = DEFAULT_COMMUNITY_BUILD_FILTERS['amulet']
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
          releases =
            DEFAULT_COMMUNITY_BUILD_FILTERS['selectedReleases'].join(',')
        }
      })
    }

    return {
      archetypes: archetypes ? (archetypes.split(',') as Archetype[]) : [],
      longGun: longGun || DEFAULT_COMMUNITY_BUILD_FILTERS['longGun'],
      handGun: handGun || DEFAULT_COMMUNITY_BUILD_FILTERS['handGun'],
      melee: melee || DEFAULT_COMMUNITY_BUILD_FILTERS['melee'],
      ring: ring || DEFAULT_COMMUNITY_BUILD_FILTERS['ring'],
      amulet: amulet || DEFAULT_COMMUNITY_BUILD_FILTERS['amulet'],
      searchText: searchText || DEFAULT_COMMUNITY_BUILD_FILTERS['searchText'],
      selectedReleases: releases ? (releases.split(',') as ReleaseKey[]) : [],
    }
  }, [searchParams])

  // Tracks the filter changes by the user that are not yet applied
  // via clicking the Apply Filters button
  const [unappliedFilters, setUnappliedFilters] =
    useState<CommunityBuildFilterProps>(filters)

  // This is used to check if the filters are applied
  // This is used to determine if the Apply Filters button should pulsate
  // for the user to indicate they need to apply the changes
  const [areFiltersApplied, setAreFiltersApplied] = useState(true)

  // If the filters differ from the default filters,
  // the filters table should have a yellow outline to
  // indicate that
  const areAnyFiltersActive = useMemo(() => {
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

  // Once the initial filters are parsed from the URL,
  // pass this information up to the page so it can render
  // the builds list with the correct filters
  useEffect(() => {
    onUpdateFilters(filters)
    setAreFiltersApplied(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  // If the filters are changed, check if they are applied
  useEffect(() => {
    if (isEqual(filters, unappliedFilters)) {
      console.info('if x2')
      setAreFiltersApplied(true)
    } else {
      console.info('hit else')
      setAreFiltersApplied(false)
    }
  }, [unappliedFilters, filters])

  function handleClearFilters() {
    setUnappliedFilters(DEFAULT_COMMUNITY_BUILD_FILTERS)
    handleApplyFilters(DEFAULT_COMMUNITY_BUILD_FILTERS)
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
      // Only allow two archtypes to be selected at a time
      if (unappliedFilters.archetypes.length === 2) {
        return
      }
      newArchetypes.push(archetype)
    }

    setUnappliedFilters({ ...unappliedFilters, archetypes: newArchetypes })
    if (filters.archetypes.some((a) => !newArchetypes.includes(a))) {
      setAreFiltersApplied(false)
    }
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

  function handleRingChange(ring: string) {
    setUnappliedFilters({ ...unappliedFilters, ring })
    if (ring !== filters.ring) {
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

  function handleApplyFilters(newFilters: CommunityBuildFilterProps) {
    let finalPath = `${pathname}?`
    if (newFilters.archetypes.length > 0) {
      finalPath += `archetypes=${newFilters.archetypes.join(',')}&`
    }
    if (newFilters.longGun !== DEFAULT_COMMUNITY_BUILD_FILTERS['longGun']) {
      finalPath += `longGun=${newFilters.longGun}&`
    }
    if (newFilters.handGun !== DEFAULT_COMMUNITY_BUILD_FILTERS['handGun']) {
      finalPath += `handGun=${newFilters.handGun}&`
    }
    if (newFilters.melee !== DEFAULT_COMMUNITY_BUILD_FILTERS['melee']) {
      finalPath += `melee=${newFilters.melee}&`
    }
    if (newFilters.ring !== DEFAULT_COMMUNITY_BUILD_FILTERS['ring']) {
      finalPath += `ring=${newFilters.ring}&`
    }
    if (newFilters.amulet !== DEFAULT_COMMUNITY_BUILD_FILTERS['amulet']) {
      finalPath += `amulet=${newFilters.amulet}&`
    }
    if (
      newFilters.searchText !== DEFAULT_COMMUNITY_BUILD_FILTERS['searchText']
    ) {
      finalPath += `searchText=${newFilters.searchText}&`
    }
    if (newFilters.selectedReleases.length < 2) {
      finalPath += `releases=${newFilters.selectedReleases.join(',')}&`
    }

    if (finalPath.endsWith('&')) {
      finalPath = finalPath.slice(0, -1)
    }

    router.push(finalPath, { scroll: false })
  }

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
