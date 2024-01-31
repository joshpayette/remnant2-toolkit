import { ArmorItem } from '@/features/items/types/ArmorItem'
import { BuildState, DBBuild } from '../types'
import { GenericItem } from '@/features/items/types/GenericItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { ModItem } from '@/features/items/types/ModItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { TraitItem } from '@/features/items/types/TraitItem'
import { PerkItem } from '@/features/items/types/PerkItem'

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
    isFeaturedBuild: dbBuild.isFeaturedBuild,
    thumbnailUrl: dbBuild.thumbnailUrl,
    videoUrl: dbBuild.videoUrl,
    upvoted: dbBuild.upvoted,
    totalUpvotes: dbBuild.totalUpvotes,
    reported: dbBuild.reported,
    items: {
      helm: ArmorItem.fromDBValue(buildItems, 'helm'),
      torso: ArmorItem.fromDBValue(buildItems, 'torso'),
      legs: ArmorItem.fromDBValue(buildItems, 'legs'),
      gloves: ArmorItem.fromDBValue(buildItems, 'gloves'),
      relic: GenericItem.fromDBValueSingle(buildItems, 'relic'),
      amulet: GenericItem.fromDBValueSingle(buildItems, 'amulet'),
      ring: GenericItem.fromDBValueArray(buildItems, 'ring'),
      archtype: GenericItem.fromDBValueArray(buildItems, 'archtype'),
      skill: GenericItem.fromDBValueArray(buildItems, 'skill'),
      concoction: GenericItem.fromDBValueArray(buildItems, 'concoction'),
      consumable: GenericItem.fromDBValueArray(buildItems, 'consumable'),
      relicfragment: GenericItem.fromDBValueArray(buildItems, 'relicfragment'),
      weapon: WeaponItem.fromDBValue(buildItems),
      mod: ModItem.fromDBValue(buildItems),
      mutator: MutatorItem.fromDBValue(buildItems),
      trait: TraitItem.fromDBValue(buildItems),
      perk: PerkItem.fromDBValue(buildItems),
    },
  }

  return buildState
}
