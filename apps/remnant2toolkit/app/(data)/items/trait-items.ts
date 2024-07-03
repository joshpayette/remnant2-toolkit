import { DEFAULT_TRAIT_AMOUNT } from '../builds/constants'
import { TraitItem } from './types/TraitItem'

export const traitItems: TraitItem[] = [
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 0,
    name: 'Affliction',
    imagePath: '/remnant2/items/traits/affliction.png',
    saveFileSlug: 'Trait_Affliction_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 1,
    name: 'Ammo Reserves',
    imagePath: '/remnant2/items/traits/ammoreserves.png',
    saveFileSlug: 'Trait_AmmoReserves_C',
    id: 'wu3w8t',
    dlc: 'base',
    tags: ['Ammo Reserves'],
    description:
      'Increases Ammo Reserves by 5% - 50%.\n\nGUNSLINGER Archetype Trait',
    wikiLinks: [`https://remnant.wiki/Ammo_Reserves`],
    location: { world: 'Any', dungeon: 'Linked Item' },
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 18,
    name: 'Amplitude',
    imagePath: '/remnant2/items/traits/amplitude.png',
    saveFileSlug: 'Trait_Amplitude_C',
    id: 'pb5neu',
    dlc: 'base',
    description: 'Increases AOE and AURA Size by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Amplitude`],
    location: { world: 'Labyrinth', dungeon: ['Labyrinth'] },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 19,
    name: 'Arcane Strike',
    imagePath: '/remnant2/items/traits/arcanestrike.png',
    saveFileSlug: 'Trait_ArcaneStrike_C',
    id: '6o5ckl',
    dlc: 'base',
    tags: ['Mod Power', 'Melee Damage'],
    description: 'Increases Mod Power Generation from Melee Damage by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Arcane_Strike`],
    location: { world: 'Losomn', dungeon: [`Harvester's Reach`] },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 20,
    name: 'Barkskin',
    imagePath: '/remnant2/items/traits/barkskin.png',
    saveFileSlug: 'Trait_Barkskin_C',
    id: '2vgobq',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description: 'Reduces all incoming damage by 1 - 10%.',
    wikiLinks: [`https://remnant.wiki/Barkskin`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Yaesha', dungeon: ['Dappled Glade'] },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 21,
    name: 'Blood Bond',
    imagePath: '/remnant2/items/traits/bloodbond.png',
    saveFileSlug: 'Trait_BloodBond_C',
    id: '1ke6u2',
    dlc: 'base',
    tags: ['Summon', 'Damage Reduction'],
    description:
      'Summoner Minions absorb 1 - 10% of damage taken by the caster.',
    wikiLinks: [`https://remnant.wiki/Blood_Bond`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Yaesha', dungeon: ['Root Nexus'] },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 22,
    name: 'Bloodstream',
    imagePath: '/remnant2/items/traits/bloodstream.png',
    saveFileSlug: 'Trait_Bloodstream_C',
    id: 'yvttbq',
    dlc: 'base',
    tags: ['Grey Health'],
    description: 'Increases Grey Health Regeneration by 0.3/s - 3.',
    wikiLinks: [`https://remnant.wiki/Bloodstream`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Yaesha', dungeon: ['Dappled Glade'] },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 23,
    name: 'Chakra',
    imagePath: '/remnant2/items/traits/chakra.png',
    saveFileSlug: 'Trait_Chakra_C',
    dlc: 'dlc2',
    id: 'k8sebP',
    tags: ['Mod Duration'],
    description: 'Increases Mod Duration by 3 - 30%.',
    wikiLinks: [`https://remnant.wiki/Chakra`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Root Earth', dungeon: ['Corrupted Harbor'] },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 24,
    name: 'Dark Pact',
    imagePath: '/remnant2/items/traits/darkpact.png',
    saveFileSlug: 'Trait_DarkPact_C',
    id: 'mjkf4t',
    dlc: 'base',
    tags: ['Grey Health'],
    description: 'Increases Grey Health Conversion Rate by 3 - 30%.',
    wikiLinks: [`https://remnant.wiki/Dark_Pact`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Losomn', dungeon: ['Forlorn Coast'] },
  },
  {
    category: 'trait',
    type: 'core',
    inGameOrder: 14,
    name: 'Endurance',
    imagePath: '/remnant2/items/traits/endurance.png',
    saveFileSlug: 'Trait_Endurance_C',
    id: 'wgzz0q',
    dlc: 'base',
    tags: ['Stamina'],
    description: 'Increases Max Stamina by 3 - 30.',
    wikiLinks: [`https://remnant.wiki/Endurance`],
    amount: DEFAULT_TRAIT_AMOUNT,
    staminaStep: 3,
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'trait',
    type: 'core',
    inGameOrder: 16,
    name: 'Expertise',
    imagePath: '/remnant2/items/traits/expertise.png',
    saveFileSlug: 'Trait_Expertise_C',
    id: '6kxk5x',
    dlc: 'base',
    tags: ['Reduce Skill Cooldown'],
    description: 'Reduces Skill Cooldowns by 2% - 20%.',
    wikiLinks: [`https://remnant.wiki/Expertise`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 25,
    name: 'Fitness',
    imagePath: '/remnant2/items/traits/fitness.png',
    saveFileSlug: 'Trait_Fitness_C',
    id: 'qcvmt0',
    dlc: 'base',
    tags: ['Neutral Dodge', 'Perfect Dodge', 'Perfect Neutral Evade'],
    description: 'Increases Evade Distance by 3 - 30%.',
    wikiLinks: [`https://remnant.wiki/Fitness`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: `N'Erud`, dungeon: ['Vault of the Formless'] },
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 2,
    name: 'Flash Caster',
    imagePath: '/remnant2/items/traits/flashcaster.png',
    saveFileSlug: 'Trait_FlashCaster_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 26,
    name: 'Footwork',
    imagePath: '/remnant2/items/traits/footwork.png',
    saveFileSlug: 'Trait_Footwork_C',
    id: 'ay1dkh',
    dlc: 'base',
    tags: ['Movement Speed'],
    description: 'Increases Movement Speed while Aiming by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Footwork`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: `N'Erud`, dungeon: [`Terminus Station`] },
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 3,
    name: 'Fortify',
    imagePath: '/remnant2/items/traits/fortify.png',
    saveFileSlug: 'Trait_Fortify_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    armorStepPercent: 0.05,
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 4,
    name: 'Gifted',
    imagePath: '/remnant2/items/traits/gifted.png',
    saveFileSlug: 'Trait_Gifted_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 27,
    name: 'Glutton',
    imagePath: '/remnant2/items/traits/glutton.png',
    saveFileSlug: 'Trait_Glutton_C',
    id: 'cvsois',
    dlc: 'base',
    tags: ['Relic Use Speed'],
    description:
      'Increases the Use Speed of Consumables and Relics by 3.5% - 35%.',
    wikiLinks: [`https://remnant.wiki/Glutton`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Losomn', dungeon: ['The Great Hall'] },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 28,
    name: 'Handling',
    imagePath: '/remnant2/items/traits/handling.png',
    saveFileSlug: 'Trait_Handling_C',
    id: '8baa52',
    dlc: 'base',
    tags: ['Spread', 'Recoil'],
    description: 'Reduces Weapon Spread and Recoil by 3% - 30%.',
    wikiLinks: [`https://remnant.wiki/Handling`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Root Earth', dungeon: ['Ashen Wasteland'] },
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 5,
    name: 'Kinship',
    imagePath: '/remnant2/items/traits/kinship.png',
    saveFileSlug: 'Trait_Kinship_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 29,
    name: 'Leech',
    imagePath: '/remnant2/items/traits/leech.png',
    saveFileSlug: 'Trait_Leech_C',
    id: 'o6mx3t',
    dlc: 'dlc2',
    tags: ['Lifesteal'],
    description: 'Increases Lifesteal Efficacy by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Leech`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: `N'Erud`, dungeon: [`Dormant N'Erudian Facility`] },
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 6,
    name: 'Longshot',
    imagePath: '/remnant2/items/traits/longshot.png',
    saveFileSlug: 'Trait_Longshot_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 7,
    name: 'Potency',
    imagePath: '/remnant2/items/traits/potency.png',
    saveFileSlug: 'Trait_Potency_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 30,
    name: 'Recovery',
    imagePath: '/remnant2/items/traits/recovery.png',
    saveFileSlug: 'Trait_Recovery_C',
    id: '7z3ejv',
    dlc: 'base',
    tags: ['Stamina'],
    description: 'Increases Stamina Regen by 3 - 30/s.',
    wikiLinks: [`https://remnant.wiki/Recovery`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Losomn', dungeon: [`Oracle's Refuge`] },
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 8,
    name: 'Regrowth',
    imagePath: '/remnant2/items/traits/regrowth.png',
    saveFileSlug: 'Trait_Regrowth_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 31,
    name: 'Resolute',
    imagePath: '/remnant2/items/traits/resolute.png',
    saveFileSlug: 'Trait_Resolute_C',
    id: '7z3ejd',
    dlc: 'base',
    tags: ['Stagger'],
    description: 'Reduces Hit Reaction Time by 2.5% - 25%.',
    wikiLinks: [`https://remnant.wiki/Resolute`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Yaesha', dungeon: 'Quest' },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 32,
    name: 'Revivalist',
    imagePath: '/remnant2/items/traits/revivalist.png',
    saveFileSlug: 'Trait_Revivalist_C',
    id: 'a4idgl',
    dlc: 'base',
    description:
      'Increases the speed of Reviving and being Revived by 5 - 50%.',
    wikiLinks: [`https://remnant.wiki/Revivalist`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Any', dungeon: 'Quest' },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 33,
    name: 'Rugged',
    imagePath: '/remnant2/items/traits/rugged.png',
    saveFileSlug: 'Trait_Rugged_C',
    id: 'ykxzf1',
    dlc: 'base',
    tags: ['Summon'],
    description: 'Increases the Health of Archetype Summons by a 10% - 100% .',
    wikiLinks: [`https://remnant.wiki/Rugged`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Yaesha', dungeon: ['Forgotten Field'] },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 17,
    name: 'Scholar',
    imagePath: '/remnant2/items/traits/scholar.png',
    saveFileSlug: 'Trait_Scholar_C',
    id: '6j7cn1',
    dlc: 'base',
    description: 'Increases Experience Gain by 1 - 15%.',
    wikiLinks: [`https://remnant.wiki/Scholar`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Root Earth', dungeon: ['Blackened Citadel'] },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 34,
    name: 'Shadeskin',
    imagePath: '/remnant2/items/traits/shadeskin.png',
    saveFileSlug: 'Trait_Shadeskin_C',
    id: 'jk0ot9',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description: 'Increases Elemental Damage Resistance by 2 - 20%.',
    wikiLinks: [`https://remnant.wiki/Shadeskin`],
    // Increases by 2% per level, but since 10 fire resistance is 10%
    // we add the percentage
    elementalResistanceStep: 2,
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Losomn', dungeon: [`Butcher's Quarter`] },
  },
  {
    category: 'trait',
    type: 'trait',
    inGameOrder: 35,
    name: 'Siphoner',
    imagePath: '/remnant2/items/traits/siphoner.png',
    saveFileSlug: 'Trait_Siphoner_C',
    id: 'x9umnf',
    dlc: 'base',
    tags: ['Lifesteal'],
    description: 'Grants 0.3% - 3.0% base damage as Lifesteal.',
    wikiLinks: [`https://remnant.wiki/Siphoner`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: `N'Erud`, dungeon: [`Dormant N'Erudian Facility`] },
  },
  {
    category: 'trait',
    type: 'core',
    inGameOrder: 15,
    name: 'Spirit',
    imagePath: '/remnant2/items/traits/spirit.png',
    saveFileSlug: 'Trait_Spirit_C',
    id: 'p4b2v6',
    dlc: 'base',
    tags: ['Mod Power'],
    description: 'Increases Mod Power Generation by 2% - 20%.',
    wikiLinks: [`https://remnant.wiki/Spirit`],
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 9,
    name: 'Strong Back',
    imagePath: '/remnant2/items/traits/strongback.png',
    saveFileSlug: 'Trait_StrongBack_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    weightThresholds: [1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5, 15],
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 10,
    name: 'Swiftness',
    imagePath: '/remnant2/items/traits/swiftness.png',
    saveFileSlug: 'Trait_Swiftness_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'archetype',
    inGameOrder: 11,
    name: 'Triage',
    imagePath: '/remnant2/items/traits/triage.png',
    saveFileSlug: 'Trait_Triage_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'archetype',
    name: 'Untouchable',
    inGameOrder: 12,
    imagePath: '/remnant2/items/traits/untouchable.png',
    saveFileSlug: 'Trait_Untouchable_C',
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
    location: { world: 'Any', dungeon: 'Linked Item' },
    amount: DEFAULT_TRAIT_AMOUNT,
  },
  {
    category: 'trait',
    type: 'core',
    inGameOrder: 13,
    name: 'Vigor',
    imagePath: '/remnant2/items/traits/vigor.png',
    saveFileSlug: 'Trait_Vigor_C',
    id: 'o6mx2t',
    dlc: 'base',
    tags: ['Health'],
    description: 'Increases Max Health by 3 - 30.',
    wikiLinks: [`https://remnant.wiki/Vigor`],
    healthStep: 3,
    amount: DEFAULT_TRAIT_AMOUNT,
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
]
