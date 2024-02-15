import { Metadata, ResolvingMetadata } from 'next'

import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'

import { getProfile } from './actions'

export async function generateMetadata(
  { params: { userId } }: { params: { userId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const response = await getProfile(userId)
  if (isErrorResponse(response)) {
    console.error(response.errors)
    throw new Error(
      `Build ${userId} is not found. If you are sure the build exists, it may be marked private.`,
    )
  }

  const { user, profile } = response

  // const previousOGImages = (await parent).openGraph?.images || []
  // const previousTwitterImages = (await parent).twitter?.images || []
  const title = `${user.displayName ?? user.name} Profile - Remnant2Toolkit`
  const description =
    profile.bio ??
    `View ${user.displayName ?? user.name}'s profile on Remnant 2 Toolkit.`

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      url: `https://remnant2toolkit.com/profile/${user.id}`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/toolkit/og-image-sm.jpg',
          width: 150,
          height: 150,
        },
      ],
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function Layout({
  params: { userId },
  children,
}: {
  params: { userId: string }
  children: React.ReactNode
}) {
  return (
    <>
      <ProfileHeader editable={false} userId={userId} />
      {children}
    </>
  )
}
