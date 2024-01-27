import { ArmorItem } from '@/features/items/types/ArmorItem'
import { GenericItem } from '@/features/items/types/GenericItem'
import { ModItem } from '@/features/items/types/ModItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { PerkItem } from '@/features/items/types/PerkItem'
import { TraitItem } from '@/features/items/types/TraitItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { Build, BuildItems } from '@prisma/client'

export type ItemCategory = keyof BuildState['items']

/**
 * The build tool UI state
 */
export interface BuildState {
  buildId: string | null
  name: string
  createdById: string | null
  createdByDisplayName: string | null
  isMember: boolean
  isPublic: boolean
  isFeaturedBuild: boolean
  thumbnailUrl: string | null
  videoUrl: string | null
  description: string | null
  upvoted: boolean
  totalUpvotes: number
  reported: boolean
  items: {
    helm: ArmorItem | null
    torso: ArmorItem | null
    legs: ArmorItem | null
    gloves: ArmorItem | null
    relic: GenericItem | null
    amulet: GenericItem | null
    weapon: Array<WeaponItem | null>
    ring: Array<GenericItem | null>
    archtype: Array<GenericItem | null>
    skill: Array<GenericItem | null>
    concoction: Array<GenericItem | null>
    consumable: Array<GenericItem | null>
    mod: Array<ModItem | null>
    mutator: Array<MutatorItem | null>
    relicfragment: Array<GenericItem | null>
    trait: TraitItem[]
    perk: Array<PerkItem | null>
  }
}

/**
 * The shape of the build returned from the DB, along with
 * additional computed fields
 */
export interface DBBuild {
  id: Build['id']
  name: Build['name']
  description: Build['description']
  isPublic: Build['isPublic']
  isFeaturedBuild: Build['isFeaturedBuild']
  isMember: boolean
  thumbnailUrl: Build['thumbnailUrl']
  videoUrl: Build['videoUrl']
  createdById: Build['createdById']
  createdByDisplayName: string
  createdAt: Build['createdAt']
  updatedAt: Build['updatedAt']
  reported: boolean
  upvoted: boolean
  totalUpvotes: number
  buildItems: BuildItems[]
}

/**
 * When searching for builds, we use a query whose type is not inferred
 * All responses should be cast to this type
 */
export type CommunityBuildQueryResponse = Array<
  DBBuild & {
    createdByDisplayName: string
    createdByName: string
    displayName: string
    name: string
    isPaidUser: boolean
    reported: boolean
    totalUpvotes: number
    totalReports: number
    upvoted: boolean
  }
>

export type CommunityBuildTotalCount = Array<{
  totalBuildCount: number
}>
