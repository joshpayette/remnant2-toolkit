import { useEffect, useState } from 'react'
import { DLCKey, DLC_TO_NAME } from '../(types)'
import SearchInput from './SearchInput'
import { useDebounce } from 'usehooks-ts'
import { FilteredItem } from '../(hooks)/useFilteredItems'
import { useLocalStorage } from '../(hooks)/useLocalStorage'
import { ItemCategory } from '../(types)/build-state'
import { cn } from '../(lib)/utils'
import { remnantItemCategories } from '../(data)'

interface Props {
  allItems: FilteredItem[]
  itemCategories?: ItemCategory[]
  showBorder?: boolean
  onUpdate: (filteredItems: FilteredItem[]) => void
}

export default function Filters({
  allItems,
  itemCategories,
  showBorder = true,
  onUpdate,
}: Props) {
  const { itemTrackerStorage } = useLocalStorage()
  const { discoveredItemIds } = itemTrackerStorage

  /**
   * ------------------------------------
   * Search Text
   * ------------------------------------
   */
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 500)

  function handleSearchTextChange(newValue: string) {
    setSearchText(newValue)
  }

  /**
   * ------------------------------------
   * DLC Filters
   * ------------------------------------
   */

  const defaultDlcKeys: DLCKey[] = ['basegame', 'dlc1']
  const [includedDlcKeys, setIncludedDlcKeys] =
    useState<DLCKey[]>(defaultDlcKeys)

  function clearFilters() {
    setSearchText('')
    setIncludedDlcKeys(defaultDlcKeys)
    setIncludedCollectionKeys(defaultCollectionKeys)
    setIncludedCategoryKeys(defaultCategoryKeys)
  }

  function handleDlcFilterChange(dlcKey: DLCKey) {
    if (includedDlcKeys.includes(dlcKey)) {
      setIncludedDlcKeys(includedDlcKeys.filter((key) => key !== dlcKey))
    } else {
      setIncludedDlcKeys([...includedDlcKeys, dlcKey])
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
  const defaultCategoryKeys: ItemCategory[] =
    itemCategories?.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    }) ??
    remnantItemCategories.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
  const [includedCategoryKeys, setIncludedCategoryKeys] =
    useState<ItemCategory[]>(defaultCategoryKeys)

  function handleCategoryFilterChange(categoryKey: ItemCategory) {
    if (includedCategoryKeys.includes(categoryKey)) {
      setIncludedCategoryKeys(
        includedCategoryKeys.filter((key) => key !== categoryKey),
      )
    } else {
      setIncludedCategoryKeys([...includedCategoryKeys, categoryKey])
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
        return includedDlcKeys.includes('basegame')
      }

      return includedDlcKeys.includes(item.dlc as DLCKey)
    })

    // Filter out the categories
    filteredItems = filteredItems.filter((item) => {
      if (item.category === undefined) {
        return true
      }

      return includedCategoryKeys.includes(item.category as ItemCategory)
    })

    onUpdate(filteredItems)
  }, [
    allItems,
    debouncedSearchText,
    discoveredItemIds,
    includedCollectionKeys,
    includedDlcKeys,
    includedCategoryKeys,
    onUpdate,
  ])

  const areAnyFiltersActive = () => {
    return (
      searchText !== '' ||
      includedDlcKeys.length !== defaultDlcKeys.length ||
      includedCollectionKeys.length !== defaultCollectionKeys.length ||
      includedCategoryKeys.length !== defaultCategoryKeys.length
    )
  }

  return (
    <div
      className={cn(
        'relative h-full max-h-fit w-full transform overflow-y-auto border-2 border-green-500 bg-black px-4 pb-4 pt-4 text-left shadow-lg shadow-green-500/50 sm:my-8 sm:p-6',
        !showBorder && 'border-transparent',
        showBorder &&
          areAnyFiltersActive() &&
          'border-yellow-500 shadow-xl shadow-yellow-500/50',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 divide-y divide-green-800 bg-black sm:grid-cols-4">
        {areAnyFiltersActive() && (
          <div className="col-span-full flex items-center justify-end">
            <button
              className="flex w-auto items-center justify-center gap-1 rounded-md border border-green-400  bg-green-500 bg-gradient-to-b p-2 text-sm font-bold text-white drop-shadow-md hover:bg-green-700"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
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
                onClick={() => setIncludedDlcKeys([])}
              >
                Uncheck All
              </button>{' '}
              /{' '}
              <button
                className="underline"
                onClick={() => setIncludedDlcKeys(defaultDlcKeys)}
              >
                Check All
              </button>
            </div>
            <div className="grid grid-cols-2 text-left">
              {defaultDlcKeys.map((key) => {
                const dlcName = DLC_TO_NAME[key]
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
                onClick={() => setIncludedCollectionKeys([])}
              >
                Uncheck All
              </button>{' '}
              /{' '}
              <button
                className="underline"
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
                onClick={() => setIncludedCategoryKeys([])}
              >
                Uncheck All
              </button>{' '}
              /{' '}
              <button
                className="underline"
                onClick={() => setIncludedCategoryKeys(defaultCategoryKeys)}
              >
                Check All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-x-8 text-left sm:grid-cols-6">
              {defaultCategoryKeys.map((key) => {
                return (
                  <div key={key}>
                    <Checkbox
                      label={key}
                      name={`category-${key}`}
                      checked={includedCategoryKeys.includes(key)}
                      onChange={() => handleCategoryFilterChange(key)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Checkbox({
  checked,
  label,
  name,
  onChange,
}: {
  checked: boolean
  label: string
  name: string
  onChange: () => void
}) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={`${name}`}
          aria-describedby={`${name}-description`}
          name={`${name}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={`${name}`} className="font-medium text-gray-400">
          {label}
        </label>
      </div>
    </div>
  )
}
