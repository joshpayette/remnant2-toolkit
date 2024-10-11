'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
import { limitByTimeConditionSegment } from '@/app/(builds)/_features/filters/_libs/limit-by-time-condition';
import { type OrderBy } from '@/app/(builds)/_features/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { type TimeRange } from '@/app/(builds)/_features/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { getOrderBySegment } from '../_features/filters/_libs/get-order-by';

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
}): Promise<{ builds: DBBuild[] }> {
  const session = await getSession();
  if (!session || !session.user) {
    return {
      builds: [],
    };
  }

  const whereConditions = Prisma.sql`
  WHERE Build.createdById = ${userId}
  AND Build.isPublic = true
  ${limitByTimeConditionSegment(timeRange)}
  `;

  const orderBySegment = getOrderBySegment(orderBy);

  try {
    const { builds } = await getBuildList({
      includeBuildVariants: false,
      itemsPerPage,
      orderBy: orderBySegment,
      pageNumber,
      percentageOwned: 0,
      searchText: '',
      userId,
      whereConditions,
    });

    return bigIntFix({
      builds,
    });
  } catch (e) {
    if (e) {
      console.error(e);
    }
    throw new Error('Failed to get community builds, please try again.');
  }
}
