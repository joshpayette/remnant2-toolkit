'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
import { type OrderBy } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { type TimeRange } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { limitByTimeConditionSegment } from '@/app/(builds)/_libs/build-filters/limit-by-time-condition';
import { type BuildListResponse } from '@/app/(builds)/_types/build-list-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export type CreatedBuildsFilter = 'date created' | 'upvotes';

export async function getUserCreatedBuilds({
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
  userId,
}: {
  itemsPerPage: number;
  orderBy: OrderBy;
  pageNumber: number;
  timeRange: TimeRange;
  userId: string;
}): Promise<BuildListResponse> {
  const session = await getSession();
  if (!session || !session.user) {
    return {
      builds: [],
      totalBuildCount: 0,
    };
  }

  const whereConditions = Prisma.sql`
  WHERE Build.createdById = ${userId}
  AND Build.isPublic = true
  ${limitByTimeConditionSegment(timeRange)}
  `;

  try {
    const { builds, totalBuildCount } = await getBuildList({
      includeBuildVariants: false,
      itemsPerPage,
      orderBy,
      pageNumber,
      percentageOwned: 0,
      searchText: '',
      userId,
      whereConditions,
    });

    return bigIntFix({
      builds,
      totalBuildCount,
    });
  } catch (e) {
    if (e) {
      console.error(e);
    }
    throw new Error('Failed to get community builds, please try again.');
  }
}
