import { BuildFilters } from '@/app/(components)/filters/builds/build-filters'
import { BuildListFilters } from '@/app/(components)/filters/builds/types'
import { getServerSession } from '@/app/(utils)/auth'
import { FavoritedBuilds } from '@/app/profile/[userId]/favorited-builds/FavoritedBuilds'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()

  if (session?.user?.id !== userId) {
    return (
      <p className="text-red-500">You are not authorized to view this page.</p>
    )
  }

  const buildFilters: Partial<BuildListFilters> = {
    patchAffected: true,
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center sm:mb-6">
        <BuildFilters
          key="user-favorited-builds-filters"
          buildFiltersOverrides={buildFilters}
        />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FavoritedBuilds buildFiltersOverrides={buildFilters} />
      </div>
    </>
  )
}
