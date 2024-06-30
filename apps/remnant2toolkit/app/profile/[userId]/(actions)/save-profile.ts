'use server'

import { prisma } from '@repo/db'

import { getServerSession } from '@/app/(features)/auth'
import { badWordFilter } from '@/app/(utils)/bad-word-filter'
import { sendWebhook } from '@/app/(utils)/moderation/send-webhook'

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
    await sendWebhook({
      webhook: 'auditLog',
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

  if (bioBadWordCheck.isProfane) {
    // Send webhook to #action-log
    await sendWebhook({
      webhook: 'auditLog',
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

    return {
      message: `Could not save profile with profanity: ${bioBadWordCheck.badWords.join(
        ', ',
      )}`,
      success: false,
    }
  }

  const cleanDisplayName = badWordFilter.clean(newDisplayName)
  const cleanBio = badWordFilter.clean(newBio)

  try {
    const [currentUserProfile, currentUser] = await prisma.$transaction([
      prisma.userProfile.findUnique({
        where: {
          userId,
        },
      }),
      prisma.user.findUnique({
        where: {
          id: userId,
        },
      }),
    ])

    const [newUserProfile, newUser] = await prisma.$transaction([
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

    if (
      currentUser?.displayName !== cleanDisplayName &&
      cleanDisplayName !== '' &&
      currentUser?.displayName !== ''
    ) {
      sendWebhook({
        webhook: 'modQueue',
        params: {
          embeds: [
            {
              title: `User display name updated`,
              color: 0x00ff00,
              fields: [
                {
                  name: 'New Display Name',
                  value: newUser.displayName || 'No display name',
                },
                {
                  name: 'Profile Link',
                  value: `https://remnant2toolkit.com/profile/${userId}`,
                },
              ],
            },
          ],
        },
      })
    }

    if (
      currentUserProfile?.bio !== cleanBio &&
      currentUserProfile?.bio !== '' &&
      cleanBio !== ''
    ) {
      sendWebhook({
        webhook: 'modQueue',
        params: {
          embeds: [
            {
              title: `User bio updated`,
              color: 0x00ff00,
              fields: [
                {
                  name: 'User',
                  value: session.user.displayName,
                },
                {
                  name: 'New Bio',
                  value: newUserProfile.bio,
                },
                {
                  name: 'Profile Link',
                  value: `https://remnant2toolkit.com/profile/${userId}`,
                },
              ],
            },
          ],
        },
      })
    }

    return {
      message: 'Profile saved successfully',
      success: true,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Failed to save profile.',
      success: false,
    }
  }
}
