import { remnantItemCategories } from '@/features/items/data/remnantItems'
import CollectedItemFilters, {
  DEFAULT_COLLECTION_FILTERS,
} from './parts/CollectedItemFilters'
import { ItemCategory } from '@/features/build/types'
import ReleaseFilters, { DEFAULT_RELEASE_FILTERS } from './parts/ReleaseFilters'
import { ItemLookupFilterFields } from '../types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FiltersContainer from './parts/FiltersContainer'
import { useEffect, useMemo, useState } from 'react'
import { RELEASE_TO_NAME } from '@/features/items/constants'
import { ReleaseKey } from '@/features/items/types'
import SearchItemsFilter from './parts/SearchItemsFilter'
import isEqual from 'lodash.isequal'
import { capitalize } from '@/lib/capitalize'
import ItemCategoryFilters from './parts/ItemCategoryFilters'

const DEFAULT_ITEM_CATEGORY_FILTERS: ItemCategory[] =
  remnantItemCategories.sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })

export const DEFAULT_ITEM_LOOKUP_FILTERS: ItemLookupFilterFields = {
  collectionKeys: DEFAULT_COLLECTION_FILTERS,
  itemCategories: DEFAULT_ITEM_CATEGORY_FILTERS,
  searchText: '',
  selectedReleases: DEFAULT_RELEASE_FILTERS,
}

interface Props {
  onUpdateFilters: (newFilters: ItemLookupFilterFields) => void
}

export default function ItemLookupFilters({ onUpdateFilters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedSearchTag, setSelectedSearchTag] = useState('[A]')

  // Get the filters from the URL
  const filters = useMemo(() => {
    const params = new URLSearchParams(searchParams)
    let collection = params.get('collection')
    let categories = params.get('categories')
    let releases = params.get('releases')
    let searchText = params.get('searchText')

    // check if categories are valid
    if (categories) {
      const allCategories: ItemCategory[] = remnantItemCategories
      const categoriesArray = categories.split(',')
      categoriesArray.forEach((category) => {
        if (!allCategories.includes(category as ItemCategory)) {
          categories = DEFAULT_ITEM_LOOKUP_FILTERS['itemCategories'].join(',')
        }
      })
    } else {
      categories = DEFAULT_ITEM_LOOKUP_FILTERS['itemCategories'].join(',')
    }

    // check if collection is valid
    if (collection) {
      if (
        !DEFAULT_COLLECTION_FILTERS.includes(
          capitalize(collection.toLowerCase()),
        )
      ) {
        collection = DEFAULT_ITEM_LOOKUP_FILTERS['collectionKeys'].join(',')
      }
    } else {
      collection = DEFAULT_ITEM_LOOKUP_FILTERS['collectionKeys'].join(',')
    }

    // check if releases are valid
    if (releases) {
      const allReleases: ReleaseKey[] =
        DEFAULT_ITEM_LOOKUP_FILTERS['selectedReleases']
      const releasesArray = releases.split(',')
      releasesArray.forEach((release) => {
        if (!allReleases.includes(release as ReleaseKey)) {
          releases = DEFAULT_ITEM_LOOKUP_FILTERS['selectedReleases'].join(',')
        }
      })
    }

    return {
      collectionKeys: collection ? collection.split(',') : [],
      itemCategories: categories
        ? (categories.split(',') as ItemCategory[])
        : [],
      searchText: searchText || DEFAULT_ITEM_LOOKUP_FILTERS['searchText'],
      selectedReleases: releases
        ? (releases.split(',') as ReleaseKey[])
        : DEFAULT_ITEM_LOOKUP_FILTERS['selectedReleases'],
    } satisfies ItemLookupFilterFields
  }, [searchParams])

  // Tracks the filter changes by the user that are not yet applied
  // via clicking the Apply Filters button
  const [unappliedFilters, setUnappliedFilters] =
    useState<ItemLookupFilterFields>(filters)

  // This is used to check if the filters are applied
  // This is used to determine if the Apply Filters button should pulsate
  // for the user to indicate they need to apply the changes
  const [areFiltersApplied, setAreFiltersApplied] = useState(true)

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

  // Once the initial filters are parsed from the URL,
  // pass this information up to the page so it can render
  // the builds list with the correct filters
  useEffect(() => {
    onUpdateFilters(filters)
    setAreFiltersApplied(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  function handleClearFilters() {
    setSelectedSearchTag('[A]')
    setUnappliedFilters(DEFAULT_ITEM_LOOKUP_FILTERS)
    handleApplyFilters(DEFAULT_ITEM_LOOKUP_FILTERS)
  }

  function handleCategoryChange(category: ItemCategory) {
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
    if (filters.itemCategories.length === newCategories.length) {
      setAreFiltersApplied(true)
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
    if (isEqual(filters.collectionKeys, newCollection)) {
      setAreFiltersApplied(true)
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
    if (isEqual(filters.selectedReleases, newReleases)) {
      setAreFiltersApplied(true)
    }
  }

  function handleSearchTagApply() {
    let newSearchText = unappliedFilters.searchText.trim()
    if (newSearchText === '') {
      newSearchText = selectedSearchTag
    } else {
      newSearchText = `${newSearchText} ${selectedSearchTag}`
    }

    handleSearchTextChange(newSearchText)
  }

  function handleSearchTagChange(newSearchTag: string) {
    setSelectedSearchTag(newSearchTag)
  }

  function handleSearchTextChange(searchQuery: string) {
    setUnappliedFilters({ ...unappliedFilters, searchText: searchQuery })
    if (searchQuery !== filters.searchText) {
      setAreFiltersApplied(false)
    } else {
      setAreFiltersApplied(true)
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

    router.push(finalPath, { scroll: false })
  }

  return (
    <FiltersContainer<ItemLookupFilterFields>
      areFiltersApplied={areFiltersApplied}
      areAnyFiltersActive={areAnyFiltersActive}
      filters={unappliedFilters}
      onApplyFilters={handleApplyFilters}
      onClearFilters={handleClearFilters}
    >
      <SearchItemsFilter
        selectedSearchTag={selectedSearchTag}
        searchText={unappliedFilters.searchText}
        onSearchTagApply={handleSearchTagApply}
        onSearchTagChange={(newSearchTag: string) =>
          handleSearchTagChange(newSearchTag)
        }
        onSearchTextChange={(newSearchText: string) =>
          handleSearchTextChange(newSearchText)
        }
      />

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
        selectedItemCategories={unappliedFilters.itemCategories}
        onReset={(itemCategories: ItemCategory[]) =>
          setUnappliedFilters({ ...unappliedFilters, itemCategories })
        }
        onUpdate={(itemCategory: ItemCategory) =>
          handleCategoryChange(itemCategory)
        }
      />
    </FiltersContainer>
  )
}
