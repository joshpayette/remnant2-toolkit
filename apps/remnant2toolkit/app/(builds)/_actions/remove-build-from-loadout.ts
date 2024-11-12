'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function removeBuildFromLoadout(
  buildId: string,
  slot: number,
  variantIndex: number,
): Promise<{ success: boolean }> {
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

  await prisma.userLoadouts.deleteMany({
    where: {
      userId: session.user.id,
      buildId: variantResponse ? variantResponse.secondaryBuildId : buildId,
      slot,
    },
  });

  revalidatePath(`/profile/${session.user.id}/loadouts`);
  revalidatePath(`/builder/${buildId}`, 'page');

  return { success: true };
}
