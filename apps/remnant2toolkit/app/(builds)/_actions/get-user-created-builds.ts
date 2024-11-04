'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
import type { OrderBy } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import type { TimeRange } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import { getOrderBySegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/order-by';
import { limitByTimeConditionSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/time-condition';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
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
}): Promise<{ builds: DBBuild[]; totalCount: number }> {
  const session = await getSession();
  if (!session || !session.user) {
    return {
      builds: [],
      totalCount: 0,
    };
  }

  const whereConditions = Prisma.sql`
  WHERE Build.createdById = ${userId}
  AND Build.isPublic = true
  ${limitByTimeConditionSegment(timeRange)}
  `;

  const orderBySegment = getOrderBySegment(orderBy);

  try {
    const { builds, totalCount } = await getBuildList({
      includeBuildVariants: false,
      itemsPerPage,
      orderBy: orderBySegment,
      pageNumber,
      searchText: '',
      userId,
      whereConditions,
      withCollection: 0,
    });

    return bigIntFix({
      builds,
      totalCount,
    });
  } catch (e) {
    if (e) {
      console.error(e);
    }
    throw new Error('Failed to get community builds, please try again.');
  }
}
