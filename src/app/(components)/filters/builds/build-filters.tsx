'use client'

import { Disclosure } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/24/solid'
import isEqual from 'lodash.isequal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseField,
  BaseFieldGroup,
  BaseFieldset,
  BaseLabel,
} from '@/app/(components)/_base/fieldset'
import { AmuletFilter } from '@/app/(components)/filters/builds/amulet-filter'
import { ArchetypeFilter } from '@/app/(components)/filters/builds/archetype-filter'
import { BuildMiscFilter } from '@/app/(components)/filters/builds/build-misc-filter'
import { BuildTagFilter } from '@/app/(components)/filters/builds/build-tag-filter'
import { HandGunFilter } from '@/app/(components)/filters/builds/hand-gun-filter'
import { LongGunFilter } from '@/app/(components)/filters/builds/long-gun-filter'
import { MeleeFilter } from '@/app/(components)/filters/builds/melee-filter'
import { RingFilter } from '@/app/(components)/filters/builds/ring-filter'
import {
  BUILD_FILTER_KEYS,
  BuildListFilters,
  MAX_RINGS,
} from '@/app/(components)/filters/builds/types'
import { parseUrlFilters } from '@/app/(components)/filters/builds/utils'
import {
  ReleasesFilter,
  VALID_RELEASE_KEYS,
} from '@/app/(components)/filters/releases-filter'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { Input } from '@/app/(components)/form-fields/input'
import { cn } from '@/lib/classnames'

export const DEFAULT_BUILD_FILTERS = {
  archetypes: [DEFAULT_FILTER],
  amulet: DEFAULT_FILTER,
  buildTags: [DEFAULT_FILTER],
  longGun: DEFAULT_FILTER,
  handGun: DEFAULT_FILTER,
  melee: DEFAULT_FILTER,
  releases: VALID_RELEASE_KEYS,
  rings: [DEFAULT_FILTER],
  searchText: '',
  patchAffected: false,
  withVideo: false,
  withReference: false,
} as const satisfies BuildListFilters

interface Props {
  buildFiltersOverrides?: Partial<BuildListFilters>
}

// #region Component

export function BuildFilters({ buildFiltersOverrides }: Props) {
  const defaultFilters = useMemo(() => {
    return buildFiltersOverrides
      ? { ...DEFAULT_BUILD_FILTERS, ...buildFiltersOverrides }
      : DEFAULT_BUILD_FILTERS
  }, [buildFiltersOverrides])

  const searchParams = useSearchParams()
  const filters = useMemo(() => {
    return parseUrlFilters(searchParams, defaultFilters)
  }, [searchParams, defaultFilters])

  const [unappliedFilters, setUnappliedFilters] = useState(filters)

  function clearFilters() {
    setUnappliedFilters(defaultFilters)
    applyUrlFilters(defaultFilters)
  }

  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, defaultFilters)) return false
    return true
  }, [filters, defaultFilters])

  const areFiltersApplied = useMemo(() => {
    if (isEqual(filters, unappliedFilters)) return true
    return false
  }, [filters, unappliedFilters])

  // #region Apply Filters Handler

  const pathname = usePathname()
  const router = useRouter()
  function applyUrlFilters(filtersToApply: BuildListFilters) {
    let url = `${pathname}?t=${Date.now()}&`

    // Add the amulet filter
    if (filtersToApply.amulet !== defaultFilters.amulet) {
      url += `${BUILD_FILTER_KEYS.AMULET}=${filtersToApply.amulet}&`
    }

    // Add the archetype filter
    if (
      !isEqual(filtersToApply, defaultFilters.archetypes) &&
      !filtersToApply.archetypes.includes(DEFAULT_FILTER)
    ) {
      url += `${BUILD_FILTER_KEYS.ARCHETYPES}=${filtersToApply.archetypes.join(
        ',',
      )}&`
    }

    // Add the build tag filters
    if (
      !isEqual(filtersToApply.buildTags, defaultFilters.buildTags) &&
      !filtersToApply.buildTags.includes(DEFAULT_FILTER)
    ) {
      url += `${BUILD_FILTER_KEYS.BUILDTAGS}=${filtersToApply.buildTags.join(
        ',',
      )}&`
    }

    // Add the long gun filters
    if (
      filtersToApply.longGun !== defaultFilters.longGun &&
      filtersToApply.longGun !== DEFAULT_FILTER
    ) {
      url += `${BUILD_FILTER_KEYS.LONGGUN}=${filtersToApply.longGun}&`
    }

    // Add the hand gun filters
    if (
      filtersToApply.handGun !== defaultFilters.handGun &&
      filtersToApply.handGun !== DEFAULT_FILTER
    ) {
      url += `${BUILD_FILTER_KEYS.HANDGUN}=${filtersToApply.handGun}&`
    }

    // Add the melee filters
    if (
      filtersToApply.melee !== defaultFilters.melee &&
      filtersToApply.melee !== DEFAULT_FILTER
    ) {
      url += `${BUILD_FILTER_KEYS.MELEE}=${filtersToApply.melee}&`
    }

    // Add the releases filters
    if (
      !isEqual(filtersToApply.releases, defaultFilters.releases) &&
      !filtersToApply.releases.includes(DEFAULT_FILTER)
    ) {
      url += `${BUILD_FILTER_KEYS.RELEASES}=${filtersToApply.releases.join(
        ',',
      )}&`
    }

    // Add the ring filters
    if (
      !isEqual(filtersToApply.rings, defaultFilters.rings) &&
      !filtersToApply.rings.includes(DEFAULT_FILTER)
    ) {
      url += `${BUILD_FILTER_KEYS.RINGS}=${filtersToApply.rings.join(',')}&`
    }

    // Add the search text
    if (filtersToApply.searchText !== defaultFilters.searchText) {
      url += `${BUILD_FILTER_KEYS.SEARCHTEXT}=${filtersToApply.searchText}&`
    }

    // Add the misc filters
    if (filtersToApply.patchAffected !== defaultFilters.patchAffected) {
      url += `${BUILD_FILTER_KEYS.PATCHAFFECTED}=${filtersToApply.patchAffected}&`
    }
    if (filtersToApply.withVideo !== defaultFilters.withVideo) {
      url += `${BUILD_FILTER_KEYS.WITHVIDEO}=${filtersToApply.withVideo}&`
    }
    if (filtersToApply.withReference !== defaultFilters.withReference) {
      url += `${BUILD_FILTER_KEYS.WITHREFERENCE}=${filtersToApply.withReference}&`
    }

    // trim the final &
    if (url.endsWith('&')) {
      url = url.slice(0, -1)
    }

    router.push(url, { scroll: false })
  }

  // #region Filter Change Handlers

  function handleSearchTextChange(newSearchText: string) {
    setUnappliedFilters((prev) => ({ ...prev, searchText: newSearchText }))
  }

  function handleAmuletChange(newAmulet: string) {
    const newFilters = { ...unappliedFilters, amulet: newAmulet }
    setUnappliedFilters(newFilters)
  }

  function handleArchetypeChange(newArchetypes: string[]) {
    // if the archetypes length is 0, set the archetypes to the default value
    if (newArchetypes.length === 0) {
      const newFilters = { ...unappliedFilters, archetypes: [DEFAULT_FILTER] }
      setUnappliedFilters(newFilters)
      return
    }

    // If the first item is the default value ("All"), apply the filters after removing the default value
    if (newArchetypes[0] === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        archetypes: newArchetypes.filter((i) => i !== DEFAULT_FILTER),
      }
      setUnappliedFilters(newFilters)
      return
    }

    // If any of the filters contain the default value of "All", just apply the filters
    if (newArchetypes.includes(DEFAULT_FILTER)) {
      const newFilters = { ...unappliedFilters, archetypes: [DEFAULT_FILTER] }
      setUnappliedFilters(newFilters)
      return
    }

    // If we got here, remove the default value from the list
    const newFilters = {
      ...unappliedFilters,
      archetypes: newArchetypes.filter(
        (archetype) => archetype !== DEFAULT_FILTER,
      ),
    }
    setUnappliedFilters(newFilters)
  }

  function handleBuildTagChange(newBuildTags: string[]) {
    // if the newBuildTags length is 0, set to the default value
    if (newBuildTags.length === 0) {
      const newFilters = { ...unappliedFilters, buildTags: [DEFAULT_FILTER] }
      setUnappliedFilters(newFilters)
      return
    }

    // If the first item is the default value ("All"), apply the filters after removing the default value
    if (newBuildTags[0] === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        buildTags: newBuildTags.filter((i) => i !== DEFAULT_FILTER),
      }
      setUnappliedFilters(newFilters)
      return
    }

    // If any of the filters contain the default value of "All", just apply the filters
    if (newBuildTags.includes(DEFAULT_FILTER)) {
      const newFilters = { ...unappliedFilters, buildTags: [DEFAULT_FILTER] }
      setUnappliedFilters(newFilters)
      return
    }

    // If we got here, remove the default value from the list
    const newFilters = {
      ...unappliedFilters,
      buildTags: newBuildTags.filter((buildTag) => buildTag !== DEFAULT_FILTER),
    }
    setUnappliedFilters(newFilters)
  }

  function handleLongGunChange(newLongGun: string) {
    const newFilters = { ...unappliedFilters, longGun: newLongGun }
    setUnappliedFilters(newFilters)
  }

  function handleHandGunChange(newHandGun: string) {
    const newFilters = { ...unappliedFilters, handGun: newHandGun }
    setUnappliedFilters(newFilters)
  }

  function handleMeleeChange(newMelee: string) {
    const newFilters = { ...unappliedFilters, melee: newMelee }
    setUnappliedFilters(newFilters)
  }

  function handleReleasesChange(newReleases: string, checked: boolean) {
    // if the release is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        releases: unappliedFilters.releases.filter((i) => i !== newReleases),
      }
      setUnappliedFilters(newFilters)
      return
    }

    // if the release is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      releases: [...unappliedFilters.releases, newReleases],
    }
    setUnappliedFilters(newFilters)
  }

  function handleRingChange(newRings: string[]) {
    // if the newRings length is 0, set the rings to the default value
    if (newRings.length === 0) {
      const newFilters = { ...unappliedFilters, rings: [DEFAULT_FILTER] }
      setUnappliedFilters(newFilters)
      return
    }

    // If the first item is the default value ("All"), apply the filters after removing the default value
    if (newRings[0] === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        rings: newRings.filter((i) => i !== DEFAULT_FILTER),
      }
      setUnappliedFilters(newFilters)
      return
    }

    // If any of the filters contain the default value of "All", just apply the filters
    if (newRings.includes(DEFAULT_FILTER)) {
      const newFilters = { ...unappliedFilters, rings: [DEFAULT_FILTER] }
      setUnappliedFilters(newFilters)
      return
    }

    // if the newRings length is more than the max rings, return
    if (newRings.length > MAX_RINGS) return

    // If we got here, remove the default value from the list
    const newFilters = {
      ...unappliedFilters,
      rings: newRings.filter((ring) => ring !== DEFAULT_FILTER),
    }
    setUnappliedFilters(newFilters)
  }

  function handleMiscFilterChange(newFilters: string[]) {
    const patchAffected = newFilters.includes('patchAffected')
    const withVideo = newFilters.includes('withVideo')
    const withReference = newFilters.includes('withReference')

    setUnappliedFilters((prev) => ({
      ...prev,
      patchAffected,
      withVideo,
      withReference,
    }))
  }

  // #region Render

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <div className="w-full">
          <div className="flex w-full flex-row items-end justify-end border-b border-b-primary py-2">
            <div className="w-full pr-4">
              <BaseField className="col-span-full sm:col-span-2">
                <div className="w-full max-w-[600px]">
                  <Input
                    type="text"
                    value={unappliedFilters.searchText}
                    placeholder="Build name, description, or creator"
                    onClear={() => {
                      const newFilters = {
                        ...unappliedFilters,
                        searchText: '',
                      }
                      setUnappliedFilters(newFilters)
                      applyUrlFilters(newFilters)
                    }}
                    onChange={(e) => handleSearchTextChange(e.target.value)}
                    onKeyDown={(e) => {
                      // If the user presses enter, apply the filters
                      if (e.key === 'Enter') {
                        applyUrlFilters(unappliedFilters)
                      }
                    }}
                  />
                </div>
              </BaseField>
            </div>
            <Disclosure.Button as={BaseButton}>
              <FunnelIcon className="h-4 w-4" />
              {open ? 'Hide' : 'Show'}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel
            className={cn(
              'mt-2 w-full border border-cyan-500 bg-gray-950 p-4',
              areAnyFiltersActive &&
                'border-accent1-300 shadow-xl shadow-accent1-600',
            )}
          >
            <BaseFieldset>
              <BaseFieldGroup>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
                  <div className="col-span-full sm:col-span-1">
                    <AmuletFilter
                      value={unappliedFilters.amulet}
                      onChange={handleAmuletChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <RingFilter
                      value={unappliedFilters.rings}
                      onChange={handleRingChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <ArchetypeFilter
                      value={unappliedFilters.archetypes}
                      onChange={handleArchetypeChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <LongGunFilter
                      value={unappliedFilters.longGun}
                      onChange={handleLongGunChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <MeleeFilter
                      value={unappliedFilters.melee}
                      onChange={handleMeleeChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <HandGunFilter
                      value={unappliedFilters.handGun}
                      onChange={handleHandGunChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1 md:col-span-2">
                    <ReleasesFilter
                      values={unappliedFilters.releases}
                      onChange={handleReleasesChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          releases: VALID_RELEASE_KEYS,
                        }
                        setUnappliedFilters(newFilters)
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          releases: [],
                        }
                        setUnappliedFilters(newFilters)
                      }}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <BuildTagFilter
                      value={unappliedFilters.buildTags}
                      onChange={handleBuildTagChange}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-1 md:col-span-2">
                    <BuildMiscFilter
                      value={[
                        unappliedFilters.patchAffected ? 'patchAffected' : '',
                        unappliedFilters.withVideo ? 'withVideo' : '',
                        unappliedFilters.withReference ? 'withReference' : '',
                      ]}
                      onChange={handleMiscFilterChange}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-end gap-x-4">
                  <BaseButton color="red" onClick={clearFilters}>
                    Clear Filters
                  </BaseButton>
                  <BaseButton
                    color="green"
                    onClick={() => applyUrlFilters(unappliedFilters)}
                    className={cn(!areFiltersApplied && 'animate-pulse')}
                  >
                    Apply Filters
                  </BaseButton>
                </div>
              </BaseFieldGroup>
            </BaseFieldset>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
