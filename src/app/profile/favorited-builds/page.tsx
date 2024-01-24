'use client'

import CopyBuildUrlButton from '../(components)/CopyBuildUrlButton'
import { FavoritedBuildsFilter, getFavoritedBuilds } from '../actions'
import usePagination from '@/app/(hooks)/usePagination'
import { useEffect, useState } from 'react'
import BuildCard from '@/app/(components)/BuildCard'
import BuildListFilters from '@/app/(components)/BuildListFilters'
import BuildList from '@/app/(components)/BuildList'
import DuplicateBuildButton from '../(components)/DuplicateBuildButton'
import { DBBuild } from '@/app/(types)/build'
import Tabs from '../(components)/Tabs'
import ProfileHeader from '../(components)/ProfileHeader'
import { useSession } from 'next-auth/react'
import AuthWrapper from '@/app/(components)/AuthWrapper'

export default function Page() {
  const { data: sessionData } = useSession()
  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<FavoritedBuildsFilter>('date favorited')
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
      const response = await getFavoritedBuilds({
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

  const filterOptions: FavoritedBuildsFilter[] = ['date favorited', 'upvotes']

  function handleFilterChange(filter: string) {
    setFilter(filter as FavoritedBuildsFilter)
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
        label="Builds you've favorited"
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
              footerActions={
                <div className="flex items-center justify-between gap-2 p-2 text-sm">
                  <CopyBuildUrlButton buildId={build.id} />
                  <DuplicateBuildButton build={build} />
                </div>
              }
            />
          </div>
        ))}
      </BuildList>
    </AuthWrapper>
  )
}
