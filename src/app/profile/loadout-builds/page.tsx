import Link from 'next/link'
import { Suspense } from 'react'

import { getServerSession } from '@/features/auth/lib'
import { getIsLoadoutPublic } from '@/features/profile/loadouts/actions/getIsLoadoutPublic'
import { LoadoutBuilds } from '@/features/profile/loadouts/components/LoadoutBuilds'
import { LoadoutVisibilityToggle } from '@/features/profile/loadouts/components/LoadoutVisibilityToggle'
import { Skeleton } from '@/features/ui/Skeleton'

export default async function Page() {
  const session = await getServerSession()
  const isLoadoutPublic = await getIsLoadoutPublic(session?.user?.id)

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-end gap-x-2">
        {isLoadoutPublic ? (
          <Link
            href={`/profile/${session?.user?.id}/loadouts?t=${Date.now()}`}
            className="underline"
          >
            Share your loadouts
          </Link>
        ) : null}
        <LoadoutVisibilityToggle userId={session?.user?.id} />
      </div>

      <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense
          fallback={<Skeleton className="h-full min-h-[362px] w-full" />}
        >
          <LoadoutBuilds isEditable={true} />
        </Suspense>
      </div>
    </div>
  )
}
