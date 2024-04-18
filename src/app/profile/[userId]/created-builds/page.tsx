import { CreatedBuilds } from '@/app/profile/[userId]/created-builds/CreatedBuilds'
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
        <BuildListFilters key="user-created-builds-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatedBuilds isEditable={isEditable} userId={userId} />
      </div>
    </>
  )
}
