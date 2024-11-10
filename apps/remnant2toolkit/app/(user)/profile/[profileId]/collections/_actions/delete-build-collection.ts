'use server';

import { prisma } from '@repo/db';

import type { ErrorResponse } from '@/app/_types/error-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function deleteBuildCollection(
  buildId: string,
): Promise<ErrorResponse | { message: string }> {
  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return { errors: ['You must be logged in.'] };
  }

  try {
    const collection = await prisma.buildCollection.findUnique({
      where: {
        id: buildId,
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
