'use client'

import { useEffect, useState } from 'react'
import { TimeRange, getMostPopularBuilds } from '../actions'
import BuildCard from '../../../features/build/components/BuildCard'
import BuildList from '@/features/build/components/BuildList'
import usePagination from '@/features/pagination/hooks/usePagination'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { isErrorResponse } from '@/types'
import useBuildActions from '@/features/build/hooks/useBuildActions'
import BuildListFilters from '@/features/build/components/BuildListFilters'
import { DBBuild } from '@/features/build/types'
import { dbBuildToBuildState } from '@/features/build/lib/build'
import { CommunityBuildFilterProps } from './CommunityBuildFilters'

interface Props {
  itemsPerPage?: number
  filters: CommunityBuildFilterProps
}

export default function MostPopularBuilds({
  itemsPerPage = 8,
  filters,
}: Props) {
  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [timeRange, setTimeRange] = useState<TimeRange>('week')
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      const response = await getMostPopularBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        timeRange,
        globalFilters: filters,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setIsLoading(false)
    }
    getItemsAsync()
  }, [currentPage, timeRange, itemsPerPage, filters])

  const timeRanges: TimeRange[] = ['day', 'week', 'month', 'all-time']

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

  function handleTimeRangeChange(timeRange: string) {
    setTimeRange(timeRange as TimeRange)
  }

  return (
    <>
      <BuildList
        label="Most Popular"
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
            label="Time Range"
            filter={timeRange}
            onFilterChange={handleTimeRangeChange}
            options={timeRanges}
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
