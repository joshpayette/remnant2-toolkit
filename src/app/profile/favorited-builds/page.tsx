'use client'

import CopyBuildUrlButton from '@/features/profile/CopyBuildUrlButton'
import usePagination from '@/features/pagination/usePagination'
import { useEffect, useState } from 'react'
import BuildCard from '@/features/build/components/BuildCard'
import BuildList from '@/features/build/components/BuildList'
import DuplicateBuildButton from '@/features/profile/DuplicateBuildButton'
import Tabs from '@/features/profile/Tabs'
import ProfileHeader from '@/features/profile/ProfileHeader'
import { useSession } from 'next-auth/react'
import AuthWrapper from '@/features/auth/components/AuthWrapper'
import { getFavoritedBuilds } from './actions'
import BuildListFilters from '@/features/filters/components/BuildListFilters'
import { BuildListFilterFields } from '@/features/filters/types'
import useBuildListSecondaryFilters from '@/features/filters/hooks/useBuildListSecondaryFilters'
import BuildListSecondaryFilters from '@/features/filters/components/BuildListSecondaryFilters'
import useBuildListState from '@/features/build/hooks/useBuildListState'

export default function Page() {
  const { data: sessionData } = useSession()
  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const [buildListFilters, setBuildListFilters] =
    useState<BuildListFilterFields | null>(null)

  const itemsPerPage = 16

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
      <div className="mb-8 flex w-full max-w-4xl items-center justify-center">
        <BuildListFilters
          onUpdateFilters={(newFilters) => {
            setBuildListFilters(newFilters)
          }}
        />
      </div>
      {buildListFilters && (
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
      )}
    </AuthWrapper>
  )
}
