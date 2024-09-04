'use server';

import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(builds)/_libs/build-filters/community-builds';
import { getOrderBySegment } from '@/app/(builds)/_libs/build-filters/get-order-by';
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/app/(builds)/_libs/build-filters/limit-by-amulet';
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/app/(builds)/_libs/build-filters/limit-by-archetypes';
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '@/app/(builds)/_libs/build-filters/limit-by-build-tags';
import { limitByCollectionSegment } from '@/app/(builds)/_libs/build-filters/limit-by-collection';
import { limitByFeatured } from '@/app/(builds)/_libs/build-filters/limit-by-featured';
import { limitByPatchAffected } from '@/app/(builds)/_libs/build-filters/limit-by-patch-affected';
import { limitToQualityBuilds } from '@/app/(builds)/_libs/build-filters/limit-by-quality';
import { limitByReferenceLink } from '@/app/(builds)/_libs/build-filters/limit-by-reference-link';
import { limitByReleasesSegment } from '@/app/(builds)/_libs/build-filters/limit-by-release';
import {
  limitByRelicSegment,
  relicFilterToId,
} from '@/app/(builds)/_libs/build-filters/limit-by-relic';
import {
  limitByRingsSegment,
  ringsFilterToIds,
} from '@/app/(builds)/_libs/build-filters/limit-by-rings';
import { limitByTimeConditionSegment } from '@/app/(builds)/_libs/build-filters/limit-by-time-condition';
import { limitToBuildsWithVideo } from '@/app/(builds)/_libs/build-filters/limit-by-video';
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/app/(builds)/_libs/build-filters/limit-by-weapons';
import { type ProfileBuildListRequest } from '@/app/(builds)/_types/build-list-request';
import { type BuildListResponse } from '@/app/(builds)/_types/build-list-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export type UserCreatedBuildsFilter = 'date created' | 'upvotes';

export async function getUserCreatedBuilds({
  buildListFilters,
  buildVisibility = 'public',
  featuredBuildsOnly,
  itemsPerPage,
  orderBy,
  pageNumber,
  profileId,
  timeRange,
}: ProfileBuildListRequest): Promise<BuildListResponse> {
  const session = await getSession();

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

  if (releases.length === 0) return { builds: [], totalBuildCount: 0 };

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
  const isEditable = profileId === session?.user?.id;

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
  WHERE Build.createdById = ${profileId}
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
  ${limitByCollectionSegment(withCollection, session?.user?.id)}
  `;

  const orderBySegment = getOrderBySegment(orderBy);

  const trimmedSearchText = searchText.trim();

  // First, get the Builds
  const [builds, totalBuildsCountResponse] = await Promise.all([
    communityBuildsQuery({
      userId: profileId,
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
    const [buildItems, buildTags] = await Promise.all([
      prisma.buildItems.findMany({
        where: { buildId: build.id },
      }),
      prisma.buildTags.findMany({
        where: { buildId: build.id },
      }),
    ]);

    build.buildItems = buildItems;
    build.buildTags = buildTags;
  }

  const totalBuildCount = totalBuildsCountResponse[0]?.totalBuildCount ?? 0;

  return bigIntFix({
    builds,
    totalBuildCount,
  });
}
