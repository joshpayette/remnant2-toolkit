import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';
import { type NextRequest } from 'next/server';

import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(builds)/_libs/build-filters/community-builds';
import { getOrderBySegment } from '@/app/(builds)/_libs/build-filters/get-order-by';
import { limitByTimeConditionSegment } from '@/app/(builds)/_libs/build-filters/limit-by-time-condition';
import { type BuildListRequest } from '@/app/(builds)/_types/build-list-request';
import { type BuildListResponse } from '@/app/(builds)/_types/build-list-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session || !session.user) {
    const response = {
      builds: [],
      totalBuildCount: 0,
    } as const satisfies BuildListResponse;
    return Response.json(response);
  }

  const userId = session.user.id;

  const res = await request.json();
  const { itemsPerPage, orderBy, pageNumber, timeRange } =
    res as BuildListRequest;

  const whereConditions = Prisma.sql`
    WHERE Build.createdById = ${userId}
    AND Build.isPublic = true
    ${limitByTimeConditionSegment(timeRange)}
    `;

  const orderBySegment = getOrderBySegment(orderBy);

  try {
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

    const response = {
      builds,
      totalBuildCount,
    } as const satisfies BuildListResponse;

    return Response.json(bigIntFix(response));
  } catch (e) {
    console.error(e);
    const response = {
      builds: [],
      totalBuildCount: 0,
    } as const satisfies BuildListResponse;
    return Response.json(response);
  }
}
