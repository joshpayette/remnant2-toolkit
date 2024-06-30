'use server'

import { prisma } from '@repo/db'

import { getServerSession } from '@/app/(features)/auth'

export default async function getAvatarId(): Promise<{
  avatarId: string | null
}> {
  const session = await getServerSession()
  const userId = session?.user?.id

  if (!userId) {
    return { avatarId: null }
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: { avatarId: true },
    })

    return { avatarId: profile?.avatarId ?? null }
  } catch (e) {
    console.error(e)
    return { avatarId: null }
  }
}
