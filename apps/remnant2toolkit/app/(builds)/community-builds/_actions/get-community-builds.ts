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
import { type BuildListRequest } from '@/app/(builds)/_types/build-list-request';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { getOrderBySegment } from '../../_libs/build-filters/get-order-by';

export async function getCommunityBuilds({
  buildListFilters,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
}: BuildListRequest): Promise<{ builds: DBBuild[] }> {
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

  if (releases.length === 0) return { builds: [] };

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
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
  ${limitToQualityBuilds(withQuality)}
  ${limitByPatchAffected(patchAffected)}
  `;

  const orderBySegment = getOrderBySegment(orderBy);

  try {
    const { builds } = await getBuildList({
      includeBuildVariants: true,
      itemsPerPage,
      orderBy: orderBySegment,
      pageNumber,
      percentageOwned: withCollection,
      searchText,
      userId,
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
