import { DEFAULT_TRAIT_AMOUNT } from '@/app/(data)/builds/constants'

import { TraitItem } from './types/TraitItem'

export const traitItems: TraitItem[] = [
  {
    category: 'trait',
    name: 'Affliction',
    imagePath: '/trait/affliction.png',
    id: 'dj8zx4',
    dlc: 'base',
    tags: ['Status Effect', 'Status Duration'],
    description:
      'Increases STATUS EFFECT duration against enemies by 10 - 100%.\n' +
      '\n' +
      'RITUALIST Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Affliction`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Ammo Reserves',
    imagePath: '/trait/ammo_reserves.png',
    id: 'wu3w8t',
    dlc: 'base',
    tags: ['Ammo Reserves'],
    description:
      'Increases Ammo Reserves by 5% - 50%.\n\nGUNSLINGER Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Ammo_Reserves`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Amplitude',
    imagePath: '/trait/amplitude.png',
    id: 'pb5neu',
    dlc: 'base',
    description: 'Increases AOE and AURA Size by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Amplitude`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Arcane Strike',
    imagePath: '/trait/arcane_strike.png',
    id: '6o5ckl',
    dlc: 'base',
    tags: ['Mod Power', 'Melee Damage'],
    description: 'Increases Mod Power Generation from Melee Damage by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Arcane_Strike`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Barkskin',
    imagePath: '/trait/barkskin.png',
    id: '2vgobq',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description: 'Reduces all incoming damage by 1 - 10%.',
    wikiLinks: [`https://remnant.wiki/Barkskin`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Blood Bond',
    imagePath: '/trait/blood_bond.png',
    id: '1ke6u2',
    dlc: 'base',
    tags: ['Summon', 'Damage Reduction'],
    description:
      'Summoner Minions absorb 1 - 10% of damage taken by the caster.',
    wikiLinks: [`https://remnant.wiki/Blood_Bond`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Bloodstream',
    imagePath: '/trait/bloodstream.png',
    id: 'yvttbq',
    dlc: 'base',
    tags: ['Grey Health'],
    description: 'Increases Grey Health Regeneration by 0.3/s - 3.',
    wikiLinks: [`https://remnant.wiki/Bloodstream`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Chakra',
    imagePath: '/trait/chakra.png',
    dlc: 'dlc2',
    id: 'k8sebP',
    tags: ['Mod Duration'],
    description: 'Increases Mod Duration by 3 - 30%.',
    wikiLinks: [`https://remnant.wiki/Chakra`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Dark Pact',
    imagePath: '/trait/dark_pact.png',
    id: 'mjkf4t',
    dlc: 'base',
    tags: ['Grey Health'],
    description: 'Increases Grey Health Conversion Rate by 3 - 30%.',
    wikiLinks: [`https://remnant.wiki/Dark_Pact`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Endurance',
    imagePath: '/trait/endurance.png',
    id: 'wgzz0q',
    dlc: 'base',
    tags: ['Stamina'],
    description: 'Increases Max Stamina by 3 - 30.',
    wikiLinks: [`https://remnant.wiki/Endurance`],
    amount: DEFAULT_TRAIT_AMOUNT,
    staminaStep: 3,
  },
  {
    category: 'trait',
    name: 'Expertise',
    imagePath: '/trait/expertise.png',
    id: '6kxk5x',
    dlc: 'base',
    tags: ['Reduce Skill Cooldown'],
    description: 'Reduces Skill Cooldowns by 2% - 20%.',
    wikiLinks: [`https://remnant.wiki/Expertise`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Fitness',
    imagePath: '/trait/fitness.png',
    id: 'qcvmt0',
    dlc: 'base',
    tags: ['Neutral Dodge', 'Perfect Dodge', 'Perfect Neutral Evade'],
    description: 'Increases Evade Distance by 3 - 30%.',
    wikiLinks: [`https://remnant.wiki/Fitness`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Flash Caster',
    imagePath: '/trait/flash_caster.png',
    id: 'm6i4dl',
    dlc: 'base',
    tags: ['Mod Cast Speed', 'Skill Cast Speed'],
    description:
      'Increases Mod and Skill Casting Speed by 5 - 50%.\n' +
      '\n' +
      'ARCHON Archetype Trait.',
    wikiLinks: [`https://remnant.wiki/Flash_Caster`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Footwork',
    imagePath: '/trait/footwork.png',
    id: 'ay1dkh',
    dlc: 'base',
    tags: ['Movement Speed'],
    description: 'Increases Movement Speed while Aiming by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Footwork`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Fortify',
    imagePath: '/trait/fortify.png',
    id: 'osj7se',
    dlc: 'base',
    tags: ['Armor Increase', 'Damage Reduction'],
    description:
      'Increases Armor Effectiveness by 5% - 50%.\n\nENGINEER Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Fortify`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
    armorStepPercent: 0.05,
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Gifted',
    imagePath: '/trait/gifted.png',
    id: 'c9af3B',
    dlc: 'dlc2',
    tags: ['Skill Duration'],
    description: 'Increases Skill Duration by 30%.\n\nINVOKER Archetype Trait',
    wikiLinks: ['https://remnant.wiki/Gifted'],
    amount: DEFAULT_TRAIT_AMOUNT,
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'trait',
    name: 'Glutton',
    imagePath: '/trait/glutton.png',
    id: 'cvsois',
    dlc: 'base',
    tags: ['Relic Use Speed'],
    description:
      'Increases the Use Speed of Consumables and Relics by 3.5% - 35%.',
    wikiLinks: [`https://remnant.wiki/Glutton`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Handling',
    imagePath: '/trait/handling.png',
    id: '8baa52',
    dlc: 'base',
    tags: ['Spread', 'Recoil'],
    description: 'Reduces Weapon Spread and Recoil by 3% - 30%.',
    wikiLinks: [`https://remnant.wiki/Handling`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Kinship',
    imagePath: '/trait/kinship.png',
    id: 'vn3gsg',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Reduces Friendly Fire Damage Dealt and Received by 8% - 80%.\n' +
      '\n' +
      'HANDLER Archetype Trait.',
    wikiLinks: [`https://remnant.wiki/Kinship`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Leech',
    imagePath: '/trait/leech.png',
    id: 'o6mx3t',
    dlc: 'dlc2',
    tags: ['Lifesteal'],
    description: 'Increases Lifesteal Efficacy by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Leech`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Longshot',
    imagePath: '/trait/longshot.png',
    id: '157qcj',
    dlc: 'base',
    tags: ['Range'],
    description:
      'Increases Weapon Ideal Range by 0.6m - 6m.\n\nHUNTER Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Longshot`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Potency',
    imagePath: '/trait/potency.png',
    id: 'v1uiyd',
    dlc: 'base',
    tags: ['Concoction'],
    description:
      'Increases Consumable Duration by 10% - 100%.\n\nALCHEMIST Archetype Trait.',
    wikiLinks: [`https://remnant.wiki/Potency`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Recovery',
    imagePath: '/trait/recovery.png',
    id: '7z3ejv',
    dlc: 'base',
    tags: ['Stamina'],
    description: 'Increases Stamina Regen by 3 - 30/s.',
    wikiLinks: [`https://remnant.wiki/Recovery`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Regrowth',
    imagePath: '/trait/regrowth.png',
    id: 'ysp1wu',
    dlc: 'base',
    tags: ['Health'],
    description:
      'Increases Health Regeneration by 0.15/s - 1.5/s.\n' +
      '\n' +
      'SUMMONER Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Regrowth`],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Resolute',
    imagePath: '/trait/resolute.png',
    id: '7z3ejd',
    dlc: 'base',
    tags: ['Stagger'],
    description: 'Reduces Hit Reaction Time by 2.5% - 25%.',
    wikiLinks: [`https://remnant.wiki/Resolute`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Revivalist',
    imagePath: '/trait/revivalist.png',
    id: 'a4idgl',
    dlc: 'base',
    description:
      'Increases the speed of Reviving and being Revived by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Revivalist`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Rugged',
    imagePath: '/trait/rugged.png',
    id: 'ykxzf1',
    dlc: 'base',
    tags: ['Summon'],
    description: 'Increases the Health of Archetype Summons by a 10% - 100% .',
    wikiLinks: [`https://remnant.wiki/Rugged`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Scholar',
    imagePath: '/trait/scholar.png',
    id: '6j7cn1',
    dlc: 'base',
    description: 'Increases Experience Gain by 1 - 15%.',
    wikiLinks: [`https://remnant.wiki/Scholar`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Shadeskin',
    imagePath: '/trait/shadeskin.png',
    id: 'jk0ot9',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description: 'Increases Elemental Damage Resistance by 2 - 20%.',
    wikiLinks: [`https://remnant.wiki/Shadeskin`],
    // Increases by 2% per level, but since 10 fire resistance is 10%
    // we add the percentage
    elementalResistanceStep: 2,
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Siphoner',
    imagePath: '/trait/siphoner.png',
    id: 'x9umnf',
    dlc: 'base',
    tags: ['Lifesteal'],
    description: 'Grants 0.3% - 3.0% base damage as Lifesteal.',
    wikiLinks: [`https://remnant.wiki/Siphoner`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Spirit',
    imagePath: '/trait/spirit.png',
    id: 'p4b2v6',
    dlc: 'base',
    tags: ['Mod Power'],
    description: 'Increases Mod Power Generation by 2% - 20%.',
    wikiLinks: [`https://remnant.wiki/Spirit`],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Strong Back',
    imagePath: '/trait/strong_back.png',
    id: 'sd2hry',
    dlc: 'base',
    tags: ['Neutral Dodge', 'Perfect Dodge', 'Perfect Neutral Evade'],
    description:
      'Increases Dodge Weight Threshold by 1.5 - 15.\n' +
      '\n' +
      'CHALLENGER Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Strong_Back`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
    weightThresholds: [1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Swiftness',
    imagePath: '/trait/swiftness.png',
    id: '3ochlm',
    dlc: 'base',
    tags: ['Movement Speed'],
    description:
      'Increases Movement Speed by 1% - 15%.\n' +
      '\n' +
      'Increases Environmental Movement Speed by 5% - 50%.\n' +
      '\n' +
      '(Vaulting, Ladders, Wading)\n' +
      '\n' +
      'EXPLORER Archetype Trait.',
    wikiLinks: [`https://remnant.wiki/Swiftness`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Triage',
    imagePath: '/trait/triage.png',
    id: 'pbak5a',
    dlc: 'base',
    tags: ['Heal', 'Healing Effectiveness'],
    description: 'Increases Healing by 5% - 50%.\n\nMEDIC Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Triage`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Untouchable',
    imagePath: '/trait/untouchable.png',
    id: 'pkmmg6',
    dlc: 'base',
    tags: ['Neutral Dodge', 'Perfect Dodge', 'Perfect Neutral Evade'],
    description:
      'Increases Evade Window by 3% - 30%.\n\nINVADER Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Untouchable`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    name: 'Vigor',
    imagePath: '/trait/vigor.png',
    id: 'o6mx2t',
    dlc: 'base',
    tags: ['Health'],
    description: 'Increases Max Health by 3 - 30.',
    wikiLinks: [`https://remnant.wiki/Vigor`],
    healthStep: 3,
    amount: DEFAULT_TRAIT_AMOUNT,
  },
]
