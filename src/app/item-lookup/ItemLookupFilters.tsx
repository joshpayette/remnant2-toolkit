import isEqual from 'lodash.isequal'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'

import {
  CollectedItemFilters,
  DEFAULT_COLLECTION_FILTERS,
} from '@/features/filters/components/parts/CollectedItemFilters'
import { FiltersContainer } from '@/features/filters/components/parts/FiltersContainer'
import { ItemCategoryFilters } from '@/features/filters/components/parts/ItemCategoryFilters'
import {
  DEFAULT_RELEASE_FILTERS,
  ReleaseFilters,
} from '@/features/filters/components/parts/ReleaseFilters'
import { SearchTextAutocomplete } from '@/features/filters/components/parts/SearchTextAutocomplete'
import {
  ItemLookupCategory,
  ItemLookupFilterFields,
} from '@/features/filters/types'
import { DESCRIPTION_TAGS, ITEM_TAGS } from '@/features/items/constants'
import {
  remnantItemCategories,
  remnantItems,
} from '@/features/items/data/remnantItems'
import { ReleaseKey } from '@/features/items/types'
import { capitalize } from '@/lib/capitalize'

function buildItemList(): Array<{ id: string; name: string }> {
  let items = remnantItems
    .filter((item) => item.category !== 'relicfragment')
    .map((item) => ({
      id: item.id,
      name: item.name,
    }))

  // items = remnantBosses
  //   .map((boss) => ({ id: boss.id, name: boss.name }))
  //   .concat(items)

  items = DESCRIPTION_TAGS.map((tag) => ({
    id: tag.token as string,
    name: tag.type as string,
  })).concat(items)

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

const subCategories: ItemLookupCategory[] = [
  'Long Gun',
  'Hand Gun',
  'Melee',
  'Mutator (Gun)',
  'Mutator (Melee)',
]

let defaultItemCategories: ItemLookupCategory[] = remnantItemCategories
  .map((category) => capitalize(category))
  .filter((category) => category !== 'weapon' && category !== 'mutator')
// Add the subcategories
defaultItemCategories.push(...subCategories)
// Sort alphabetically
defaultItemCategories = defaultItemCategories.sort()

export const DEFAULT_ITEM_LOOKUP_FILTERS: ItemLookupFilterFields = {
  collectionKeys: DEFAULT_COLLECTION_FILTERS,
  itemCategories: defaultItemCategories,
  searchText: '',
  selectedReleases: DEFAULT_RELEASE_FILTERS,
}

interface Props {
  filters: ItemLookupFilterFields
}

export function ItemLookupFilters({ filters }: Props) {
  const pathname = usePathname()

  // Tracks the filter changes by the user that are not yet applied
  // via clicking the Apply Filters button
  const [unappliedFilters, setUnappliedFilters] =
    useState<ItemLookupFilterFields>(filters)

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
  }

  function handleCategoryChange(category: ItemLookupCategory) {
    let newCategories = [...unappliedFilters.itemCategories]

    if (newCategories.includes(category)) {
      newCategories = newCategories.filter((c) => c !== category)
    } else {
      newCategories.push(category)
    }

    setUnappliedFilters({ ...unappliedFilters, itemCategories: newCategories })
    if (filters.itemCategories.some((c) => !newCategories.includes(c))) {
      setAreFiltersApplied(false)
    }
  }

  function handleCollectionChange(collection: string) {
    let newCollection = [...unappliedFilters.collectionKeys]

    if (newCollection.includes(collection)) {
      newCollection = newCollection.filter((c) => c !== collection)
    } else {
      newCollection.push(collection)
    }

    setUnappliedFilters({ ...unappliedFilters, collectionKeys: newCollection })

    if (filters.collectionKeys.some((c) => !newCollection.includes(c))) {
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

  function handleSearchTextChange(searchQuery: string) {
    setUnappliedFilters({ ...unappliedFilters, searchText: searchQuery })
    if (searchQuery !== filters.searchText) {
      setAreFiltersApplied(false)
    }
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

    // We don't use router here because we want to reload the page,
    // which in turn reapplies the filters. We tried this with the
    // router but it was causing an infinite loop of re-rendering
    window.location.href = finalPath
  }

  return (
    <FiltersContainer<ItemLookupFilterFields>
      areFiltersApplied={areFiltersApplied}
      areAnyFiltersActive={areAnyFiltersActive}
      filters={unappliedFilters}
      onApplyFilters={handleApplyFilters}
      onClearFilters={handleClearFilters}
    >
      <div className="col-span-full flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex w-full max-w-[400px] flex-col items-start justify-center">
          <SearchTextAutocomplete
            items={buildItemList()}
            onChange={(newSearchText: string) =>
              handleSearchTextChange(newSearchText)
            }
            onKeyDown={() => handleApplyFilters(unappliedFilters)}
            value={unappliedFilters.searchText}
          />
        </div>
      </div>

      <div className="col-span-full flex w-full sm:col-span-2">
        <ReleaseFilters
          selectedReleases={unappliedFilters.selectedReleases}
          onChange={(release: ReleaseKey) => handleReleaseChange(release)}
        />
      </div>
      <div className="col-span-full flex w-full sm:col-span-2">
        <CollectedItemFilters
          selectedCollectionKeys={unappliedFilters.collectionKeys}
          onUpdate={(collectionKey: string) =>
            handleCollectionChange(collectionKey)
          }
        />
      </div>

      <ItemCategoryFilters
        defaultItemCategories={defaultItemCategories}
        selectedItemCategories={unappliedFilters.itemCategories}
        onReset={(itemCategories: ItemLookupCategory[]) =>
          setUnappliedFilters({ ...unappliedFilters, itemCategories })
        }
        onUpdate={(itemCategory: ItemLookupCategory) =>
          handleCategoryChange(itemCategory)
        }
      />
    </FiltersContainer>
  )
}
