import { useEffect } from 'react'

import { BuildCard } from '@/features/build/components/BuildCard'
import { BuildList } from '@/features/build/components/BuildList'
import { useBuildListState } from '@/features/build/hooks/useBuildListState'
import { BuildListSecondaryFilters } from '@/features/filters/components/BuildListSecondaryFilters'
import { useBuildListSecondaryFilters } from '@/features/filters/hooks/useBuildListSecondaryFilters'
import { BuildListFilterFields } from '@/features/filters/types'
import { usePagination } from '@/features/pagination/usePagination'
import { CopyBuildUrlButton } from '@/features/profile/components/CopyBuildUrlButton'
import { DuplicateBuildButton } from '@/features/profile/components/DuplicateBuildButton'

import { getFavoritedBuilds } from '../../../app/profile/favorited-builds/actions'

interface Props {
  itemsPerPage?: number
  buildListFilters: BuildListFilterFields
}

export function FavoritedBuilds({ itemsPerPage = 8, buildListFilters }: Props) {
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

  useEffect(() => {
    const getItemsAsync = async () => {
      if (!buildListFilters) {
        return
      }

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
    timeRange,
    setBuildListState,
  ])

  return (
    <>
      <BuildList
        label="Builds you've favorited"
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
        {builds.map((build) => (
          <div key={build.id} className="h-full w-full">
            <BuildCard
              build={build}
              onReportBuild={undefined}
              footerActions={
                <div className="flex items-center justify-between gap-2 p-2 text-sm">
                  <CopyBuildUrlButton buildId={build.id} />
                  <DuplicateBuildButton build={build} />
                </div>
              }
            />
          </div>
        ))}
      </BuildList>
    </>
  )
}
