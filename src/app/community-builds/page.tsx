'use client'

import Link from 'next/link'
import PageHeader from '../../components/PageHeader'
import CreatorBuilds from './(components)/FeaturedBuilds'
import { signIn, useSession } from 'next-auth/react'
import Filters, { FilterProps, defaultFilters } from './(components)/Filters'
import { useState } from 'react'
import MostPopularBuilds from './(components)/MostPopularBuilds'

export default function Page() {
  const { data: sessionData } = useSession()
  const [filters, setFilters] = useState<FilterProps>(defaultFilters)

  function handleChangeFilters(filters: FilterProps) {
    setFilters(filters)
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

      <div className="mb-8 flex w-full max-w-lg items-center justify-center">
        <Filters onUpdate={handleChangeFilters} />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatorBuilds globalFilters={filters} itemsPerPage={4} />
      </div>
      <hr className="my-12 w-full border-gray-800" />
      <div className="grid w-full grid-cols-1 gap-2">
        <MostPopularBuilds filters={filters} itemsPerPage={16} />
      </div>
    </>
  )
}
