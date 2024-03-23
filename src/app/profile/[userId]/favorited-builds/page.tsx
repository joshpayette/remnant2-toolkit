import { FavoritedBuilds } from '@/app/profile/[userId]/favorited-builds/FavoritedBuilds'
import { getServerSession } from '@/features/auth/lib'
import { BuildListFilters } from '@/features/build/filters/BuildListFilters'

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

  return (
    <>
      <div className="mb-8 flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-row items-center justify-center border-b border-b-primary-500 py-2">
          <h2 className="flex w-full items-center justify-start text-2xl">
            Build Filters
          </h2>
        </div>
        <BuildListFilters key="user-favorited-builds-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FavoritedBuilds userId={userId} />
      </div>
    </>
  )
}
