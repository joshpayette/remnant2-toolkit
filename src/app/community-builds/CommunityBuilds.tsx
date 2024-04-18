'use client'

import { EyeIcon } from '@heroicons/react/24/solid'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Link } from '@/app/(components)/_base/link'
import { getCommunityBuilds } from '@/features/build/actions/getCommunityBuilds'
import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { BuildList } from '@/features/build/components/BuildList'
import { BuildListSecondaryFilters } from '@/features/build/filters/BuildListSecondaryFilters'
import { useBuildListSecondaryFilters } from '@/features/build/filters/hooks/useBuildListSecondaryFilters'
import { parseBuildListFilters } from '@/features/build/filters/lib/parseBuildListFilters'
import { useBuildListState } from '@/features/build/hooks/useBuildListState'
import { usePagination } from '@/features/pagination/usePagination'
import { Skeleton } from '@/features/ui/Skeleton'
import { Tooltip } from '@/features/ui/Tooltip'

interface Props {
  itemsPerPage?: number
}

export function CommunityBuildList({ itemsPerPage = 8 }: Props) {
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
  } = useBuildListSecondaryFilters()

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
      const response = await getCommunityBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        timeRange,
        orderBy,
        buildListFilters,
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
      <BuildList
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
          className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {builds.map((build) => (
            <BuildCard
              key={build.id}
              build={build}
              isLoading={isLoading}
              footerActions={
                <Tooltip content="View Build">
                  <Link
                    href={`/builder/${build.id}`}
                    className="flex flex-col items-center gap-x-3 rounded-br-lg border border-transparent px-4 py-2 text-xs font-semibold text-primary-500 hover:text-primary-300 hover:underline"
                  >
                    <EyeIcon className="h-4 w-4" /> View
                  </Link>
                </Tooltip>
              }
            />
          ))}
        </ul>
      </BuildList>
    </>
  )
}
