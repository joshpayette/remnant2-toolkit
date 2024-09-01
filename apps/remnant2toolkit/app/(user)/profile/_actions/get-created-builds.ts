'use server';

import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { type PaginationResponse } from '@/app/_utils/pagination/use-pagination';
import { type BuildVisibility } from '@/app/(builds)/_components/filters/secondary-filters/build-visibility-filter/use-build-visibility-filter';
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
import { limitByFeatured } from '@/app/(builds)/_queries/build-filters/segments/limit-by-featured';
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

export type CreatedBuildsFilter = 'date created' | 'upvotes';

export async function getCreatedBuilds({
  buildListFilters,
  buildVisibility = 'public',
  featuredBuildsOnly,
  isEditable,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
  userId,
}: {
  buildListFilters: BuildListFilters;
  buildVisibility?: BuildVisibility;
  featuredBuildsOnly: boolean;
  isEditable: boolean;
  itemsPerPage: number;
  orderBy: OrderBy;
  pageNumber: number;
  timeRange: TimeRange;
  userId: string;
}): Promise<PaginationResponse<DBBuild>> {
  const {
    amulet,
    archetypes,
    buildTags,
    handGun,
    longGun,
    melee,
    relic,
    rings,
    searchText,
    releases,
    patchAffected,
    withCollection,
    withVideo,
    withReference,
    withQuality,
  } = buildListFilters;

  if (releases.length === 0) return { items: [], totalItemCount: 0 };

  const archetypeIds = archetypeFiltersToIds({ archetypes });
  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  });
  const tagValues = buildTagsFilterToValues(buildTags);
  const amuletId = amuletFilterToId({ amulet });
  const relicId = relicFilterToId({ relic });
  const ringIds = ringsFilterToIds({ rings });

  let isPublicSegment: Prisma.Sql = Prisma.empty;

  // If the user is not the owner of the profile, only show public builds
  // If the user is the owner of the profile, show all builds based on buildVisibility filter
  if (!isEditable) {
    isPublicSegment = Prisma.sql`AND Build.isPublic = true`;
  } else {
    if (buildVisibility === 'public') {
      isPublicSegment = Prisma.sql`AND Build.isPublic = true`;
    } else if (buildVisibility === 'private') {
      isPublicSegment = Prisma.sql`AND Build.isPublic = false`;
    } else {
      isPublicSegment = Prisma.empty;
    }
  }

  const whereConditions = Prisma.sql`
  WHERE Build.createdById = ${userId}
  ${isPublicSegment}
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
  ${limitByFeatured(featuredBuildsOnly)}
  ${limitByCollectionSegment(withCollection, userId)}
  `;

  const orderBySegment = getOrderBySegment(orderBy);

  const trimmedSearchText = searchText.trim();

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
