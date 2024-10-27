'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
import { limitByAmuletSegment } from '@/app/(builds)/_features/new-filters/_libs/queries/segments/amulets';
import { limitByArchetypesSegment } from '@/app/(builds)/_features/new-filters/_libs/queries/segments/archetypes';
import { limitByTimeConditionSegment } from '@/app/(builds)/_features/new-filters/_libs/queries/segments/time-condition';
import { type BuildListRequest } from '@/app/(builds)/_types/build-list-request';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { getOrderBySegment } from '../../_features/filters/_libs/get-order-by';

export async function getFeaturedBuilds({
  buildFilterFields,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
}: BuildListRequest): Promise<{ builds: DBBuild[] }> {
  const session = await getSession();
  const userId = session?.user?.id;

  const { amulets, archetypes, searchText } = buildFilterFields;

  const whereConditions = Prisma.sql`
    WHERE Build.isPublic = true
    AND Build.isFeaturedBuild = true
    ${limitByArchetypesSegment(archetypes)}
    ${limitByAmuletSegment(amulets)}
    ${limitByTimeConditionSegment(timeRange)}
  `;

  const orderBySegment = getOrderBySegment(orderBy, true);

  try {
    const { builds } = await getBuildList({
      includeBuildVariants: false,
      itemsPerPage,
      orderBy: orderBySegment,
      pageNumber,
      percentageOwned: 0, // TODO: with collection % amount
      searchText,
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
    throw new Error('Failed to get featured builds, please try again.');
  }
}
