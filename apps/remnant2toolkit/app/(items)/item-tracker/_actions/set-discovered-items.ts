'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { modItems } from '@/app/(items)/_constants/mod-items';
import { ALL_TRACKABLE_ITEMS } from '@/app/(items)/item-tracker/_constants';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function setDiscoveredItems(
  discoveredItemIds: string[],
): Promise<{ success: boolean; message: string }> {
  const session = await getSession();
  if (!session || !session.user) {
    return {
      success: false,
      message: 'You must be logged in to track items to the database.',
    };
  }

  const userId = session.user.id;

  // remove duplicate and invalid ids
  const cleanDiscoveredItemIds = Array.from(new Set(discoveredItemIds)).filter(
    (item) => ALL_TRACKABLE_ITEMS.some((i) => i.id === item),
  );

  // add linked mods to the list
  for (const item of ALL_TRACKABLE_ITEMS) {
    if (!item.linkedItems?.mod) continue;
    const modName = item.linkedItems.mod.name;
    const modId = modItems.find((mod) => mod.name === modName)?.id;
    if (modId && cleanDiscoveredItemIds.includes(item.id)) {
      cleanDiscoveredItemIds.push(modId);
    }
  }

  try {
    await prisma.$transaction([
      prisma.userItems.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.userItems.createMany({
        data: cleanDiscoveredItemIds.map((itemId) => ({
          itemId,
          userId,
        })),
      }),
    ]);

    revalidatePath(`/profile/${userId}`);

    return {
      success: true,
      message: 'Discovered items set successfully.',
    };
  } catch (error) {
    console.error('Error setting discovered items', error);
    return {
      success: false,
      message: 'Failed to set discovered items.',
    };
  }
}
