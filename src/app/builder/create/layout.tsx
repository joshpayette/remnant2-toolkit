'use server'

import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import { getServerSession } from '@/features/auth/lib'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Build Creation Tool - Remnant 2 Toolkit`
  const description =
    'Remnant 2 Builder, a tool to create and share builds with the community. Share your builds with the community and help others find the best builds for their playstyle.'

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/builder/create`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/toolkit/og-image-sm.jpg',
          width: 150,
          height: 150,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  }
}

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
