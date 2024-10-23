'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function deleteTrackedItems(): Promise<{
  success: boolean;
  message: string;
}> {
  const session = await getSession();
  if (!session || !session.user) {
    return {
      success: false,
      message: 'You must be logged in to track items to the database.',
    };
  }
  const userId = session.user.id;

  try {
    await prisma.userItems.deleteMany({
      where: {
        userId,
      },
    });

    return {
      success: true,
      message: 'Tracked items deleted successfully.',
    };
  } catch (error) {
    console.error('Error deleting tracked items', error);
    return {
      success: false,
      message: 'Failed to delete tracked items.',
    };
  }
}
