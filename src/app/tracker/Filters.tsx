import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { ClearFiltersButton } from '@/features/filters/components/parts/ClearFiltersButton'
import { RELEASE_TO_NAME } from '@/features/items/constants'
import { FilteredItem } from '@/features/items/hooks/useFilteredItems'
import { ReleaseKey } from '@/features/items/types'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { Checkbox } from '@/features/ui/Checkbox'
import { SearchInput } from '@/features/ui/SearchInput'
import { capitalize } from '@/lib/capitalize'
import { cn } from '@/lib/classnames'

import { ItemTrackerCategory } from './page'

interface Props {
  allItems: FilteredItem[]
  itemCategories: ItemTrackerCategory[]
  showBorder?: boolean
  onUpdate: (filteredItems: FilteredItem[]) => void
}

export function Filters({
  allItems,
  itemCategories,
  showBorder = true,
  onUpdate,
}: Props) {
  const { discoveredItemIds } = useLocalStorage()

  function clearFilters() {
    setSearchText('')
    setIncludedDlcKeys(defaultReleaseKeys)
    setIncludedCollectionKeys(defaultCollectionKeys)
    setIncludedItemCategories(defaultItemCategories)
  }

  const areAnyFiltersActive = () => {
    return (
      searchText !== '' ||
      includedDlcKeys.length !== defaultReleaseKeys.length ||
      includedCollectionKeys.length !== defaultCollectionKeys.length ||
      includedItemCategories.length !== defaultItemCategories.length
    )
  }

  /**
   * ------------------------------------
   * Search Text
   * ------------------------------------
   */
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useDebounceValue(
    searchText,
    500,
  )

  function handleSearchTextChange(newValue: string) {
    setSearchText(newValue)
  }

  /**
   * ------------------------------------
   * DLC Filters
   * ------------------------------------
   */

  const defaultReleaseKeys: ReleaseKey[] = ['base', 'dlc1']
  const [includedDlcKeys, setIncludedDlcKeys] =
    useState<ReleaseKey[]>(defaultReleaseKeys)

  function handleDlcFilterChange(releaseKey: ReleaseKey) {
    if (includedDlcKeys.includes(releaseKey)) {
      setIncludedDlcKeys(includedDlcKeys.filter((key) => key !== releaseKey))
    } else {
      setIncludedDlcKeys([...includedDlcKeys, releaseKey])
    }
  }

  /**
   * ------------------------------------
   * Collection Filters
   * ------------------------------------
   */

  const defaultCollectionKeys = ['Discovered', 'Undiscovered']
  const [includedCollectionKeys, setIncludedCollectionKeys] = useState<
    typeof defaultCollectionKeys
  >(defaultCollectionKeys)

  function handleCollectionFilterChange(collectionKey: string) {
    if (includedCollectionKeys.includes(collectionKey)) {
      setIncludedCollectionKeys(
        includedCollectionKeys.filter((key) => key !== collectionKey),
      )
    } else {
      setIncludedCollectionKeys([...includedCollectionKeys, collectionKey])
    }
  }

  /**
   * ------------------------------------
   * Category Filters
   * ------------------------------------
   */
  const defaultItemCategories: ItemTrackerCategory[] = itemCategories.sort(
    (a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    },
  )
  const [includedItemCategories, setIncludedItemCategories] = useState<
    ItemTrackerCategory[]
  >(defaultItemCategories)

  function handleCategoryFilterChange(itemCategory: ItemTrackerCategory) {
    if (
      includedItemCategories.some(
        (includedCategory) =>
          includedCategory.category === itemCategory.category &&
          includedCategory.type === itemCategory.type,
      )
    ) {
      setIncludedItemCategories(
        includedItemCategories.filter(
          (includedCategory) =>
            includedCategory.category !== itemCategory.category &&
            includedCategory.type !== itemCategory.type,
        ),
      )
    } else {
      setIncludedItemCategories([...includedItemCategories, itemCategory])
    }
  }

  /**
   * ------------------------------------
   * Applies the filters as they change
   * ------------------------------------
   */
  useEffect(() => {
    // Add discovered to the items
    let filteredItems = allItems.map((item) => ({
      ...item,
      discovered: discoveredItemIds.includes(item.id),
    }))

    // Filter out the search text
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase()),
    )

    // Filter out the collections
    filteredItems = filteredItems.filter((item) => {
      if (
        includedCollectionKeys.includes('Discovered') &&
        includedCollectionKeys.includes('Undiscovered')
      ) {
        return true
      } else if (includedCollectionKeys.includes('Undiscovered')) {
        return item.discovered === false
      } else if (includedCollectionKeys.includes('Discovered')) {
        return item.discovered === true
      } else {
        return false
      }
    })

    // Filter out the DLCs
    filteredItems = filteredItems.filter((item) => {
      if (item.dlc === undefined) {
        return includedDlcKeys.includes('base')
      }

      return includedDlcKeys.includes(item.dlc as ReleaseKey)
    })

    // Filter out the categories
    filteredItems = filteredItems.filter((item) => {
      if (item.category === undefined) {
        return true
      }

      return includedItemCategories.some((category) => {
        if (WeaponItem.isWeaponItem(item) || MutatorItem.isMutatorItem(item)) {
          return (
            item.category === category.category && item.type === category.type
          )
        }
        return item.category === category.category
      })
    })

    onUpdate(filteredItems)
  }, [
    allItems,
    debouncedSearchText,
    discoveredItemIds,
    includedCollectionKeys,
    includedDlcKeys,
    includedItemCategories,
    onUpdate,
  ])

  return (
    <div
      className={cn(
        'relative h-full max-h-fit w-full transform overflow-y-auto border-2 border-purple-500 bg-black px-4 pb-4 pt-4 text-left shadow-lg shadow-purple-500/50 sm:my-8 sm:p-6',
        !showBorder && 'border-transparent',
        showBorder &&
          areAnyFiltersActive() &&
          'border-yellow-500 shadow-xl shadow-yellow-500/50',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 divide-y divide-green-800 bg-black sm:grid-cols-4">
        <div className="col-span-full pt-2">
          <div className="flex w-full items-center justify-start gap-x-4">
            <span className="flex items-center justify-start text-left text-sm font-bold text-green-500">
              Search
            </span>
            <div className="grow">
              <SearchInput
                onChange={handleSearchTextChange}
                value={searchText}
                placeholder={'Search item names and descriptions'}
              />
            </div>
          </div>
        </div>

        <div className="col-span-full pt-2 sm:col-span-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-start justify-start text-left text-sm font-bold text-green-500">
              By Release
            </span>
            <div className="text-xs">
              <button
                className="underline"
                aria-label="Uncheck all DLCs"
                onClick={() => setIncludedDlcKeys([])}
              >
                Uncheck All
              </button>{' '}
              /{' '}
              <button
                className="underline"
                aria-label="Check all DLCs"
                onClick={() => setIncludedDlcKeys(defaultReleaseKeys)}
              >
                Check All
              </button>
            </div>
            <div className="grid grid-cols-2 text-left">
              {defaultReleaseKeys.map((key) => {
                const dlcName = RELEASE_TO_NAME[key]
                return (
                  <div key={key}>
                    <Checkbox
                      label={dlcName}
                      name={`dlc-${key}`}
                      checked={includedDlcKeys.includes(key)}
                      onChange={() => handleDlcFilterChange(key)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-span-full pt-2 sm:col-span-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-start justify-start text-left text-sm font-bold text-green-500">
              By Collection
            </span>
            <div className="text-xs">
              <button
                className="underline"
                aria-label="Uncheck all collections"
                onClick={() => setIncludedCollectionKeys([])}
              >
                Uncheck All
              </button>{' '}
              /{' '}
              <button
                className="underline"
                aria-label="Check all collections"
                onClick={() => setIncludedCollectionKeys(defaultCollectionKeys)}
              >
                Check All
              </button>
            </div>
            <div className="grid grid-cols-2 text-left">
              {defaultCollectionKeys.map((key) => {
                return (
                  <div key={key}>
                    <Checkbox
                      label={key}
                      name={`collection-${key}`}
                      checked={includedCollectionKeys.includes(key)}
                      onChange={() => handleCollectionFilterChange(key)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-span-full pt-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-center justify-start text-left text-sm font-bold text-green-500">
              By Category
            </span>
            <div className="text-xs">
              <button
                className="underline"
                aria-label="Uncheck all categories"
                onClick={() => setIncludedItemCategories([])}
              >
                Uncheck All
              </button>{' '}
              /{' '}
              <button
                className="underline"
                aria-label="Check all categories"
                onClick={() => setIncludedItemCategories(defaultItemCategories)}
              >
                Check All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-8 text-left sm:grid-cols-3 md:grid-cols-4">
              {defaultItemCategories.map((itemCategory) => {
                const label =
                  itemCategory.label === 'relicfragment'
                    ? 'Relic Fragment'
                    : capitalize(itemCategory.label)
                return (
                  <div key={itemCategory.label}>
                    <Checkbox
                      label={label}
                      name={`category-${itemCategory.label}`}
                      checked={includedItemCategories.some((c) => {
                        return (
                          c.category === itemCategory.category &&
                          c.type === itemCategory.type
                        )
                      })}
                      onChange={() => handleCategoryFilterChange(itemCategory)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {areAnyFiltersActive() && (
          <div className="col-span-full flex items-center justify-end pt-4">
            <ClearFiltersButton onClick={clearFilters} />
          </div>
        )}
      </div>
    </div>
  )
}
