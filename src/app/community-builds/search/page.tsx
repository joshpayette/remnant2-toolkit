'use client'

import PageHeader from '@/app/(components)/PageHeader'
import Filters, { defaultFilters } from '../(components)/Filters'
import usePagination from '@/app/(hooks)/usePagination'
import { useCallback, useEffect, useState } from 'react'
import { getBuilds } from './actions'
import BuildCard from '@/app/(components)/BuildCard'
import BuildList from '@/app/(components)/BuildList'
import Link from 'next/link'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { DLCKey } from '@/app/(types)'
import LoadingIndicator from '@/app/(components)/LoadingIndicator'
import { DBBuild } from '@/app/(types)/build'

export interface SearchFilters {
  ownedItemsOnly: boolean
  specificDLCItemsOnly: DLCKey[]
}

const itemsPerPage = 8

export default function Page() {
  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const { itemTrackerStorage } = useLocalStorage()
  const { discoveredItemIds } = itemTrackerStorage
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(defaultFilters)

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
    itemsPerPage,
  })

  const handleFilterChange = useCallback(
    async (searchFilters: SearchFilters) => {
      setIsLoading(true)
      const response = await getBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        searchFilters,
        // don't pass unneeded data if filter is not set
        discoveredItemIds: searchFilters.ownedItemsOnly
          ? discoveredItemIds
          : [],
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setIsLoading(false)
    },
    [currentPage, discoveredItemIds],
  )

  useEffect(() => {
    handleFilterChange(searchFilters)
  }, [handleFilterChange, searchFilters, currentPage])

  return (
    <>
      <PageHeader
        title="Search Community Builds"
        subtitle="Find your perfect build"
      />
      <Filters
        isLoading={isLoading}
        onUpdate={(newSearchFilters) => setSearchFilters(newSearchFilters)}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <BuildList
          label="Build Results"
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          totalItems={totalBuildCount}
          totalPages={totalPages}
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
      )}
    </>
  )
}
