import { BuildCard } from '@/app/(builds)/_components/build-card';
import { getUserBuildFeed } from '@/app/(builds)/_features/filters/_libs/queries/user-build-feed-cursor-query';
import { Prisma } from '@/lib/db';
import { bigIntFix } from '@/lib/utils';

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

  // Fixed page-1 "top builds" panels
  const [{ builds: topBuildsAllTime }, { builds: topBuildsCurrent }] =
    await Promise.all([
      getUserBuildFeed({
        cursor: null,
        itemsPerPage: itemsToFetch,
        orderBy: 'most favorited',
        searchText: '',
        userId: profileId,
        whereConditions: whereConditionsAllTime,
        withCollection: 0,
      }),
      getUserBuildFeed({
        cursor: null,
        itemsPerPage: itemsToFetch,
        orderBy: 'most favorited',
        searchText: '',
        userId: profileId,
        whereConditions: whereConditionsCurrent,
        withCollection: 0,
      }),
    ]);

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
