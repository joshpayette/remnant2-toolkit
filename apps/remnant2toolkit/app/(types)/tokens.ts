import { ARCHETYPE_COLORS } from '@/app/(data)/items/constants'

export const INLINE_TOKENS = [
  {
    type: 'Acid',
    token: 'ACID',
    color: 'text-[#497F51] dark:text-[#589961]',
    description: 'Elemental Damage.',
  },
  {
    type: 'Alchemist',
    token: 'ALCHEMIST',
    color: ARCHETYPE_COLORS.ALCHEMIST.text,
    description: undefined,
  },

  {
    type: 'Archon',
    token: 'ARCHON',
    color: ARCHETYPE_COLORS.ARCHON.text,
    description: undefined,
  },
  {
    type: 'Bleeding',
    token: 'BLEEDING',
    color: 'text-[#C92C0C] dark:text-[#f2350f]',
    description:
      'Deals Physical Damage per second. Reduces healing effectiveness by 50%.',
  },
  {
    type: 'Bleeding',
    token: 'BLEED',
    color: 'text-[#C92C0C] dark:text-[#f2350f]',
    description:
      'Deals Physical Damage per second. Reduces healing effectiveness by 50%.',
  },
  {
    type: 'Brittle',
    token: 'BRITTLE',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Blowback',
    token: 'BLOWBACK',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Burning',
    token: 'BURNING',
    color: 'text-[#974D28] dark:text-[#b65d30]',
    description: 'Deals elemental FIRE damage. Can make enemies panic.',
  },
  {
    type: 'Bulwark',
    token: 'BULWARK',
    color: ARCHETYPE_COLORS.CHALLENGER.text,
    description:
      'Increases flat Damage Reduction per stack up to maximum of 25% at 5 stacks.',
  },
  {
    type: 'Challenger',
    token: 'CHALLENGER',
    color: ARCHETYPE_COLORS.CHALLENGER.text,
    description: undefined,
  },
  {
    type: 'Call of the Doe',
    token: 'CALL OF THE DOE',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Contamination',
    token: 'CONTAMINATION',
    color: 'text-[#6A006A] dark:text-[#800080]',
    description:
      'Inflicts a burst of damage after which it resets allowing another build-up.',
  },
  {
    type: 'Corroded',
    token: 'CORRODED',
    color: 'text-[#0a751e] dark:text-[#0fa82b]',
    description: 'Increases damage taken by 10%.',
  },
  {
    type: 'Corrosive',
    token: 'CORROSIVE',
    color: 'text-[#497F51] dark:text-[#589961]',
    description: 'Elemental Damage.',
  },
  {
    type: 'Critical Damage',
    token: 'Crit Damage',
    color: 'text-[#C63838] dark:text-[#ef4444]',
    description:
      'Base 50%. Critical Damage is multiplicative with different sources of damage.',
  },
  {
    type: 'Critical Damage',
    token: 'Critical Damage',
    color: 'text-[#C63838] dark:text-[#ef4444]',
    description:
      'Base 50%. Critical Damage is multiplicative with different sources of damage.',
  },
  {
    type: 'Curse',
    token: 'CURSE',
    color: 'text-[#681B83] dark:text-[#7d219e]',
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
    color: 'text-[#6b6161] dark:text-[#ede6e6]',
    description: 'Physical Damage.',
  },
  {
    type: 'Drenched',
    token: 'DRENCHED',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Elemental Damage',
    token: 'Elemental Damage',
    color: 'text-[#0a7552] dark:text-[#10B981]',
    description: `Acid, Corrosive, Fire, Shock, certain skills and mods.`,
  },
  {
    type: 'Engineer',
    token: 'ENGINEER',
    color: ARCHETYPE_COLORS.ENGINEER.text,
    description: undefined,
  },
  {
    type: 'Explorer',
    token: 'EXPLORER',
    color: ARCHETYPE_COLORS.EXPLORER.text,
    description: undefined,
  },
  {
    type: 'EXPOSED',
    token: 'EXPOSED',
    color: 'text-[#6d6a46] dark:text-[#fef9c3]',
    description: 'Target receives 15% additional damage from all sources.',
  },
  {
    type: 'Fire',
    token: 'FIRE',
    color: 'text-[#A94700] dark:text-[#cc5500]',
    description: 'Elemental Damage.',
  },
  {
    type: 'Frenzied',
    token: 'FRENZIED',
    color: 'text-[#6d6a46] dark:text-[#fef9c3]',
    description: undefined,
  },
  {
    type: 'Living Will',
    token: 'LIVING WILL',
    color: 'text-[#6d6a46] dark:text-[#fef9c3]',
    description: undefined,
  },
  {
    type: 'Stoneskin',
    token: 'STONESKIN',
    color: 'text-[#6d6a46] dark:text-[#fef9c3]',
    description: undefined,
  },
  {
    type: 'Unbridled Chaos',
    token: 'UNBRIDLED CHAOS',
    color: 'text-[#6d6a46] dark:text-[#fef9c3]',
    description: undefined,
  },
  {
    type: 'Gloom',
    token: 'GLOOM',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Gunslinger',
    token: 'GUNSLINGER',
    color: ARCHETYPE_COLORS.GUNSLINGER.text,
    description: undefined,
  },
  {
    type: 'Handler',
    token: 'HANDLER',
    color: ARCHETYPE_COLORS.HANDLER.text,
    description: undefined,
  },
  {
    type: 'Haste',
    token: 'HASTE',
    color: 'text-[#6b6b47] dark:text-[#f1f1cf]',
    description: `Increases the speed of player's actions by 7%.`,
  },
  {
    type: 'Hunter',
    token: 'HUNTER',
    color: ARCHETYPE_COLORS.HUNTER.text,
    description: undefined,
  },
  {
    type: 'Invader',
    token: 'INVADER',
    color: ARCHETYPE_COLORS.INVADER.text,
    description: undefined,
  },
  {
    type: 'Invoker',
    token: 'INVOKER',
    color: ARCHETYPE_COLORS.INVOKER.text,
    description: undefined,
  },
  {
    type: 'Lifesteal',
    token: 'Lifesteal',
    color: 'text-[#CB344E] dark:text-[#F43F5E]',
    description:
      "Unupgraded Base Damage only. Doesn't work with Healing Effectiveness.",
  },
  {
    type: 'Madness',
    token: 'MADNESS',
    color: 'text-[#6b6161] dark:text-[#ede6e6]',
    description: 'Physical Damage.',
  },
  {
    type: 'Marked',
    token: 'MARKED',
    color: ARCHETYPE_COLORS.GUNSLINGER.text,
    description:
      'Critical Chance against MARKED enemies is increased by 15% for all allies.',
  },
  {
    type: 'Medic',
    token: 'MEDIC',
    color: ARCHETYPE_COLORS.MEDIC.text,
    description: undefined,
  },
  {
    type: 'OPPORTUNITY',
    token: 'OPPORTUNITY',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Power Stone',
    token: 'POWER STONE',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Overloaded',
    token: 'OVERLOADED',
    color: 'text-[#626291] dark:text-[#7676af]',
    description:
      'Deals SHOCK area damage every 5 seconds. Damage increases by 10% for every OVERLOADED enemy nearby.', // TODO What's the range and what's the max damage increase for secondary effect?
  },
  {
    type: 'Ritualist',
    token: 'RITUALIST',
    color: ARCHETYPE_COLORS.RITUALIST.text,
    description: undefined,
  },
  {
    type: 'Root Rot',
    token: 'ROOT ROT',
    color: 'text-[#A45605] dark:text-[#c66806]',
    description:
      'Reduces maximum Stamina by 33%. Forces coughing animation at random intervals.',
  },
  {
    type: 'Shield',
    token: 'SHIELD',
    color: 'text-[#357273] dark:text-[#80e0e1]',
    description: `Provides a shield on top of your health. Shields from different sources stack.`,
  },
  {
    type: 'Shock',
    token: 'SHOCK',
    color: 'text-[#4C4CAB] dark:text-[#5c5cce]',
    description: 'Elemental Damage. Deals double damage to shields.',
  },
  {
    type: 'Slow',
    token: 'SLOW',
    color: 'text-[#6b6b47] dark:text-[#f1f1cf]',
    description:
      'Reduces target speed. 99% reduced effect against Bosses and Aberrations.',
  },
  {
    type: 'Summoner',
    token: 'SUMMONER',
    color: ARCHETYPE_COLORS.SUMMONER.text,
    description: undefined,
  },
  {
    type: 'Suppression',
    token: 'SUPPRESSION',
    color: 'text-[#383A51] dark:text-[#444662]',
    description: 'Reduces Mod Power Generation by 50%.',
  },
  {
    type: 'Weakspot Damage',
    token: 'Weakspot Damage',
    color: 'text-[#C63838] dark:text-[#ef4444]',
    description:
      'Weakspot Damage is multiplicative with different sources of damage.',
  },
  {
    type: 'Negative Status Effects',
    token: 'Negative Status Effects',
    color: 'text-[#885EB3] dark:text-[#C084FC]',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'Negative Status Effect',
    token: 'Negative Status Effect',
    color: 'text-[#885EB3] dark:text-[#C084FC]',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'Negative Status',
    token: 'Negative Status',
    color: 'text-[#885EB3] dark:text-[#C084FC]',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'Elemental Status Effects',
    token: 'Elemental Status Effects',
    color: 'text-[#036f96] dark:text-[#05baf9]',
    description: `Burning, Corroded, Overloaded.`,
  },
  {
    type: 'Elemental Status Effect',
    token: 'Elemental Status Effect',
    color: 'text-[#036f96] dark:text-[#05baf9]',
    description: `Burning, Corroded, Overloaded.`,
  },
  {
    type: 'Elemental Status',
    token: 'Elemental Status',
    color: 'text-[#036f96] dark:text-[#05baf9]',
    description: `Burning, Corroded, Overloaded.`,
  },
  {
    type: 'Status Effects',
    token: 'Status Effects',
    color: 'text-[#885EB3] dark:text-[#C084FC]',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'Status Effect',
    token: 'Status Effect',
    color: 'text-[#885EB3] dark:text-[#C084FC]',
    description: `Bleeding, Burning, Corroded, Overloaded, Slow.`,
  },
  {
    type: 'MARKED',
    token: 'MARKED',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'MARK',
    token: 'MARK',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'AMBUSH',
    token: 'AMBUSH',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'FOCUSED',
    token: 'FOCUSED',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'GIFT OF THE FOREST',
    token: 'GIFT OF THE FOREST',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description: undefined,
  },
  {
    type: 'Warded Target',
    token: 'Warded Target',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
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
    color: 'text-[#1f7a5c] dark:text-[#66ffcc]',
    description:
      "All, or part, of this item's effect benefits from Amplitude trait.",
  },
  // * We keep this here as well as in the description tokens because of the need
  // * to specify that the Handler skills apply bleed.
  {
    token: 'Attack Dog',
    color: 'text-[#C92C0C] dark:text-[#589961]',
    description: 'Dog applies BLEEDING to enemies.',
  },
  {
    token: 'Guard Dog',
    color: 'text-[#C92C0C] dark:text-[#589961]',
    description: 'Dog applies BLEEDING to enemies.',
  },
  {
    token: 'Support Dog',
    color: 'text-[#C92C0C] dark:text-[#589961]',
    description: 'Dog applies BLEEDING to enemies.',
  },
  {
    token: 'Explosive Damage',
    color: 'text-[#c83737] dark:text-[#ff7575]',
    description: "All, or part, of this item's effect deals Explosive Damage.",
  },
  {
    token: 'Multiplicative',
    color: 'text-[#956E44] dark:text-[#FDBA74]',
    description: 'Damage is multiplicative with different sources of damage.',
  },
  {
    token: 'Multiplicative Debuffs',
    color: 'text-[#B05050] dark:text-[#F87171]',
    description:
      'Counts as a debuff making it multiplicative with different sources of damage.',
  },
  {
    token: 'Misty Step',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description:
      'Grants Misty Step evade when worn in combination with other Misty Step items.',
  },
  {
    token: 'Lodestone Set',
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description:
      'Wearing the Lodestone Ring with the Lodestone Crown will grant immunity to all BLIGHT Status Effects. ',
  },
  {
    token: `Navigator's Set`,
    color: 'text-[#6d6650] dark:text-[#fff1bc]',
    description:
      `Wearing either Navigator's Pendant alongside the Navigator's Helm gives +15 BLIGHT resistance.`,
  },
  {
    token: 'PRERELEASE',
    color: 'text-[#646b00] dark:text-[#ecfc00]',
    description: `This is prerelease content. Information might not be accurate or change. Numbers aren't final.`,
  },
  {
    token: 'Bug',
    color: 'text-[#5e6600] dark:text-[#ecff00]',
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
