'use client'

import Link from 'next/link'
import PageHeader from '../(components)/PageHeader'
import CreatorBuilds from './(components)/FeaturedBuilds'
import MostPopularBuilds from './(components)/MostPopularBuilds'
import { signIn, useSession } from 'next-auth/react'

export default function Page() {
  const { data: sessionData } = useSession()

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
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatorBuilds itemsPerPage={4} />
      </div>
      <hr className="my-12 w-full border-gray-800" />
      <div className="grid w-full grid-cols-1 gap-2">
        <MostPopularBuilds itemsPerPage={8} />
      </div>
    </>
  )
}
