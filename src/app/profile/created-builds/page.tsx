'use client'

import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { BuildCard } from '@/features/build/components/BuildCard'
import { BuildList } from '@/features/build/components/BuildList'
import { useBuildListState } from '@/features/build/hooks/useBuildListState'
import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { BuildListSecondaryFilters } from '@/features/filters/components/BuildListSecondaryFilters'
import { useBuildListSecondaryFilters } from '@/features/filters/hooks/useBuildListSecondaryFilters'
import { parseFiltersFromUrl } from '@/features/filters/lib/parseFiltersFromUrl'
import { usePagination } from '@/features/pagination/usePagination'
import { CopyBuildUrlButton } from '@/features/profile/CopyBuildUrlButton'
import { DeleteBuildButton } from '@/features/profile/DeleteBuildButton'
import { DuplicateBuildButton } from '@/features/profile/DuplicateBuildButton'
import { EditBuildButton } from '@/features/profile/EditBuildButton'
import { ProfileHeader } from '@/features/profile/ProfileHeader'
import { Tabs } from '@/features/profile/Tabs'

import { getCreatedBuilds } from './actions'

export default function Page() {
  const { data: sessionData } = useSession()

  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const searchParams = useSearchParams()
  const buildListFilters = parseFiltersFromUrl(searchParams)

  const itemsPerPage = 16

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
      if (!buildListFilters) {
        return
      }
      setBuildListState((prevState) => ({ ...prevState, isLoading: true }))
      const response = await getCreatedBuilds({
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

  function handleDeleteBuild(buildId: string) {
    setBuildListState((prevBuilds) => ({
      ...prevBuilds,
      builds: prevBuilds.builds.filter((build) => build.id !== buildId),
    }))
  }

  return (
    <AuthWrapper>
      {sessionData?.user && (
        <ProfileHeader
          editable={true}
          userId={sessionData.user.id}
          image={sessionData.user.image}
        />
      )}
      <div className="mb-8 flex w-full flex-col items-center">
        <Tabs />
      </div>
      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="user-created-builds-filters"
        />
      </div>
      {buildListFilters && (
        <BuildList
          label="Builds you've created"
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
                memberFrameEnabled={false}
                footerActions={
                  <div className="flex items-center justify-between gap-2 p-2 text-sm">
                    <CopyBuildUrlButton buildId={build.id} />
                    <EditBuildButton buildId={build.id} />
                    <DuplicateBuildButton build={build} />
                    <DeleteBuildButton
                      buildId={build.id}
                      onDeleteBuild={handleDeleteBuild}
                    />
                  </div>
                }
              />
            </div>
          ))}
        </BuildList>
      )}
    </AuthWrapper>
  )
}
