'use server';

import { prisma } from '@/prisma';

import { auth } from '@/auth';

export async function getDiscoveredItems(): Promise<{
  success: boolean;
  message: string;
  discoveredItemIds: string[];
}> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      message: 'You must be logged in to track items to the database.',
      discoveredItemIds: [],
    };
  }
  const userId = session.user.id;

  try {
    const discoveredItems = await prisma.userItems.findMany({
      where: {
        userId,
      },
      take: 2000,
    });

    return {
      success: true,
      message: 'Discovered items retrieved successfully.',
      discoveredItemIds: discoveredItems.map((item) => item.itemId),
    };
  } catch (error) {
    console.error('Error getting discovered items', error);
    return {
      success: false,
      message: 'Failed to get discovered items.',
      discoveredItemIds: [],
    };
  }
}
