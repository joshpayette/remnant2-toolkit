'use server'

import { Metadata } from 'next'

import { getServerSession } from '@/features/auth/lib'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { Tabs } from '@/features/profile/components/Tabs'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Created Builds - Remnant2Toolkit`
  const description =
    'View all of the builds you have created on Remnant 2 Toolkit.'

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/profile/created-builds`,
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

  if (!session || !session.user) {
    return (
      <div className="mt-24 flex items-center justify-center">
        <p className="text-center text-2xl">
          You must be logged in to view this page.
        </p>
      </div>
    )
  }

  return (
    <>
      <ProfileHeader editable={true} userId={session.user.id} />
      <div className="mb-8 flex w-full flex-col items-center">
        <Tabs />
      </div>
      {children}
    </>
  )
}
