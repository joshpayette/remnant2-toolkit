'use client'

import { signIn, useSession } from 'next-auth/react'

import { Skeleton } from '@/features/ui/Skeleton'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useSession()

  if (status === 'loading') return <Skeleton />

  if (status === 'unauthenticated') {
    return (
      <div className="bg-red-500 p-2 text-white">
        Access denied.{' '}
        <button onClick={() => signIn()}>Sign in to view this page</button>
      </div>
    )
  }

  return children
}
