'use server';

import { Prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { getBuildList } from '@/app/(builds)/_actions/get-build-list';
import { limitByAmuletSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/amulets';
import { limitByArchetypesSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/archetypes';
import { limitByBuildTagsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/build-tags';
import { limitByFeatured } from '@/app/(builds)/_features/filters/_libs/queries/segments/featured';
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
import { limitByWithOptionalPrismFragment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-optional-prism';
import { limitByWithPatchAffectedSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-patch-affected';
import { limitByWithQualityBuildsSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-quality';
import { limitByWithReferenceSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-reference';
import { limitByWithVideoSegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/with-video';
import { type ProfileBuildListRequest } from '@/app/(builds)/_types/build-list-request';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export type UserCreatedBuildsFilter = 'date created' | 'upvotes';

export async function getUserCreatedBuilds({
  buildFilterFields,
  buildVisibility = 'public',
  featuredBuildsOnly,
  itemsPerPage,
  orderBy,
  pageNumber,
  profileId,
  timeRange,
}: ProfileBuildListRequest): Promise<{
  builds: DBBuild[];
  totalCount: number;
}> {
  const session = await getSession();

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
    ${limitByFeatured(featuredBuildsOnly)}
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
    ${limitByWithQualityBuildsSegment(withQuality)}
    ${limitByWithReferenceSegment(withReference)}
    ${limitByWithVideoSegment(withVideo)}
  `;

  const orderBySegment = getOrderBySegment(orderBy);

  try {
    const { builds, totalCount } = await getBuildList({
      includeBuildVariants: false,
      itemsPerPage,
      orderBy: orderBySegment,
      pageNumber,
      searchText,
      userId: profileId,
      whereConditions,
      withCollection,
    });

    return bigIntFix({
      builds,
      totalCount,
    });
  } catch (e) {
    if (e) {
      console.error(e);
    }
    throw new Error('Failed to get community builds, please try again.');
  }
}
