'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function deleteLinkedBuild(linkedBuildId: string) {
  // session validation
  const session = await getSession();
  if (!session || !session.user) {
    return {
      errors: ['You must be logged in.'],
    };
  }

  try {
    const build = await prisma.linkedBuild.findUnique({
      where: {
        id: linkedBuildId,
      },
      include: {
        createdBy: true,
      },
    });
    if (!build) {
      return {
        errors: [`Linked Build with id ${linkedBuildId} not found.`],
      };
    }

    if (build.createdBy.id !== session.user.id) {
      return {
        errors: [
          'You must be logged in as the build creator to delete a linked build.',
        ],
      };
    }

    const dbResponse = await prisma.linkedBuild.delete({
      where: {
        id: build.id,
      },
    });

    // check for errors in dbResponse
    if (!dbResponse) {
      return {
        errors: ['Error in deleting linked build!'],
      };
    }

    return {
      message: 'Linked Build successfully deleted!',
      buildId: dbResponse.id,
    };
  } catch (e) {
    console.error(e);
    return {
      errors: ['Error in deleting linked build!'],
    };
  }
}
