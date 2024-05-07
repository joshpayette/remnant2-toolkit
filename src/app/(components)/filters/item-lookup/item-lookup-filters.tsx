'use client'

import { Disclosure } from '@headlessui/react'
import { FunnelIcon, TrashIcon } from '@heroicons/react/24/solid'
import isEqual from 'lodash.isequal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { BaseFieldGroup, BaseFieldset } from '@/app/(components)/_base/fieldset'
import {
  DiscoveredFilter,
  VALID_DISCOVERED_FILTERS,
} from '@/app/(components)/filters/discovered-filter'
import {
  CategoriesFilter,
  VALID_ITEM_CATEGORIES,
} from '@/app/(components)/filters/item-lookup/categories-filter'
import { ItemSearchText } from '@/app/(components)/filters/item-lookup/item-search-text'
import {
  ITEM_FILTER_KEYS,
  ItemLookupFilters as Filters,
} from '@/app/(components)/filters/item-lookup/types'
import { parseUrlFilters } from '@/app/(components)/filters/item-lookup/utils'
import {
  ReleasesFilter,
  VALID_RELEASE_KEYS,
} from '@/app/(components)/filters/releases-filter'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { allItems } from '@/app/(data)/items/all-items'
import { ITEM_TOKENS } from '@/app/(types)/tokens'
import { cn } from '@/lib/classnames'

function buildItemSearchTextItems() {
  {
    let items = allItems
      .filter((item) => item.category !== 'relicfragment')
      .map((item) => ({
        id: item.id,
        name: item.name,
      }))

    items = ITEM_TOKENS.map((tag) => ({
      id: tag as string,
      name: tag as string,
    })).concat(items)

    items = items.sort((a, b) => a.name.localeCompare(b.name))

    // remove duplicates
    items = items.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.name === item.name),
    )

    return items
  }
}

export const DEFAULT_ITEM_LOOKUP_FILTERS = {
  categories: [],
  collections: VALID_DISCOVERED_FILTERS,
  releases: VALID_RELEASE_KEYS,
  searchText: '',
} as const satisfies Filters

interface Props {}

// #region Component
export function ItemLookupFilters({}: Props) {
  const searchParams = useSearchParams()
  const filters = parseUrlFilters(searchParams)

  /** Used to clear the SearchTextAutocomplete field when clear filters is pressed */
  const searchTextFieldKey = useRef(new Date().getTime())

  const [unappliedFilters, setUnappliedFilters] = useState(filters)

  function clearFilters() {
    setUnappliedFilters(DEFAULT_ITEM_LOOKUP_FILTERS)
    applyUrlFilters(DEFAULT_ITEM_LOOKUP_FILTERS)
    searchTextFieldKey.current = new Date().getTime()
  }

  const areAnyFiltersActive = useMemo(() => {
    if (isEqual(filters, DEFAULT_ITEM_LOOKUP_FILTERS)) return false
    return true
  }, [filters])

  // #region Apply Filters Handler
  const pathname = usePathname()
  const router = useRouter()
  function applyUrlFilters(filtersToApply: Filters) {
    let url = `${pathname}?`

    // Add the categories filter
    if (
      filtersToApply.categories.length !== VALID_ITEM_CATEGORIES.length &&
      filtersToApply.categories.length > 0
    ) {
      url += `${ITEM_FILTER_KEYS.CATEGORIES}=${filtersToApply.categories.join(
        ',',
      )}&`
    }

    // Add the collections filter
    if (filtersToApply.collections.length !== VALID_DISCOVERED_FILTERS.length) {
      url += `${ITEM_FILTER_KEYS.COLLECTIONS}=${filtersToApply.collections.join(
        ',',
      )}&`
    }

    // Add the releases filter
    if (filtersToApply.releases.length !== VALID_RELEASE_KEYS.length) {
      url += `${ITEM_FILTER_KEYS.RELEASES}=${filtersToApply.releases.join(
        ',',
      )}&`
    }

    // Add the search text filter
    if (filtersToApply.searchText.length > 0) {
      url += `${ITEM_FILTER_KEYS.SEARCHTEXT}=${filtersToApply.searchText}&`
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

  function handleCategoriesChange(category: string, checked: boolean) {
    // if the category is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        categories: unappliedFilters.categories.filter((i) => i !== category),
      }
      setUnappliedFilters(newFilters)
      applyUrlFilters(newFilters)
      return
    }

    // if the category is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      categories: [...unappliedFilters.categories, category],
    }
    setUnappliedFilters(newFilters)
    applyUrlFilters(newFilters)
  }

  function handleCollectionsChange(value: string, checked: boolean) {
    // if the collection is unchecked, remove it from the list
    if (!checked) {
      const newFilters = {
        ...unappliedFilters,
        collections: unappliedFilters.collections.filter((i) => i !== value),
      }
      setUnappliedFilters(newFilters)
      applyUrlFilters(newFilters)
      return
    }

    // if the collection is not in the list, add it
    const newFilters = {
      ...unappliedFilters,
      collections: [...unappliedFilters.collections, value],
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
          <div className="flex w-full flex-row items-end justify-end border-b border-b-primary py-2">
            <div className="flex w-full flex-row items-start justify-start pr-4">
              <div className="mr-1 w-full">
                <ItemSearchText
                  key={searchTextFieldKey.current}
                  items={buildItemSearchTextItems()}
                  onChange={(newSearchText: string) =>
                    handleSearchTextChange(newSearchText)
                  }
                  onKeyDown={() => applyUrlFilters(unappliedFilters)}
                  value={unappliedFilters.searchText}
                  autoFocus={true}
                />
              </div>
              {unappliedFilters.searchText !== '' ? (
                <BaseButton
                  color="red"
                  onClick={() => {
                    handleSearchTextChange('')
                    applyUrlFilters({
                      ...unappliedFilters,
                      searchText: '',
                    })
                    searchTextFieldKey.current = new Date().getTime()
                  }}
                  className="mt-2"
                >
                  <TrashIcon className="h-6 w-6" />
                </BaseButton>
              ) : (
                <div className="w-[48px]" />
              )}
            </div>
            <Disclosure.Button as={BaseButton}>
              <FunnelIcon className="h-4 w-4" />
              {open ? 'Hide' : 'Show'}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel
            className={cn(
              'mt-2 w-full border p-4 border-primary bg-background-container',
              areAnyFiltersActive &&
                'border-highlight shadow-xl shadow-highlight-container',
            )}
          >
            <BaseFieldset>
              <BaseFieldGroup>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
                  <div className="col-span-full sm:col-span-2">
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
                          releases: [DEFAULT_FILTER],
                        }
                        setUnappliedFilters(newFilters)
                        applyUrlFilters(newFilters)
                      }}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <DiscoveredFilter
                      values={unappliedFilters.collections}
                      onChange={handleCollectionsChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          collections: VALID_ITEM_CATEGORIES,
                        }
                        setUnappliedFilters(newFilters)
                        applyUrlFilters(newFilters)
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          collections: [DEFAULT_FILTER],
                        }
                        setUnappliedFilters(newFilters)
                        applyUrlFilters(newFilters)
                      }}
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2 md:col-span-full">
                    <CategoriesFilter
                      values={unappliedFilters.categories}
                      onChange={handleCategoriesChange}
                      onCheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          categories: VALID_ITEM_CATEGORIES,
                        }
                        setUnappliedFilters(newFilters)
                        applyUrlFilters(newFilters)
                      }}
                      onUncheckAll={() => {
                        const newFilters = {
                          ...unappliedFilters,
                          categories: [],
                        }
                        setUnappliedFilters(newFilters)
                        applyUrlFilters(newFilters)
                      }}
                    />
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
