import { Suspense } from 'react'

import { getServerSession } from '@/features/auth/lib'
import { LoadoutBuilds } from '@/features/profile/loadouts/components/LoadoutBuilds'
import { LoadoutSkeleton } from '@/features/profile/loadouts/components/LoadoutSkeleton'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()

  return (
    <div
      className="mt-12 flex flex-col items-start justify-center"
      id="loadouts"
    >
      <h3 className="mb-12 w-full border-b border-b-primary-500 pb-2 text-2xl">
        Loadouts
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<LoadoutSkeleton />}>
          <LoadoutBuilds
            userId={userId}
            isEditable={session?.user?.id === userId}
          />
        </Suspense>
      </div>
    </div>
  )
}
