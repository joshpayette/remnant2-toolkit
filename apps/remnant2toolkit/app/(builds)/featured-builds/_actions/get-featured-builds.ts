'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
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
import { getOrderBySegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/order-by';
import { limitByReleaseSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/releases';
import { limitByRelicSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/relic';
import { limitByRelicFragmentsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/relic-fragments';
import { limitByRingsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/rings';
import { limitBySkillsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/skills';
import { limitByTimeConditionSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/time-condition';
import { limitByTraitsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/traits';
import { limitByPatchAffectedSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-patch-affected';
import { limitByReferenceSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-reference';
import { limitByWithVideoSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-video';
import { type BuildListRequest } from '@/app/(builds)/_types/build-list-request';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function getFeaturedBuilds({
  buildFilterFields,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
}: BuildListRequest): Promise<{ builds: DBBuild[] }> {
  const session = await getSession();
  const userId = session?.user?.id;

  const {
    amulets,
    archetypes,
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
    withReference,
    withVideo,
    withPatchAffected,
    withCollection,
  } = buildFilterFields;

  const whereConditions = Prisma.sql`
    WHERE Build.isPublic = true
    AND Build.isFeaturedBuild = true
    ${limitByArchetypesSegment(archetypes)}
    ${limitByAmuletSegment(amulets)}
    ${limitByBuildTagsSegment(buildTags)}
    ${limitByFusionsSegment(fusions)}
    ${limitByHandGunSegment(handGuns)}
    ${limitByLegendaryFragmentsSegment(legendaryFragments)}
    ${limitByLongGunSegment(longGuns)}
    ${limitByMeleeSegment(melees)}
    ${limitByModsSegment(mods)}
    ${limitByMutatorsSegment(mutators)}
    ${limitByPatchAffectedSegment(withPatchAffected)}
    ${limitByReferenceSegment(withReference)}
    ${limitByReleaseSegment(releases)}
    ${limitByRelicSegment(relics)}
    ${limitByRelicFragmentsSegment(relicFragments)}
    ${limitByRingsSegment(rings)}
    ${limitBySkillsSegment(skills)}
    ${limitByTimeConditionSegment(timeRange)}
    ${limitByTraitsSegment(traits)}
    ${limitByWithVideoSegment(withVideo)}
  `;

  const orderBySegment = getOrderBySegment(orderBy, true);

  try {
    const { builds } = await getBuildList({
      includeBuildVariants: false,
      itemsPerPage,
      orderBy: orderBySegment,
      pageNumber,
      searchText,
      userId,
      whereConditions,
      withCollection,
    });

    return bigIntFix({
      builds,
    });
  } catch (e) {
    if (e) {
      console.error(e);
    }
    throw new Error('Failed to get featured builds, please try again.');
  }
}
