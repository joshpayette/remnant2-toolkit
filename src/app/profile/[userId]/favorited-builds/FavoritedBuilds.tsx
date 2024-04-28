'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { BuildSecondaryFilters } from '@/app/(components)/filters/builds/secondary-filters'
import { useOrderByFilter } from '@/app/(components)/filters/builds/secondary-filters/order-by-filter/use-order-by-filter'
import { useTimeRangeFilter } from '@/app/(components)/filters/builds/secondary-filters/time-range-filter/use-time-range-filter'
import { parseUrlFilters } from '@/app/(components)/filters/builds/utils'
import { getFavoritedBuilds } from '@/app/profile/[userId]/favorited-builds/getFavoriteBuilds'
import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { BuildList } from '@/features/build/components/BuildList'
import { useBuildListState } from '@/features/build/hooks/useBuildListState'
import { usePagination } from '@/features/pagination/usePagination'

interface Props {
  userId: string
}

export function FavoritedBuilds({ userId }: Props) {
  const searchParams = useSearchParams()
  const [buildListFilters, setBuildListFilters] = useState(
    parseUrlFilters(searchParams),
  )
  useEffect(() => {
    setBuildListFilters(parseUrlFilters(searchParams))
  }, [searchParams])

  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const itemsPerPage = 16

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest')
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time')

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

  useEffect(() => {
    const getItemsAsync = async () => {
      setBuildListState((prevState) => ({ ...prevState, isLoading: true }))
      const response = await getFavoritedBuilds({
        buildListFilters,
        itemsPerPage,
        orderBy,
        pageNumber: currentPage,
        timeRange,
      })
      setBuildListState((prevState) => ({
        ...prevState,
        isLoading: false,
        builds: response.items,
        totalBuildCount: response.totalItemCount,
      }))
    }
    getItemsAsync()
  }, [
    buildListFilters,
    currentPage,
    itemsPerPage,
    orderBy,
    setBuildListState,
    timeRange,
  ])

  return (
    <>
      <BuildList
        currentPage={currentPage}
        isLoading={isLoading}
        label="Favorited Builds"
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={
          <BuildSecondaryFilters
            orderBy={orderBy}
            onOrderByChange={handleOrderByChange}
            timeRange={timeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
        }
      >
        <ul
          role="list"
          className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {builds.map((build) => (
            <div key={build.id} className="h-full w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                footerActions={undefined}
              />
            </div>
          ))}
        </ul>
      </BuildList>
    </>
  )
}
