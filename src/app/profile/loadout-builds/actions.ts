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

  // Add a vote for the build
  const isVoteRegistered = await prisma.buildVoteCounts.findFirst({
    where: {
      buildId,
      userId: session.user.id,
    },
  })
  if (!isVoteRegistered) {
    await prisma.buildVoteCounts.create({
      data: {
        buildId,
        userId: session.user.id,
      },
    })
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

export async function changeLoadoutSlot(buildId: string, slot: number) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return { success: false }
  }

  const loadoutToMove = await prisma.userLoadouts.findFirst({
    where: {
      userId: session.user.id,
      buildId,
    },
  })

  const loadoutInNewSlot = await prisma.userLoadouts.findFirst({
    where: {
      userId: session.user.id,
      slot,
    },
  })

  if (!loadoutToMove) {
    console.error(`Requested loadout to move not found, buildId: ${buildId}`)
    return { success: false }
  }

  // If no loadout in the new slot, just update the slot
  // If there is a loadout in the new slot, swap the slots
  if (!loadoutInNewSlot) {
    await prisma.userLoadouts.update({
      where: {
        id: loadoutToMove.id,
      },
      data: {
        slot,
      },
    })

    revalidatePath('/profile/loadout-builds')
    return {
      success: true,
      newLoadouts: {
        oldSlot: loadoutToMove.slot,
        newSlot: slot,
      },
    }
  } else {
    await prisma.userLoadouts.update({
      where: {
        id: loadoutToMove.id,
      },
      data: {
        slot,
      },
    })
    await prisma.userLoadouts.update({
      where: {
        id: loadoutInNewSlot.id,
      },
      data: {
        slot: loadoutToMove.slot,
      },
    })

    revalidatePath('/profile/loadout-builds')
    return {
      success: true,
      newLoadouts: {
        oldSlot: loadoutToMove.slot,
        newSlot: loadoutInNewSlot.slot,
      },
    }
  }
}
