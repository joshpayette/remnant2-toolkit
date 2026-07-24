import { BuildCard } from '@/app/(builds)/_components/build-card';
import { getPublicBuildFeed } from '@/app/(builds)/_features/filters/_libs/queries/public-build-feed-cursor-query';
import { limitByWithQualityBuildsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-quality';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { BaseLink, EyeIcon, Tooltip } from '@/components/ui';
import { Prisma } from '@/lib/db';

export async function QualityBuildFeedItems() {
  const session = await getSession();
  const userId = session?.user?.id;

  const includeBuildVariants = false;

  // Fixed 4-item homepage widget.
  // First page only, so the cursor is discarded.
  const { builds } = await getPublicBuildFeed({
    cursor: null,
    includeBuildVariants,
    itemsPerPage: 4,
    orderBy: 'newest',
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
