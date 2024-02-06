'use client'

import BuildCard from '@/features/build/components/BuildCard'
import BuildList from '@/features/build/components/BuildList'
import PageHeader from '@/features/ui/PageHeader'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import usePagination from '@/features/pagination/usePagination'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getBuildsByCollection } from '@/features/build/actions/getBuildsByCollection'
import CommunityBuildFilters from '@/features/filters/components/CommunityBuildFilters'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import useBuildActions from '@/features/build/hooks/useBuildActions'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { toast } from 'react-toastify'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import BuildListFilters from '@/features/filters/components/BuildListFilters'
import useBuildListFilters from '@/features/filters/hooks/useBuildListFilters'
import useBuildListState from '@/features/build/hooks/useBuildListState'
import saveDiscoveredItemIds from '@/features/items/actions/saveDiscoveredItemIds'

const ITEMS_PER_PAGE = 24

export default function Page() {
  const { data: sessionData } = useSession()

  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const [communityBuildFilters, setCommunityBuildFilters] =
    useState<CommunityBuildFilterProps | null>(null)

  const { discoveredItemIds } = useLocalStorage()

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
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const discoveredItemsSaved = useRef(false)
  useEffect(() => {
    async function saveItemsAsync() {
      const response = await saveDiscoveredItemIds({ discoveredItemIds })
      if (response.success) {
        discoveredItemsSaved.current = true
      } else {
        throw new Error(response.message)
      }
    }

    if (discoveredItemsSaved.current === false) {
      saveItemsAsync()
    }
  }, [discoveredItemIds, discoveredItemsSaved])

  useEffect(() => {
    async function getItemsAsync() {
      if (!communityBuildFilters) {
        return
      }
      setBuildListState((prevState) => ({ ...prevState, isLoading: true }))
      const response = await getBuildsByCollection({
        communityBuildFilters,
        discoveredItemIds,
        itemsPerPage: ITEMS_PER_PAGE,
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
    currentPage,
    communityBuildFilters,
    discoveredItemIds,
    orderBy,
    timeRange,
    setBuildListState,
  ])

  const { handleReportBuild } = useBuildActions()

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

  if (!sessionData?.user) {
    return (
      <>
        <PageHeader
          title="Builds By Collection"
          subtitle="Browse all community builds that contain only items in your collection, based on the data in the Item Tracker."
        >
          <button
            className="rounded bg-purple-500 p-2 text-sm font-bold hover:bg-purple-700"
            onClick={() => signIn()}
          >
            Sign in to find builds by collection
          </button>
        </PageHeader>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Builds By Collection"
        subtitle="Browse all community builds that contain only items in your collection, based on the data in the Item Tracker."
      />

      <div className="mb-8 flex w-full max-w-xl items-center justify-center">
        <CommunityBuildFilters
          onUpdateFilters={(newFilters) => {
            setCommunityBuildFilters(newFilters)
          }}
        />
      </div>

      {communityBuildFilters && (
        <BuildList
          label="Build Results"
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
      )}
    </>
  )
}
