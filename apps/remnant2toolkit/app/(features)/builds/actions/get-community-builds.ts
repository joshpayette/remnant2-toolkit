'use server';

import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getSession } from '@/app/(features)/auth/services/sessionService';
import { OrderBy } from '@/app/(features)/builds/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { TimeRange } from '@/app/(features)/builds/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { BuildListFilters } from '@/app/(features)/builds/filters/types';
import { DBBuild } from '@/app/(features)/builds/types/db-build';
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(queries)/build-filters/community-builds';
import { getOrderBySegment } from '@/app/(queries)/build-filters/segments/get-order-by';
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/app/(queries)/build-filters/segments/limit-by-amulet';
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/app/(queries)/build-filters/segments/limit-by-archetypes';
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '@/app/(queries)/build-filters/segments/limit-by-build-tags';
import { limitByCollectionSegment } from '@/app/(queries)/build-filters/segments/limit-by-collection';
import { limitByPatchAffected } from '@/app/(queries)/build-filters/segments/limit-by-patch-affected';
import { limitToQualityBuilds } from '@/app/(queries)/build-filters/segments/limit-by-quality';
import { limitByReferenceLink } from '@/app/(queries)/build-filters/segments/limit-by-reference-link';
import { limitByReleasesSegment } from '@/app/(queries)/build-filters/segments/limit-by-release';
import {
  limitByRelicSegment,
  relicFilterToId,
} from '@/app/(queries)/build-filters/segments/limit-by-relic';
import {
  limitByRingsSegment,
  ringsFilterToIds,
} from '@/app/(queries)/build-filters/segments/limit-by-rings';
import { limitByTimeConditionSegment } from '@/app/(queries)/build-filters/segments/limit-by-time-condition';
import { limitToBuildsWithVideo } from '@/app/(queries)/build-filters/segments/limit-by-video';
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/app/(queries)/build-filters/segments/limit-by-weapons';
import { PaginationResponse } from '@/app/(utils)/pagination/use-pagination';

export async function getCommunityBuilds({
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
    withQuality,
    withVideo,
    withReference,
  } = buildListFilters;

  if (releases.length === 0) return { items: [], totalItemCount: 0 };

  const archetypeIds = archetypeFiltersToIds({ archetypes });
  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  });

  const amuletId = amuletFilterToId({ amulet });
  const relicId = relicFilterToId({ relic });
  const ringIds = ringsFilterToIds({ rings });
  const tagValues = buildTagsFilterToValues(buildTags);
  const trimmedSearchText = searchText.trim();

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
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
  ${limitToQualityBuilds(withQuality)}
  ${limitByCollectionSegment(withCollection, userId)}
  ${limitByPatchAffected(patchAffected)}
  `;

  const orderBySegment = getOrderBySegment(orderBy);

  // First, get the Builds
  const [builds, totalBuildsCountResponse] = await Promise.all([
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

  return bigIntFix({
    items: builds,
    totalItemCount: totalBuildCount,
  });
}
