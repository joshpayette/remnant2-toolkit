'use client'

import { useRouter } from 'next/navigation'

interface Props {
  userId: string
}

export function PublicProfileHeader({ userId }: Props) {
  const router = useRouter()

  return (
    <>
      <div className="flex w-full max-w-xl flex-col items-center justify-center border border-primary-500 bg-gray-800 p-4">
        <h2 className="mb-4 text-3xl font-bold">Quick Links</h2>
        <div className="flex items-center justify-center gap-x-4">
          <button
            onClick={() => router.push(`/profile/${userId}#createdBuilds`)}
            className="rounded-md border border-primary-500 bg-primary-700 p-2 text-white hover:bg-primary-500 hover:text-black"
          >
            Created Builds
          </button>
          <button
            onClick={() => router.push(`/profile/${userId}/loadouts`)}
            className="rounded-md border border-primary-500 bg-primary-700 p-2 text-white hover:bg-primary-500 hover:text-black"
          >
            Loadouts
          </button>
        </div>
      </div>
    </>
  )
}
