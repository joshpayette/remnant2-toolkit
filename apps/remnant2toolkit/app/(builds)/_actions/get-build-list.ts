'use server';

import { type Prisma, prisma } from '@repo/db';

import { type PercentageOwned } from '@/app/(builds)/_components/filters/build-collection-filter';
import { type OrderBy } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(builds)/_libs/build-filters/community-builds';
import { getOrderBySegment } from '@/app/(builds)/_libs/build-filters/get-order-by';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

export async function getBuildList({
  itemsPerPage,
  orderBy,
  pageNumber,
  percentageOwned,
  searchText,
  userId,
  whereConditions,
}: {
  itemsPerPage: number;
  orderBy: OrderBy;
  pageNumber: number;
  percentageOwned: PercentageOwned;
  searchText: string;
  userId: string | undefined;
  whereConditions: Prisma.Sql;
}): Promise<{
  builds: DBBuild[];
  totalBuildCount: number;
}> {
  const trimmedSearchText = searchText.trim();
  const orderBySegment = getOrderBySegment(orderBy);

  const [builds, totalBuildsCountResponse] = await Promise.all([
    communityBuildsQuery({
      userId,
      itemsPerPage,
      pageNumber,
      orderBySegment,
      whereConditions,
      searchText: trimmedSearchText,
      percentageOwned,
    }),
    communityBuildsCountQuery({
      whereConditions,
      searchText: trimmedSearchText,
      percentageOwned,
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

  return { builds, totalBuildCount };
}
