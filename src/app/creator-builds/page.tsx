'use client'

import PageHeader from '../../features/ui/PageHeader'
import CreatorBuilds from '../../features/build/components/FeaturedBuilds'
import CommunityBuildFilters, {
  CommunityBuildFilterProps,
  defaultCommunityBuildFilters,
} from '../../features/build/components/CommunityBuildFilters'
import { useState } from 'react'

export default function Page() {
  const [communityBuildFilters, setCommunityBuildFilters] =
    useState<CommunityBuildFilterProps>(defaultCommunityBuildFilters)

  function handleChangeFilters(filters: CommunityBuildFilterProps) {
    setCommunityBuildFilters(filters)
  }

  return (
    <>
      <PageHeader
        title="Featured builds"
        subtitle="Popular creator builds from the community"
      />

      <div className="mb-8 flex w-full max-w-xl items-center justify-center">
        <CommunityBuildFilters onUpdate={handleChangeFilters} />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatorBuilds
          communityBuildFilters={communityBuildFilters}
          itemsPerPage={24}
        />
      </div>
    </>
  )
}
