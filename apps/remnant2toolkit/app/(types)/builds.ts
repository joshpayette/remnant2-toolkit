import { Build, BuildItems, BuildTags } from '@repo/db'

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
  isBaseGameBuild: boolean
  isModeratorApproved: boolean
  isModeratorLocked: boolean
  dateFeatured: Date | null
  isPatchAffected: boolean
  thumbnailUrl: string | null
  videoUrl: string | null
  buildLinkUpdatedAt: Date | null
  buildTags: BuildTags[] | null
  buildLink: string | null
  description: string | null
  upvoted: boolean
  totalUpvotes: number
  viewCount: number
  validatedViewCount: number
  duplicateCount: number
  reported: boolean
  items: {
    helm: (ArmorItem & { isOwned?: boolean }) | null
    torso: (ArmorItem & { isOwned?: boolean }) | null
    legs: (ArmorItem & { isOwned?: boolean }) | null
    gloves: (ArmorItem & { isOwned?: boolean }) | null
    relic: (RelicItem & { isOwned?: boolean }) | null
    amulet: (AmuletItem & { isOwned?: boolean }) | null
    weapon: Array<(WeaponItem & { isOwned?: boolean }) | null>
    ring: Array<(RingItem & { isOwned?: boolean }) | null>
    archetype: Array<(ArchetypeItem & { isOwned?: boolean }) | null>
    skill: Array<(SkillItem & { isOwned?: boolean }) | null>
    concoction: Array<(ConcoctionItem & { isOwned?: boolean }) | null>
    consumable: Array<(ConsumableItem & { isOwned?: boolean }) | null>
    mod: Array<(ModItem & { isOwned?: boolean }) | null>
    mutator: Array<(MutatorItem & { isOwned?: boolean }) | null>
    relicfragment: Array<(RelicFragmentItem & { isOwned?: boolean }) | null>
    trait: Array<TraitItem & { isOwned?: boolean }>
    perk: Array<(PerkItem & { isOwned?: boolean }) | null>
  }
}

export type ItemCategory = keyof BuildState['items']

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
  isBaseGameBuild: Build['isBaseGameBuild']
  dateFeatured: Build['dateFeatured']
  isPatchAffected: Build['isPatchAffected']
  isMember: boolean
  isModeratorApproved: Build['isModeratorApproved']
  isModeratorLocked: Build['isModeratorLocked']
  thumbnailUrl: Build['thumbnailUrl']
  videoUrl: Build['videoUrl']
  buildLinkUpdatedAt: Build['buildLinkUpdatedAt']
  buildLink: Build['buildLink']
  createdById: Build['createdById']
  createdByName: string
  createdByDisplayName: string
  createdAt: Build['createdAt']
  updatedAt: Build['updatedAt']
  reported: boolean
  upvoted: boolean
  totalUpvotes: number
  viewCount: number
  validatedViewCount: number
  duplicateCount: number
  buildItems: Array<BuildItems & { isOwned?: boolean }>
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
    validatedViews: number
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

export const MAX_CONSUMABLES = 4
export const MAX_CONCOCTIONS = 7
