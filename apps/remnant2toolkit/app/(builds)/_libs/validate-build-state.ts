import { z } from 'zod';

import { type BuildState } from '@/app/(builds)/_types/build-state';

const baseItemShape = {
  id: z.string(),
  name: z.string(),
  category: z.enum([
    'helm',
    'torso',
    'legs',
    'gloves',
    'relic',
    'amulet',
    'weapon',
    'archetype',
    'concoction',
    'consumable',
    'mod',
    'mutator',
    'relicfragment',
    'ring',
    'skill',
    'trait',
    'perk',
  ]),
  dlc: z.enum(['base', 'dlc1', 'dlc2', 'dlc3']),
  imagePath: z.string(),
  saveFileSlug: z.string().optional(),
  description: z.string().optional(),
  cooldown: z.number().optional(),
  optional: z.boolean().optional(),
  wikiLinks: z.array(z.string()).optional(),
  health: z.number().optional(),
  healthPercent: z.number().optional(),
  healthCap: z.number().optional(),
  stamina: z.number().optional(),
  staminaPercent: z.number().optional(),
  armor: z.number().optional(),
  armorPercent: z.number().optional(),
  weight: z.number().optional(),
  weightPercent: z.number().optional(),
  weightThreshold: z.number().optional(),
  bleedResistance: z.number().optional(),
  bleedResistancePercent: z.number().optional(),
  fireResistance: z.number().optional(),
  fireResistancePercent: z.number().optional(),
  shockResistance: z.number().optional(),
  shockResistancePercent: z.number().optional(),
  blightResistance: z.number().optional(),
  blightResistancePercent: z.number().optional(),
  toxinResistance: z.number().optional(),
  toxinResistancePercent: z.number().optional(),
};

const armorItemSchema = z.object({
  ...baseItemShape,
  category: z.enum(['helm', 'torso', 'legs', 'gloves']),
  set: z.string().optional(),
});

const relicItemSchema = z.object({
  ...baseItemShape,
  category: z.enum(['relic']),
});

const amuletItemSchema = z.object({
  ...baseItemShape,
  category: z.enum(['amulet']),
});

const prismItemSchema = z.object({
  ...baseItemShape,
  category: z.enum(['prism']),
});

export function validateBuildState(buildState: unknown) {
  const buildStateSchema: z.ZodType<BuildState> = z.object({
    name: z.string(),
    description: z.string().nullable(),
    isPatchAffected: z.boolean(),
    isPublic: z.boolean(),
    buildLink: z.string().nullable(),
    buildTags: z
      .array(
        z.object({
          id: z.string(),
          tag: z.enum([
            'Melee',
            'Ranged',
            'Mods',
            'Skills',
            'StatusEffects',
            'Tank',
            'Support',
          ]),
          buildId: z.string(),
          createdAt: z.date(),
          updatedAt: z.date().nullable(),
        }),
      )
      .nullable(),
    buildId: z.string().nullable(),
    isFeaturedBuild: z.boolean(),
    isBeginnerBuild: z.boolean(),
    isBaseGameBuild: z.boolean(),
    isGimmickBuild: z.boolean(),
    dateFeatured: z.date().nullable(),
    isMember: z.boolean(),
    isModeratorApproved: z.boolean(),
    isModeratorLocked: z.boolean(),
    isVideoApproved: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    createdById: z.string().nullable(),
    createdByDisplayName: z.string().nullable(),
    upvoted: z.boolean(),
    thumbnailUrl: z.string().nullable(),
    videoUrl: z.string().nullable(),
    buildLinkUpdatedAt: z.date().nullable(),
    totalUpvotes: z.number(),
    viewCount: z.number(),
    validatedViewCount: z.number(),
    duplicateCount: z.number(),
    variantIndex: z.number(),
    items: z.object({
      helm: armorItemSchema.nullable(),
      torso: armorItemSchema.nullable(),
      legs: armorItemSchema.nullable(),
      gloves: armorItemSchema.nullable(),
      relic: relicItemSchema.nullable(),
      amulet: amuletItemSchema.nullable(),
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
      prism: prismItemSchema.nullable(),
    }),
  });
  return buildStateSchema.safeParse(buildState);
}
