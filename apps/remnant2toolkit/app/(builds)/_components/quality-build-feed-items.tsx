import { Prisma } from '@repo/db';
import { BaseLink, EyeIcon, Tooltip } from '@repo/ui';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { getOrderBySegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/order-by';
import { limitByWithQualityBuildsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-quality';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function QualityBuildFeedItems() {
  const session = await getSession();
  const userId = session?.user?.id;

  const orderBySegment = getOrderBySegment('newest');
  const includeBuildVariants = false;

  const { builds } = await getBuildList({
    includeBuildVariants,
    itemsPerPage: 4,
    orderBy: orderBySegment,
    pageNumber: 1,
    searchText: '',
    userId,
    whereConditions: Prisma.sql`
      WHERE Build.isPublic = true
      AND Build.isPatchAffected = false
      ${limitByWithQualityBuildsSegment(true, includeBuildVariants)}
    `,
    withCollection: 0,
  });

  return builds.map((build) => (
    <div key={`${build.id}${build.variantIndex}`} className="mt-4 w-full">
      <BuildCard
        build={build}
        isLoading={false}
        footerActions={
          <Tooltip content="View Build">
            <BaseLink
              href={`/builder/${build.id}`}
              className="text-primary-500 hover:text-primary-300 flex flex-col items-center gap-x-3 rounded-br-lg border border-transparent px-4 py-2 text-xs font-semibold hover:underline"
            >
              <EyeIcon className="h-4 w-4" /> View
            </BaseLink>
          </Tooltip>
        }
      />
    </div>
  ));
}
