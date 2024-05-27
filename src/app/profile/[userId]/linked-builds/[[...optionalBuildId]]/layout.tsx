import { Metadata } from 'next'

import { NAV_ITEMS } from '@/app/(types)/navigation'
import { prisma } from '@/app/(utils)/db'
import { DEFAULT_BIO } from '@/app/profile/[userId]/(lib)/constants'
import { getAvatarById } from '@/app/profile/[userId]/(lib)/get-avatar-by-id'

export async function generateMetadata({
  params: { userId },
}: {
  params: { userId: string }
}): Promise<Metadata> {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!userData) {
    console.info('User or profile not found', { userId, userData })

    return {
      title: 'Error loading profile',
      description:
        'There was an error loading this profile. It may have been removed.',
      openGraph: {
        title: 'Error loading profile',
        description:
          'There was an error loading this profile. It may have been removed.',
        url: `https://remnant2toolkit.com/profile/${userId}/linked-builds`,
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

  let profileData = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
  })

  if (!profileData) {
    profileData = await prisma.userProfile.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        bio: DEFAULT_BIO,
      },
      update: {},
    })
  }

  const userName = userData.displayName ?? userData.name
  const title = `${userName}'s Linked Builds - Remnant2Toolkit`
  const description = NAV_ITEMS.linkedBuilds.description

  const avatarId = profileData.avatarId
  const avatar = getAvatarById(avatarId)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://remnant2toolkit.com/profile/${userId}/linked-builds`,
      images: [
        {
          url: `https://d2sqltdcj8czo5.cloudfront.net${avatar.imagePath}`,
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
  return <>{children}</>
}
