'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import isEqual from 'lodash/isEqual'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { parseBuildListFilters } from '@/features/build/filters/lib/parseBuildListFilters'
import { BuildListFilterFields } from '@/features/build/filters/types'
import { Archetype, ReleaseKey } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { FiltersContainer } from '@/features/ui/filters/FiltersContainer'
import { cn } from '@/lib/classnames'

import {
  ArchetypeFilters,
  DEFAULT_ARCHETYPE_FILTERS,
} from './parts/ArchetypeFilters'
import {
  BuildTagFilterItem,
  BuildTagFilters,
  DEFAULT_BUILD_TAG_FILTERS,
} from './parts/BuildTagFilters'
import { DEFAULT_JEWELRY_FILTERS, JewelryFilters } from './parts/JewelryFilters'
import { DEFAULT_RELEASE_FILTERS, ReleaseFilters } from './parts/ReleaseFilters'
import { SearchBuildsFilter } from './parts/SearchBuildsFilter'
import { DEFAULT_WEAPON_FILTERS, WeaponFilters } from './parts/WeaponFilters'

export const DEFAULT_BUILD_LIST_FILTERS: BuildListFilterFields = {
  amulet: DEFAULT_JEWELRY_FILTERS.amulet,
  archetypes: [],
  buildTags: DEFAULT_BUILD_TAG_FILTERS,
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
  limitToBuildsWithReferenceLink: false,
  limitToBuildsWithVideo: false,
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
      filters.archetypes.length > 0 ||
      filters.buildTags.length !== DEFAULT_BUILD_TAG_FILTERS.length ||
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
        DEFAULT_BUILD_LIST_FILTERS['includePatchAffectedBuilds'] ||
      filters.limitToBuildsWithVideo !==
        DEFAULT_BUILD_LIST_FILTERS['limitToBuildsWithVideo'] ||
      filters.limitToBuildsWithReferenceLink !==
        DEFAULT_BUILD_LIST_FILTERS['limitToBuildsWithReferenceLink']
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

  function handleBuildTagChange(tag: BuildTagFilterItem) {
    let newTags = [...unappliedFilters.buildTags]

    if (newTags.some((t) => t.value === tag.value)) {
      newTags = newTags.filter((t) => t.value !== tag.value)
    } else {
      newTags.push(tag)
    }

    setUnappliedFilters({ ...unappliedFilters, buildTags: newTags })
    if (
      filters.buildTags.some((t) => !newTags.some((nt) => nt.value === t.value))
    ) {
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

  function handleLimitVideoBuildsChange() {
    setUnappliedFilters({
      ...unappliedFilters,
      limitToBuildsWithVideo: !unappliedFilters.limitToBuildsWithVideo,
    })
    setAreFiltersApplied(false)
  }

  function handleLimitReferenceLinkBuildsChange() {
    setUnappliedFilters({
      ...unappliedFilters,
      limitToBuildsWithReferenceLink:
        !unappliedFilters.limitToBuildsWithReferenceLink,
    })
    setAreFiltersApplied(false)
  }

  function handleApplyFilters(newFilters: BuildListFilterFields) {
    let finalPath = `${pathname}?t=${Date.now()}&`
    if (
      newFilters.archetypes.length > 0 &&
      newFilters.archetypes.length < DEFAULT_ARCHETYPE_FILTERS.length
    ) {
      finalPath += `archetypes=${newFilters.archetypes.join(',')}&`
    }
    if (newFilters.buildTags.length > 0) {
      finalPath += `buildTags=${newFilters.buildTags
        .map((t) => t.value)
        .join(',')}&`
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
    if (
      newFilters.limitToBuildsWithVideo !==
      DEFAULT_BUILD_LIST_FILTERS['limitToBuildsWithVideo']
    ) {
      finalPath += `limitToBuildsWithVideo=${newFilters.limitToBuildsWithVideo}&`
    }
    if (
      newFilters.limitToBuildsWithReferenceLink !==
      DEFAULT_BUILD_LIST_FILTERS['limitToBuildsWithReferenceLink']
    ) {
      finalPath += `limitToBuildsWithReferenceLink=${newFilters.limitToBuildsWithReferenceLink}&`
    }

    if (finalPath.endsWith('&')) {
      finalPath = finalPath.slice(0, -1)
    }

    router.push(finalPath, { scroll: false })
  }

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <div className="mb-4 w-full">
          <div
            className={cn(
              'mb-2 flex w-full flex-row items-end justify-end border-b py-2',
              areAnyFiltersActive
                ? 'border-b-accent1-500'
                : 'border-b-primary-500',
            )}
          >
            <h2 className="flex w-full items-center justify-start text-xl">
              Build Filters
            </h2>
            <Disclosure.Button className="flex flex-row items-center justify-center rounded-md border-2 border-secondary-500 bg-secondary-700 p-2 text-sm hover:bg-secondary-500">
              {open ? 'Hide' : 'Show'}
              <ChevronRightIcon
                className={cn(
                  'ml-1 h-5 w-5',
                  open ? 'rotate-90 transform' : '',
                )}
              />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className="w-full">
            <FiltersContainer<BuildListFilterFields>
              areAnyFiltersActive={areAnyFiltersActive}
              areFiltersApplied={areFiltersApplied}
              filters={unappliedFilters}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            >
              <div className="col-span-full flex items-center justify-center border-b border-b-primary-800 pb-2 lg:col-span-3">
                <SearchBuildsFilter
                  showLabel={true}
                  searchText={unappliedFilters.searchText}
                  onApplyFilters={() => handleApplyFilters(unappliedFilters)}
                  onChange={(newSearchText: string) =>
                    handleSearchTextChange(newSearchText)
                  }
                />
              </div>
              <div className="col-span-full border-b border-b-primary-800 pb-2 pt-2 lg:col-span-3">
                <ArchetypeFilters
                  selectedArchetypes={unappliedFilters.archetypes}
                  onChange={(archtype: Archetype) =>
                    handleArchetypeChange(archtype)
                  }
                  onSelectAll={handleSelectAllArchetypes}
                  onSelectNone={handleSelectNoArchetypes}
                />
              </div>
              <div className="col-span-full border-b border-b-primary-800 pb-2 pt-2 lg:col-span-3">
                <WeaponFilters
                  selectedLongGun={unappliedFilters.longGun}
                  selectedHandGun={unappliedFilters.handGun}
                  selectedMelee={unappliedFilters.melee}
                  onChange={handleWeaponChange}
                />
              </div>
              <div className="col-span-full border-b border-b-primary-800 pb-2 pt-2 lg:col-span-3">
                <JewelryFilters
                  selectedRings={{
                    ring1: unappliedFilters.ring1,
                    ring2: unappliedFilters.ring2,
                    ring3: unappliedFilters.ring3,
                    ring4: unappliedFilters.ring4,
                  }}
                  selectedAmulet={unappliedFilters.amulet}
                  onChangeRing={handleRingChange}
                  onChangeAmulet={handleAmuletChange}
                />
              </div>

              <div className="col-span-1 border-b border-b-primary-800 pb-2 pt-2 sm:col-span-3 lg:col-span-2">
                <ReleaseFilters
                  selectedReleases={unappliedFilters.selectedReleases}
                  onChange={handleReleaseChange}
                />
              </div>
              <div className="col-span-1 border-b border-b-primary-800 pb-2 pt-2 sm:col-span-3 lg:col-span-2">
                <BuildTagFilters
                  selectedTags={unappliedFilters.buildTags}
                  onChange={handleBuildTagChange}
                />
              </div>
              <div className="col-span-full border-b border-b-primary-800 pb-2 pt-2 lg:col-span-2">
                <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
                  <div className="flex w-full flex-col items-start justify-start text-left text-sm font-bold text-primary-500">
                    Other Filters
                  </div>
                  <div className="w-full text-left">
                    <Checkbox
                      label="Include Patch Affected Builds"
                      name="include-patch-affected-builds"
                      checked={unappliedFilters.includePatchAffectedBuilds}
                      onChange={handlePatchAffectedBuildsChange}
                    />
                    <Checkbox
                      label="Builds with Video"
                      name="limit-builds-with-video"
                      checked={unappliedFilters.limitToBuildsWithVideo}
                      onChange={handleLimitVideoBuildsChange}
                    />
                    <Checkbox
                      label="Builds with Reference Link"
                      name="limit-builds-with-reference-link"
                      checked={unappliedFilters.limitToBuildsWithReferenceLink}
                      onChange={handleLimitReferenceLinkBuildsChange}
                    />
                  </div>
                </div>
              </div>
            </FiltersContainer>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
