'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
import { getOrderBySegment } from '@/app/(builds)/_features/filters/_libs/get-order-by';
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/app/(builds)/_features/filters/_libs/limit-by-amulet';
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/app/(builds)/_features/filters/_libs/limit-by-archetypes';
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '@/app/(builds)/_features/filters/_libs/limit-by-build-tags';
import { limitByFeatured } from '@/app/(builds)/_features/filters/_libs/limit-by-featured';
import { limitByPatchAffected } from '@/app/(builds)/_features/filters/_libs/limit-by-patch-affected';
import { limitToQualityBuilds } from '@/app/(builds)/_features/filters/_libs/limit-by-quality';
import { limitByReferenceLink } from '@/app/(builds)/_features/filters/_libs/limit-by-reference-link';
import { limitByReleasesSegment } from '@/app/(builds)/_features/filters/_libs/limit-by-release';
import {
  limitByRelicSegment,
  relicFilterToId,
} from '@/app/(builds)/_features/filters/_libs/limit-by-relic';
import {
  limitByRingsSegment,
  ringsFilterToIds,
} from '@/app/(builds)/_features/filters/_libs/limit-by-rings';
import { limitByTimeConditionSegment } from '@/app/(builds)/_features/filters/_libs/limit-by-time-condition';
import { limitToBuildsWithVideo } from '@/app/(builds)/_features/filters/_libs/limit-by-video';
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/app/(builds)/_features/filters/_libs/limit-by-weapons';
import { type ProfileBuildListRequest } from '@/app/(builds)/_types/build-list-request';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
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
}: ProfileBuildListRequest): Promise<{ builds: DBBuild[] }> {
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

  if (releases.length === 0) return { builds: [] };

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

  const orderBySegment = getOrderBySegment(orderBy);

  try {
    const { builds } = await getBuildList({
      includeBuildVariants: false,
      itemsPerPage,
      orderBy: orderBySegment,
      pageNumber,
      percentageOwned: withCollection,
      searchText,
      userId: profileId,
      whereConditions,
    });

    return bigIntFix({
      builds,
    });
  } catch (e) {
    if (e) {
      console.error(e);
    }
    throw new Error('Failed to get community builds, please try again.');
  }
}
