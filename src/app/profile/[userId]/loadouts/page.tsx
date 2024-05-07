import { LoadoutPublicCheckbox } from '@/app/profile/[userId]/loadouts/LoadoutPublicCheckbox'
import { getServerSession } from '@/features/auth/lib'
import { getIsLoadoutPublic } from '@/features/loadouts/actions/getIsLoadoutPublic'
import { LoadoutGrid } from '@/features/loadouts/components/LoadoutGrid'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()
  const isLoadoutPublic = await getIsLoadoutPublic(userId)
  const isEditable = session?.user?.id === userId

  if (session?.user?.id !== userId && !isLoadoutPublic) {
    return (
      <p className="text-red-500">You are not authorized to view this page.</p>
    )
  }

  return (
    <>
      <div className="mb-8 flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-row items-center justify-center border-b border-b-primary py-2">
          <h2 className="flex w-full items-center justify-start text-2xl">
            Loadouts
          </h2>
          {isEditable ? (
            <LoadoutPublicCheckbox isLoadoutPublic={isLoadoutPublic} />
          ) : null}
        </div>
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <LoadoutGrid isEditable={isEditable} userId={userId} />
      </div>
    </>
  )
}
