'use server'

import { prisma } from '@/app/(lib)/db'
import { getServerSession } from '@/app/(lib)/auth'
import { PaginationResponse } from '../../(hooks)/usePagination'
import { ExtendedBuild } from '@/app/(types)/build'

export async function getFavoritedBuilds({
  itemsPerPage,
  pageNumber,
}: {
  itemsPerPage: number
  pageNumber: number
}): Promise<PaginationResponse<ExtendedBuild>> {
  const session = await getServerSession()

  const userId = session?.user?.id

  // find all builds that the user has favorited but are not created
  // by the user
  const builds = await prisma.build.findMany({
    where: {
      BuildVotes: {
        some: {
          userId,
        },
      },
      createdById: {
        not: userId,
      },
    },
    include: {
      createdBy: {
        include: {
          PaidUsers: true, // Include the related PaidUsers record
        },
      },
      BuildVotes: true,
      BuildReports: true,
    },
    skip: (pageNumber - 1) * itemsPerPage,
    take: itemsPerPage,
  })

  // get the total number of builds that match the conditions
  const totalBuilds = await prisma.build.count({
    where: {
      BuildVotes: {
        some: {
          userId,
        },
      },
      createdById: {
        not: userId,
      },
    },
  })

  if (!builds) return { items: [], totalItemCount: 0 }

  const buildsWithExtraFields = builds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description ?? '',
    isPublic: build.isPublic,
    isMember: build.createdBy.PaidUsers.length > 0,
    createdAt: build.createdAt,
    createdById: build.createdById,
    videoUrl: build.videoUrl ?? '',
    helm: build.helm,
    torso: build.torso,
    gloves: build.gloves,
    legs: build.legs,
    amulet: build.amulet,
    ring: build.ring,
    relic: build.relic,
    relicfragment: build.relicfragment,
    archtype: build.archtype,
    skill: build.skill,
    weapon: build.weapon,
    mod: build.mod,
    mutator: build.mutator,
    updatedAt: build.updatedAt,
    concoction: build.concoction,
    consumable: build.consumable,
    trait: build.trait,
    createdByDisplayName: build.createdBy.displayName ?? '',
    totalUpvotes: build.BuildVotes.length,
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
  })) satisfies ExtendedBuild[]

  return { items: buildsWithExtraFields, totalItemCount: totalBuilds }
}
