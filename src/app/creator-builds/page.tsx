'use client'

import PageHeader from '@/features/ui/PageHeader'
import FeaturedBuilds from '@/app/creator-builds/FeaturedBuilds'
import { useState } from 'react'
import CommunityBuildFilters from '@/features/filters/components/CommunityBuildFilters'
import { CommunityBuildFilterProps } from '@/features/filters/types'

export default function Page() {
  const [communityBuildFilters, setCommunityBuildFilters] =
    useState<CommunityBuildFilterProps | null>(null)

  return (
    <>
      <PageHeader
        title="Featured builds"
        subtitle="Popular creator builds from the community"
      />

      <div className="mb-8 flex w-full max-w-xl items-center justify-center">
        <CommunityBuildFilters
          onUpdateFilters={(newFilters) => {
            setCommunityBuildFilters(newFilters)
          }}
        />
      </div>
      {communityBuildFilters && (
        <div className="mb-4 grid w-full grid-cols-1 gap-2">
          <FeaturedBuilds
            communityBuildFilters={communityBuildFilters}
            itemsPerPage={24}
          />
        </div>
      )}
    </>
  )
}
