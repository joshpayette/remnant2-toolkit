'use server';

import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { type OrderBy } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { type TimeRange } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(builds)/_libs/build-filters/community-builds';
import { getOrderBySegment } from '@/app/(builds)/_libs/build-filters/get-order-by';
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

  const orderBySegment = getOrderBySegment(orderBy);

  try {
    const [builds, totalBuildsCountResponse] = await Promise.all([
      communityBuildsQuery({
        userId,
        itemsPerPage,
        pageNumber,
        orderBySegment,
        whereConditions,
        searchText: '',
        percentageOwned: 0,
      }),
      communityBuildsCountQuery({
        whereConditions,
        searchText: '',
        percentageOwned: 0,
        userId,
      }),
    ]);

    // Then, for each Build, get the associated BuildItems
    for (const build of builds) {
      const [buildItems, buildTags] = await Promise.all([
        prisma.buildItems.findMany({
          where: { buildId: build.id },
        }),
        prisma.buildTags.findMany({
          where: { buildId: build.id },
        }),
      ]);

      build.buildItems = buildItems;
      build.buildTags = buildTags;
    }

    const totalBuildCount = totalBuildsCountResponse[0]?.totalBuildCount ?? 0;

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
