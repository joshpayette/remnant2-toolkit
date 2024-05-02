'use server'

import { prisma } from '@/features/db'
import { ItemBuildStats } from '@/features/items/types'

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
