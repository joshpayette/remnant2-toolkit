import { BuildFilters } from '@/app/(components)/filters/builds/build-filters'
import { FeaturedBuilds } from '@/app/profile/[userId]/featured-builds/FeaturedBuilds'
import { getServerSession } from '@/features/auth/lib'

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
        <BuildFilters key="user-featured-builds-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FeaturedBuilds isEditable={isEditable} userId={userId} />
      </div>
    </>
  )
}
