'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { ItemList } from '@/features/build/components/ItemList'
import { BuildListSecondaryFilters } from '@/features/build/filters/BuildListSecondaryFilters'
import { useBuildListSecondaryFilters } from '@/features/build/filters/hooks/useBuildListSecondaryFilters'
import { parseBuildListFilters } from '@/features/build/filters/lib/parseBuildListFilters'
import { useBuildListState } from '@/features/build/hooks/useBuildListState'
import { usePagination } from '@/features/pagination/usePagination'
import { CopyBuildUrlButton } from '@/features/profile/components/CopyBuildUrlButton'
import { DuplicateBuildButton } from '@/features/profile/components/DuplicateBuildButton'
import { Skeleton } from '@/features/ui/Skeleton'

import { getFavoritedBuilds } from '../../../app/profile/favorited-builds/actions'
import { AddToLoadoutButton } from '../loadouts/AddToLoadoutButton'
import { LoadoutDialog } from '../loadouts/LoadoutDialog'

interface Props {
  itemsPerPage?: number
}

export function FavoritedBuilds({ itemsPerPage = 8 }: Props) {
  const searchParams = useSearchParams()
  const [buildListFilters, setBuildListFilters] = useState(
    parseBuildListFilters(searchParams),
  )
  useEffect(() => {
    setBuildListFilters(parseBuildListFilters(searchParams))
  }, [searchParams])

  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const [buildToAddToLoadout, setBuildToAddToLoadout] = useState<string | null>(
    null,
  )
  const isLoadoutDialogOpen = Boolean(buildToAddToLoadout)

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

  if (!buildListFilters) {
    return <Skeleton className="min-h-[1100px] w-full" />
  }

  return (
    <>
      <LoadoutDialog
        key={buildToAddToLoadout}
        buildId={buildToAddToLoadout}
        open={isLoadoutDialogOpen}
        onClose={() => setBuildToAddToLoadout(null)}
      />
      <ItemList
        label="Builds you've favorited"
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
            <div key={build.id} className="h-full w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                footerActions={
                  <div className="flex items-center justify-center gap-6 p-2 text-sm">
                    <CopyBuildUrlButton buildId={build.id} />
                    <DuplicateBuildButton build={build} />
                    <AddToLoadoutButton
                      onClick={() => setBuildToAddToLoadout(build.id)}
                    />
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
