'use server'

import { getServerSession } from '@/app/(utils)/auth'
import { badWordFilter } from '@/app/(utils)/bad-word-filter'
import { prisma } from '@/app/(utils)/db'
import { sendBadWordNotification } from '@/app/(utils)/moderation/bad-word-filter/send-bad-word-notification'

export async function saveProfile({
  userId,
  newDisplayName,
  newBio,
  newAvatarId,
}: {
  userId: string
  newDisplayName: string
  newBio: string
  newAvatarId: string
}): Promise<{ message: string; success: boolean }> {
  const session = await getServerSession()
  if (!session || !session.user) {
    throw new Error('You must be logged in to save a profile.')
  }
  if (session.user.id !== userId) {
    throw new Error('You can only save your own profile.')
  }

  const displayNameBadWordCheck = badWordFilter.isProfane(newDisplayName)
  if (displayNameBadWordCheck.isProfane) {
    // Send webhook to #action-log
    await sendBadWordNotification({
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Update Profile, Display Name',
              },
              {
                name: 'User',
                value: session.user.displayName,
              },
              {
                name: 'Bad Words',
                value: displayNameBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    })

    return {
      message: `Could not save profile with profanity: ${displayNameBadWordCheck.badWords.join(
        ', ',
      )}`,
      success: false,
    }
  }

  const bioBadWordCheck = badWordFilter.isProfane(newBio)
  // Send webhook to #action-log
  await sendBadWordNotification({
    params: {
      embeds: [
        {
          title: `Bad Word Filter Tripped`,
          color: 0xff0000,
          fields: [
            {
              name: 'Action',
              value: 'Update Profile, Bio',
            },
            {
              name: 'User',
              value: session.user.displayName,
            },
            {
              name: 'Bad Words',
              value: bioBadWordCheck.badWords.join(', '),
            },
          ],
        },
      ],
    },
  })

  if (bioBadWordCheck.isProfane) {
    return {
      message: `Could not save profile with profanity: ${bioBadWordCheck.badWords.join(
        ', ',
      )}`,
      success: false,
    }
  }

  const cleanDisplayName = badWordFilter.clean(newDisplayName)
  const cleanBio = badWordFilter.clean(newBio)

  const response = await prisma.$transaction([
    prisma.userProfile.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        bio: cleanBio,
        avatarId: newAvatarId,
      },
      update: {
        bio: cleanBio,
        avatarId: newAvatarId,
      },
    }),
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        displayName: cleanDisplayName,
      },
    }),
  ])

  if (!response) {
    return {
      message: 'Failed to save profile',
      success: false,
    }
  }

  return {
    message: 'Profile saved successfully',
    success: true,
  }
}
