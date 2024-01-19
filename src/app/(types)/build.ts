import { ArmorItem } from '@/app/(types)/items/ArmorItem'
import { GenericItem } from '@/app/(types)/items/GenericItem'
import { MutatorItem } from '@/app/(types)/items/MutatorItem'
import { TraitItem } from '@/app/(types)/items/TraitItem'
import { WeaponItem } from '@/app/(types)/items/WeaponItem'
import { Build, BuildItems } from '@prisma/client'
import { ModItem } from '../(types)/items/ModItem'

export type ItemCategory = keyof BuildState['items']

/**
 * Represents a slot in the buildState
 */
export type ItemSlot = {
  category: GenericItem['category'] | null
  index?: number
}

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
  reported: boolean
  upvoted: boolean
  totalUpvotes: string
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
  }
>

export interface SearchBuildTotalCount {
  totalBuildCount: number
}
