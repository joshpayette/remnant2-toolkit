'use client'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Fragment, useEffect, useState } from 'react'
import { TimeRange, getMostUpvotedBuilds } from '../actions'
import { ExtendedBuild } from '@/app/(types)'
import { cn } from '@/app/(lib)/utils'
import BuildCard from './BuildCard'

interface Props {
  limit?: number
}

export default function MostPopularBuilds({ limit = 20 }: Props) {
  const [topBuilds, setTopBuilds] = useState<ExtendedBuild[]>([])
  const [topBuildsTimeRange, setTopBuildTimeRange] = useState<TimeRange>('week')

  const timeRanges: TimeRange[] = ['day', 'week', 'month', 'all-time']

  useEffect(() => {
    getMostUpvotedBuilds(topBuildsTimeRange, limit).then(setTopBuilds)
  }, [topBuildsTimeRange, limit])

  function handleReportBuild(reported: boolean, buildId: string) {
    setTopBuilds((prev) =>
      prev.map((build) => {
        if (build.id === buildId) {
          build.reported = reported
        }
        return build
      }),
    )
  }

  return (
    <>
      <div className="flex w-full flex-row items-center justify-center border-b border-b-green-500 py-2">
        <h2 className="flex w-full items-center justify-start text-2xl">
          Most Popular
        </h2>
        <div className="flex w-full items-center justify-end">
          <Listbox value={topBuildsTimeRange} onChange={setTopBuildTimeRange}>
            {({ open }) => (
              <>
                <Listbox.Label className="mr-2 block text-left text-sm font-medium leading-6 text-green-500">
                  Period
                </Listbox.Label>
                <div className="relative w-[110px]">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{topBuildsTimeRange}</span>
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
        </div>
      </div>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {topBuilds.map((build) => (
          <div key={build.id} className="h-full w-full">
            <BuildCard build={build} onReportBuild={handleReportBuild} />
          </div>
        ))}
      </ul>
    </>
  )
}
