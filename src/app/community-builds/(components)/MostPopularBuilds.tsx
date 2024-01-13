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
import { addReportForBuild, removeReportForBuild } from '@/app/builder/actions'
import { isErrorResponse } from '@/app/(types)'
import useBuildActions from '@/app/builder/(hooks)/useBuildActions'
import { extendedBuildToBuildState } from '@/app/(lib)/build'

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

  // This is an example of how you would use this hook with
  // a useEffect to fetch data from an API
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
          <Listbox value={timeRange} onChange={setTimeRange}>
            {({ open }) => (
              <>
                <Listbox.Label className="mr-2 block text-left text-sm font-medium leading-6 text-green-500">
                  Period
                </Listbox.Label>
                <div className="relative w-[110px]">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{timeRange}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {timeRanges.map((timeRange) => (
                        <Listbox.Option
                          key={timeRange}
                          className={({ active }) =>
                            cn(
                              active
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-3 pr-9',
                            )
                          }
                          value={timeRange}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={cn(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate text-sm',
                                )}
                              >
                                {timeRange}
                              </span>

                              {selected ? (
                                <span
                                  className={cn(
                                    active ? 'text-white' : 'text-purple-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
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
