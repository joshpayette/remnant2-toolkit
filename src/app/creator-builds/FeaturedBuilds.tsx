'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getFeaturedBuilds } from '@/features/build/actions/getFeaturedBuilds'
import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { ItemList } from '@/features/build/components/ItemList'
import { useBuildListState } from '@/features/build/hooks/useBuildListState'
import { BuildListSecondaryFilters } from '@/features/filters/components/BuildListSecondaryFilters'
import { useBuildListSecondaryFilters } from '@/features/filters/hooks/useBuildListSecondaryFilters'
import { parseBuildListFilters } from '@/features/filters/lib/parseBuildListFilters'
import { usePagination } from '@/features/pagination/usePagination'
import { Skeleton } from '@/features/ui/Skeleton'

interface Props {
  itemsPerPage?: number
}

export function FeaturedBuilds({ itemsPerPage = 8 }: Props) {
  const searchParams = useSearchParams()
  const [buildListFilters, setBuildListFilters] = useState(
    parseBuildListFilters(searchParams),
  )
  useEffect(() => {
    setBuildListFilters(parseBuildListFilters(searchParams))
  }, [searchParams])

  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const {
    orderBy,
    orderByOptions,
    timeRange,
    timeRangeOptions,
    handleOrderByChange,
    handleTimeRangeChange,
  } = useBuildListSecondaryFilters('newest')

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
      setBuildListState((prevState) => ({ ...prevState, isLoading: true }))
      const response = await getFeaturedBuilds({
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
    timeRange,
    setBuildListState,
  ])

  if (!buildListFilters) {
    return <Skeleton className="min-h-[1100px] w-full" />
  }

  return (
    <>
      <ItemList
        label="Creator Spotlight"
        currentPage={currentPage}
        isLoading={isLoading}
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={
          <BuildListSecondaryFilters
            orderBy={orderBy}
            orderByOptions={orderByOptions}
            onOrderByChange={handleOrderByChange}
            timeRange={timeRange}
            timeRangeOptions={timeRangeOptions}
            onTimeRangeChange={handleTimeRangeChange}
          />
        }
      >
        <ul
          role="list"
          className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {builds.map((build) => (
            <div key={build.id} className="h-full w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
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
        </ul>
      </ItemList>
    </>
  )
}
