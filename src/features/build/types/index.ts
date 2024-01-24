import { ArmorItem } from '@/features/item/types/ArmorItem'
import { GenericItem } from '@/features/item/types/GenericItem'
import { MutatorItem } from '@/features/item/types/MutatorItem'
import { TraitItem } from '@/features/item/types/TraitItem'
import { WeaponItem } from '@/features/item/types/WeaponItem'
import { Build, BuildItems } from '@prisma/client'
import { ModItem } from '../../item/types/ModItem'
import { PerkItem } from '../../item/types/PerkItem'

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
export type SearchBuildResponse = Array<
  DBBuild & {
    createdByDisplayName: string
    createdByName: string
    reported: boolean
    totalUpvotes: number
    totalReports: number
    upvoted: boolean
    displayName: string
    name: string
    isPaidUser: boolean
  }
>

export type SearchBuildTotalCount = Array<{
  totalBuildCount: number
}>
