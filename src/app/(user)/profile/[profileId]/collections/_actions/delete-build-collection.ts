'use server';

import { prisma } from '@/prisma';

import type { ErrorResponse } from '@/app/_types/error-response';
import { auth } from '@/lib/auth';

export async function deleteBuildCollection(
  buildId: string
): Promise<ErrorResponse | { message: string }> {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { errors: ['You must be logged in.'] };
  }

  try {
    const collection = await prisma.buildCollection.findUnique({
      where: {
        id: buildId,
        createdById: session.user.id,
      },
      include: {
        createdBy: true,
      },
    });
    if (!collection) {
      return { errors: [`Build collection with id ${buildId} not found.`] };
    }

    if (collection.createdBy.id !== session.user.id) {
      return {
        errors: [
          'You must be logged in as the collection creator to delete a collection.',
        ],
      };
    }

    await prisma.buildCollection.delete({
      where: {
        id: buildId,
        createdById: session.user.id,
      },
    });

    return { message: 'Build collection deleted successfully.' };
  } catch (e) {
    console.error(e);
    return {
      errors: ['An error occurred while deleting the build collection.'],
    };
  }
}
