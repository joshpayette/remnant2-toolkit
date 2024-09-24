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
import { PrismItem } from '@/app/(items)/_types/prism-item';
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
    buildLink: dbBuild.buildLink,
    buildLinkUpdatedAt: dbBuild.buildLinkUpdatedAt,
    buildTags: dbBuild.buildTags,
    createdAt: dbBuild.createdAt,
    dateFeatured: dbBuild.dateFeatured,
    description: dbBuild.description,
    duplicateCount: dbBuild.duplicateCount,
    createdById: dbBuild.createdById,
    createdByDisplayName: dbBuild.createdByDisplayName,
    isBaseGameBuild: Boolean(dbBuild.isBaseGameBuild),
    isBeginnerBuild: Boolean(dbBuild.isBeginnerBuild),
    isFeaturedBuild: Boolean(dbBuild.isFeaturedBuild),
    isGimmickBuild: Boolean(dbBuild.isGimmickBuild),
    isMember: Boolean(Number(dbBuild.isMember)),
    isModeratorApproved: Boolean(dbBuild.isModeratorApproved),
    isModeratorLocked: Boolean(dbBuild.isModeratorLocked),
    isPatchAffected: Boolean(dbBuild.isPatchAffected),
    isPublic: Boolean(Number(dbBuild.isPublic)),
    isVideoApproved: Boolean(dbBuild.isVideoApproved),
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
      prism: PrismItem.fromDBValue(buildItems),
    },
    name: dbBuild.name,
    thumbnailUrl: dbBuild.thumbnailUrl,
    totalUpvotes: dbBuild.totalUpvotes,
    updatedAt: dbBuild.updatedAt,
    upvoted: dbBuild.upvoted,
    validatedViewCount: dbBuild.validatedViewCount,
    variantIndex: dbBuild.variantIndex,
    videoUrl: dbBuild.videoUrl,
    viewCount: dbBuild.viewCount,
  };

  return buildState;
}
