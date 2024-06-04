'use client'

import { Disclosure } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/24/solid'
import isEqual from 'lodash.isequal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { BaseFieldGroup, BaseFieldset } from '@/app/(components)/_base/fieldset'
import { BaseText, BaseTextLink } from '@/app/(components)/_base/text'
import { BossNameFilter } from '@/app/(components)/filters/boss-name-filter'
import {
  ReleasesFilter,
  VALID_RELEASE_KEYS,
} from '@/app/(components)/filters/releases-filter'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { BossAffixFilter } from '@/app/(components)/filters/world-saves/boss-affix-filter'
import {
  WORLD_SAVE_FILTER_KEYS,
  WorldSaveFilters as Filters,
} from '@/app/(components)/filters/world-saves/types'
import { parseUrlFilters } from '@/app/(components)/filters/world-saves/utils'
import { cn } from '@/app/(utils)/classnames'

export const DEFAULT_WORLD_SAVE_FILTERS = {
  bossName: DEFAULT_FILTER,
  bossAffixes: [DEFAULT_FILTER],
  releases: VALID_RELEASE_KEYS,
} as const satisfies Filters

interface Props {}

// #region Component

export function WorldSaveFilters({}: Props) {
  const searchParams = useSearchParams()
  const filters = parseUrlFilters(searchParams)

  const [unappliedFilters, setUnappliedFilters] = useState(filters)

  function clearFilters() {
    setUnappliedFilters(DEFAULT_WORLD_SAVE_FILTERS)
    applyUrlFilters(DEFAULT_WORLD_SAVE_FILTERS)
  }

  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, DEFAULT_WORLD_SAVE_FILTERS)) return false
    return true
  }, [filters])

  // #region Apply Filters Handler
  const pathname = usePathname()
  const router = useRouter()
  function applyUrlFilters(filtersToApply: Filters) {
    let url = `${pathname}?t=${Date.now()}&`

    // Add the boss name filter
    if (filtersToApply.bossName !== DEFAULT_FILTER) {
      url += `${WORLD_SAVE_FILTER_KEYS.BOSSNAME}=${filtersToApply.bossName}&`
    }

    // Add the boss affixes filter
    if (!filtersToApply.bossAffixes.some((i) => i === DEFAULT_FILTER)) {
      url += `${
        WORLD_SAVE_FILTER_KEYS.BOSSAFFIXES
      }=${filtersToApply.bossAffixes.join(',')}&`
    }

    // Add the releases filter
    if (!filtersToApply.releases.some((i) => i === DEFAULT_FILTER)) {
      url += `${WORLD_SAVE_FILTER_KEYS.RELEASES}=${filtersToApply.releases.join(
        ',',
      )}&`
    }

    // trim the final &
    if (url.endsWith('&')) {
      url = url.slice(0, -1)
    }

    router.push(url, { scroll: false })
  }

  // #region Filter Change Handlers

  function handleBossNameChange(newBossName: string) {
    const newFilters = { ...unappliedFilters, bossName: newBossName }
    setUnappliedFilters(newFilters)
    applyUrlFilters(newFilters)
  }

  function handleBossAffixesChange(newBossAffixes: string[]) {
    // if the newBossAffixes length is 0, set to the default value
    if (newBossAffixes.length === 0) {
      const newFilters = { ...unappliedFilters, bossAffixes: [DEFAULT_FILTER] }
      setUnappliedFilters(newFilters)
      applyUrlFilters(newFilters)
      return
    }

    // if the first item is the default value ("All"), apply the filters after removing the default value
    if (newBossAffixes[0] === DEFAULT_FILTER) {
      const newFilters = {
        ...unappliedFilters,
        bossAffixes: newBossAffixes.filter((i) => i !== DEFAULT_FILTER),
      }
      setUnappliedFilters(newFilters)
      applyUrlFilters(newFilters)
      return
    }

    // if any of the filters contain the default value of "All", just apply the filters
    if (newBossAffixes.includes(DEFAULT_FILTER)) {
      const newFilters = { ...unappliedFilters, bossAffixes: [DEFAULT_FILTER] }
      setUnappliedFilters(newFilters)
      applyUrlFilters(newFilters)
      return
    }

    // If we got here, remove the default value from the list
    const newFilters = {
      ...unappliedFilters,
      bossAffixes: newBossAffixes.filter((i) => i !== DEFAULT_FILTER),
    }
    setUnappliedFilters(newFilters)
    applyUrlFilters(newFilters)
  }

  function handleReleasesChange(newReleases: string, checked: boolean) {
    // if the release is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        releases: unappliedFilters.releases.filter((i) => i !== newReleases),
      }
      setUnappliedFilters(newFilters)
      applyUrlFilters(newFilters)
      return
    }

    // if the release is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      releases: [...unappliedFilters.releases, newReleases],
    }
    setUnappliedFilters(newFilters)
    applyUrlFilters(newFilters)
  }

  // #region Render

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <div className="w-full">
          <div className="flex w-full flex-row items-end justify-end border-b border-b-primary-500 py-2">
            <div className="w-full pr-4">
              <BossNameFilter
                value={unappliedFilters.bossName}
                onChange={handleBossNameChange}
              />
            </div>
            <Disclosure.Button as={BaseButton}>
              <FunnelIcon className="h-4 w-4" />
              {open ? 'Hide' : 'Show'}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel
            className={cn(
              'mt-2 w-full border border-primary-500 bg-gray-950 p-4',
              areAnyFiltersActive &&
                'border-accent1-300 shadow-xl shadow-accent1-600',
            )}
          >
            <BaseFieldset>
              <BaseFieldGroup>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
                  <div className="col-span-full">
                    <BossAffixFilter
                      value={unappliedFilters.bossAffixes}
                      onChange={handleBossAffixesChange}
                    />
                    <BaseText className="mt-2 text-sm">
                      <BaseTextLink
                        href="https://remnant.wiki/Affix"
                        target="_blank"
                      >
                        For more detailed affix information, visit the Remnant
                        Wiki
                      </BaseTextLink>
                    </BaseText>
                  </div>
                  <div className="col-span-full">
                    <ReleasesFilter
                      values={unappliedFilters.releases}
                      onChange={handleReleasesChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          releases: VALID_RELEASE_KEYS,
                        }
                        setUnappliedFilters(newFilters)
                        applyUrlFilters(newFilters)
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          releases: [],
                        }
                        setUnappliedFilters(newFilters)
                        applyUrlFilters(newFilters)
                      }}
                    />
                    <BaseText className="mt-2">
                      <span className="text-sm italic text-gray-400">
                        Releases refer to the game version the world save was
                        created in. It is not related to the bosses or affixes.
                      </span>
                    </BaseText>
                  </div>
                </div>
                <div className="flex w-full items-center justify-end gap-x-4">
                  <BaseButton color="red" onClick={clearFilters}>
                    Clear Filters
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
