'use server';

import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { type PaginationResponse } from '@/app/_libs/pagination/use-pagination';
import { type OrderBy } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { type TimeRange } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(builds)/_libs/build-filters/community-builds';
import { getOrderBySegment } from '@/app/(builds)/_libs/build-filters/get-order-by';
import { limitByTimeConditionSegment } from '@/app/(builds)/_libs/build-filters/limit-by-time-condition';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export type CreatedBuildsFilter = 'date created' | 'upvotes';

export async function getCreatedBuilds({
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
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getSession();
  if (!session || !session.user) {
    return {
      items: [],
      totalItemCount: 0,
    };
  }

  const whereConditions = Prisma.sql`
  WHERE Build.createdById = ${userId}
  AND Build.isPublic = true
  ${limitByTimeConditionSegment(timeRange)}
  `;

  const orderBySegment = getOrderBySegment(orderBy);

  // First, get the Builds
  const [builds, totalBuildsCountResponse] = await prisma.$transaction([
    communityBuildsQuery({
      userId,
      itemsPerPage,
      pageNumber,
      orderBySegment,
      whereConditions,
      searchText: '',
    }),
    communityBuildsCountQuery({
      whereConditions,
      searchText: '',
    }),
  ]);

  // Then, for each Build, get the associated BuildItems
  for (const build of builds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    });
    build.buildItems = buildItems;
  }

  // Then, for each Build, get the associated BuildTags
  for (const build of builds) {
    const buildTags = await prisma.buildTags.findMany({
      where: { buildId: build.id },
    });
    build.buildTags = buildTags;
  }

  const totalBuildCount = totalBuildsCountResponse[0]?.totalBuildCount ?? 0;

  return bigIntFix({
    items: builds,
    totalItemCount: totalBuildCount,
  });
}
