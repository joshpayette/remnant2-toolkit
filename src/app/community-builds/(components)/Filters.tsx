'use client'

import { cn } from '@/app/(lib)/utils'
import { SearchFilters } from '../search/page'
import { DLC_TO_NAME } from '@/app/(types)'
import { useState } from 'react'
import Skeleton from '@/app/(components)/Skeleton'
import ClearFiltersButton from '@/app/(components)/ClearFiltersButton'
import { useSession } from 'next-auth/react'

export const defaultFilters: SearchFilters = {
  ownedItemsOnly: false,
  specificDLCItemsOnly: ['base', 'dlc1'],
}

interface Props {
  isLoading: boolean
  onUpdate: (filters: SearchFilters) => void
}

export default function Filters({ isLoading, onUpdate }: Props) {
  const { data: sessionData } = useSession()

  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(defaultFilters)

  function clearFilters() {
    setSearchFilters(defaultFilters)
  }

  const areAnyFiltersActive = () => {
    if (
      searchFilters.ownedItemsOnly !== defaultFilters.ownedItemsOnly ||
      searchFilters.specificDLCItemsOnly !== defaultFilters.specificDLCItemsOnly
    ) {
      return true
    }
    return false
  }

  return (
    <div
      className={cn(
        'h-full max-h-fit max-w-lg transform overflow-y-auto border-2 border-green-500 bg-black px-4 pb-4 pt-4 text-left shadow-lg shadow-green-500/50 sm:my-8 sm:p-6',
        areAnyFiltersActive() &&
          'border-yellow-500 shadow-xl shadow-yellow-500/50',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 divide-y divide-green-800 bg-black">
        {areAnyFiltersActive() && (
          <div className="col-span-full flex items-center justify-end">
            <ClearFiltersButton onClick={clearFilters} />
          </div>
        )}
        <div className="relative col-span-full pt-2">
          {sessionData?.user?.id === undefined && (
            <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-90 text-sm font-bold text-red-500">
              You must sign in to search by items you own
            </div>
          )}
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-start justify-start text-left text-sm font-bold text-green-500">
              By Collection
            </span>
            <div className="text-left">
              <Checkbox
                label="Limit to items you own (based on Item Tracker)"
                name={`filter-owned-items`}
                checked={searchFilters.ownedItemsOnly}
                disabled={sessionData?.user?.id === undefined}
                onChange={() => {
                  const newFilter = !searchFilters.ownedItemsOnly

                  // if owned items is checked, uncheck all dlc
                  if (newFilter) {
                    setSearchFilters({
                      ...searchFilters,
                      ownedItemsOnly: newFilter,
                      specificDLCItemsOnly: [],
                    })
                  } else {
                    setSearchFilters({
                      ...searchFilters,
                      ownedItemsOnly: newFilter,
                    })
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-span-full pt-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-start justify-start text-left text-sm font-bold text-green-500">
              By Release
            </span>
            <div className="text-xs">
              <button
                className="underline"
                onClick={() =>
                  setSearchFilters({
                    ...searchFilters,
                    specificDLCItemsOnly: [],
                  })
                }
              >
                Uncheck All
              </button>{' '}
              /{' '}
              <button
                className="underline"
                onClick={() =>
                  setSearchFilters({
                    ...searchFilters,
                    specificDLCItemsOnly: defaultFilters.specificDLCItemsOnly,
                  })
                }
              >
                Check All
              </button>
            </div>

            <div className="grid grid-cols-2 text-left">
              {defaultFilters.specificDLCItemsOnly.map((key) => {
                const dlcName = DLC_TO_NAME[key]
                return (
                  <div key={key}>
                    <Checkbox
                      label={dlcName}
                      name={`dlc-${key}`}
                      checked={searchFilters.specificDLCItemsOnly.includes(key)}
                      onChange={() => {
                        let newFilters = []
                        if (searchFilters.specificDLCItemsOnly.includes(key)) {
                          newFilters =
                            searchFilters.specificDLCItemsOnly.filter(
                              (item) => item !== key,
                            )
                        } else {
                          newFilters = [
                            ...searchFilters.specificDLCItemsOnly,
                            key,
                          ]
                        }
                        // if any dlc is checked, uncheck owned items
                        if (searchFilters.ownedItemsOnly) {
                          setSearchFilters({
                            ...searchFilters,
                            specificDLCItemsOnly: newFilters,
                            ownedItemsOnly: false,
                          })
                        } else {
                          setSearchFilters({
                            ...searchFilters,
                            specificDLCItemsOnly: newFilters,
                          })
                        }
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-span-full flex items-center justify-end pt-4">
          {isLoading ? (
            <Skeleton />
          ) : (
            <button
              className="rounded-lg bg-green-500 p-2 text-sm font-bold text-white hover:bg-green-700"
              onClick={() => onUpdate(searchFilters)}
              disabled={isLoading}
            >
              Apply Filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Checkbox({
  checked,
  disabled = false,
  label,
  name,
  onChange,
}: {
  checked: boolean
  disabled?: boolean
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
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600 disabled:opacity-50"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
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
