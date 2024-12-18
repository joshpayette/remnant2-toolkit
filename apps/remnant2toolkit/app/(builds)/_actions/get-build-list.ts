'use server';

import { type Prisma, prisma } from '@repo/db';

import type { WithCollectionFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/with-collection';
import {
  mainBuildQuery,
  mainBuildQueryCount,
} from '@/app/(builds)/_features/filters/_libs/queries/main-build-query';
import type { PercentageOwned } from '@/app/(builds)/_features/filters/_types/percentage-owned';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

export async function getBuildList({
  includeBuildVariants,
  itemsPerPage,
  orderBy,
  pageNumber,
  searchText,
  userId,
  whereConditions,
  withCollection,
}: {
  includeBuildVariants: boolean;
  itemsPerPage: number;
  orderBy: Prisma.Sql;
  pageNumber: number;
  searchText: string;
  userId: string | undefined;
  whereConditions: Prisma.Sql;
  withCollection: WithCollectionFilterValue;
}): Promise<{
  builds: DBBuild[];
  totalCount: number;
}> {
  const trimmedSearchText = searchText.trim();

  const [builds, totalItemsResponse] = await Promise.all([
    mainBuildQuery({
      includeBuildVariants,
      userId,
      itemsPerPage,
      pageNumber,
      orderBySegment: orderBy,
      whereConditions,
      searchText: trimmedSearchText,
      percentageOwned: withCollection as PercentageOwned,
    }),
    mainBuildQueryCount({
      includeBuildVariants,
      percentageOwned: withCollection as PercentageOwned,
      searchText: trimmedSearchText,
      userId,
      whereConditions,
    }),
  ]);

  const totalItems = totalItemsResponse[0]?.totalCount ?? 0;

  // Fetch associated build data
  for (const build of builds) {
    const [buildItems, buildTags, buildVariant] = await Promise.all([
      prisma.buildItems.findMany({
        where: { buildId: build.id },
        take: 2000,
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
        where: { id: buildVariant.primaryBuildId, isPublic: true },
        include: {
          BuildVotes: true,
          BuildValidatedViews: true,
        },
      });

      const totalVariants = await prisma.buildVariant.findMany({
        where: { primaryBuildId: primaryBuild?.id },
      });

      build.id = primaryBuild?.id ?? build.id;
      build.buildVariantName = build.name;
      build.totalVariants = primaryBuild ? totalVariants.length : 0;
      build.name = primaryBuild?.name ?? build.name;
      build.variantIndex = buildVariant.index ?? 0;
      build.totalUpvotes = primaryBuild?.BuildVotes.length ?? 0;
    } else {
      const buildVariant = await prisma.buildVariant.findMany({
        where: { primaryBuildId: build.id },
      });
      if (buildVariant) {
        build.totalVariants = buildVariant.length ?? 0;
      }
    }
  }

  return { builds, totalCount: totalItems };
}
