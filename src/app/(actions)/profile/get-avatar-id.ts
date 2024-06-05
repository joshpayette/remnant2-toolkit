'use server'

import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'

export default async function getAvatarId(): Promise<{
  avatarId: string | null
}> {
  const session = await getServerSession()
  const userId = session?.user?.id

  if (!userId) {
    return { avatarId: null }
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    select: { avatarId: true },
  })

  return { avatarId: profile?.avatarId ?? null }
}
