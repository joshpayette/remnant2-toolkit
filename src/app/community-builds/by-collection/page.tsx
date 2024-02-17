'use client'

import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseBuildListFilters } from '@/features/filters/lib/parseBuildListFilters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'
import { PageHeader } from '@/features/ui/PageHeader'

import { CollectionBuilds } from './CollectionBuilds'

export default function Page() {
  const { data: sessionData } = useSession()

  const searchParams = useSearchParams()
  const buildListFilters = parseBuildListFilters(searchParams)

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

      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="by-collection-filters"
        />
      </div>

      {buildListFilters && (
        <div className="mb-4 grid w-full grid-cols-1 gap-2">
          <CollectionBuilds
            buildListFilters={buildListFilters}
            itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          />
        </div>
      )}
    </>
  )
}
