import { getServerSession } from '@/app/(features)/auth'
import { PageClient } from '@/app/profile/[userId]/linked-builds/[[...optionalBuildId]]/page.client'

export default async function Page({
  params: { userId, optionalBuildId },
}: {
  params: { userId: string; optionalBuildId: string[] }
}) {
  const session = await getServerSession()
  const isEditable = session?.user?.id === userId

  const buildId = optionalBuildId ? optionalBuildId[0] : undefined

  return (
    <div className="mb-4 grid w-full grid-cols-1 gap-2">
      <PageClient isEditable={isEditable} userId={userId} buildId={buildId} />
    </div>
  )
}
