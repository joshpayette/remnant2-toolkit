'use client'

import BuildCard from '@/app/(components)/BuildCard'
import BuildList from '@/app/(components)/BuildList'
import PageHeader from '@/app/(components)/PageHeader'
import usePagination from '@/app/(hooks)/usePagination'
import { DBBuild } from '@/app/(types)/build'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getBuilds } from './actions'
import { DLCKey, DLC_TO_NAME } from '@/app/(types)'
import Skeleton from '@/app/(components)/Skeleton'
import { cn } from '@/app/(lib)/utils'
import ClearFiltersButton from '@/app/(components)/ClearFiltersButton'

const ITEMS_PER_PAGE = 8
const DEFAULT_DLC_ITEMS: DLCKey[] = ['base', 'dlc1']

export default function Page() {
  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [specifiedDLCItems, setSpecifiedDLCItems] =
    useState<DLCKey[]>(DEFAULT_DLC_ITEMS)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<DLCKey[]>(DEFAULT_DLC_ITEMS)

  const {
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    pageNumbers,
    totalPages,
    handleSpecificPageClick,
    handleNextPageClick,
    handlePreviousPageClick,
  } = usePagination({
    totalItemCount: totalBuildCount,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    async function getBuildsByRelease() {
      const response = await getBuilds({
        itemsPerPage: ITEMS_PER_PAGE,
        pageNumber: currentPage,
        specifiedDLCItems,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setIsLoading(false)
    }

    getBuildsByRelease()
  }, [currentPage, specifiedDLCItems])

  function clearFilters() {
    setFilters(DEFAULT_DLC_ITEMS)
  }

  const areAnyFiltersActive = () => {
    return filters.length !== DEFAULT_DLC_ITEMS.length
  }

  return (
    <>
      <PageHeader
        title="Builds By Release"
        subtitle="Browse all community builds that contain only items from specific releases"
      >
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

            <div className="col-span-full pt-2">
              <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
                <span className="flex items-start justify-start text-left text-sm font-bold text-green-500">
                  By Release
                </span>
                <div className="text-xs">
                  <button className="underline" onClick={() => setFilters([])}>
                    Uncheck All
                  </button>{' '}
                  /{' '}
                  <button
                    className="underline"
                    onClick={() => setFilters(DEFAULT_DLC_ITEMS)}
                  >
                    Check All
                  </button>
                </div>

                <div className="grid grid-cols-2 text-left">
                  {DEFAULT_DLC_ITEMS.map((key) => {
                    const dlcName = DLC_TO_NAME[key]
                    return (
                      <div key={key}>
                        <Checkbox
                          label={dlcName}
                          name={`dlc-${key}`}
                          checked={filters.includes(key)}
                          onChange={() => {
                            let newFilters = []
                            if (filters.includes(key)) {
                              newFilters = filters.filter(
                                (item) => item !== key,
                              )
                            } else {
                              newFilters = [...filters, key]
                            }
                            setFilters(newFilters)
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
                  onClick={() => setSpecifiedDLCItems(filters)} // TODO
                  disabled={isLoading}
                >
                  Apply Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </PageHeader>

      <BuildList
        label="Build Results"
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        isLoading={isLoading}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={undefined}
      >
        {builds.map((build) => (
          <div key={build.id} className="h-full w-full">
            <BuildCard
              build={build}
              onReportBuild={undefined}
              footerActions={
                <div className="flex items-center justify-end gap-2 p-2 text-sm">
                  <Link
                    href={`/builder/${build.id}`}
                    className="relative inline-flex items-center justify-center gap-x-3 rounded-br-lg border border-transparent p-4 text-sm font-semibold text-green-500 hover:text-green-700 hover:underline"
                  >
                    View Build
                  </Link>
                </div>
              }
            />
          </div>
        ))}
      </BuildList>
    </>
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
