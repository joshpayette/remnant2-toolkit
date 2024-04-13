'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CreatedBuildCardActions } from '@/app/profile/[userId]/(components)/CreatedBuildCardActions'
import { getCreatedBuilds } from '@/app/profile/[userId]/created-builds/getCreatedBuilds'
import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { CreateBuildCard } from '@/features/build/components/build-card/CreateBuildCard'
import { BuildList } from '@/features/build/components/BuildList'
import { BuildListSecondaryFilters } from '@/features/build/filters/BuildListSecondaryFilters'
import { useBuildListSecondaryFilters } from '@/features/build/filters/hooks/useBuildListSecondaryFilters'
import { parseBuildListFilters } from '@/features/build/filters/lib/parseBuildListFilters'
import { useBuildListState } from '@/features/build/hooks/useBuildListState'
import { usePagination } from '@/features/pagination/usePagination'

interface Props {
  isEditable: boolean
  userId: string
}

export function CreatedBuilds({ isEditable, userId }: Props) {
  const searchParams = useSearchParams()
  const [buildListFilters, setBuildListFilters] = useState(
    parseBuildListFilters(searchParams),
  )
  useEffect(() => {
    setBuildListFilters(parseBuildListFilters(searchParams))
  }, [searchParams])

  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const itemsPerPage = isEditable ? 15 : 16

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

  useEffect(() => {
    const getItemsAsync = async () => {
      setBuildListState((prevState) => ({ ...prevState, isLoading: true }))
      const response = await getCreatedBuilds({
        buildListFilters,
        featuredBuildsOnly: false,
        itemsPerPage,
        orderBy,
        pageNumber: currentPage,
        timeRange,
        userId,
        isEditable,
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
    isEditable,
    itemsPerPage,
    orderBy,
    setBuildListState,
    timeRange,
    userId,
  ])

  return (
    <>
      <BuildList
        currentPage={currentPage}
        isLoading={isLoading}
        label="Created Builds"
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
          {isEditable ? <CreateBuildCard /> : null}

          {builds.map((build) => (
            <div key={build.id} className="h-full w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                showBuildVisibility={true}
                footerActions={
                  isEditable ? (
                    <CreatedBuildCardActions
                      build={build}
                      onDelete={(buildId: string) => {
                        setBuildListState((prevState) => ({
                          ...prevState,
                          builds: prevState.builds.filter(
                            (b) => b.id !== buildId,
                          ),
                          totalBuildCount: prevState.totalBuildCount - 1,
                        }))
                      }}
                    />
                  ) : undefined
                }
              />
            </div>
          ))}
        </ul>
      </BuildList>
    </>
  )
}
