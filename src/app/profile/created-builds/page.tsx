'use client'

import { EyeIcon } from '@heroicons/react/24/solid'
import { ExtendedBuild } from '@/app/(types)/build'
import BuildList from '@/app/(components)/BuildList'
import BuildCard from '@/app/(components)/BuildCard'
import usePagination from '@/app/(hooks)/usePagination'
import { useEffect, useState } from 'react'
import { CreatedBuildsFilter, getCreatedBuilds } from '../actions'
import BuildListFilters from '@/app/(components)/BuildListFilters'
import CopyBuildUrlButton from '../(components)/CopyBuildUrlButton'
import EditBuildButton from '../(components)/EditBuildButton'
import DuplicateBuildButton from '../(components)/DuplicateBuildButton'
import DeleteBuildButton from '../(components)/DeleteBuildButton'

export default function Page() {
  const [builds, setBuilds] = useState<ExtendedBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [filter, setFilter] = useState<CreatedBuildsFilter>('date created')
  const itemsPerPage = 8

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
      const response = await getCreatedBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        filter,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
    }
    getItemsAsync()
  }, [currentPage, itemsPerPage, filter])

  const filterOptions: CreatedBuildsFilter[] = ['date created', 'upvotes']

  function handleFilterChange(filter: string) {
    setFilter(filter as CreatedBuildsFilter)
  }

  function handleDeleteBuild(buildId: string) {
    setBuilds((prevBuilds) =>
      prevBuilds.filter((build) => build.id !== buildId),
    )
  }

  return (
    <BuildList
      label="Builds you've created"
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
          filter={filter}
          onFilterChange={handleFilterChange}
          options={filterOptions}
        />
      }
    >
      {builds.map((build) => (
        <div key={build.id} className="h-full w-full">
          <BuildCard
            build={build}
            onReportBuild={undefined}
            memberFrameEnabled={false}
            footerActions={
              <div className="flex items-center justify-between gap-2 p-2 text-sm">
                <CopyBuildUrlButton buildId={build.id} />
                <EditBuildButton buildId={build.id} />
                <DuplicateBuildButton build={build} />
                <DeleteBuildButton
                  buildId={build.id}
                  onDeleteBuild={handleDeleteBuild}
                />
              </div>
            }
          />
        </div>
      ))}
    </BuildList>
  )
}
