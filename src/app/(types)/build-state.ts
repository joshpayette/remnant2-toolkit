import { ArmorItem } from '@/app/(types)/items/ArmorItem'
import { GenericItem } from '@/app/(types)/items/GenericItem'
import { MutatorItem } from '@/app/(types)/items/MutatorItem'
import { TraitItem } from '@/app/(types)/items/TraitItem'
import { WeaponItem } from '@/app/(types)/items/WeaponItem'
import { z } from 'zod'

export type ItemCategory = keyof BuildState['items']

/**
 * The build tool UI state
 */
export interface BuildState {
  buildId: string | null
  name: string
  createdById: string | null
  createdByDisplayName: string | null
  isPublic: boolean
  isMember?: boolean
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
    weapon: WeaponItem[]
    ring: GenericItem[]
    archtype: GenericItem[]
    skill: GenericItem[]
    concoction: GenericItem[]
    consumable: GenericItem[]
    mod: GenericItem[]
    mutator: MutatorItem[]
    relicfragment: GenericItem[]
    trait: TraitItem[]
  }
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
