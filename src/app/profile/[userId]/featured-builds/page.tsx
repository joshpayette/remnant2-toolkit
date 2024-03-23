import { FeaturedBuilds } from '@/app/profile/[userId]/featured-builds/FeaturedBuilds'
import { getServerSession } from '@/features/auth/lib'
import { BuildListFilters } from '@/features/build/filters/BuildListFilters'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()
  const isEditable = session?.user?.id === userId

  return (
    <>
      <div className="mb-8 flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-row items-center justify-center border-b border-b-primary-500 py-2">
          <h2 className="flex w-full items-center justify-start text-2xl">
            Build Filters
          </h2>
        </div>
        <BuildListFilters key="user-featured-builds-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FeaturedBuilds isEditable={isEditable} userId={userId} />
      </div>
    </>
  )
}
