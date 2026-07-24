'use server';

import { unstable_cache } from 'next/cache';

import {
  isDefaultPublicFeedView,
  PUBLIC_BUILD_FEEDS_CACHE_TAG,
  PUBLIC_BUILD_FEEDS_REVALIDATE_SECONDS,
} from '@/app/(builds)/_features/filters/_libs/queries/feed-cache';
import { getPublicBuildFeed } from '@/app/(builds)/_features/filters/_libs/queries/public-build-feed-cursor-query';
import { limitByAmuletSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/amulets';
import { limitByArchetypesSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/archetypes';
import { limitByBuildTagsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/build-tags';
import { limitByFusionsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/fusions';
import { limitByHandGunSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/hand-guns';
import { limitByLegendaryFragmentsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/legendary-fragments';
import { limitByLongGunSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/long-guns';
import { limitByMeleeSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/melees';
import { limitByModsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/mods';
import { limitByMutatorsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/mutators';
import { limitByReleaseSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/releases';
import { limitByRelicSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/relic';
import { limitByRelicFragmentsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/relic-fragments';
import { limitByRingsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/rings';
import { limitBySkillsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/skills';
import { limitByTimeConditionSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/time-condition';
import { limitByTraitsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/traits';
import { limitByWithOptionalPrismFragment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-optional-prism';
import { limitByWithPatchAffectedSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-patch-affected';
import { limitByWithQualityBuildsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-quality';
import { limitByWithReferenceSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-reference';
import { limitByWithVideoSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-video';
import {
  type BuildFeedRequest,
  type BuildFeedResponse,
} from '@/app/(builds)/_types/build-feed-request';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { Prisma } from '@/lib/db';
import { bigIntFix } from '@/lib/utils';

export async function getFeaturedBuilds({
  buildFilterFields,
  cursor,
  itemsPerPage,
  orderBy,
  timeRange,
}: BuildFeedRequest): Promise<BuildFeedResponse> {
  const session = await getSession();
  const userId = session?.user?.id;

  const {
    amulets,
    archetypes,
    archetypeSlot,
    buildTags,
    fusions,
    handGuns,
    legendaryFragments,
    longGuns,
    melees,
    mutators,
    mods,
    releases,
    relics,
    relicFragments,
    rings,
    searchText,
    skills,
    traits,
    withCollection,
    withOptionalPrism,
    withPatchAffected,
    withQuality,
    withReference,
    withVideo,
  } = buildFilterFields;

  const includeBuildVariants = false;

  const whereConditions = Prisma.sql`
    WHERE Build.isPublic = true
    AND Build.isFeaturedBuild = true
    ${limitByArchetypesSegment(archetypes, archetypeSlot)}
    ${limitByAmuletSegment(amulets)}
    ${limitByBuildTagsSegment(buildTags)}
    ${limitByFusionsSegment(fusions)}
    ${limitByHandGunSegment(handGuns)}
    ${limitByLegendaryFragmentsSegment(legendaryFragments)}
    ${limitByLongGunSegment(longGuns)}
    ${limitByMeleeSegment(melees)}
    ${limitByModsSegment(mods)}
    ${limitByMutatorsSegment(mutators)}
    ${limitByReleaseSegment(releases)}
    ${limitByRelicSegment(relics)}
    ${limitByRelicFragmentsSegment(relicFragments)}
    ${limitByRingsSegment(rings)}
    ${limitBySkillsSegment(skills)}
    ${limitByTimeConditionSegment(timeRange)}
    ${limitByTraitsSegment(traits)}
    ${limitByWithOptionalPrismFragment(withOptionalPrism)}
    ${limitByWithPatchAffectedSegment(withPatchAffected)}
    ${limitByWithQualityBuildsSegment(withQuality, includeBuildVariants)}
    ${limitByWithReferenceSegment(withReference)}
    ${limitByWithVideoSegment(withVideo)}
  `;

  try {
    if (
      isDefaultPublicFeedView({
        buildFilterFields,
        cursor,
        defaultOrderBy: 'newest',
        itemsPerPage,
        orderBy,
        timeRange,
        userId,
      })
    ) {
      const getCachedDefaultFeed = unstable_cache(
        async () => {
          const { builds, nextCursor } = await getPublicBuildFeed({
            cursor: null,
            includeBuildVariants,
            itemsPerPage,
            newestColumn: 'dateFeatured',
            orderBy,
            searchText: '',
            userId: undefined,
            whereConditions,
            withCollection: 0,
          });
          return bigIntFix({ builds, nextCursor });
        },
        ['default-featured-feed'],
        {
          tags: [PUBLIC_BUILD_FEEDS_CACHE_TAG],
          revalidate: PUBLIC_BUILD_FEEDS_REVALIDATE_SECONDS,
        },
      );
      return getCachedDefaultFeed();
    }

    const { builds, nextCursor } = await getPublicBuildFeed({
      cursor,
      includeBuildVariants,
      itemsPerPage,
      // Featured builds sort "newest" by when they were featured, not created.
      newestColumn: 'dateFeatured',
      orderBy,
      searchText,
      userId,
      whereConditions,
      withCollection,
    });

    return bigIntFix({
      builds,
      nextCursor,
    });
  } catch (e) {
    if (e) {
      console.error(e);
    }
    throw new Error('Failed to get featured builds, please try again.');
  }
}
