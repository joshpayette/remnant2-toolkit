'use server'

import { prisma } from '@repo/db'

import { getSession } from '@/app/(features)/auth/services/sessionService'

export default async function getAvatarId(): Promise<{
  avatarId: string | null
}> {
  const session = await getSession()
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
