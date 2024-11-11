'use server';

import { prisma } from '@repo/db';

import type { ErrorResponse } from '@/app/_types/error-response';
import type { BuildCollectionWithBuilds } from '@/app/(user)/profile/[profileId]/collections/_types/build-collection-with-builds';

export async function getBuildCollections(userId: string): Promise<
  | ErrorResponse
  | {
      message: string;
      collections: BuildCollectionWithBuilds[];
    }
> {
  try {
    const collections = await prisma.buildCollection.findMany({
      where: {
        createdById: userId,
      },
      include: {
        builds: {
          select: {
            id: true,
          },
        },
      },
    });

    return { message: 'Build collections fetched successfully.', collections };
  } catch (e) {
    console.error(e);
    return { errors: ['An error occurred while fetching build collections.'] };
  }
}
