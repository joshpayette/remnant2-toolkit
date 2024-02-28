'use server'

import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { signIn } from 'next-auth/react'
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

  if (!session) {
    return (
      <>
        <div className="relative flex w-full flex-col items-center">
          <div
            id="disabled-overlay"
            className="absolute inset-0 z-10 h-full bg-black/90"
          />
          <div className="absolute z-10 mb-2 flex h-full w-full flex-col items-center justify-center text-2xl font-bold text-red-500">
            <p>
              Sign in required to use the database builder. Either sign in, or
              use the{' '}
              <Link href="/builder" className="underline">
                URL builder
              </Link>
              .
            </p>
          </div>
          {children}
        </div>
      </>
    )
  }

  return <>{children}</>
}
