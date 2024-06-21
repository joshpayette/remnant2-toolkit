'use server'

import { prisma } from '@/app/(utils)/db'

/** Used to show the # of builds an item is used in */
export type ItemBuildStats = {
  featured: { usedIn: number; total: number }
  community: { usedIn: number; total: number }
}

export default async function getItemBuildStats(itemId: string): Promise<{
  success: boolean
  stats: ItemBuildStats
}> {
  try {
    const [featuredUsedIn, featuredTotal, communityUsedIn, communityTotal] =
      await Promise.all([
        prisma.build.count({
          where: {
            isFeaturedBuild: true,
            isBeginnerBuild: false,
            isPublic: true,
            isPatchAffected: false,
            BuildItems: {
              some: {
                itemId,
              },
            },
          },
        }),
        prisma.build.count({
          where: {
            isFeaturedBuild: true,
            isBeginnerBuild: false,
            isPublic: true,
          },
        }),
        prisma.build.count({
          where: {
            isFeaturedBuild: false,
            isPublic: true,
            isPatchAffected: false,
            BuildItems: {
              some: {
                itemId,
              },
            },
          },
        }),
        prisma.build.count({
          where: {
            isFeaturedBuild: false,
            isPublic: true,
          },
        }),
      ])

    return {
      success: true,
      stats: {
        featured: {
          usedIn: featuredUsedIn,
          total: featuredTotal,
        },
        community: {
          usedIn: communityUsedIn,
          total: communityTotal,
        },
      },
    }
  } catch (error) {
    return {
      success: false,
      stats: {
        featured: {
          usedIn: 0,
          total: 0,
        },
        community: {
          usedIn: 0,
          total: 0,
        },
      },
    }
  }
}
