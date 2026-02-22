'use server';

import { prisma } from '@/prisma';

import { auth } from '@/lib/auth';

export async function getAvatarId(): Promise<{
  avatarId: string | null;
}> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { avatarId: null };
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: { avatarId: true },
    });

    return { avatarId: profile?.avatarId ?? null };
  } catch (e) {
    console.error(e);
    return { avatarId: null };
  }
}
