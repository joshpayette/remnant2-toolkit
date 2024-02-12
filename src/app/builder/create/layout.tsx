'use server'

import { redirect } from 'next/navigation'
import React from 'react'

import { getServerSession } from '@/features/auth/lib'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  // If user is not logged in, redirect to the URL builder page
  if (!session) redirect('/builder')

  return <>{children}</>
}
