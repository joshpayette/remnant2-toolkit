'use server'

import { prisma } from '@repo/db'

export default async function getSitemapData() {
  const [builds, profiles] = await Promise.all([
    await prisma.build.findMany({
      where: { isPublic: true },
    }),
    await prisma.userProfile.findMany(),
  ])

  return {
    buildIds: builds.map((build) => build.id),
    profileUserIds: profiles.map((profile) => profile.userId),
  }
}
