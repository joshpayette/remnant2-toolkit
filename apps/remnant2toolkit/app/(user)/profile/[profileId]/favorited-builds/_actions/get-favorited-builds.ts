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
import { limitByFavorited } from '@/app/(builds)/_features/filters/_libs/limit-by-favorited';
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
import { type BuildListRequest } from '@/app/(builds)/_types/build-list-request';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function getFavoritedBuilds({
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
    relic,
    rings,
    searchText,
    releases,
    patchAffected,
    withCollection,
    withQuality,
    withVideo,
    withReference,
  } = buildListFilters;

  if (releases.length === 0) return { builds: [] };

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

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  AND Build.createdById != ${userId}
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
  ${limitByFavorited(userId)}
  ${limitToQualityBuilds(withQuality)}
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
    throw new Error('Failed to get favorited builds, please try again.');
  }
}
