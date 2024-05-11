'use server'

import { BuildFilters } from '@/app/(components)/filters/builds/build-filters'
import { PageHeader } from '@/app/(components)/page-header'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/(utils)/pagination/constants'
import { FeaturedBuilds } from '@/app/featured-builds/featured-builds'

export default async function Page() {
  return (
    <>
      <PageHeader
        title="Featured builds"
        subtitle={NAV_ITEMS.featuredBuilds.description}
      />

      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters key="featured-build-filters" />
      </div>
      <div className="mb-2 grid w-full grid-cols-1 gap-2">
        <FeaturedBuilds itemsPerPage={DEFAULT_ITEMS_PER_PAGE} />
      </div>
    </>
  )
}
