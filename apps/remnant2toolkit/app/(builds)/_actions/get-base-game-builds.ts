'use server';

import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { type OrderBy } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { type TimeRange } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(builds)/_queries/build-filters/community-builds';
import { getOrderBySegment } from '@/app/(builds)/_queries/build-filters/segments/get-order-by';
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/app/(builds)/_queries/build-filters/segments/limit-by-amulet';
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/app/(builds)/_queries/build-filters/segments/limit-by-archetypes';
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '@/app/(builds)/_queries/build-filters/segments/limit-by-build-tags';
import { limitByCollectionSegment } from '@/app/(builds)/_queries/build-filters/segments/limit-by-collection';
import { limitByPatchAffected } from '@/app/(builds)/_queries/build-filters/segments/limit-by-patch-affected';
import { limitToQualityBuilds } from '@/app/(builds)/_queries/build-filters/segments/limit-by-quality';
import { limitByReferenceLink } from '@/app/(builds)/_queries/build-filters/segments/limit-by-reference-link';
import { limitByReleasesSegment } from '@/app/(builds)/_queries/build-filters/segments/limit-by-release';
import {
  limitByRelicSegment,
  relicFilterToId,
} from '@/app/(builds)/_queries/build-filters/segments/limit-by-relic';
import {
  limitByRingsSegment,
  ringsFilterToIds,
} from '@/app/(builds)/_queries/build-filters/segments/limit-by-rings';
import { limitByTimeConditionSegment } from '@/app/(builds)/_queries/build-filters/segments/limit-by-time-condition';
import { limitToBuildsWithVideo } from '@/app/(builds)/_queries/build-filters/segments/limit-by-video';
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/app/(builds)/_queries/build-filters/segments/limit-by-weapons';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(features)/auth/services/sessionService';
import { type PaginationResponse } from '@/app/(utils)/pagination/use-pagination';

export async function getBaseGameBuilds({
  buildListFilters,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
}: {
  buildListFilters: BuildListFilters;
  itemsPerPage: number;
  orderBy: OrderBy;
  pageNumber: number;
  timeRange: TimeRange;
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getSession();
  const userId = session?.user?.id;

  const {
    amulet,
    archetypes,
    buildTags,
    handGun,
    longGun,
    melee,
    rings,
    searchText,
    releases,
    relic,
    patchAffected,
    withCollection,
    withVideo,
    withReference,
    withQuality,
  } = buildListFilters;

  if (releases.length === 0) return { items: [], totalItemCount: 0 };

  const archetypeIds = archetypeFiltersToIds({ archetypes });
  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee });
  const amuletId = amuletFilterToId({ amulet });
  const relicId = relicFilterToId({ relic });
  const ringIds = ringsFilterToIds({ rings });
  const tagValues = buildTagsFilterToValues(buildTags);

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  AND Build.isBaseGameBuild = true
  ${limitByAmuletSegment(amuletId)}
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByBuildTagsSegment(tagValues)}
  ${limitByReleasesSegment(releases)}
  ${limitByRelicSegment(relicId)}
  ${limitByRingsSegment(ringIds)}
  ${limitByTimeConditionSegment(timeRange)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReferenceLink(withReference)}
  ${limitToBuildsWithVideo(withVideo)}
  ${limitByPatchAffected(patchAffected)}
  ${limitToQualityBuilds(withQuality)}
  ${limitByCollectionSegment(withCollection, userId)}
  `;

  const orderBySegment = getOrderBySegment(orderBy, true);

  const trimmedSearchText = searchText.trim();

  const [builds, totalBuildCountResponse] = await Promise.all([
    communityBuildsQuery({
      userId,
      itemsPerPage,
      pageNumber,
      orderBySegment,
      whereConditions,
      searchText: trimmedSearchText,
    }),
    communityBuildsCountQuery({
      whereConditions,
      searchText: trimmedSearchText,
    }),
  ]);

  if (!builds) return { items: [], totalItemCount: 0 };

  const totalBuilds = totalBuildCountResponse[0]?.totalBuildCount ?? 0;

  // Find all build items for each build
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

  return bigIntFix({ items: builds, totalItemCount: totalBuilds });
}
