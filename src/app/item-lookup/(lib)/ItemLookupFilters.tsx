import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import isEqual from 'lodash.isequal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'

import { parseItemLookupFilters } from '@/app/item-lookup/(lib)/parseItemLookupFilters'
import {
  CollectedItemFilters,
  DEFAULT_COLLECTION_FILTERS,
} from '@/features/build/filters/parts/CollectedItemFilters'
import { ItemCategoryFilters } from '@/features/build/filters/parts/ItemCategoryFilters'
import {
  DEFAULT_RELEASE_FILTERS,
  ReleaseFilters,
} from '@/features/build/filters/parts/ReleaseFilters'
import { SearchTextAutocomplete } from '@/features/build/filters/parts/SearchTextAutocomplete'
import { ITEM_TAGS } from '@/features/items/constants'
import { allItems } from '@/features/items/data/allItems'
import {
  ItemLookupCategory,
  ItemLookupFilterFields,
  ReleaseKey,
} from '@/features/items/types'
import { FiltersContainer } from '@/features/ui/filters/FiltersContainer'
import { cn } from '@/lib/classnames'

function buildItemList(): Array<{ id: string; name: string }> {
  let items = allItems
    .filter((item) => item.category !== 'relicfragment')
    .map((item) => ({
      id: item.id,
      name: item.name,
    }))

  items = ITEM_TAGS.map((tag) => ({
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

const defaultItemCategories: ItemLookupCategory[] = [
  'Helm',
  'Torso',
  'Legs',
  'Gloves',
  'Archetype',
  'Skill',
  'Trait',
  'Perk',
  'Amulet',
  'Ring',
  'Relic',
  'Relicfragment',
  'Long Gun',
  'Hand Gun',
  'Melee',
  'Mod',
  'Mutator (Gun)',
  'Mutator (Melee)',
  'Concoction',
  'Consumable',
]

export const DEFAULT_ITEM_LOOKUP_FILTERS: ItemLookupFilterFields = {
  collectionKeys: DEFAULT_COLLECTION_FILTERS,
  itemCategories: defaultItemCategories,
  searchText: '',
  selectedReleases: DEFAULT_RELEASE_FILTERS,
}

interface Props {}

export function ItemLookupFilters({}: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const filters = parseItemLookupFilters(searchParams)

  const [searchText, setSearchText] = useState(filters.searchText)
  /** Used to clear the SearchTextAutocomplete field when clear filters is pressed */
  const searchTextFieldKey = useRef(new Date().getTime())

  // If the filters differ from the default filters,
  // the filters table should have a yellow outline to
  // indicate that
  const areAnyFiltersActive = useMemo(() => {
    return (
      filters.collectionKeys.length !==
        DEFAULT_ITEM_LOOKUP_FILTERS['collectionKeys'].length ||
      filters.itemCategories.length !==
        DEFAULT_ITEM_LOOKUP_FILTERS['itemCategories'].length ||
      filters.searchText !== DEFAULT_ITEM_LOOKUP_FILTERS['searchText'] ||
      filters.selectedReleases.length !==
        DEFAULT_ITEM_LOOKUP_FILTERS['selectedReleases'].length
    )
  }, [filters])

  function handleClearFilters() {
    handleApplyFilters(DEFAULT_ITEM_LOOKUP_FILTERS)
    searchTextFieldKey.current = new Date().getTime()
  }

  function handleCategoryChange(category: ItemLookupCategory) {
    let newCategories = [...filters.itemCategories]

    if (newCategories.includes(category)) {
      newCategories = newCategories.filter((c) => c !== category)
    } else {
      newCategories.push(category)
    }

    handleApplyFilters({ ...filters, itemCategories: newCategories })
  }

  function handleCollectionChange(collection: string) {
    let newCollection = [...filters.collectionKeys]

    if (newCollection.includes(collection)) {
      newCollection = newCollection.filter((c) => c !== collection)
    } else {
      newCollection.push(collection)
    }

    handleApplyFilters({ ...filters, collectionKeys: newCollection })
  }

  function handleReleaseChange(release: ReleaseKey) {
    let newReleases = [...filters.selectedReleases]

    if (newReleases.includes(release)) {
      newReleases = newReleases.filter((r) => r !== release)
    } else {
      newReleases.push(release)
    }

    handleApplyFilters({ ...filters, selectedReleases: newReleases })
  }

  function handleSearchTextChange(searchQuery: string) {
    setSearchText(searchQuery)
  }

  function handleApplyFilters(newFilters: ItemLookupFilterFields) {
    let finalPath = `${pathname}?`
    if (
      newFilters.itemCategories.length > 0 &&
      newFilters.itemCategories.length <
        DEFAULT_ITEM_LOOKUP_FILTERS['itemCategories'].length
    ) {
      finalPath += `categories=${newFilters.itemCategories.join(',')}&`
    }
    if (
      newFilters.collectionKeys.length > 0 &&
      newFilters.collectionKeys.length <
        DEFAULT_ITEM_LOOKUP_FILTERS['collectionKeys'].length
    ) {
      finalPath += `collection=${newFilters.collectionKeys}&`
    }
    if (
      newFilters.selectedReleases.length > 0 &&
      newFilters.selectedReleases.length <
        DEFAULT_ITEM_LOOKUP_FILTERS['selectedReleases'].length
    ) {
      finalPath += `releases=${newFilters.selectedReleases.join(',')}&`
    }
    if (newFilters.searchText !== DEFAULT_ITEM_LOOKUP_FILTERS['searchText']) {
      finalPath += `searchText=${newFilters.searchText}&`
    }

    if (finalPath.endsWith('&')) {
      finalPath = finalPath.slice(0, -1)
    }

    router.push(finalPath, { scroll: false })
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
              Item Filters
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
            <FiltersContainer<ItemLookupFilterFields>
              areFiltersApplied={false}
              areAnyFiltersActive={areAnyFiltersActive}
              filters={filters}
              onClearFilters={handleClearFilters}
            >
              <div className="col-span-full flex w-full flex-col items-end justify-center gap-x-4 gap-y-2 border-b border-b-primary-800 pb-4 sm:flex-row">
                <div className="flex w-full max-w-[400px] flex-col items-start justify-center">
                  <SearchTextAutocomplete
                    key={searchTextFieldKey.current}
                    items={buildItemList()}
                    onChange={(newSearchText: string) =>
                      handleSearchTextChange(newSearchText)
                    }
                    onKeyDown={() =>
                      handleApplyFilters({ ...filters, searchText })
                    }
                    value={searchText}
                    autoFocus={true}
                  />
                </div>
                {searchText !== '' ? (
                  <button
                    className="rounded-md border-2 border-red-700 px-2 py-1 text-sm text-white hover:border-red-500"
                    onClick={() => {
                      handleSearchTextChange('')
                      handleApplyFilters({
                        ...filters,
                        searchText: '',
                      })
                      searchTextFieldKey.current = new Date().getTime()
                    }}
                  >
                    Clear search text
                  </button>
                ) : null}
              </div>

              <div className="col-span-full flex w-full border-b border-b-primary-800 pb-4 sm:col-span-3">
                <ReleaseFilters
                  selectedReleases={filters.selectedReleases}
                  onChange={(release: ReleaseKey) =>
                    handleReleaseChange(release)
                  }
                />
              </div>
              <div className="col-span-full flex w-full border-b border-b-primary-800 pb-4 sm:col-span-3">
                <CollectedItemFilters
                  selectedCollectionKeys={filters.collectionKeys}
                  onUpdate={(collectionKey: string) =>
                    handleCollectionChange(collectionKey)
                  }
                />
              </div>

              <div className="col-span-full flex w-full flex-col items-start justify-start gap-x-4 gap-y-2 border-b border-b-primary-800 pb-4 pt-2">
                <ItemCategoryFilters
                  defaultItemCategories={defaultItemCategories}
                  selectedItemCategories={filters.itemCategories}
                  onReset={(itemCategories: ItemLookupCategory[]) =>
                    handleApplyFilters({ ...filters, itemCategories })
                  }
                  onUpdate={(itemCategory: ItemLookupCategory) =>
                    handleCategoryChange(itemCategory)
                  }
                />
              </div>
            </FiltersContainer>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
