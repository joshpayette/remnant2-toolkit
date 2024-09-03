import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { AmuletItem } from '@/app/(items)/_types/amulet-item';
import { ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { ArmorItem } from '@/app/(items)/_types/armor-item';
import { ConcoctionItem } from '@/app/(items)/_types/concotion-item';
import { ConsumableItem } from '@/app/(items)/_types/consumable-item';
import { ModItem } from '@/app/(items)/_types/mod-item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { PerkItem } from '@/app/(items)/_types/perk-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { RelicItem } from '@/app/(items)/_types/relic-item';
import { RingItem } from '@/app/(items)/_types/ring-item';
import { SkillItem } from '@/app/(items)/_types/skill-item';
import { TraitItem } from '@/app/(items)/_types/trait-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';

export function dbBuildToBuildState(dbBuild: DBBuild): BuildState {
  const { buildItems } = dbBuild;

  const buildState: BuildState = {
    buildId: dbBuild.id,
    name: dbBuild.name,
    description: dbBuild.description,
    createdAt: dbBuild.createdAt,
    updatedAt: dbBuild.updatedAt,
    createdById: dbBuild.createdById,
    createdByDisplayName: dbBuild.createdByDisplayName,
    isMember: Boolean(Number(dbBuild.isMember)),
    isPublic: Boolean(Number(dbBuild.isPublic)),
    isModeratorApproved: Boolean(dbBuild.isModeratorApproved),
    isModeratorLocked: Boolean(dbBuild.isModeratorLocked),
    isFeaturedBuild: Boolean(dbBuild.isFeaturedBuild),
    isBeginnerBuild: Boolean(dbBuild.isBeginnerBuild),
    isBaseGameBuild: Boolean(dbBuild.isBaseGameBuild),
    isGimmickBuild: Boolean(dbBuild.isGimmickBuild),
    dateFeatured: dbBuild.dateFeatured,
    isPatchAffected: Boolean(dbBuild.isPatchAffected),
    thumbnailUrl: dbBuild.thumbnailUrl,
    videoUrl: dbBuild.videoUrl,
    buildLinkUpdatedAt: dbBuild.buildLinkUpdatedAt,
    buildLink: dbBuild.buildLink,
    buildTags: dbBuild.buildTags,
    upvoted: dbBuild.upvoted,
    totalUpvotes: dbBuild.totalUpvotes,
    viewCount: dbBuild.viewCount,
    validatedViewCount: dbBuild.validatedViewCount,
    duplicateCount: dbBuild.duplicateCount,
    reported: dbBuild.reported,
    items: {
      helm: ArmorItem.fromDBValue(buildItems, 'helm'),
      torso: ArmorItem.fromDBValue(buildItems, 'torso'),
      legs: ArmorItem.fromDBValue(buildItems, 'legs'),
      gloves: ArmorItem.fromDBValue(buildItems, 'gloves'),
      relic: RelicItem.fromDBValue(buildItems),
      amulet: AmuletItem.fromDBValue(buildItems),
      ring: RingItem.fromDBValue(buildItems),
      archetype: ArchetypeItem.fromDBValue(buildItems),
      skill: SkillItem.fromDBValue(buildItems),
      concoction: ConcoctionItem.fromDBValue(buildItems),
      consumable: ConsumableItem.fromDBValue(buildItems),
      relicfragment: RelicFragmentItem.fromDBValue(buildItems),
      weapon: WeaponItem.fromDBValue(buildItems),
      mod: ModItem.fromDBValue(buildItems),
      mutator: MutatorItem.fromDBValue(buildItems),
      trait: TraitItem.fromDBValue(buildItems),
      perk: PerkItem.fromDBValue(buildItems),
    },
  };

  return buildState;
}
