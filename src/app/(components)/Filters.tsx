import { useEffect, useState } from 'react'
import { DLCKey, DLC_TO_NAME } from '../(types)'
import SearchInput from './SearchInput'
import { useDebounce } from 'usehooks-ts'
import Dialog from './Dialog'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { FilteredItem } from '../(hooks)/useFilteredItems'
import { useLocalStorage } from '../(hooks)/useLocalStorage'

interface Props {
  allItems: FilteredItem[]
  onUpdate: (filteredItems: FilteredItem[]) => void
}

export default function Filters({ allItems, onUpdate }: Props) {
  const [filtersOpen, setFiltersOpen] = useState(false)

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
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearchText.toLowerCase()),
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

    onUpdate(filteredItems)
  }, [
    allItems,
    debouncedSearchText,
    discoveredItemIds,
    includedCollectionKeys,
    includedDlcKeys,
    onUpdate,
  ])

  return (
    <div className="flex w-full flex-col items-start justify-start">
      <button
        className="flex w-auto items-center justify-center gap-1 rounded-md border-2 border-transparent bg-purple-500 bg-gradient-to-b p-2 text-sm font-bold text-black drop-shadow-md hover:border-purple-300"
        onClick={() => setFiltersOpen(true)}
      >
        <FunnelIcon className="h-5 w-5" />
      </button>

      <Dialog
        title="Filters"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        maxWidthClass="max-w-3xl"
      >
        <div className="grid-cols-full grid gap-x-8 gap-y-4 divide-y divide-green-800 sm:grid-cols-4">
          <div className="col-span-full ">
            <button
              className="flex w-auto items-center justify-center gap-1 rounded-md border border-purple-500 bg-black bg-gradient-to-b p-2 text-sm font-bold text-purple-500 drop-shadow-md hover:bg-purple-500 hover:text-black"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
          <div className="col-span-full pt-2">
            <div className="flex w-full items-center justify-start gap-x-4">
              <span className="flex items-center justify-start text-left text-sm font-bold text-green-500">
                Search
              </span>
              <div className="grow">
                <SearchInput
                  onChange={handleSearchTextChange}
                  value={searchText}
                />
              </div>
            </div>
          </div>
          <div className="col-span-full pt-2 sm:col-span-2">
            <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
              <span className="flex items-start justify-start text-left text-sm font-bold text-green-500">
                By Release
              </span>
              <div className="grid grid-cols-2 text-left">
                {Object.keys(DLC_TO_NAME).map((dlcKey) => {
                  const dlcName = DLC_TO_NAME[dlcKey as DLCKey]
                  return (
                    <div key={dlcKey}>
                      <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id={`dlc-${dlcKey}`}
                            aria-describedby={`dlc-${dlcKey}-description`}
                            name={`dlc-${dlcKey}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                            checked={includedDlcKeys.includes(dlcKey as DLCKey)}
                            onChange={() =>
                              handleDlcFilterChange(dlcKey as DLCKey)
                            }
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor={`dlc-${dlcKey}`}
                            className="font-medium text-gray-400"
                          >
                            {dlcName}
                          </label>
                        </div>
                      </div>
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
              <div className="grid grid-cols-2 text-left">
                {['Discovered', 'Undiscovered'].map((key) => {
                  return (
                    <div key={key}>
                      <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id={`collection-${key}`}
                            name={`collection-${key}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                            checked={includedCollectionKeys.includes(key)}
                            onChange={() => handleCollectionFilterChange(key)}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor={`collection-${key}`}
                            className="font-medium text-gray-400"
                          >
                            {key}
                          </label>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
