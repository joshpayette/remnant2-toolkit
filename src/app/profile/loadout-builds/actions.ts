'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'

export async function addBuildToLoadout(
  buildId: string,
  slot: number,
): Promise<{ success: boolean }> {
  const session = await getServerSession()
  if (!session || !session.user) {
    return { success: false }
  }

  const existingLoadout = await prisma.userLoadouts.findFirst({
    where: {
      userId: session.user.id,
      slot: slot,
    },
  })

  await prisma.userLoadouts.upsert({
    where: {
      id: existingLoadout?.id || '',
    },
    update: {
      buildId,
    },
    create: {
      userId: session.user.id,
      slot,
      buildId,
    },
  })

  revalidatePath('/profile/loadout-builds')

  return { success: true }
}

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

  revalidatePath('/profile/loadout-builds')

  return { success: true }
}
