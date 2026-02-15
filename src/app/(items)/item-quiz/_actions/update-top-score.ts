'use server';

import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';

export async function updateTopScore({
  userId,
  topScore,
}: {
  userId: string;
  topScore: number;
}): Promise<{ success: boolean; message: string }> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      message: 'You must be logged in to update your profile.',
    };
  }
  if (session.user.id !== userId) {
    return {
      success: false,
      message: 'You are not authorized to update this profile.',
    };
  }

  try {
    await prisma.userProfile.update({
      where: { userId },
      data: { topItemQuizScore: topScore },
    });

    revalidatePath(`/profile/${userId}`);
    return { success: true, message: 'Profile updated successfully.' };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while updating your profile.',
    };
  }
}
