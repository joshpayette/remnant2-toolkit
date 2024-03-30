'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import isEqual from 'lodash.isequal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { parseSearchFilters } from '@/app/world-save-archive/(lib)/parseSearchFilters'
import {
  BOSS_AFFIXES,
  BOSSES,
  MAX_BOSS_AFFIXES,
} from '@/app/world-save-archive/constants'
import {
  BossAffixName,
  BossName,
  SearchFilters,
} from '@/app/world-save-archive/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { FiltersContainer } from '@/features/ui/filters/FiltersContainer'
import { SelectMenu } from '@/features/ui/SelectMenu'
import { cn } from '@/lib/classnames'

let bossNames = BOSSES.map((b) => b.name as BossName | 'All')
bossNames.unshift('All')

const defaultBossAffixes = BOSS_AFFIXES.map((affix) => affix.name)

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  affixes: defaultBossAffixes,
  bossName: 'All',
}

interface Props {}

export function SaveLookupFilters({}: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const filters = parseSearchFilters(searchParams)

  // Tracks the filter changes by the user that are not yet applied
  // via clicking the Apply Filters button
  const [unappliedFilters, setUnappliedFilters] =
    useState<SearchFilters>(filters)

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
      filters.affixes.length !== DEFAULT_SEARCH_FILTERS['affixes'].length ||
      filters.bossName !== DEFAULT_SEARCH_FILTERS['bossName']
    )
  }, [filters])

  function handleClearFilters() {
    setUnappliedFilters(DEFAULT_SEARCH_FILTERS)
    handleApplyFilters(DEFAULT_SEARCH_FILTERS)
  }

  function handleApplyFilters(newFilters: SearchFilters) {
    let finalPath = `${pathname}?`
    if (
      newFilters.affixes.length > 0 &&
      newFilters.affixes.length <= MAX_BOSS_AFFIXES
    ) {
      finalPath += `affixes=${newFilters.affixes.join(',')}&`
    }
    if (newFilters.bossName !== DEFAULT_SEARCH_FILTERS['bossName']) {
      finalPath += `bossName=${newFilters.bossName}&`
    }

    if (finalPath.endsWith('&')) {
      finalPath = finalPath.slice(0, -1)
    }

    router.push(finalPath, { scroll: false })
  }

  function handleAffixChange(affix: BossAffixName) {
    const newAffixes = unappliedFilters.affixes.includes(affix)
      ? unappliedFilters.affixes.filter((a) => a !== affix)
      : [...unappliedFilters.affixes, affix]

    const newFilters = {
      ...unappliedFilters,
      affixes: newAffixes,
    }
    setUnappliedFilters(newFilters)
    handleApplyFilters(newFilters)
    if (filters.affixes.some((a) => !newAffixes.includes(a))) {
      setAreFiltersApplied(false)
    }
  }

  function handleBossNameChange(bossName: BossName | 'All') {
    const newFilters = {
      ...unappliedFilters,
      bossName,
    }
    setUnappliedFilters(newFilters)
    handleApplyFilters(newFilters)
    if (filters.bossName !== bossName) {
      setAreFiltersApplied(false)
    }
  }

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <div className="mb-12 w-full">
          <Disclosure.Button
            className={cn(
              'flex w-full flex-row items-center justify-center border-b py-2',
              areAnyFiltersActive
                ? 'border-b-accent1-500'
                : 'border-b-primary-500',
            )}
          >
            <h2 className="flex w-full items-center justify-start text-2xl">
              Filters
            </h2>
            <div className="flex flex-row items-center justify-center rounded-md border-2 border-secondary-500 bg-secondary-700 p-2 hover:bg-secondary-500">
              {open ? 'Hide' : 'Show'}
              <ChevronRightIcon
                className={cn(
                  'ml-1 h-5 w-5',
                  open ? 'rotate-90 transform' : '',
                )}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full">
            <FiltersContainer<SearchFilters>
              areFiltersApplied={areFiltersApplied}
              areAnyFiltersActive={areAnyFiltersActive}
              filters={filters}
              onClearFilters={handleClearFilters}
            >
              <div className="col-span-full flex w-full border-b border-b-primary-800 pb-4">
                <SelectMenu
                  label="Boss Name"
                  value={unappliedFilters.bossName}
                  onChange={(e) =>
                    handleBossNameChange(e.target.value as BossName | 'All')
                  }
                  options={bossNames.map((name) => ({
                    label: name,
                    value: name,
                  }))}
                />
              </div>
              <div className="col-span-full flex w-full flex-col items-start justify-start gap-x-4 gap-y-2 border-b border-b-primary-800 pb-4 pt-2">
                <div className="flex w-full items-center justify-start text-left text-sm font-bold text-primary-500">
                  By Affix
                </div>
                <div className="text-xs">
                  <button
                    className="underline"
                    aria-label="Uncheck all categories"
                    onClick={() => {
                      setUnappliedFilters({ ...unappliedFilters, affixes: [] })
                      handleApplyFilters({ ...unappliedFilters, affixes: [] })
                    }}
                  >
                    Uncheck All
                  </button>{' '}
                  /{' '}
                  <button
                    className="underline"
                    aria-label="Check all categories"
                    onClick={() => {
                      setUnappliedFilters({
                        ...unappliedFilters,
                        affixes: defaultBossAffixes,
                      })
                      handleApplyFilters({
                        ...unappliedFilters,
                        affixes: defaultBossAffixes,
                      })
                    }}
                  >
                    Check All
                  </button>
                </div>
                <div className="relative flex w-full flex-row items-center shadow-sm">
                  <div className="grid w-full grid-cols-2 text-left sm:grid-cols-3">
                    {BOSS_AFFIXES.map((affix) => (
                      <div
                        key={affix.name}
                        id={affix.name}
                        className="col-span-1"
                      >
                        <Checkbox
                          label={affix.name}
                          name={`affix-${affix.name}`}
                          checked={unappliedFilters.affixes.includes(
                            affix.name,
                          )}
                          onChange={() => handleAffixChange(affix.name)}
                        />
                      </div>
                    ))}
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
