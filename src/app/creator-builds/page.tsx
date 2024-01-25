'use client'

import Link from 'next/link'
import PageHeader from '../../components/PageHeader'
import CreatorBuilds from '../../features/build/components/FeaturedBuilds'
import { signIn, useSession } from 'next-auth/react'
import CommunityBuildFilters, {
  CommunityBuildFilterProps,
  defaultCommunityBuildFilters,
} from '../../features/build/components/CommunityBuildFilters'
import { useState } from 'react'

export default function Page() {
  const { data: sessionData } = useSession()
  const [filters, setFilters] = useState<CommunityBuildFilterProps>(
    defaultCommunityBuildFilters,
  )

  function handleChangeFilters(filters: CommunityBuildFilterProps) {
    setFilters(filters)
  }

  return (
    <>
      <PageHeader
        title="Featured builds"
        subtitle="Popular creator builds from the community"
      />

      <div className="mb-8 flex w-full max-w-lg items-center justify-center">
        <CommunityBuildFilters onUpdate={handleChangeFilters} />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatorBuilds globalFilters={filters} itemsPerPage={24} />
      </div>
    </>
  )
}
