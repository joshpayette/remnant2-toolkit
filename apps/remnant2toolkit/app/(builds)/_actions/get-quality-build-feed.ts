'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { limitToQualityBuilds } from '@/app/(builds)/_features/filters/_libs/limit-by-quality';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { getOrderBySegment } from '../_features/filters/_libs/get-order-by';
import { getBuildList } from './get-build-list';

export async function getQualityBuildFeed(): Promise<{
  builds: DBBuild[];
}> {
  const session = await getSession();
  const userId = session?.user?.id;

  const orderBySegment = getOrderBySegment('newest');

  const { builds } = await getBuildList({
    includeBuildVariants: false,
    itemsPerPage: 4,
    orderBy: orderBySegment,
    pageNumber: 1,
    percentageOwned: 0,
    searchText: '',
    userId,
    whereConditions: Prisma.sql`
WHERE Build.isPublic = true
AND Build.isPatchAffected = false
${limitToQualityBuilds(true)}
    `,
  });

  return bigIntFix({ builds });
}
