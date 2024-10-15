'use server';

import { prisma } from '@repo/db';

export async function getProfileStats({ profileId }: { profileId: string }) {
  // Fetch secondaryBuildId values first
  const secondaryBuildIds = await prisma.buildVariant
    .findMany({
      select: {
        secondaryBuildId: true,
      },
    })
    .then((variants) => variants.map((variant) => variant.secondaryBuildId));

  // get a count of all the builds created by the current user
  const [
    buildsCreated,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    gimmickBuilds,
    beginnerBuilds,
    baseGameBuilds,
    userProfile,
    discoveredItemIds,
    totalBuildsViewCount,
  ] = await Promise.all([
    prisma.build.count({
      where: {
        createdById: profileId,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.buildVoteCounts.count({
      where: {
        build: {
          createdById: profileId,
          isPublic: true,
          id: {
            notIn: secondaryBuildIds,
          },
        },
      },
    }),
    prisma.userLoadouts.count({
      where: {
        build: {
          createdById: profileId,
          isPublic: true,
          id: {
            notIn: secondaryBuildIds,
          },
        },
      },
    }),
    prisma.build.count({
      where: {
        createdById: profileId,
        isFeaturedBuild: true,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.build.count({
      where: {
        createdById: profileId,
        isGimmickBuild: true,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.build.count({
      where: {
        createdById: profileId,
        isBeginnerBuild: true,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.build.count({
      where: {
        createdById: profileId,
        isBaseGameBuild: true,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.userProfile.findFirst({
      where: { userId: profileId },
      select: { topItemQuizScore: true },
    }),
    prisma.userItems.findMany({
      where: { userId: profileId },
      select: { itemId: true },
    }),
    // Agregate the Build.viewCount field for all builds by the user
    prisma.build.aggregate({
      where: {
        createdById: profileId,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
      _sum: {
        viewCount: true,
      },
    }),
  ]);

  return {
    buildsCreated,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    gimmickBuilds,
    beginnerBuilds,
    baseGameBuilds,
    userProfile,
    discoveredItemIds,
    totalBuildsViewCount,
  };
}
