'use client'

import LoadingIndicator from '@/app/(components)/LoadingIndicator'
import { useSession } from 'next-auth/react'

export default function ProfileHeader() {
  const { data: session } = useSession()

  if (!session) return <LoadingIndicator />

  return (
    session.user?.image && (
      <div className="flex items-center gap-x-8">
        <img
          src={session.user?.image}
          alt=""
          className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-semibold text-white">
            {session.user?.name}
          </h2>
          <p className="text-sm text-gray-400">{session.user?.email}</p>
        </div>
      </div>
    )
  )
}
