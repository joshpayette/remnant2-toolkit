'use server';

import { type BuildCollection, prisma } from '@repo/db';

import { type ErrorResponse } from '@/app/_types/error-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function createBuildCollection({
  collectionName,
  collectionDescription,
  buildIds,
}: {
  collectionName: string;
  collectionDescription: string;
  buildIds: string[];
}): Promise<
  ErrorResponse | { message: string; collection: BuildCollection | undefined }
> {
  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return { errors: ['You must be logged in.'] };
  }

  try {
    const collection = await prisma.buildCollection.create({
      data: {
        name: collectionName,
        description: collectionDescription,
        createdById: session.user.id,
        builds: {
          connect: buildIds.map((id) => ({ id })),
        },
      },
    });

    return { message: 'Build collection created successfully.', collection };
  } catch (e) {
    console.error(e);
    return {
      errors: ['An error occurred while creating the build collection.'],
    };
  }
}
