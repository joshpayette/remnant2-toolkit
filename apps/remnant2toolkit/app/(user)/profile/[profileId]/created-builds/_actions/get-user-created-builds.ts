'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
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

  // If the user is not the owner of the profile, only show public builds
  // If the user is the owner of the profile, show all builds based on buildVisibility filter
  const isEditable = profileId === session?.user?.id;

  let isPublicSegment: Prisma.Sql = Prisma.empty;
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
  ${limitByAmuletSegment(amuletFilterToId({ amulet }))}
  ${limitByArchetypesSegment(archetypeFiltersToIds({ archetypes }))}
  ${limitByBuildTagsSegment(buildTagsFilterToValues(buildTags))}
  ${limitByReleasesSegment(releases)}
  ${limitByRelicSegment(relicFilterToId({ relic }))}
  ${limitByRingsSegment(ringsFilterToIds({ rings }))}
  ${limitByTimeConditionSegment(timeRange)}
  ${limitByWeaponsSegment(
    weaponFiltersToIds({
      longGun,
      handGun,
      melee,
    }),
  )}
  ${limitByReferenceLink(withReference)}
  ${limitToBuildsWithVideo(withVideo)}
  ${limitByPatchAffected(patchAffected)}
  ${limitToQualityBuilds(withQuality)}
  ${limitByFeatured(featuredBuildsOnly)}
  `;

  try {
    const { builds, totalBuildCount } = await getBuildList({
      includeBuildVariants: false,
      itemsPerPage,
      orderBy,
      pageNumber,
      percentageOwned: withCollection,
      searchText,
      userId: profileId,
      whereConditions,
    });

    return bigIntFix({
      builds,
      totalBuildCount,
    });
  } catch (e) {
    if (e) {
      console.error(e);
    }
    throw new Error('Failed to get community builds, please try again.');
  }
}
