'use client'

import Link from 'next/link'
import PageHeader from '../../features/ui/PageHeader'
import CreatorBuilds from '../../features/build/components/FeaturedBuilds'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import MostPopularBuilds from '../../features/build/components/MostPopularBuilds'
import CommunityBuildFilters from '@/features/filters/components/CommunityBuildFilters'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import { DEFAULT_COMMUNITY_BUILD_FILTERS } from '@/features/filters/constants'

export default function Page() {
  const { data: sessionData } = useSession()
  const [communityBuildFilters, setCommunityBuildFilters] =
    useState<CommunityBuildFilterProps>(DEFAULT_COMMUNITY_BUILD_FILTERS)

  function handleChangeFilters(filters: CommunityBuildFilterProps) {
    setCommunityBuildFilters(filters)
  }

  return (
    <>
      <PageHeader title="Community Builds" subtitle="Find your next build">
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
          <Link
            href="/community-builds/by-release"
            className="rounded bg-purple-500 p-2 text-sm font-bold hover:bg-purple-700"
          >
            Find builds by release
          </Link>
        </div>
      </PageHeader>

      <div className="mb-8 flex w-full max-w-2xl items-center justify-center">
        <CommunityBuildFilters onUpdate={handleChangeFilters} />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatorBuilds
          communityBuildFilters={communityBuildFilters}
          itemsPerPage={4}
        />
      </div>
      <hr className="my-12 w-full border-gray-800" />
      <div className="grid w-full grid-cols-1 gap-2">
        <MostPopularBuilds
          communityBuildFilters={communityBuildFilters}
          itemsPerPage={16}
        />
      </div>
    </>
  )
}
