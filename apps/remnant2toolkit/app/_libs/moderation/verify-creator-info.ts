'use server';

import { prisma } from '@repo/db';
import { type Session } from 'next-auth';

import { badWordFilter } from '@/app/_libs/bad-word-filter';

export async function verifyCreatorInfo(session: Session | null) {
  const buildCreator = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      UserProfile: true,
    },
  });

  if (!buildCreator) {
    return {
      errors: ['Error finding build creator.'],
    };
  }

  // Ensure the build creator's name is not against code of conduct
  const displayNameBadWordCheck = badWordFilter.isProfane(
    buildCreator.displayName ?? '',
  );
  if (
    buildCreator.displayName &&
    buildCreator.displayName !== '' &&
    displayNameBadWordCheck.isProfane
  ) {
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        displayName: badWordFilter.clean(buildCreator.displayName),
      },
    });
  }

  // Ensure the user's bio is not against the code of conduct
  const bioBadWordCheck = badWordFilter.isProfane(
    buildCreator.UserProfile?.bio ?? '',
  );
  if (
    buildCreator.UserProfile?.bio &&
    buildCreator.UserProfile.bio !== '' &&
    bioBadWordCheck.isProfane
  ) {
    await prisma.userProfile.update({
      where: {
        userId: session?.user?.id,
      },
      data: {
        bio: badWordFilter.clean(buildCreator.UserProfile.bio),
      },
    });
  }
}
