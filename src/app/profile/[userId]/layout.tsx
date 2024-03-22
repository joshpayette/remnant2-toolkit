import { Metadata, ResolvingMetadata } from 'next'

import { getServerSession } from '@/features/auth/lib'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { getProfile } from '@/features/profile/actions/getProfile'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { PageHeader } from '@/features/ui/PageHeader'

export async function generateMetadata(
  { params: { userId } }: { params: { userId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const profileData = await getProfile(userId)

  if (isErrorResponse(profileData)) {
    console.error(profileData.errors)
    return {
      title: 'Error loading profile',
      description:
        'There was an error loading this profile. It may have been removed.',
      openGraph: {
        title: 'Error loading profile',
        description:
          'There was an error loading this profile. It may have been removed.',
        url: `https://remnant2toolkit.com/profile/${userId}`,
        images: [
          {
            url: 'https://d2sqltdcj8czo5.cloudfront.net/toolkit/og-image-sm.jpg',
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'Error loading profile',
        description:
          'There was an error loading this profile. It may have been removed.',
      },
    }
  }

  const { user, profile } = profileData

  // const previousOGImages = (await parent).openGraph?.images || []
  // const previousTwitterImages = (await parent).twitter?.images || []
  const title = `${user.displayName ?? user.name} Profile - Remnant2Toolkit`
  const description =
    profile?.bio ??
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
  let profileData = await getProfile(userId)
  const session = await getServerSession()

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
          subtitle="The user profile cannot be found. If this is a new user, please try reloading the page."
        />
      </div>
    )
  }

  return (
    <>
      <ProfileHeader editable={session?.user?.id === userId} userId={userId} />
      {children}
    </>
  )
}
