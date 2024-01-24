'use client'

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
import { DBBuild } from '@/features/build/types'
import Tabs from '../(components)/Tabs'
import ProfileHeader from '../(components)/ProfileHeader'
import { useSession } from 'next-auth/react'
import AuthWrapper from '@/app/(components)/AuthWrapper'

export default function Page() {
  const { data: sessionData } = useSession()
  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [filter, setFilter] = useState<CreatedBuildsFilter>('date created')
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
      const response = await getCreatedBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        filter,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setIsLoading(false)
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
    <AuthWrapper>
      {sessionData?.user && (
        <ProfileHeader
          editable={true}
          userId={sessionData.user.id}
          image={sessionData.user.image}
        />
      )}
      <div className="mb-8 flex w-full flex-col items-center">
        <Tabs />
      </div>
      <BuildList
        label="Builds you've created"
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
    </AuthWrapper>
  )
}
