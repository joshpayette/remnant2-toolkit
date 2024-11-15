'use server';

import { type BuildCollection, prisma } from '@repo/db';

import { type ErrorResponse } from '@/app/_types/error-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function editBuildCollection({
  collectionId,
  collectionName,
  collectionDescription,
  buildIds,
}: {
  collectionId: string;
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
    // Check if all buildIds exist
    const existingBuilds = await prisma.build.findMany({
      where: {
        id: { in: buildIds },
      },
      select: { id: true },
    });

    const existingBuildIds = existingBuilds.map((build) => build.id);

    const collection = await prisma.buildCollection.update({
      where: {
        id: collectionId,
      },
      data: {
        name: collectionName,
        description: collectionDescription,
        BuildsToBuildCollections: {
          deleteMany: {},
          create: existingBuildIds.map((id) => ({
            build: {
              connect: { id },
            },
          })),
        },
      },
    });

    return { message: 'Build collection updated successfully.', collection };
  } catch (e) {
    console.error(e);
    return {
      errors: ['An error occurred while updating the build collection.'],
    };
  }
}
