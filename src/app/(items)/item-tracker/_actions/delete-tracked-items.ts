'use server';

import { prisma } from '@/prisma';

import { auth } from '@/lib/auth';

export async function deleteTrackedItems(): Promise<{
  success: boolean;
  message: string;
}> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      message:
        'You must be logged in to delete tracked items from the database.',
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
