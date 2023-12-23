'use client'

import { signIn, useSession } from 'next-auth/react'
import LoadingIndicator from './LoadingIndicator'

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  if (status === 'loading') return <LoadingIndicator />

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
