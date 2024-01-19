'use client'

import BuildCard from '@/app/(components)/BuildCard'
import BuildList from '@/app/(components)/BuildList'
import PageHeader from '@/app/(components)/PageHeader'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import usePagination from '@/app/(hooks)/usePagination'
import { DBBuild } from '@/app/(types)/build'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { getBuilds } from './actions'

const ITEMS_PER_PAGE = 8

export default function Page() {
  const { data: sessionData } = useSession()

  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const { itemTrackerStorage } = useLocalStorage()
  const { discoveredItemIds } = itemTrackerStorage

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
    itemsPerPage: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    async function getBuildsByCollection() {
      const response = await getBuilds({
        itemsPerPage: ITEMS_PER_PAGE,
        pageNumber: currentPage,
        discoveredItemIds,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setIsLoading(false)
    }
    getBuildsByCollection()
  }, [currentPage, discoveredItemIds])

  if (!sessionData?.user) {
    return (
      <>
        <PageHeader
          title="Builds By Collection"
          subtitle="Browse all community builds that contain only items in your collection, based on the data in the Item Tracker."
        >
          <button
            className="rounded bg-purple-500 p-2 text-sm font-bold hover:bg-purple-700"
            onClick={() => signIn()}
          >
            Sign in to find builds by collection
          </button>
        </PageHeader>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Builds By Collection"
        subtitle="Browse all community builds that contain only items in your collection, based on the data in the Item Tracker."
      />

      <BuildList
        label="Build Results"
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
        headerActions={undefined}
      >
        {builds.map((build) => (
          <div key={build.id} className="h-full w-full">
            <BuildCard
              build={build}
              onReportBuild={undefined}
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
