'use server'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'

import { CommunityBuildList } from './CommunityBuilds'

export default async function Page() {
  return (
    <>
      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters key="community-build-filters" />
      </div>

      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CommunityBuildList itemsPerPage={DEFAULT_ITEMS_PER_PAGE} />
      </div>
    </>
  )
}
