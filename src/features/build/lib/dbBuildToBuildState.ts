import { AmuletItem } from '@/features/items/types/AmuletItem'
import { ArchetypeItem } from '@/features/items/types/ArchetypeItem'
import { ArmorItem } from '@/features/items/types/ArmorItem'
import { ConcoctionItem } from '@/features/items/types/ConcoctionItem'
import { ConsumableItem } from '@/features/items/types/ConsumableItem'
import { ModItem } from '@/features/items/types/ModItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { PerkItem } from '@/features/items/types/PerkItem'
import { RelicFragmentItem } from '@/features/items/types/RelicFragmentItem'
import { RelicItem } from '@/features/items/types/RelicItem'
import { RingItem } from '@/features/items/types/RingItem'
import { SkillItem } from '@/features/items/types/SkillItem'
import { TraitItem } from '@/features/items/types/TraitItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'

import { BuildState, DBBuild } from '../types'

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
    isPatchAffected: Boolean(dbBuild.isPatchAffected),
    thumbnailUrl: dbBuild.thumbnailUrl,
    videoUrl: dbBuild.videoUrl,
    upvoted: Boolean(dbBuild.upvoted),
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
