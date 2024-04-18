import { z } from 'zod'

export const buildStateSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  isPatchAffected: z.boolean().nullable(),
  isPublic: z.boolean().nullable(),
  buildLink: z.string().nullable(),
  buildTags: z
    .array(
      z.object({
        tag: z.string(),
      }),
    )
    .nullable(),
  buildId: z.string().nullable(),
  isFeaturedBuild: z.boolean().nullable(),
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
    archetype: z.array(z.any()),
    skill: z.array(z.any()),
    concoction: z.array(z.any()),
    consumable: z.array(z.any()),
    mod: z.array(z.any()),
    mutator: z.array(z.any()),
    relicfragment: z.array(z.any()),
    trait: z.array(z.any()),
    perk: z.array(z.any()),
  }),
})
