'use server'

import { prisma } from '@repo/db'
import { revalidatePath } from 'next/cache'

import { getSession } from '@/app/(features)/auth/services/sessionService'

export async function removeBuildFromLoadout(
  buildId: string,
  slot: number,
): Promise<{ success: boolean }> {
  const session = await getSession()
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
  revalidatePath(`/builder/${buildId}`, 'page')

  return { success: true }
}
