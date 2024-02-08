'use client'

import BuildList from '@/features/build/components/BuildList'
import ProfileHeader from '../../../features/profile/ProfileHeader'
import BuildCard from '@/features/build/components/BuildCard'
import { useEffect, useState } from 'react'
import { getUserProfilePage } from './actions'
import usePagination from '@/features/pagination/usePagination'
import CopyBuildUrlButton from '../../../features/profile/CopyBuildUrlButton'
import EditBuildButton from '../../../features/profile/EditBuildButton'
import DuplicateBuildButton from '../../../features/profile/DuplicateBuildButton'
import BuildListSecondaryFilters from '@/features/filters/components/BuildListSecondaryFilters'
import useBuildListSecondaryFilters from '@/features/filters/hooks/useBuildListSecondaryFilters'
import { BuildListFilterFields } from '@/features/filters/types'
import useBuildListState from '@/features/build/hooks/useBuildListState'
import BuildListFilters from '@/features/filters/components/BuildListFilters'

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
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
      const response = await getUserProfilePage({
        buildListFilters,
        itemsPerPage,
        orderBy,
        pageNumber: currentPage,
        timeRange,
        userId,
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
    userId,
  ])

  return (
    <>
      <div className="my-4 flex w-full max-w-lg flex-col items-center justify-center">
        <ProfileHeader editable={false} userId={userId} />
      </div>
      <div className="mb-8 flex w-full max-w-2xl items-center justify-center">
        <BuildListFilters
          onUpdateFilters={(newFilters) => {
            setBuildListFilters(newFilters)
          }}
        />
      </div>
      {buildListFilters && (
        <BuildList
          label="Created Builds"
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
                memberFrameEnabled={build.isMember}
                footerActions={
                  <div className="flex items-center justify-between gap-2 p-2 text-sm">
                    <CopyBuildUrlButton buildId={build.id} />
                    <EditBuildButton buildId={build.id} />
                    <DuplicateBuildButton build={build} />
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
