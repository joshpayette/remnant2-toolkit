'use client'

import { useEffect } from 'react'
import BuildCard from '../../features/build/components/BuildCard'
import BuildList from '@/features/build/components/BuildList'
import usePagination from '@/features/pagination/usePagination'
import Link from 'next/link'
import { toast } from 'react-toastify'
import useBuildActions from '@/features/build/hooks/useBuildActions'
import { getCommunityBuilds } from '@/features/build/actions/getCommunityBuilds'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { dbBuildToBuildState } from '../../features/build/lib/dbBuildToBuildState'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import useBuildListFilters from '@/features/filters/hooks/useBuildListFilters'
import BuildListFilters from '@/features/filters/components/BuildListFilters'
import useBuildListState from '@/features/build/hooks/useBuildListState'

interface Props {
  itemsPerPage?: number
  communityBuildFilters: CommunityBuildFilterProps
}

export default function CommunityBuildList({
  itemsPerPage = 8,
  communityBuildFilters,
}: Props) {
  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const {
    orderBy,
    orderByOptions,
    timeRange,
    timeRangeOptions,
    handleOrderByChange,
    handleTimeRangeChange,
  } = useBuildListFilters()

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

  const { handleReportBuild } = useBuildActions()

  // Fetch data
  useEffect(() => {
    const getItemsAsync = async () => {
      setBuildListState((prevState) => ({ ...prevState, isLoading: true }))
      const response = await getCommunityBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        timeRange,
        orderBy,
        communityBuildFilters,
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
    currentPage,
    orderBy,
    timeRange,
    setBuildListState,
    itemsPerPage,
    communityBuildFilters,
  ])

  async function onReportBuild(buildId: string) {
    const reportedBuild = builds.find((build) => build.id === buildId)

    if (!reportedBuild) {
      console.error(`Could not find build with id ${buildId}, report not saved`)
      return
    }
    const newReported = !reportedBuild.reported
    const response = await handleReportBuild(
      dbBuildToBuildState(reportedBuild),
      newReported,
    )

    if (!response || isErrorResponse(response)) {
      console.error(response?.errors)
      toast.error(response?.errors?.[0])
    } else {
      toast.success(response.message)
      const newBuilds = builds.map((build) => {
        if (build.id === buildId) {
          build.reported = newReported
        }
        return build
      })
      setBuildListState((prevState) => ({ ...prevState, builds: newBuilds }))
    }
  }

  return (
    <>
      <BuildList
        label="Community Builds"
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
          <BuildListFilters
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
              onReportBuild={onReportBuild}
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
