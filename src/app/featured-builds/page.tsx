'use server'

import { FeaturedBuilds } from '@/app/featured-builds/FeaturedBuilds'
import { BuildListFilters } from '@/features/build/filters/BuildListFilters'
import { NAV_ITEMS } from '@/features/navigation/constants'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'
import { PageHeader } from '@/features/ui/PageHeader'

export default async function Page() {
  return (
    <>
      <PageHeader
        title="Featured builds"
        subtitle={NAV_ITEMS.featuredBuilds.description}
      />

      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters key="featured-build-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FeaturedBuilds itemsPerPage={DEFAULT_ITEMS_PER_PAGE} />
      </div>
    </>
  )
}
