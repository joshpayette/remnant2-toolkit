'use server';

import { prisma } from '@repo/db';

export async function getProfileStats({
  profileId,
  includeCommunityBuilds = true,
  includeFavoritesEarned = true,
  includeLoadoutCounts = true,
  includeFeaturedBuilds = true,
  includeGimmickBuilds = true,
  includeBeginnerBuilds = true,
  includeBaseGameBuilds = true,
  includeItemQuizScore = true,
  includeDiscoveredItemIds = true,
  includeTotalBuildsViewCount = true,
}: {
  profileId: string;
  includeCommunityBuilds?: boolean;
  includeFavoritesEarned?: boolean;
  includeLoadoutCounts?: boolean;
  includeFeaturedBuilds?: boolean;
  includeGimmickBuilds?: boolean;
  includeBeginnerBuilds?: boolean;
  includeBaseGameBuilds?: boolean;
  includeItemQuizScore?: boolean;
  includeDiscoveredItemIds?: boolean;
  includeTotalBuildsViewCount?: boolean;
  includePopularBuilds1?: boolean;
  includePopularBuilds2?: boolean;
}) {
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
    communityBuilds,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    gimmickBuilds,
    beginnerBuilds,
    baseGameBuilds,
    itemQuizScore,
    discoveredItemIds,
    totalBuildsViewCount,
  ] = await Promise.all([
    includeCommunityBuilds
      ? prisma.build.count({
          where: {
            createdById: profileId,
            isPublic: true,
            id: {
              notIn: secondaryBuildIds,
            },
          },
        })
      : -1,
    includeFavoritesEarned
      ? prisma.buildVoteCounts.count({
          where: {
            build: {
              createdById: profileId,
              isPublic: true,
              id: {
                notIn: secondaryBuildIds,
              },
            },
          },
        })
      : -1,
    includeLoadoutCounts
      ? prisma.userLoadouts.count({
          where: {
            build: {
              createdById: profileId,
              isPublic: true,
              id: {
                notIn: secondaryBuildIds,
              },
            },
          },
        })
      : -1,
    includeFeaturedBuilds
      ? prisma.build.count({
          where: {
            createdById: profileId,
            isFeaturedBuild: true,
            isPublic: true,
            id: {
              notIn: secondaryBuildIds,
            },
          },
        })
      : -1,
    includeGimmickBuilds
      ? prisma.build.count({
          where: {
            createdById: profileId,
            isGimmickBuild: true,
            isPublic: true,
            id: {
              notIn: secondaryBuildIds,
            },
          },
        })
      : -1,
    includeBeginnerBuilds
      ? prisma.build.count({
          where: {
            createdById: profileId,
            isBeginnerBuild: true,
            isPublic: true,
            id: {
              notIn: secondaryBuildIds,
            },
          },
        })
      : -1,
    includeBaseGameBuilds
      ? prisma.build.count({
          where: {
            createdById: profileId,
            isBaseGameBuild: true,
            isPublic: true,
            id: {
              notIn: secondaryBuildIds,
            },
          },
        })
      : -1,
    includeItemQuizScore
      ? prisma.userProfile.findFirst({
          where: { userId: profileId },
          select: { topItemQuizScore: true },
        })
      : -1,
    includeDiscoveredItemIds
      ? prisma.userItems.findMany({
          where: { userId: profileId },
          select: { itemId: true },
          take: 2000,
        })
      : [],
    includeTotalBuildsViewCount
      ? prisma.build.aggregate({
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
        })
      : -1,
  ]);

  return {
    communityBuilds,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    gimmickBuilds,
    beginnerBuilds,
    baseGameBuilds,
    itemQuizScore,
    discoveredItemIds,
    totalBuildsViewCount,
  };
}
