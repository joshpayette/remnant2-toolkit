import { BuildFilters } from '@/app/(components)/filters/builds/build-filters'
import { CreatedBuilds } from '@/app/profile/[userId]/created-builds/CreatedBuilds'
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
      <div className="flex w-full flex-col items-center justify-center sm:mb-6">
        <BuildFilters key="user-created-builds-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatedBuilds isEditable={isEditable} userId={userId} />
      </div>
    </>
  )
}
