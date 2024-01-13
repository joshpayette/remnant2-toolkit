'use client'

import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  EyeIcon,
} from '@heroicons/react/24/solid'
import { Fragment, useEffect, useState } from 'react'
import { TimeRange, getMostUpvotedBuilds } from '../actions'
import { cn } from '@/app/(lib)/utils'
import BuildCard from '../../(components)/BuildCard'
import BuildList from '@/app/(components)/BuildList'
import usePagination from '@/app/(hooks)/usePagination'
import { ExtendedBuild } from '@/app/(types)/build'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { isErrorResponse } from '@/app/(types)'
import useBuildActions from '@/app/builder/(hooks)/useBuildActions'
import { extendedBuildToBuildState } from '@/app/(lib)/build'
import BuildListFilters from '@/app/(components)/BuildListFilters'

interface Props {
  itemsPerPage?: number
}

export default function MostPopularBuilds({ itemsPerPage = 8 }: Props) {
  const [builds, setBuilds] = useState<ExtendedBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [timeRange, setTimeRange] = useState<TimeRange>('week')

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
      const response = await getMostUpvotedBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        timeRange,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
    }
    getItemsAsync()
  }, [currentPage, timeRange, itemsPerPage])

  const timeRanges: TimeRange[] = ['day', 'week', 'month', 'all-time']

  async function onReportBuild(buildId: string) {
    const reportedBuild = builds.find((build) => build.id === buildId)

    if (!reportedBuild) {
      console.error(`Could not find build with id ${buildId}, report not saved`)
      return
    }
    const newReported = !reportedBuild.reported
    const response = await handleReportBuild(
      extendedBuildToBuildState(reportedBuild),
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
                <div className="-mt-px flex flex-1">
                  <div className="flex w-0 flex-1">&nbsp;</div>
                  <div className="-ml-px flex w-0 flex-1 items-center justify-end">
                    <Link
                      href={`/builder/${build.id}`}
                      className="relative inline-flex items-center justify-center gap-x-3 rounded-br-lg border border-transparent p-4 text-sm font-semibold text-green-500 hover:text-green-700 hover:underline"
                    >
                      <EyeIcon
                        className="h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      View Build
                    </Link>
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </BuildList>
    </>
  )
}
