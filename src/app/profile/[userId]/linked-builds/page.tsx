import { getServerSession } from '@/app/(utils)/auth'
import getLinkedBuilds from '@/app/profile/[userId]/linked-builds/actions/get-linked-builds'
import { PageClient } from '@/app/profile/[userId]/linked-builds/page.client'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()
  const isEditable = session?.user?.id === userId

  const response = await getLinkedBuilds({ userId })
  if (response.status !== 200) {
    return <p className="text-red-500">Failed to load linked builds.</p>
  }

  const { linkedBuilds } = response.body

  if (!linkedBuilds) {
    return <p className="text-red-500">No linked builds found.</p>
  }

  return (
    <div className="mb-4 grid w-full grid-cols-1 gap-2">
      <PageClient linkedBuilds={linkedBuilds} isEditable={isEditable} />
    </div>
  )
}
