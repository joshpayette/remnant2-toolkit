import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';
import { type NextRequest } from 'next/server';

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

export async function POST(request: NextRequest) {
  const session = await getSession();
  const userId = session?.user?.id;

  const res = await request.json();
  const {
    buildListFilters,
    buildVisibility,
    featuredBuildsOnly,
    itemsPerPage,
    orderBy,
    pageNumber,
    timeRange,
    profileId,
  } = res as ProfileBuildListRequest;

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

  if (releases.length === 0) {
    const response = {
      builds: [],
      totalBuildCount: 0,
    } as const satisfies BuildListResponse;
    return Response.json(response);
  }

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

  const isEditable = userId === profileId;

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
    ${limitByCollectionSegment(withCollection, userId)}
    `;

  const orderBySegment = getOrderBySegment(orderBy);

  const trimmedSearchText = searchText.trim();

  try {
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
