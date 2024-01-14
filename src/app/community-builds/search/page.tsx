'use client'

import PageHeader from '@/app/(components)/PageHeader'
import Filters from '../(components)/Filters'
import usePagination from '@/app/(hooks)/usePagination'
import { useEffect, useState } from 'react'
import { ExtendedBuild } from '@/app/(types)/build'
import { getBuilds } from './actions'
import BuildCard from '@/app/(components)/BuildCard'
import BuildList from '@/app/(components)/BuildList'
import Link from 'next/link'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'

export interface SearchFilters {
  ownedItemsOnly: boolean
}

const defaultFilters: SearchFilters = {
  ownedItemsOnly: false,
}

export default function Page() {
  const [builds, setBuilds] = useState<ExtendedBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(defaultFilters)
  const { itemTrackerStorage } = useLocalStorage()
  const { discoveredItemIds } = itemTrackerStorage

  const itemsPerPage = 8

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

  // Fetch data
  useEffect(() => {
    const getItemsAsync = async () => {
      const response = await getBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        searchFilters,
        discoveredItemIds,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
    }
    getItemsAsync()
  }, [currentPage, itemsPerPage, searchFilters, discoveredItemIds])

  function handleFilterChange(newFilters: SearchFilters) {
    setSearchFilters(newFilters)
  }

  return (
    <>
      <PageHeader
        title="Search Community Builds"
        subtitle="Find your perfect build"
      />
      <Filters
        filters={searchFilters}
        defaultFilters={defaultFilters}
        onUpdate={handleFilterChange}
      />
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
    </>
  )
}
