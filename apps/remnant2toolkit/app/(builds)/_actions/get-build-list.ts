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
  includeBuildVariants,
  itemsPerPage,
  orderBy,
  pageNumber,
  percentageOwned,
  searchText,
  userId,
  whereConditions,
}: {
  includeBuildVariants: boolean;
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

  // Fetch associated build data
  for (const build of builds) {
    const [buildItems, buildTags, buildVariant] = await Promise.all([
      prisma.buildItems.findMany({
        where: { buildId: build.id },
      }),
      prisma.buildTags.findMany({
        where: { buildId: build.id },
      }),
      includeBuildVariants
        ? prisma.buildVariant.findFirst({
            where: { secondaryBuildId: build.id },
          })
        : null,
    ]);

    build.buildItems = buildItems;
    build.buildTags = buildTags;

    // If this is a build variant, we need to use the primary build name
    if (buildVariant) {
      const primaryBuild = await prisma.build.findFirst({
        where: { id: buildVariant.primaryBuildId },
      });
      build.id = primaryBuild?.id ?? build.id;
      build.name = primaryBuild?.name ?? build.name;
      build.variantIndex = buildVariant.index ?? 0;
    }
  }

  const totalBuildCount = totalBuildsCountResponse[0]?.totalBuildCount ?? 0;

  return { builds, totalBuildCount };
}
