'use server';

import { limitByAmuletSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/amulets';
import { limitByArchetypesSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/archetypes';
import { limitByBuildTagsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/build-tags';
import { limitByFavorited } from '@/app/(builds)/_features/filters/_libs/queries/segments/favorited';
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
import { getUserBuildFeed } from '@/app/(builds)/_features/filters/_libs/queries/user-build-feed-cursor-query';
import {
  type BuildFeedRequest,
  type BuildFeedResponse,
} from '@/app/(builds)/_types/build-feed-request';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { Prisma } from '@/lib/db';
import { bigIntFix } from '@/lib/utils';

export async function getFavoritedBuilds({
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
    AND Build.createdById != ${userId}
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
    ${limitByFavorited(userId)}
`;

  try {
    const { builds, nextCursor } = await getUserBuildFeed({
      cursor,
      itemsPerPage,
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
    throw new Error('Failed to get favorited builds, please try again.');
  }
}
