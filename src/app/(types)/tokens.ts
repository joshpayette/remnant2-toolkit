import { ARCHTYPE_COLORS } from '@/app/(data)/items/constants'

export const INLINE_TOKENS = [
  {
    type: 'Acid',
    token: 'ACID',
    color: 'text-[#589961]',
    description: 'Elemental Damage.',
  },
  {
    type: 'Alchemist',
    token: 'ALCHEMIST',
    color: ARCHTYPE_COLORS.ALCHEMIST.text,
    description: undefined,
  },

  {
    type: 'Archon',
    token: 'ARCHON',
    color: ARCHTYPE_COLORS.ARCHON.text,
    description: undefined,
  },
  {
    type: 'Bleeding',
    token: 'BLEEDING',
    color: 'text-[#f2350f]',
    description:
      'Deals Physical Damage per second. Reduces healing effectiveness by 50%.',
  },
  {
    type: 'Bleeding',
    token: 'BLEED',
    color: 'text-[#f2350f]',
    description:
      'Deals Physical Damage per second. Reduces healing effectiveness by 50%.',
  },
  {
    type: 'Brittle',
    token: 'BRITTLE',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Blowback',
    token: 'BLOWBACK',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Burning',
    token: 'BURNING',
    color: 'text-[#b65d30]',
    description: 'Deals elemental FIRE damage. Can make enemies panic.',
  },
  {
    type: 'Bulwark',
    token: 'BULWARK',
    color: ARCHTYPE_COLORS.CHALLENGER.text,
    description:
      'Increases flat Damage Reduction per stack up to maximum of 25% at 5 stacks.',
  },
  {
    type: 'Challenger',
    token: 'CHALLENGER',
    color: ARCHTYPE_COLORS.CHALLENGER.text,
    description: undefined,
  },
  {
    type: 'Call of the Doe',
    token: 'CALL OF THE DOE',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Contamination',
    token: 'CONTAMINATION',
    color: 'text-[#800080]',
    description:
      'Inflicts a burst of damage after which it resets allowing another build-up.',
  },
  {
    type: 'Corroded',
    token: 'CORRODED',
    color: 'text-[#0fa82b]',
    description: 'Increases damage taken by 10%.',
  },
  {
    type: 'Corrosive',
    token: 'CORROSIVE',
    color: 'text-[#589961]',
    description: 'Elemental Damage.',
  },
  {
    type: 'Critical Damage',
    token: 'Crit Damage',
    color: 'text-red-500',
    description:
      'Base 50%. Critical Damage is multiplicative with different sources of damage.',
  },
  {
    type: 'Critical Damage',
    token: 'Critical Damage',
    color: 'text-red-500',
    description:
      'Base 50%. Critical Damage is multiplicative with different sources of damage.',
  },
  {
    type: 'Curse',
    token: 'CURSE',
    color: 'text-[#7d219e]',
    description: 'Reduces maximum Health by 10% per stack. Maximum 5 stacks.',
  },
  {
    type: 'Data corruption',
    token: 'DATA CORRUPTION',
    color: 'text-gray-400',
    description:
      'Disables skills, relic, and consumables use for a short duration.', // TODO: I think it also deals damage and staggers but need to verify.
  },
  {
    type: 'Defrag',
    token: 'DEFRAG',
    color: 'text-[#ede6e6]',
    description: 'Physical Damage.',
  },
  {
    type: 'Drenched',
    token: 'DRENCHED',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Elemental Damage',
    token: 'Elemental Damage',
    color: 'text-emerald-400',
    description: `Acid, Corrosive, Fire, Shock, certain skills and mods.`,
  },
  {
    type: 'Engineer',
    token: 'ENGINEER',
    color: ARCHTYPE_COLORS.ENGINEER.text,
    description: undefined,
  },
  {
    type: 'Explorer',
    token: 'EXPLORER',
    color: ARCHTYPE_COLORS.EXPLORER.text,
    description: undefined,
  },
  {
    type: 'EXPOSED',
    token: 'EXPOSED',
    color: 'text-yellow-100',
    description: 'Target receives 15% additional damage from all sources.',
  },
  {
    type: 'Fire',
    token: 'FIRE',
    color: 'text-[#cc5500]',
    description: 'Elemental Damage.',
  },
  {
    type: 'Frenzied',
    token: 'FRENZIED',
    color: 'text-yellow-100',
    description:'undefined',
  },
  {
    type: 'Living Will',
    token: 'LIVING WILL',
    color: 'text-yellow-100',
    description:'undefined',
  },
  {
    type: 'Stoneskin',
    token: 'STONESKIN',
    color: 'text-yellow-100',
    description:'undefined',
  },
  {
    type: 'Unbridled Chaos',
    token: 'UNBRIDLED CHAOS',
    color: 'text-yellow-100',
    description:'undefined',
  },
  {
    type: 'Gloom',
    token: 'GLOOM',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Gunslinger',
    token: 'GUNSLINGER',
    color: ARCHTYPE_COLORS.GUNSLINGER.text,
    description: undefined,
  },
  {
    type: 'Handler',
    token: 'HANDLER',
    color: ARCHTYPE_COLORS.HANDLER.text,
    description: undefined,
  },
  {
    type: 'Haste',
    token: 'HASTE',
    color: 'text-[#f1f1cf]',
    description: `Increases the speed of player's actions by 7%.`,
  },
  {
    type: 'Hunter',
    token: 'HUNTER',
    color: ARCHTYPE_COLORS.HUNTER.text,
    description: undefined,
  },
  {
    type: 'Invader',
    token: 'INVADER',
    color: ARCHTYPE_COLORS.INVADER.text,
    description: undefined,
  },
  {
    type: 'Invoker',
    token: 'INVOKER',
    color: ARCHTYPE_COLORS.INVOKER.text,
    description: undefined,
  },
  {
    type: 'Lifesteal',
    token: 'Lifesteal',
    color: 'text-rose-500',
    description:
      "Unupgraded Base Damage only. Doesn't work with Healing Effectiveness.",
  },
  {
    type: 'Madness',
    token: 'MADNESS',
    color: 'text-[#ede6e6]',
    description: 'Physical Damage.',
  },
  {
    type: 'Marked',
    token: 'MARKED',
    color: ARCHTYPE_COLORS.GUNSLINGER.text,
    description:
      'Critical Chance against MARKED enemies is increased by 15% for all allies.',
  },
  {
    type: 'Medic',
    token: 'MEDIC',
    color: ARCHTYPE_COLORS.MEDIC.text,
    description: undefined,
  },
  {
    type: 'OPPORTUNITY',
    token: 'OPPORTUNITY',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Power Stone',
    token: 'POWER STONE',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Overloaded',
    token: 'OVERLOADED',
    color: 'text-[#7676af]',
    description:
      'Deals elemental SHOCK area damage every 5 seconds. Damage increases by 10% for every OVERLOADED enemy nerby. ', // TODO What's the range and what's the max damage increase for secondary effect?
  },
  {
    type: 'Ritualist',
    token: 'RITUALIST',
    color: ARCHTYPE_COLORS.RITUALIST.text,
    description: undefined,
  },
  {
    type: 'Root Rot',
    token: 'ROOT ROT',
    color: 'text-[#c66806]',
    description:
      'Reduces maximum Stamina by 33%. Forces coughing animation at random intervals.',
  },
  {
    type: 'Shield',
    token: 'SHIELD',
    color: 'text-[#80e0e1]',
    description: `Provides a shield on top of your health. Shields from different sources stack.`,
  },
  {
    type: 'Shock',
    token: 'SHOCK',
    color: 'text-[#5c5cce]',
    description: 'Elemental Damage. Deals double damage to shields.',
  },
  {
    type: 'Slow',
    token: 'SLOW',
    color: 'text-[#f1f1cf]',
    description:
      'Reduces target speed. 99% reduced effect against Bosses and Aberrations.',
  },
  {
    type: 'Summoner',
    token: 'SUMMONER',
    color: ARCHTYPE_COLORS.SUMMONER.text,
    description: undefined,
  },
  {
    type: 'Suppression',
    token: 'SUPPRESSION',
    color: 'text-[#444662]',
    description: 'Reduces Mod Power Generation by 50%.',
  },
  {
    type: 'PRERELEASE',
    token: 'PRERELEASE',
    color: 'text-[#ecfc00]',
    description: `This is prerelease content. Information might not be accurate or change. Numbers aren't final.`,
  },
  {
    type: 'Weakspot Damage',
    token: 'Weakspot Damage',
    color: 'text-red-500',
    description:
      'Weakspot Damage is multiplicative with different sources of damage.',
  },
  {
    type: 'Negative Status Effects',
    token: 'Negative Status Effects',
    color: 'text-secondary',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'Negative Status Effect',
    token: 'Negative Status Effect',
    color: 'text-secondary',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'Negative Status',
    token: 'Negative Status',
    color: 'text-secondary',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'Elemental Status Effects',
    token: 'Elemental Status Effects',
    color: 'text-[#05baf9]',
    description: `Burning, Corroded, Overloaded.`,
  },
  {
    type: 'Elemental Status Effect',
    token: 'Elemental Status Effect',
    color: 'text-[#05baf9]',
    description: `Burning, Corroded, Overloaded.`,
  },
  {
    type: 'Elemental Status',
    token: 'Elemental Status',
    color: 'text-[#05baf9]',
    description: `Burning, Corroded, Overloaded.`,
  },
  {
    type: 'Status Effects',
    token: 'Status Effects',
    color: 'text-secondary',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'Status Effect',
    token: 'Status Effect',
    color: 'text-secondary',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'MARKED',
    token: 'MARKED',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'MARK',
    token: 'MARK',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'AMBUSH',
    token: 'AMBUSH',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'FOCUSED',
    token: 'FOCUSED',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'GIFT OF THE FOREST',
    token: 'GIFT OF THE FOREST',
    color: 'text-[#fff1bc]',
    description: undefined,
  },
] as const satisfies {
  type: string
  token: string
  color: string
  description: string | undefined
}[]
export type InlineToken = (typeof INLINE_TOKENS)[number]

export const EXTERNAL_TOKENS = [
  {
    token: 'Amplitude',
    color: 'text-[#66ffcc]',
    description:
      "All, or part, of this item's effect benefits from Amplitude trait.",
  },
  // * We keep this here as well as in the description tokens because of the need
  // * to specify that the Handler skills apply bleed.
  {
    token: 'Dog',
    color: 'text-[#f2350f]',
    description:
      'Dog applies BLEEDING to enemies.',
  },
  {
    token: 'Explosive Damage',
    color: 'text-[#ff7575]',
    description: "All, or part, of this item's effect deals Explosive Damage.",
  },
  {
    token: 'Multiplicative',
    color: 'text-orange-300',
    description: 'Damage is multiplicative with different sources of damage.',
  },
  {
    token: 'Multiplicative Debuffs',
    color: 'text-red-400',
    description:
      'Counts as a debuff making it multiplicative with different sources of damage.',
  },
  {
    token: 'Bug',
    color: 'text-[#ecff00]',
    description:
      'This item is currently bugged and MAY not function as expected. Check remnant.wiki for more information.',
  },
] as const satisfies {
  token: string
  color: string
  description: string | undefined
}[]
export type ExternalToken = (typeof EXTERNAL_TOKENS)[number]

export const ITEM_TOKENS = [
  'Ammo Reserves', // Only plural one due to wording in game
  'All Damage',
  'Armor Increase',
  'Charged Melee Damage',
  'Charged Melee',
  'Charged Shot',
  'Concoction',
  'Consumable',
  'Critical Chance',
  'Critical Damage',
  'Critical Hit',
  'Damage Reduction',
  'Elemental Damage',
  'Encumbrance',
  'Firearm Swap Speed',
  'Fire Rate',
  'Grenade',
  'Grey Health',
  'Hardcore Reward',
  'Heal',
  'Healing Effectiveness',
  'Health',
  'Heat Generation',
  'Lifesteal',
  'Magazine Capacity',
  'Melee Attack Speed',
  'Melee Charge Speed',
  'Melee Critical Chance',
  'Melee Critical Damage',
  'Melee Critical Hit',
  'Melee Damage',
  'Melee Hit',
  'Melee Special Ability',
  'Melee Speed',
  'Mod Cast Speed',
  'Mod Cooldown',
  'Mod Cost',
  'Mod Damage',
  'Mod Duration',
  'Mod Power',
  'Movement Speed',
  'Neutral Backdash',
  'Neutral Dodge', // TODO Probably merge these 3 into one token
  'Perfect Dodge',
  'Perfect Neutral Evade',
  'Projectile Speed',
  'Range',
  'Ranged Damage',
  'Recoil',
  'Reduce Skill Cooldown',
  'Relic Use Speed',
  'Reload Speed',
  'Skill Cast Speed',
  'Skill Damage',
  'Skill Duration',
  'Spread',
  'Stagger',
  'Stamina',
  'Status Duration',
  'Status Effect',
  'Summon',
  'Weakspot Critical Chance',
  'Weakspot Damage',
  'Weakspot Hit',
  'Weapon Damage',
] as const satisfies string[]
export type ItemToken = (typeof ITEM_TOKENS)[number]
