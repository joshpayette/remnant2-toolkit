import { Metadata, ResolvingMetadata } from 'next'

import { isErrorResponse } from '@/features/error-handling/isErrorResponse'

import { getProfile } from './actions'
import ProfilePage from './page'

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
  const title = `${user.displayName ?? user.name} Profile on Remnant 2 Toolkit`
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
          url: 'https://d2sqltdcj8czo5.cloudfront.net/og_image_small.png',
          width: 100,
          height: 100,
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
}: {
  params: { userId: string }
}) {
  return <ProfilePage params={{ userId }} />
}
