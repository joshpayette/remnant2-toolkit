import { Build, BuildItems, BuildTags } from '@prisma/client'

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
import { ErrorResponse } from '@/app/(types)/error-response'

export type ItemCategory = keyof BuildState['items']

/**
 * The build tool UI state
 */
export interface BuildState {
  buildId: string | null
  name: string
  createdAt: Date
  updatedAt: Date | null
  createdById: string | null
  createdByDisplayName: string | null
  isMember: boolean
  isPublic: boolean
  isFeaturedBuild: boolean
  isBeginnerBuild: boolean
  dateFeatured: Date | null
  isPatchAffected: boolean
  thumbnailUrl: string | null
  videoUrl: string | null
  buildTags: BuildTags[] | null
  buildLink: string | null
  description: string | null
  upvoted: boolean
  totalUpvotes: number
  reported: boolean
  items: {
    helm: ArmorItem | null
    torso: ArmorItem | null
    legs: ArmorItem | null
    gloves: ArmorItem | null
    relic: RelicItem | null
    amulet: AmuletItem | null
    weapon: Array<WeaponItem | null>
    ring: Array<RingItem | null>
    archetype: Array<ArchetypeItem | null>
    skill: Array<SkillItem | null>
    concoction: Array<ConcoctionItem | null>
    consumable: Array<ConsumableItem | null>
    mod: Array<ModItem | null>
    mutator: Array<MutatorItem | null>
    relicfragment: Array<RelicFragmentItem | null>
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
  isBeginnerBuild: Build['isBeginnerBuild']
  dateFeatured: Build['dateFeatured']
  isPatchAffected: Build['isPatchAffected']
  isMember: boolean
  thumbnailUrl: Build['thumbnailUrl']
  videoUrl: Build['videoUrl']
  buildLink: Build['buildLink']
  createdById: Build['createdById']
  createdByName: string
  createdByDisplayName: string
  createdAt: Build['createdAt']
  updatedAt: Build['updatedAt']
  reported: boolean
  upvoted: boolean
  totalUpvotes: number
  buildItems: BuildItems[]
  buildTags: BuildTags[]
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
    isMember: boolean
    reported: boolean
    totalUpvotes: number
    totalReports: number
    upvoted: boolean
  }
>

export type CommunityBuildTotalCount = Array<{
  totalBuildCount: number
}>

/**
 * The response from the server when a build is created, updated, or deleted
 */
export type SuccessResponse = {
  message?: string
  buildId?: string
  totalUpvotes?: number
}
export type BuildActionResponse = ErrorResponse | SuccessResponse
