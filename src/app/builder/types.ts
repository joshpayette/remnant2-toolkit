import { ArmorItem } from '@/app/(types)/items/ArmorItem'
import { GenericItem } from '@/app/(types)/items/GenericItem'
import { MutatorItem } from '@/app/(types)/items/MutatorItem'
import { TraitItem } from '@/app/(types)/items/TraitItem'
import { WeaponItem } from '@/app/(types)/items/WeaponItem'
import { Build } from '@prisma/client'
import { z } from 'zod'

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
  isPublic: boolean
  isMember: boolean
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
    mod: Array<GenericItem | null>
    mutator: Array<MutatorItem | null>
    relicfragment: Array<GenericItem | null>
    trait: TraitItem[]
  }
}

export const initialBuildState: BuildState = {
  name: 'My Build',
  description: null,
  isPublic: true,
  isMember: false,
  buildId: null,
  createdByDisplayName: null,
  createdById: null,
  upvoted: false,
  totalUpvotes: 0,
  reported: false,
  items: {
    helm: null,
    torso: null,
    legs: null,
    gloves: null,
    relic: null,
    amulet: null,
    weapon: [],
    ring: [],
    archtype: [],
    skill: [],
    concoction: [],
    consumable: [],
    mod: [],
    mutator: [],
    relicfragment: [],
    trait: [],
  },
}

export const buildStateSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  isPublic: z.boolean().nullable(),
  buildId: z.string().nullable(),
  createdById: z.string().nullable(),
  upvoted: z.boolean().nullable(),
  items: z.object({
    helm: z.any(),
    torso: z.any(),
    legs: z.any(),
    gloves: z.any(),
    relic: z.any(),
    amulet: z.any(),
    weapon: z.array(z.any()),
    ring: z.array(z.any()),
    archtype: z.array(z.any()),
    skill: z.array(z.any()),
    concoction: z.array(z.any()),
    consumable: z.array(z.any()),
    mod: z.array(z.any()),
    mutator: z.array(z.any()),
    relicfragment: z.array(z.any()),
    trait: z.array(z.any()),
  }),
})

/**
 * Additional fields not stored in the db,
 * but computed for the buildState
 */
export interface ExtendedBuild extends Build {
  createdByDisplayName: string
  isMember: boolean
  reported: boolean
  upvoted: boolean
  totalUpvotes: number
}
