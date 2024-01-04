'use client'

import ViewBuildButton from '../(components)/ViewBuildButton'
import CopyBuildUrlButton from '../(components)/CopyBuildUrlButton'
import PageActions from '@/app/(components)/PageActions'
import BackToTopButton from '@/app/(components)/BackToTopButton'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/24/solid'
import { cn, extendedBuildToBuildState } from '@/app/(lib)/utils'
import { useEffect, useState } from 'react'
import { ExtendedBuild } from '@/app/(types)'
import usePagination from '@/app/(hooks)/usePagination'
import { getFavoritedBuilds } from './actions'

export default function Page() {
  const itemsPerPage = 5
  const [builds, setBuilds] = useState<ExtendedBuild[]>([])
  const [totalItemCount, setTotalItemCount] = useState(0)

  const {
    currentPage,
    firstVisiblePageNumber,
    lastVisiblePageNumber,
    pageNumbers,
    handleSpecificPageClick,
    handleNextPageClick,
    handlePreviousPageClick,
  } = usePagination({ itemsPerPage, totalItemCount })

  useEffect(() => {
    const getBuildsAsync = async () => {
      const response = await getFavoritedBuilds({
        itemsPerPage,
        pageNumber: currentPage,
      })
      setBuilds(response.items)
      setTotalItemCount(response.totalItemCount)
    }
    getBuildsAsync()
  }, [currentPage])

  return (
    <div className="mx-auto w-full bg-black py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="w-full text-base font-semibold leading-6 text-green-500">
              Builds favorited by you
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              All builds that you have favorited are listed here.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Archtypes
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Votes
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      <span className="sr-only">View</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      <span className="sr-only">Share</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {builds.map((build) => {
                    const buildState = extendedBuildToBuildState(build)
                    return (
                      <tr key={build.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                          <ViewBuildButton
                            buildName={buildState.name}
                            buildId={build.id}
                          />
                        </td>
                        <td className="max-w-[300px] truncate px-3 py-4 text-sm text-gray-300">
                          {buildState.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {buildState.items.archtype.map((archtype, index) => {
                            return (
                              <div key={index}>
                                {`${archtype.name}, ${
                                  buildState.items.skill[index]?.name ?? ''
                                }`}
                              </div>
                            )
                          })}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium text-yellow-500 sm:pr-0">
                          <div className="flex flex-row items-start justify-start">
                            <StarIcon className="mr-2 h-5 w-5" />
                            {build.totalUpvotes}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <CopyBuildUrlButton buildId={build.id} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={6} className="py-3.5 pt-8">
                      <div className="flex items-center justify-between border-t border-green-500 bg-black px-4 py-4 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                          <button
                            onClick={handlePreviousPageClick}
                            className="relative inline-flex items-center rounded-md border border-green-300 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-300"
                          >
                            Previous
                          </button>
                          <button
                            onClick={handleNextPageClick}
                            className="relative ml-3 inline-flex items-center rounded-md border border-green-300 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-300"
                          >
                            Next
                          </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-gray-200">
                              Showing{' '}
                              <span
                                id="start_page_count"
                                className="font-medium"
                              >
                                {firstVisiblePageNumber}
                              </span>{' '}
                              to{' '}
                              <span id="end_page_count" className="font-medium">
                                {lastVisiblePageNumber}
                              </span>{' '}
                              of{' '}
                              <span className="font-medium">
                                {totalItemCount}
                              </span>{' '}
                              results
                            </p>
                          </div>
                          <div>
                            <nav
                              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                              aria-label="Pagination"
                            >
                              <button
                                onClick={handlePreviousPageClick}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-green-500 hover:bg-gray-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
                              >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                              {/* Current: "z-10 bg-green-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                              {pageNumbers.map((pageNumber) => (
                                <button
                                  key={pageNumber}
                                  aria-current="page"
                                  className={cn(
                                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-green-500 hover:bg-green-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0',
                                    currentPage === pageNumber &&
                                      'relative z-10 inline-flex items-center bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
                                  )}
                                  onClick={() =>
                                    handleSpecificPageClick(pageNumber)
                                  }
                                >
                                  {pageNumber}
                                </button>
                              ))}

                              <button
                                onClick={handleNextPageClick}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-green-500 hover:bg-green-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
                              >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
