'use client'

import { useEffect, useState } from 'react'
import BuildCard from './BuildCard'
import BuildList from '@/features/build/components/BuildList'
import usePagination from '@/features/pagination/usePagination'
import Link from 'next/link'
import { toast } from 'react-toastify'
import useBuildActions from '@/features/build/hooks/useBuildActions'
import { DBBuild } from '@/features/build/types'
import {
  OrderBy,
  TimeRange,
  getCommunityBuilds,
} from '@/features/build/actions/getCommunityBuilds'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { dbBuildToBuildState } from '../lib/dbBuildToBuildState'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import SelectMenu from '@/features/ui/SelectMenu'

interface Props {
  itemsPerPage?: number
  communityBuildFilters: CommunityBuildFilterProps
}

export default function CommunityBuildList({
  itemsPerPage = 8,
  communityBuildFilters,
}: Props) {
  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [timeRange, setTimeRange] = useState<TimeRange>('all-time')
  const timeRangeOptions: Array<{ label: TimeRange; value: string }> = [
    { label: 'day', value: 'day' },
    { label: 'week', value: 'week' },
    { label: 'month', value: 'month' },
    { label: 'all-time', value: 'all-time' },
  ]
  function handleTimeRangeChange(timeRange: string) {
    setTimeRange(timeRange as TimeRange)
  }

  const [orderBy, setOrderBy] = useState<OrderBy>('most favorited')
  const orderByOptions: Array<{ label: OrderBy; value: string }> = [
    { label: 'alphabetical', value: 'alphabetical' },
    { label: 'most favorited', value: 'most favorited' },
    { label: 'newest', value: 'newest' },
  ]
  function handleOrderByChange(orderBy: string) {
    setOrderBy(orderBy as OrderBy)
  }

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
      setIsLoading(true)
      const response = await getCommunityBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        timeRange,
        orderBy,
        communityBuildFilters,
      })

      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setIsLoading(false)
    }
    getItemsAsync()
  }, [currentPage, orderBy, timeRange, itemsPerPage, communityBuildFilters])

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
      setBuilds(newBuilds)
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
          <div className="flex w-full flex-col items-center justify-end gap-x-2 sm:flex-row">
            <SelectMenu
              value={timeRange}
              options={timeRangeOptions}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
            />
            <SelectMenu
              value={orderBy}
              options={orderByOptions}
              onChange={(e) => handleOrderByChange(e.target.value)}
            />
          </div>
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
