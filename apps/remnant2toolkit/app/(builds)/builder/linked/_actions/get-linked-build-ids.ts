'use server';

import { prisma } from '@repo/db';

export async function getLinkedBuildIds(buildId: string): Promise<{
  status: 'success' | 'error';
  message: string;
  linkedBuildIds: string[];
}> {
  try {
    const linkedBuildIds = await prisma.linkedBuild.findMany({
      where: {
        LinkedBuildItems: {
          some: {
            buildId: buildId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (linkedBuildIds.length === 0) {
      return {
        status: 'success',
        message: 'No linked builds found.',
        linkedBuildIds: [],
      };
    }

    return {
      status: 'success',
      message: 'Linked builds found.',
      linkedBuildIds: linkedBuildIds.map((linkedBuild) => linkedBuild.id),
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Error fetching linked build ids.',
      linkedBuildIds: [],
    };
  }
}
