'use server'

import { Metadata } from 'next'
import React from 'react'

import { Link } from '@/app/(components)/_base/link'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { getServerSession } from '@/app/(utils)/auth'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Build Creation Tool - Remnant 2 Toolkit`
  const description = NAV_ITEMS.createBuild.description

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
          <div className="absolute z-10 mb-2 flex h-full w-full flex-col items-center justify-start p-2 text-2xl font-bold text-red-500">
            <p className="w-full text-center">
              This enhanced build tool requires you to be logged in to use it,
              as it saves your builds to the database. If you prefer not to sign
              in, you can still use the <br />
              <Link href="/builder" className="text-white underline">
                non-database builder by clicking here!
              </Link>
            </p>
          </div>
          {children}
        </div>
      </>
    )
  }

  return <>{children}</>
}
