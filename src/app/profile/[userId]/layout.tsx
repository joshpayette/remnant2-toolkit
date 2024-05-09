import { Metadata, ResolvingMetadata } from 'next'
import { revalidatePath } from 'next/cache'

import { ProfileHeader } from '@/app/profile/[userId]/(components)/ProfileHeader'
import { ProfileNavbar } from '@/app/profile/[userId]/(components)/ProfileNavbar'
import { ProfileStats } from '@/app/profile/[userId]/(components)/ProfileStats'
import {
  DEFAULT_BIO,
  DEFAULT_DISPLAY_NAME,
} from '@/app/profile/[userId]/(lib)/constants'
import { getAvatarById } from '@/app/profile/[userId]/(lib)/getAvatarById'
import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'
import { getIsLoadoutPublic } from '@/features/loadouts/actions/getIsLoadoutPublic'
import { PageHeader } from '@/features/ui/PageHeader'

export async function generateMetadata(
  { params: { userId } }: { params: { userId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
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

  // const previousOGImages = (await parent).openGraph?.images || []
  // const previousTwitterImages = (await parent).twitter?.images || []
  const userName = userData.displayName ?? userData.name
  const title = `${userName} Profile - Remnant2Toolkit`
  const description =
    profileData.bio ?? `View ${userName}'s profile on Remnant 2 Toolkit.`

  const avatarId = profileData.avatarId
  const avatar = getAvatarById(avatarId)

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      url: `https://remnant2toolkit.com/profile/${userId}`,
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
  children,
  params: { userId },
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const session = await getServerSession()
  const isEditable = session?.user?.id === userId

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return (
      <>
        <PageHeader title="User Profile Not Found" />
        <p className="text-lg text-red-500">
          The user or user profile you are looking for could not be found.
        </p>
      </>
    )
  }

  let profile = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
  })

  if (!profile) {
    profile = await prisma.userProfile.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        bio: DEFAULT_BIO,
      },
      update: {},
    })
    revalidatePath(`/profile/${userId}`)
  }

  const isLoadoutPublic = await getIsLoadoutPublic(userId)

  return (
    <div className="w-full">
      <header>
        <ProfileNavbar
          isEditable={isEditable}
          isLoadoutPublic={isLoadoutPublic}
          showPrivateLinks={session?.user?.id === userId}
          userId={userId}
        />

        <div className="flex flex-col items-start justify-start gap-x-8 gap-y-4 bg-outline/10 px-4 py-4 sm:flex-row sm:items-start sm:px-6 lg:px-8">
          <ProfileHeader
            avatarId={profile.avatarId}
            bio={profile.bio}
            displayName={user.displayName || user.name || DEFAULT_DISPLAY_NAME}
            isEditable={isEditable}
            userId={userId}
          />
        </div>

        <ProfileStats userId={userId} isEditable={isEditable} />
      </header>
      <div className="border-t border-on-background/10 pt-4">{children}</div>
    </div>
  )
}
