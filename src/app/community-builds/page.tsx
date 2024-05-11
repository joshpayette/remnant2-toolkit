'use server'

import { BuildFilters } from '@/app/(components)/filters/builds/build-filters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/(utils)/pagination/constants'

import { CommunityBuilds } from './community-builds'

export default async function Page() {
  return (
    <>
      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters key="community-build-filters" />
      </div>

      <div className="grid w-full grid-cols-1 gap-2">
        <CommunityBuilds itemsPerPage={DEFAULT_ITEMS_PER_PAGE} />
      </div>
    </>
  )
}
