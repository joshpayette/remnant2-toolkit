'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function changeLoadoutSlot(
  buildId: string,
  slot: number,
  variantIndex: number,
) {
  const session = await getSession();
  if (!session || !session.user) {
    return { success: false };
  }

  const variantResponse = await prisma.buildVariant.findFirst({
    where: {
      primaryBuildId: buildId,
      index: variantIndex,
    },
  });

  const loadoutToMove = await prisma.userLoadouts.findFirst({
    where: {
      userId: session.user.id,
      buildId: variantResponse ? variantResponse.secondaryBuildId : buildId,
    },
  });

  const loadoutInNewSlot = await prisma.userLoadouts.findFirst({
    where: {
      userId: session.user.id,
      slot,
    },
  });

  if (!loadoutToMove) {
    console.error(`Requested loadout to move not found, buildId: ${buildId}`);
    return { success: false };
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
    });

    revalidatePath(`/profile/${session.user.id}/loadouts`);
    return {
      success: true,
      newLoadouts: {
        oldSlot: loadoutToMove.slot,
        newSlot: slot,
      },
    };
  } else {
    await prisma.userLoadouts.update({
      where: {
        id: loadoutToMove.id,
      },
      data: {
        slot,
      },
    });
    await prisma.userLoadouts.update({
      where: {
        id: loadoutInNewSlot.id,
      },
      data: {
        slot: loadoutToMove.slot,
      },
    });

    revalidatePath(`/profile/${session.user.id}/loadouts`);

    return {
      success: true,
      newLoadouts: {
        oldSlot: loadoutToMove.slot,
        newSlot: loadoutInNewSlot.slot,
      },
    };
  }
}
