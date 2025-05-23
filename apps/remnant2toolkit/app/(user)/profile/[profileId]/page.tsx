import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { BuildCard } from '@/app/(builds)/_components/build-card';
import { mainBuildQuery } from '@/app/(builds)/_features/filters/_libs/queries/main-build-query';

export const maxDuration = 60;

async function getCreatedBuilds(profileId: string) {
  const itemsToFetch = 4;

  const whereConditionsAllTime = Prisma.sql`
  WHERE Build.createdById = ${profileId}
  AND Build.isPublic = true
  `;

  const whereConditionsCurrent = Prisma.sql`
  WHERE Build.createdById = ${profileId}
  AND Build.isPublic = true
  AND Build.isPatchAffected = false
  `;

  const orderBySegment = Prisma.sql`ORDER BY totalUpvotes DESC`;

  const [topBuildsAllTime, topBuildsCurrent] = await Promise.all([
    mainBuildQuery({
      includeBuildVariants: false,
      userId: profileId,
      itemsPerPage: itemsToFetch,
      pageNumber: 1,
      orderBySegment,
      whereConditions: whereConditionsAllTime,
      searchText: '',
      percentageOwned: 0,
    }),
    mainBuildQuery({
      includeBuildVariants: false,
      userId: profileId,
      itemsPerPage: itemsToFetch,
      pageNumber: 1,
      orderBySegment,
      whereConditions: whereConditionsCurrent,
      searchText: '',
      percentageOwned: 0,
    }),
  ]);

  // Then, for each Build, get the associated BuildItems
  for (const build of topBuildsAllTime) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
      take: 2000,
    });
    build.buildItems = buildItems;
  }
  for (const build of topBuildsCurrent) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
      take: 2000,
    });
    build.buildItems = buildItems;
  }

  // Then, for each Build, get the associated BuildTags
  for (const build of topBuildsAllTime) {
    const buildTags = await prisma.buildTags.findMany({
      where: { buildId: build.id },
    });
    build.buildTags = buildTags;
  }
  for (const build of topBuildsCurrent) {
    const buildTags = await prisma.buildTags.findMany({
      where: { buildId: build.id },
    });
    build.buildTags = buildTags;
  }

  return bigIntFix({ topBuildsAllTime, topBuildsCurrent });
}

export default async function Page({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const { topBuildsAllTime, topBuildsCurrent } =
    await getCreatedBuilds(profileId);

  return (
    <>
      {topBuildsCurrent.length > 0 && (
        <div>
          <div className="border-b-primary-500 mb-4 flex w-full flex-row items-center justify-center border-b py-2">
            <h2 className="flex w-full items-center justify-start text-2xl">
              Top Created Builds (Current)
            </h2>
          </div>
          <ul
            role="list"
            className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {topBuildsCurrent.map((build) => (
              <li key={`${build.id}${build.variantIndex}`} className="w-full">
                <BuildCard build={build} isLoading={false} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <div className="border-b-primary-500 mb-4 flex w-full flex-row items-center justify-center border-b py-2">
          <h2 className="flex w-full items-center justify-start text-2xl">
            Top Created Builds (All Time)
          </h2>
        </div>
        <ul
          role="list"
          className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {topBuildsAllTime.map((build) => (
            <li key={`${build.id}${build.variantIndex}`} className="w-full">
              <BuildCard build={build} isLoading={false} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
