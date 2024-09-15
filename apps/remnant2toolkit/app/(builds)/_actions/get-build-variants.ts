'use server';

import { prisma } from '@repo/db';

export async function getBuildVariants(buildId: string): Promise<{
  status: 'success' | 'error';
  message: string;
  buildVariants: Array<{
    label: string;
    buildId: string;
  }>;
}> {
  try {
    const buildVariantIds = await prisma.buildVariant.findMany({
      where: {
        primaryBuildId: buildId,
      },
    });

    if (buildVariantIds.length === 0) {
      return {
        status: 'success',
        message: 'No build variants found.',
        buildVariants: [],
      };
    }

    return {
      status: 'success',
      message: 'Build variants found.',
      buildVariants: buildVariantIds.map((buildVariant) => ({
        label: '',
        buildId: buildVariant.secondaryBuildId,
      })),
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Error fetching linked build ids.',
      buildVariants: [],
    };
  }
}
