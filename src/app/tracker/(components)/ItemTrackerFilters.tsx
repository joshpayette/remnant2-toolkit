import { useCallback, useEffect, useState } from 'react'
import { useDebounceValue, useLocalStorage } from 'usehooks-ts'

import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { FilteredItem } from '@/app/tracker/(lib)/useFilteredItems'
import { RELEASE_TO_NAME } from '@/features/items/constants'
import { ReleaseKey } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { ClearFiltersButton } from '@/features/ui/filters/ClearFiltersButton'
import { SearchInput } from '@/features/ui/SearchInput'
import { SelectMenu } from '@/features/ui/SelectMenu'
import { cn } from '@/lib/classnames'

import { ItemTrackerCategory, LocalStorage } from '../(lib)/types'

const DEFAULT_ITEM_CATEGORY: ItemTrackerCategory = 'archetype'

function doFilterItems({
  allItems,
  debouncedSearchText,
  discoveredItemIds,
  includedCollectionKeys,
  includedDlcKeys,
  selectedItemCategory,
}: {
  allItems: FilteredItem[]
  debouncedSearchText: string
  discoveredItemIds: string[]
  includedCollectionKeys: string[]
  includedDlcKeys: ReleaseKey[]
  selectedItemCategory: ItemTrackerCategory
}) {
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
    if (WeaponItem.isWeaponItem(item) && item.type === 'long gun') {
      return selectedItemCategory === 'long gun'
    } else if (WeaponItem.isWeaponItem(item) && item.type === 'hand gun') {
      return selectedItemCategory === 'hand gun'
    } else if (WeaponItem.isWeaponItem(item) && item.type === 'melee') {
      return selectedItemCategory === 'melee'
    } else if (MutatorItem.isMutatorItem(item) && item.type === 'gun') {
      return selectedItemCategory === 'mutator (gun)'
    } else if (MutatorItem.isMutatorItem(item) && item.type === 'melee') {
      return selectedItemCategory === 'mutator (melee)'
    } else {
      return item.category === selectedItemCategory
    }
  })

  return filteredItems
}

interface Props {
  allItems: FilteredItem[]
  itemCategoryOptions: Array<{ label: string; value: string }>
  showBorder?: boolean
  onUpdate: (filteredItems: FilteredItem[]) => void
}

export function ItemTrackerFilters({
  allItems,
  itemCategoryOptions,
  showBorder = true,
  onUpdate,
}: Props) {
  const [tracker] = useLocalStorage<LocalStorage>(
    'item-tracker',
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { discoveredItemIds } = tracker

  function clearFilters() {
    setSearchText('')
    setIncludedDlcKeys(defaultReleaseKeys)
    setIncludedCollectionKeys(defaultCollectionKeys)
    updateFilteredItems()
  }

  const areAnyFiltersActive = () => {
    return (
      searchText !== '' ||
      includedDlcKeys.length !== defaultReleaseKeys.length ||
      includedCollectionKeys.length !== defaultCollectionKeys.length
    )
  }

  /**
   * ------------------------------------
   * Search Text
   * ------------------------------------
   */
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText] = useDebounceValue(searchText, 500)

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
  const [selectedItemCategory, setSelectedItemCategory] =
    useState<ItemTrackerCategory>(DEFAULT_ITEM_CATEGORY)

  function handleItemCategoryFilterChange(category: ItemTrackerCategory) {
    setSelectedItemCategory(category)
    updateFilteredItems()
  }

  const updateFilteredItems = useCallback(() => {
    const filteredItems = doFilterItems({
      allItems,
      debouncedSearchText,
      discoveredItemIds,
      includedCollectionKeys,
      includedDlcKeys,
      selectedItemCategory,
    })
    onUpdate(filteredItems)
  }, [
    allItems,
    debouncedSearchText,
    discoveredItemIds,
    includedCollectionKeys,
    includedDlcKeys,
    selectedItemCategory,
    onUpdate,
  ])

  /**
   * ------------------------------------
   * Updates the filters when the search
   * text changes
   * ------------------------------------
   */
  useEffect(() => {
    updateFilteredItems()
  }, [debouncedSearchText, updateFilteredItems])

  return (
    <div
      className={cn(
        'relative h-full max-h-fit w-full transform overflow-y-auto border-2 border-secondary-500 bg-black p-4 text-left shadow-lg shadow-secondary-500/50',
        !showBorder && 'border-transparent',
        showBorder &&
          areAnyFiltersActive() &&
          'border-accent1-300 shadow-xl shadow-accent1-600',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-2 bg-black sm:grid-cols-4">
        <div className="col-span-full border border-transparent border-b-primary-800 pb-2 sm:col-span-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4">
            <span className="sr-only mb-2 flex items-center justify-start text-left text-sm font-bold text-primary-500">
              Search
            </span>

            <SearchInput
              onChange={handleSearchTextChange}
              value={searchText}
              placeholder={'Search item names and descriptions'}
            />
          </div>
        </div>

        <div className="col-span-full border border-transparent border-b-primary-800 pb-2 sm:col-span-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4">
            <SelectMenu
              label="Category"
              showLabel={false}
              value={selectedItemCategory as string}
              options={itemCategoryOptions.map((option) =>
                option.value === 'relicfragment'
                  ? {
                      label: option.label.replace(
                        'Relicfragment',
                        'Relic Fragment',
                      ),
                      value: option.value,
                    }
                  : option,
              )}
              onChange={(e) =>
                handleItemCategoryFilterChange(
                  e.target.value as ItemTrackerCategory,
                )
              }
            />
          </div>
        </div>

        <div className="col-span-full sm:col-span-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-start justify-start text-left text-sm font-bold text-primary-500">
              By Release
            </span>
            <div className="text-xs">
              <button
                className="underline"
                aria-label="Check all DLCs"
                onClick={() => {
                  setIncludedDlcKeys(defaultReleaseKeys)
                  updateFilteredItems()
                }}
              >
                Check All
              </button>{' '}
              /{' '}
              <button
                className="underline"
                aria-label="Uncheck all DLCs"
                onClick={() => {
                  setIncludedDlcKeys([])
                  updateFilteredItems()
                }}
              >
                Uncheck All
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
            <span className="flex items-start justify-start text-left text-sm font-bold text-primary-500">
              By Collection
            </span>
            <div className="text-xs">
              <button
                className="underline"
                aria-label="Check all collections"
                onClick={() => {
                  setIncludedCollectionKeys(defaultCollectionKeys)
                  updateFilteredItems()
                }}
              >
                Check All
              </button>{' '}
              /{' '}
              <button
                className="underline"
                aria-label="Uncheck all collections"
                onClick={() => {
                  setIncludedCollectionKeys([])
                  updateFilteredItems()
                }}
              >
                Uncheck All
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

        {areAnyFiltersActive() && (
          <div className="col-span-full flex items-center justify-end pt-4">
            <ClearFiltersButton onClick={clearFilters} />
          </div>
        )}
      </div>
    </div>
  )
}
