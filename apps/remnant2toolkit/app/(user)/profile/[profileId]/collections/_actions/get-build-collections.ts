'use server';

import { type BuildCollection, prisma } from '@repo/db';

import type { ErrorResponse } from '@/app/_types/error-response';

export async function getBuildCollections(
  userId: string,
): Promise<
  ErrorResponse | { message: string; collections: BuildCollection[] }
> {
  try {
    const collections = await prisma.buildCollection.findMany({
      where: {
        createdById: userId,
      },
    });

    return { message: 'Build collections fetched successfully.', collections };
  } catch (e) {
    console.error(e);
    return { errors: ['An error occurred while fetching build collections.'] };
  }
}
