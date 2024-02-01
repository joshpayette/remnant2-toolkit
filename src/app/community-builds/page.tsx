'use client'

import Link from 'next/link'
import PageHeader from '../../features/ui/PageHeader'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import CommunityBuildList from '../../features/build/components/CommunityBuildList'
import CommunityBuildFilters from '@/features/filters/components/CommunityBuildFilters'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import { DEFAULT_COMMUNITY_BUILD_FILTERS } from '@/features/filters/constants'
import getTotalBuildCount from '@/features/build/actions/getTotalBuildCount'

export default function Page() {
  const { data: sessionData } = useSession()
  const [communityBuildFilters, setCommunityBuildFilters] =
    useState<CommunityBuildFilterProps>(DEFAULT_COMMUNITY_BUILD_FILTERS)

  const [totalBuildCount, setTotalBuildCount] = useState<number | string>(
    'HUNDREDS',
  )

  useEffect(() => {
    async function getBuildCountAsync() {
      const response = await getTotalBuildCount()
      setTotalBuildCount(response)
    }
    getBuildCountAsync()
  }, [])

  function handleChangeFilters(filters: CommunityBuildFilterProps) {
    setCommunityBuildFilters(filters)
  }

  return (
    <>
      <PageHeader
        title="Community Builds"
        subtitle={
          <span>
            Search from{' '}
            <span className="text-2xl font-bold text-green-500">
              {totalBuildCount}
            </span>{' '}
            community submitted builds!
          </span>
        }
      >
        <div className="flex items-center justify-center gap-x-4">
          {sessionData?.user ? (
            <Link
              className="rounded bg-purple-500 p-2 text-sm font-bold hover:bg-purple-700"
              href="/community-builds/by-collection"
            >
              Find builds by collection
            </Link>
          ) : (
            <button
              className="rounded bg-red-500 p-2 text-sm font-bold hover:bg-red-700"
              onClick={() => signIn()}
            >
              Sign in to find builds by collection
            </button>
          )}
        </div>
      </PageHeader>

      <div className="mb-8 flex w-full max-w-2xl items-center justify-center">
        <CommunityBuildFilters onUpdate={handleChangeFilters} />
      </div>
      <div className="grid w-full grid-cols-1 gap-2">
        <CommunityBuildList
          communityBuildFilters={communityBuildFilters}
          itemsPerPage={24}
        />
      </div>
    </>
  )
}
