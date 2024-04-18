'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'

export async function removeBuildFromLoadout(
  buildId: string,
  slot: number,
): Promise<{ success: boolean }> {
  const session = await getServerSession()
  if (!session || !session.user) {
    return { success: false }
  }

  await prisma.userLoadouts.deleteMany({
    where: {
      userId: session.user.id,
      buildId,
      slot,
    },
  })

  revalidatePath(`/profile/${session.user.id}/loadouts`)

  return { success: true }
}
