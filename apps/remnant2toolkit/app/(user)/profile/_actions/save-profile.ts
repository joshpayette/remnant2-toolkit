'use server';

import { prisma } from '@repo/db';

import { badWordFilter } from '@/app/_libs/bad-word-filter';
import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { validateEnv } from '@/app/_libs/validate-env';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function saveProfile({
  userId,
  newDisplayName,
  newBio,
  newAvatarId,
}: {
  userId: string;
  newDisplayName: string;
  newBio: string;
  newAvatarId: string;
}): Promise<{ message: string; success: boolean }> {
  const env = validateEnv();

  const session = await getSession();
  if (!session || !session.user) {
    throw new Error('You must be logged in to save a profile.');
  }
  if (session.user.id !== userId) {
    throw new Error('You can only save your own profile.');
  }

  const displayNameBadWordCheck = badWordFilter.isProfane(newDisplayName);
  if (displayNameBadWordCheck.isProfane && !env.WEBHOOK_DISABLED) {
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
    });

    return {
      message: `Could not save profile with profanity: ${displayNameBadWordCheck.badWords.join(
        ', ',
      )}`,
      success: false,
    };
  }

  const bioBadWordCheck = badWordFilter.isProfane(newBio);

  if (bioBadWordCheck.isProfane && !env.WEBHOOK_DISABLED) {
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
    });

    return {
      message: `Could not save profile with profanity: ${bioBadWordCheck.badWords.join(
        ', ',
      )}`,
      success: false,
    };
  }

  const cleanDisplayName = badWordFilter.clean(newDisplayName);
  const cleanBio = badWordFilter.clean(newBio);

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
    ]);

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
    ]);

    if (
      currentUser?.displayName !== cleanDisplayName &&
      cleanDisplayName !== '' &&
      currentUser?.displayName !== '' &&
      !env.WEBHOOK_DISABLED
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
      });
    }

    if (
      currentUserProfile?.bio !== cleanBio &&
      currentUserProfile?.bio !== '' &&
      cleanBio !== '' &&
      !env.WEBHOOK_DISABLED
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
      });
    }

    return {
      message: 'Profile saved successfully',
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to save profile.',
      success: false,
    };
  }
}
