import { Metadata, ResolvingMetadata } from 'next'

import { getProfile } from '@/app/profile/actions'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import {
  getIsLoadoutPublic,
  getLoadoutList,
} from '@/features/profile/loadouts/actions'

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

  const isLoadoutPublic = await getIsLoadoutPublic(userId)

  if (!isLoadoutPublic) {
    return {
      title: 'User loadouts marked private',
      description: 'The user loadouts are marked private.',
      openGraph: {
        title: 'User loadouts marked private',
        description: 'The user loadouts are marked private.',
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
        title: 'User loadouts marked private',
        description: 'The user loadouts are marked private.',
      },
    }
  }

  const loadoutsBuilds = await getLoadoutList(userId)
  const loadoutNames = loadoutsBuilds.map(
    (build) =>
      `${build.name} by ${build.createdByDisplayName ?? build.createdByName}`,
  )

  // const previousOGImages = (await parent).openGraph?.images || []
  // const previousTwitterImages = (await parent).twitter?.images || []
  const title = `${
    profileData.user.displayName ?? profileData.user.name
  } Loadouts - Remnant2Toolkit`

  let description = ''

  for (let i = 0; i < loadoutNames.length; i++) {
    description += `${i + 1}. ${loadoutNames[i]}\r\n`
    description += ``
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://remnant2toolkit.com/profile/${userId}/loadout`,
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

  if (!profileData) {
    return (
      <p className="flex max-w-lg flex-col text-xl text-red-500">
        Error loading profile.
      </p>
    )
  }

  if (isErrorResponse(profileData)) {
    console.error(profileData.errors)
    return (
      <p className="flex max-w-lg flex-col text-xl text-red-500">
        Error loading profile.
      </p>
    )
  }

  const isLoadoutPublic = await getIsLoadoutPublic(userId)

  if (!isLoadoutPublic) {
    return (
      <p className="text-red flex max-w-lg flex-col text-xl text-red-500">
        User loadouts are marked private.
      </p>
    )
  }

  return <>{children}</>
}
