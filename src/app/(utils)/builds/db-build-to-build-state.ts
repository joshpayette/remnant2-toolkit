import { AmuletItem } from '@/app/(data)/items/types/AmuletItem'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem'
import { ConcoctionItem } from '@/app/(data)/items/types/ConcoctionItem'
import { ConsumableItem } from '@/app/(data)/items/types/ConsumableItem'
import { ModItem } from '@/app/(data)/items/types/ModItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { PerkItem } from '@/app/(data)/items/types/PerkItem'
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem'
import { RelicItem } from '@/app/(data)/items/types/RelicItem'
import { RingItem } from '@/app/(data)/items/types/RingItem'
import { SkillItem } from '@/app/(data)/items/types/SkillItem'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { BuildState, DBBuild } from '@/app/(types)/builds'

export function dbBuildToBuildState(dbBuild: DBBuild): BuildState {
  const { buildItems } = dbBuild

  const buildState: BuildState = {
    buildId: dbBuild.id,
    name: dbBuild.name,
    description: dbBuild.description,
    createdAt: dbBuild.createdAt,
    updatedAt: dbBuild.updatedAt,
    createdById: dbBuild.createdById,
    createdByDisplayName: dbBuild.createdByDisplayName,
    isMember: dbBuild.isMember,
    isPublic: dbBuild.isPublic,
    isFeaturedBuild: Boolean(dbBuild.isFeaturedBuild),
    isBeginnerBuild: Boolean(dbBuild.isBeginnerBuild),
    dateFeatured: dbBuild.dateFeatured,
    isPatchAffected: Boolean(dbBuild.isPatchAffected),
    thumbnailUrl: dbBuild.thumbnailUrl,
    videoUrl: dbBuild.videoUrl,
    buildLink: dbBuild.buildLink,
    buildTags: dbBuild.buildTags,
    upvoted: dbBuild.upvoted,
    totalUpvotes: dbBuild.totalUpvotes,
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
  }

  return buildState
}
