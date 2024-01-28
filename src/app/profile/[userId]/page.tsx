'use client'

import BuildList from '@/features/build/components/BuildList'
import ProfileHeader from '../../../features/profile/ProfileHeader'
import BuildCard from '@/features/build/components/BuildCard'
import BuildListFilters from '@/features/build/components/BuildListFilters'
import { DBBuild } from '@/features/build/types'
import { useEffect, useState } from 'react'
import { BuildsFilter, getUserProfilePage } from './actions'
import usePagination from '@/features/pagination/usePagination'
import CopyBuildUrlButton from '../../../features/profile/CopyBuildUrlButton'
import EditBuildButton from '../../../features/profile/EditBuildButton'
import DuplicateBuildButton from '../../../features/profile/DuplicateBuildButton'
import { StarIcon } from '@heroicons/react/24/solid'

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [totalFavorites, setTotalFavorites] = useState<number>(0)
  const [filter, setFilter] = useState<BuildsFilter>('upvotes')
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 16

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
      setIsLoading(true)
      const response = await getUserProfilePage({
        itemsPerPage,
        pageNumber: currentPage,
        filter,
        userId,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setTotalFavorites(response.totalFavorites)
      setIsLoading(false)
    }
    getItemsAsync()
  }, [currentPage, itemsPerPage, filter, userId])

  const filterOptions: BuildsFilter[] = ['date created', 'upvotes']

  function handleFilterChange(filter: string) {
    setFilter(filter as BuildsFilter)
  }

  return (
    <>
      <div className="my-4 flex w-full max-w-lg flex-col items-center justify-center">
        <ProfileHeader editable={false} userId={userId} />
        <div className="my-4 flex w-full flex-row items-center justify-center gap-1 text-2xl text-yellow-500">
          Total <StarIcon className="h-6 w-6" />: {totalFavorites}
        </div>
      </div>
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
    </>
  )
}
