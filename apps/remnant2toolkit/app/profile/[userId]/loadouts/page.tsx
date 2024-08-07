import { getIsLoadoutPublic } from '@/app/(actions)/loadouts/get-is-loadout-public'
import { getLoadoutList } from '@/app/(actions)/loadouts/get-loadout-list'
import { getSession } from '@/app/(features)/auth/services/sessionService'
import ImportLoadouts from '@/app/profile/[userId]/loadouts/import-loadouts'
import { LoadoutGrid } from '@/app/profile/[userId]/loadouts/loadout-grid'
import { LoadoutPublicCheckbox } from '@/app/profile/[userId]/loadouts/loadout-public-checkbox'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getSession()
  const isLoadoutPublic = await getIsLoadoutPublic(userId)
  const existingLoadouts = await getLoadoutList(userId)
  const isEditable = session?.user?.id === userId

  if (session?.user?.id !== userId && !isLoadoutPublic) {
    return (
      <p className="text-red-500">You are not authorized to view this page.</p>
    )
  }

  return (
    <>
      <div className="mb-4 flex w-full flex-col items-center justify-center">
        <div className="border-b-primary-500 flex w-full flex-row items-center justify-center border-b py-2">
          <h2 className="flex w-full items-center justify-start text-2xl">
            Loadouts
          </h2>
          {isEditable ? (
            <LoadoutPublicCheckbox isLoadoutPublic={isLoadoutPublic} />
          ) : null}
        </div>
      </div>
      <div className="mb-8 flex w-full items-center justify-end">
        <ImportLoadouts existingLoadouts={existingLoadouts} />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <LoadoutGrid isEditable={isEditable} userId={userId} />
      </div>
    </>
  )
}
