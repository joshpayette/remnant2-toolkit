import { Metadata } from 'next'

import { prisma } from '@/features/db'
import { getLoadoutList } from '@/features/loadouts/actions/getLoadoutList'
import { NAV_ITEMS } from '@/features/navigation/constants'

export async function generateMetadata({
  params: { userId },
}: {
  params: { userId: string }
}): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return {
      title: 'Error loading user loadouts',
      description: `There was an error loading this user's loadouts. The user may no longer exist.`,
      openGraph: {
        title: 'Error loading user loadouts',
        description: `There was an error loading this user's loadouts. The user may no longer exist.`,
        url: `https://remnant2toolkit.com/profile/${userId}/loadouts`,
        images: [
          {
            url: 'https://d2sqltdcj8czo5.cloudfront.net/toolkit/og-image-sm.jpg',
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'Error loading user loadouts',
        description: `There was an error loading this user's loadouts. The user may no longer exist.`,
      },
    }
  }

  const profileData = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
  })

  if (!profileData?.isLoadoutPublic) {
    return {
      title: 'Error loading user loadouts',
      description: `This user has not made their loadouts public.`,
      openGraph: {
        title: 'Error loading user loadouts',
        description: `This user has not made their loadouts public.`,
        url: `https://remnant2toolkit.com/profile/${userId}/loadouts`,
        images: [
          {
            url: 'https://d2sqltdcj8czo5.cloudfront.net/toolkit/og-image-sm.jpg',
            width: 150,
            height: 150,
          },
        ],
      },
      twitter: {
        title: 'Error loading user loadouts',
        description: `This user has not made their loadouts public.`,
      },
    }
  }

  const loadoutsBuilds = await getLoadoutList(userId)
  const loadoutNames = loadoutsBuilds.map(
    (build) =>
      `${build.name} by ${build.createdByDisplayName ?? build.createdByName}`,
  )

  const title = `${user.displayName ?? user.name} Loadouts - Remnant2Toolkit`

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
  return <>{children}</>
}
