'use server'

import { Metadata } from 'next'

import { getServerSession } from '@/features/auth/lib'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { getProfile } from '@/features/profile/actions/getProfile'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { Tabs } from '@/features/profile/components/Tabs'
import { PageHeader } from '@/features/ui/PageHeader'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Favorited Builds - Remnant 2 Toolkit`
  const description =
    'A collection of builds you have favorited. Save your favorite builds and access them from your profile.'

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/profile/favorited-builds`,
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
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Sign-In Required"
          subtitle="You must be logged in to view this page."
        />
      </div>
    )
  }

  let profileData = await getProfile(session.user.id)

  if (!profileData) {
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Something went wrong!"
          subtitle="The user profile cannot be found. If this is a new user, please try reloading the page."
        />
      </div>
    )
  }

  if (isErrorResponse(profileData)) {
    console.error(profileData.errors)
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Something went wrong!"
          subtitle="The user profile cannot be found."
        />
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
