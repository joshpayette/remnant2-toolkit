'use server';

import { type Prisma, prisma } from '@repo/db';

import type { PercentageOwned } from '@/app/(builds)/_features/filters/_components/build-collection-filter';
import { mainBuildQuery } from '@/app/(builds)/_features/filters/_libs/queries/main-build-query';
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
  withCollection: string;
}): Promise<{
  builds: DBBuild[];
}> {
  const trimmedSearchText = searchText.trim();

  let percentageOwned: PercentageOwned = 0;
  switch (withCollection) {
    case 'All':
      percentageOwned = 0;
      break;
    case '100% Owned':
      percentageOwned = 100;
      break;
    case '>= 95% Owned':
      percentageOwned = 95;
      break;
    case '>= 90% Owned':
      percentageOwned = 90;
      break;
    case '>= 75% Owned':
      percentageOwned = 75;
      break;
    case '>= 50% Owned':
      percentageOwned = 50;
      break;
    default:
      percentageOwned = 0;
      break;
  }

  const builds = await mainBuildQuery({
    includeBuildVariants,
    userId,
    itemsPerPage,
    pageNumber,
    orderBySegment: orderBy,
    whereConditions,
    searchText: trimmedSearchText,
    percentageOwned,
  });

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

  return { builds };
}
