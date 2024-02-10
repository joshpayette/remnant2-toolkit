'use client'

import PageHeader from '@/features/ui/PageHeader'
import FeaturedBuilds from '@/app/creator-builds/FeaturedBuilds'
import { useState } from 'react'
import BuildListFilters from '@/features/filters/components/BuildListFilters'
import { BuildListFilterFields } from '@/features/filters/types'

export default function Page() {
  const [buildListFilters, setBuildListFilters] =
    useState<BuildListFilterFields | null>(null)

  return (
    <>
      <PageHeader
        title="Featured builds"
        subtitle="Popular creator builds from the community"
      />

      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          onUpdateFilters={(newFilters) => {
            setBuildListFilters(newFilters)
          }}
        />
      </div>
      {buildListFilters && (
        <div className="mb-4 grid w-full grid-cols-1 gap-2">
          <FeaturedBuilds
            buildListFilters={buildListFilters}
            itemsPerPage={24}
          />
        </div>
      )}
    </>
  )
}
