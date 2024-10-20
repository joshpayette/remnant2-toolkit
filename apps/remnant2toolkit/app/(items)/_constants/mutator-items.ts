import { type MutatorItem } from '@/app/(items)/_types/mutator-item';

export const mutatorItems: MutatorItem[] = [
  {
    category: 'mutator',
    name: 'Bandit',
    type: 'gun',
    imagePath: '/items/mutators/bandit.png',
    saveFileSlug: 'MetaGem_Bandit_C',
    id: 'f9tqot',
    dlc: 'base',
    tags: ['Ammo Reserves', 'Fire Rate'],
    description:
      'On hit, grants a 10% - 30% chance to return spent Ammo directly into the magazine of this weapon.\n\nBows: On hit, grants a 10% - 30% chance to return spent Ammo back into the reserves of this weapon.',
    maxLevelBonus:
      'When Ammo is returned to this weapon, it gains 10% increased Fire Rate for 3s. Duration can increase up to 10s.',
    wikiLinks: [`https://remnant.wiki/Bandit_(Mutator)`],
    location: {
      world: 'Yaesha',
      biome: 'Floating Forests',
      injectable: 'Broken Tomb',
    },
  },
  {
    category: 'mutator',
    name: 'Battle Mage',
    type: 'melee',
    imagePath: '/items/mutators/battle_mage.png',
    saveFileSlug: 'MetaGem_BattleMage_C',
    dlc: 'base',
    id: 'y5hY8J',
    tags: ['Mod Power', 'Melee Damage'],
    description:
      'Skill activation grants Mage Strike for 10s, increasing Melee Mod Generation by 25% - 50%.',
    maxLevelBonus: 'Mage Strike also increases Melee Damage by 15%.',
    wikiLinks: [`https://remnant.wiki/Battle_Mage`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Battery',
    type: 'gun',
    imagePath: '/items/mutators/battery.png',
    saveFileSlug: 'MetaGem_Battery_C',
    id: 'n5zhws',
    dlc: 'base',
    tags: ['Weakspot Damage'],
    description:
      "Increases Weakspot Damage by 10% - 20% for every 400 Mod Power Spent by the attached weapon's mod. Max 3 stacks. Lasts 10s.",
    maxLevelBonus: `At Max Stacks, gain 10% Critical Chance on Weakspot Hits.`,
    wikiLinks: [`https://remnant.wiki/Battery`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Bottom Heavy',
    type: 'gun',
    imagePath: '/items/mutators/bottom_heavy.png',
    saveFileSlug: 'MetaGem_Bottomheavy_C',
    id: '8lg493',
    dlc: 'base',
    tags: ['Fire Rate', 'Reload Speed'],
    description: `Grants 7% Fire Rate. Increases 1% - 2% for every 10% of Magazine missing.`,
    maxLevelBonus: `Reload Speed is increased by 1.5% per 10% Magazine missing.`,
    wikiLinks: [`https://remnant.wiki/Bottom_Heavy`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Bulletweaver',
    type: 'gun',
    imagePath: '/items/mutators/bulletweaver.png',
    saveFileSlug: 'MetaGem_Bulletweaver_C',
    id: 'cr22cp',
    dlc: 'base',
    tags: ['Fire Rate', 'Mod Power'],
    description:
      'Mod use increases Fire Rate of this weapon by 10% - 20%  for 15s.',
    maxLevelBonus: 'Increases Mod Generation for this weapon by 15%.',
    wikiLinks: [`https://remnant.wiki/Bulletweaver`],
    location: { world: 'Yaesha', biome: 'Ziggurats', injectable: 'Library' },
  },
  {
    category: 'mutator',
    name: 'Charged Wounds',
    type: 'gun',
    imagePath: '/items/mutators/chargedwounds.png',
    saveFileSlug: 'MetaGem_ChargedWounds_C', // TODO Check
    id: '77hc49',
    dlc: 'dlc3',
    tags: [],
    description: `Increases this weapon's Fire Rate and Reload Speed by 2.5% → 5% per OVERLOADED entity within 15m. Max 5 stacks.`,
    maxLevelBonus: `This weapon's Ranged Weakspot and Ranged Critical Hits apply OVERLOADED, dealing 75 → 225 SHOCK damage over 10s.`,
    wikiLinks: [`https://remnant.wiki/Charged_Wounds`],
    location: { world: `N'Erud`, dungeon: 'Quest' },
  },
  {
    category: 'mutator',
    name: 'Deadly Calm',
    type: 'gun',
    imagePath: '/items/mutators/deadly_calm.png',
    saveFileSlug: 'MetaGem_DeadlyCalm_C',
    id: 'ssvo08',
    dlc: 'base',
    tags: ['Ranged Damage', 'Critical Chance'],
    description: `Continuously Aiming increases Ranged Damage by up to 10% - 25% over 3s.`,
    maxLevelBonus: `Ranged Critical Hit Chance increased by 10%.`,
    wikiLinks: [`https://remnant.wiki/Deadly_Calm`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Dervish',
    type: 'melee',
    imagePath: '/items/mutators/dervish.png',
    saveFileSlug: 'MetaGem_Dervish_C',
    id: '9htayl',
    dlc: 'base',
    tags: ['Reduce Skill Cooldown', 'Melee Damage'],
    description: `Increases Melee Damage by 20% - 40% for 10s when activating a Skill.`,
    maxLevelBonus: `After dealing 350 base Melee damage, reduce Skill Cooldowns by 3%.`,
    wikiLinks: [`https://remnant.wiki/Dervish`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Detonator',
    type: 'gun',
    imagePath: '/items/mutators/detonator.png',
    saveFileSlug: 'MetaGem_Detonator_C', // TODO Check
    id: 'fgs17j',
    dlc: 'dlc3',
    tags: [],
    externalTokens: ['Explosive Damage', 'AOE/Aura'],
    description:
      "Each 10% of this weapon's magazine spent, cause an explosion for 5->10 Explosive Damage to targets within 0.5m of impact location.",
    maxLevelBonus: `Increases this weapon's explosive damage by 20%.`,
    wikiLinks: [`https://remnant.wiki/Detonator`],
    location: { world: `N'Erud`, dungeon: ['Agronomy Sector'] },
  },
  {
    category: 'mutator',
    name: 'Disengage',
    type: 'melee',
    imagePath: '/items/mutators/disengage.png',
    saveFileSlug: 'MetaGem_Disengage_C',
    id: '3kadzw',
    dlc: 'base',
    tags: ['Neutral Dodge', 'Perfect Neutral Evade'],
    description: `Melee Strikes increase the damage of the next Backdash Evade Attack by 5% - 15%. Max 3 Stacks. Lasts 7.5s.`,
    maxLevelBonus: 'Perfect Neutral Evades grant 3 stacks.',
    wikiLinks: [`https://remnant.wiki/Disengage`],
    location: {
      world: `N'Erud`,
      biome: `N'Erud Underworld`,
      injectable: 'Store Room',
    },
  },
  {
    category: 'mutator',
    name: 'Dreadful',
    type: 'gun',
    imagePath: '/items/mutators/dreadful.png',
    saveFileSlug: 'MetaGem_Dreadful_C',
    dlc: 'dlc1',
    id: 'zcqbti',
    tags: ['Ranged Damage', 'Grey Health', 'Reload Speed'],
    description: `Increases Ranged Damage by 1% - 2% for every 5% of total Health present as Grey Health. Max 20% increase.`,
    maxLevelBonus: `Increases Reload Speed for this weapon by 25% while Grey Health is present.`,
    wikiLinks: [`https://remnant.wiki/Dreadful`],
    location: { world: 'Losomn', dungeon: ['Forlorn Coast'] },
  },
  {
    category: 'mutator',
    name: 'Edgelord',
    type: 'melee',
    imagePath: '/items/mutators/edgelord.png',
    saveFileSlug: 'MetaGem_Edgelord_C',
    id: 'mpxowx',
    dlc: 'base',
    tags: [
      'Melee Charge Speed',
      'Melee Attack Speed',
      'Charged Melee',
      'Lifesteal',
    ],
    description:
      'Increases Melee Charge Speed by 15% - 35% and Melee Attack Speed by 10%.',
    maxLevelBonus: `Gain 3% of based Charged Melee Damage dealt as Lifesteal.`,
    wikiLinks: [`https://remnant.wiki/Edgelord`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Executor',
    type: 'melee',
    imagePath: '/items/mutators/executor.png',
    saveFileSlug: 'MetaGem_Executor_C',
    dlc: 'dlc1',
    id: 'pynv5l',
    tags: ['Status Effect', 'Melee Charge Speed', 'Melee Attack Speed'],
    description: `Charged Melee Attacks increase the duration of Negative Status Effects on enemies by 10% - 30% of the original duration. Cannot exceed original max duration.`,
    maxLevelBonus: `Increases Melee Charge Speed and Melee Attack Speed by 5% per entity within 20m with a Negative Status Effect. Max 4 stacks.`,
    wikiLinks: [`https://remnant.wiki/Executor`],
    location: { world: 'Losomn', dungeon: ['Forlorn Coast'] },
  },
  {
    category: 'mutator',
    name: 'Extender',
    type: 'gun',
    imagePath: '/items/mutators/extender.png',
    saveFileSlug: 'MetaGem_Extender_C',
    id: 'pszxmh',
    dlc: 'base',
    tags: ['Magazine Capacity', 'Reload Speed'],
    description:
      'Increases Magazine Capacity of this weapon by 20% - 45%.\n\nBows: Increases Reserve Size of this weapon by 20% - 45%.',
    maxLevelBonus: 'Increases Reload Speed of this weapon by 20%.',
    wikiLinks: [`https://remnant.wiki/Extender`],
    location: {
      world: 'Yaesha',
      biome: 'Undead Tombs',
      injectable: 'Sarcophagus',
    },
  },
  {
    category: 'mutator',
    name: 'Failsafe',
    type: 'gun',
    imagePath: '/items/mutators/failsafe.png',
    saveFileSlug: 'MetaGem_Failsafe_C',
    id: '0xx8tz',
    dlc: 'base',
    tags: ['Mod Damage'],
    description: 'Attached Mod deals 10% - 25% additional Mod Damage.',
    maxLevelBonus: `Attached Mod use gains a 15% chance to not consume charge.`,
    wikiLinks: [`https://remnant.wiki/Failsafe`],
    location: { world: `N'Erud`, dungeon: [`Dormant N'Erudian Facility`] },
  },
  {
    category: 'mutator',
    name: 'Far-Sighted',
    type: 'gun',
    imagePath: '/items/mutators/far-sighted.png',
    saveFileSlug: 'MetaGem_Farsighted.MetaGem_Farsighted_C',
    id: 'QJdhx2',
    dlc: 'dlc2',
    tags: ['Ranged Damage'],
    description:
      'Increases Ranged Damage of this weapon by 1.25% - 2.5% for every 2.5m from the shooter to the target. Max 25%.',
    maxLevelBonus:
      "Increases this weapon's Ideal, Falloff, and Max Range by 5m.",
    wikiLinks: [`https://remnant.wiki/Far-Sighted`],
    location: { world: 'Yaesha', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Feedback',
    type: 'gun',
    imagePath: '/items/mutators/feedback.png',
    saveFileSlug: 'MetaGem_Feedback_C',
    id: '75qok3',
    dlc: 'base',
    tags: ['Mod Power', 'Mod Damage'],
    description:
      "Using this weapon's Mod generates 10% - 20% of single charge value as passive Mod Power over 10s. Does not stack.",
    maxLevelBonus:
      'Mod Damage generates 15% of Base Damage dealt as Mod Power.',
    wikiLinks: [`https://remnant.wiki/Feedback`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Fetid Wounds',
    type: 'gun',
    imagePath: '/items/mutators/fetid_wounds.png',
    saveFileSlug: 'MetaGem_FetidWounds_C',
    id: 'b07g02',
    dlc: 'base',
    tags: [
      'Critical Chance',
      'Status Effect',
      'Weakspot Damage',
      'Critical Hit',
    ],
    description:
      'Increases Critical Chance of this weapon by 1% - 3% per unique Negative Status Effect on the enemy. Max 15% increase.',
    maxLevelBonus: `This weapon's Ranged Weakspot and Ranged Critical Hits apply CORRODED, dealing 75 CORROSIVE damage over 10s.`,
    wikiLinks: [`https://remnant.wiki/Fetid_Wounds`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Ghost Shell',
    type: 'gun',
    imagePath: '/items/mutators/ghost_shell.png',
    saveFileSlug: 'MetaGem_GhostShell_C',
    id: '85c7yj',
    dlc: 'base',
    tags: ['Weakspot Hit', 'Weakspot Damage', 'Weakspot Critical Chance'],
    description:
      'Every 3rd consecutive Weakspot Hits deals 20% - 40% additional damage.',
    maxLevelBonus: `Increases Weakspot Critical Chance by 15%.`,
    wikiLinks: [`https://remnant.wiki/Ghost_Shell`],
    location: { world: 'Yaesha', dungeon: 'Quest' },
  },
  {
    category: 'mutator',
    name: 'Gladiator',
    type: 'melee',
    imagePath: '/items/mutators/gladiator.png',
    saveFileSlug: 'MetaGem_Gladiator.MetaGem_Gladiator_C',
    id: 'N4LpPR',
    dlc: 'dlc2',
    tags: [], // TODO Add tags
    description:
      'While brandishing a Melee Weapon, receiving Enemy Damage increases Melee Damage by 25% - 50% for 5s.',
    maxLevelBonus:
      'Receiving Enemy Damage while brandishing a Melee Weapon grants 1 stack of BULWARK for 5s.',
    wikiLinks: [`https://remnant.wiki/Gladiator`],
    location: { world: 'Yaesha', dungeon: ['Proving Grounds'] },
  },
  {
    category: 'mutator',
    name: 'Guts',
    type: 'melee',
    imagePath: '/items/mutators/guts.png',
    saveFileSlug: 'MetaGem_Guts_C',
    dlc: 'dlc1',
    id: '961d6v',
    tags: ['Melee Critical Chance', 'Grey Health'],
    description:
      'Increases Melee Critical Chance by 5% - 25% when Grey Health is present.',
    maxLevelBonus: `Increases Melee Critical Damage by 0.5% for every 1% of Grey Health.`,
    wikiLinks: [`https://remnant.wiki/Guts`],
    location: { world: 'Losomn', dungeon: ['The Forgotten Commune'] },
  },
  {
    category: 'mutator',
    name: 'Harmonizer',
    type: 'gun',
    imagePath: '/items/mutators/harmonizer.png',
    saveFileSlug: 'MetaGem_Harmonizer_C',
    id: 'jyl055',
    dlc: 'base',
    tags: ['Mod Damage', 'Mod Power'],
    description: 'Attached Mod deals 10% - 20% additional Mod Damage.',
    maxLevelBonus: `Generate 25% additional Mod Power for Stowed Weapon.`,
    wikiLinks: [`https://remnant.wiki/Harmonizer`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Hidden Power',
    type: 'gun',
    imagePath: '/items/mutators/hiddenpower.png',
    saveFileSlug: 'MetaGem_HiddenPower_C', // TODO Check
    id: '9154v1',
    dlc: 'dlc3',
    tags: ['Ranged Damage', 'Reload Speed'],
    description:
      "Increases the attached weapon's Ranged Damage by 15% → 25% after being stowed for 2s. Lasts 7s upon being brandished.",
    maxLevelBonus: `Automatically reloads the attached weapon after being stowed for 2s.`,
    wikiLinks: [`https://remnant.wiki/Hidden_Power`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Hyper Charger',
    type: 'melee',
    imagePath: '/items/mutators/hyper_charger.png',
    saveFileSlug: 'MetaGem_HyperCharger_C', // TODO Check
    id: 'mh4scd',
    dlc: 'dlc3',
    tags: [],
    description:
      'Increases Charged Melee Stamina Cost by 65%. Increases Charged Melee Damage by 25% → 50%.',
    maxLevelBonus:
      'Charged Melee Hits increase Stamina Recovery Rate by 100% for 3s.',
    wikiLinks: [`https://remnant.wiki/Hyper_Charger`],
    location: { world: `N'Erud`, dungeon: ['Logistics Bridge'] },
  },
  {
    category: 'mutator',
    name: 'Ingenuity',
    type: 'gun',
    imagePath: '/items/mutators/ingenuity.png',
    saveFileSlug: 'MetaGem_Ingenuity_C',
    id: 'mkbquc',
    dlc: 'base',
    tags: ['Heat Generation', 'Reload Speed'],
    description: 'Reduces the Heat Generation of this weapon by 10% - 30%.',
    maxLevelBonus: `Reload Speed is increased up to 55% based on this weapon's Heat accumulation.`,
    wikiLinks: [`https://remnant.wiki/Ingenuity`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Insulator',
    type: 'gun',
    imagePath: '/items/mutators/insulator.png',
    saveFileSlug: 'MetaGem_Insulator_C', // TODO Check
    id: '9x521w',
    dlc: 'dlc3',
    tags: [],
    description:
      "Spending 20% - 10% of this weapon's magazine grants a SHIELD for 5% of Max Health for 10s. Max 25% SHIELD.",
    maxLevelBonus:
      'Increases Ranged Critical Chance for this weapon by 10% when SHIELD is above 10% of Max Health.',
    wikiLinks: [`https://remnant.wiki/Insulator`],
    location: { world: `N'Erud`, dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Kill Switch',
    type: 'gun',
    imagePath: '/items/mutators/kill_switch.png',
    saveFileSlug: 'MetaGem_Killswitch_C',
    id: 'rzfptj',
    dlc: 'base',
    description:
      'Switching to this weapon creates an Explosive Burst which deals 50 - 250 Damage to all enemies within 7m.\n\nCan only happen once every 10s.',
    maxLevelBonus:
      "This weapon's kills with any Explosive Damage reduce Kill Switch cooldown by 1s.",
    externalTokens: [`AOE/Aura`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Kill_Switch`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Latency',
    type: 'melee',
    imagePath: '/items/mutators/latency.png',
    saveFileSlug: 'MetaGem_Latency_C',
    id: 'nft2cp',
    dlc: 'base',
    tags: ['Melee Special Ability'],
    description:
      'Melee Weapons with special abilities which become readied by dealing Melee Damage require 10% - 35% less damage to charge.',
    maxLevelBonus:
      'Increases the power of readied Melee Special abilities by 25%.',
    wikiLinks: [`https://remnant.wiki/Latency`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Lithely',
    type: 'gun',
    imagePath: '/items/mutators/lithely.png',
    saveFileSlug: 'MetaGem_Lithely_C',
    id: 's2z9cc',
    dlc: 'base',
    tags: ['Reload Speed', 'Ranged Damage'],
    description:
      "Dealing 50% - 20% of the attached Weapon's Magazine Base Damage increases reload speed by 3%. Lasts 7s. Max 5 Stacks.",
    maxLevelBonus: `Reloading at Max Stacks increases Ranged Damage by 20% for 15s.`,
    wikiLinks: [`https://remnant.wiki/Lithely`],
    location: { world: 'Losomn', dungeon: [`Harvester's Reach`] },
  },
  {
    category: 'mutator',
    name: 'Maelstrom',
    type: 'gun',
    imagePath: '/items/mutators/maelstrom.png',
    saveFileSlug: 'MetaGem_Maelstrom_C',
    dlc: 'dlc1',
    id: '4m2lg1',
    tags: ['Elemental Damage', 'Status Effect', 'Mod Power'],
    description:
      "Increases this weapon's Elemental Damage by 5% - 10% for each unique Elemental Status Effect on the target.",
    maxLevelBonus: `Increases Mod Power Generation of Elemental Damage and Elemental Status damage by 20%.`,
    wikiLinks: [`https://remnant.wiki/Maelstrom`],
    location: { world: 'Losomn', dungeon: ['Forlorn Coast'] },
  },
  {
    category: 'mutator',
    name: 'Misfortune',
    type: 'melee',
    imagePath: '/items/mutators/misfortune.png',
    saveFileSlug: 'MetaGem_Misfortune_C',
    id: 'imqrfz',
    dlc: 'base',
    tags: ['Melee Damage', 'Status Effect'],
    description:
      'Increase Melee damage by 6% - 10%  for each unique Negative Status the target is suffering from.',
    maxLevelBonus: 'Charge Melee Attacks apply SLOW for 3s.',
    wikiLinks: [`https://remnant.wiki/Misfortune`],
    location: { world: 'Losomn', dungeon: ['Malefic Palace'] },
  },
  {
    category: 'mutator',
    name: 'Momentum',
    type: 'gun',
    imagePath: '/items/mutators/momentum.png',
    saveFileSlug: 'MetaGem_Momentum_C',
    id: 'cvbjvd',
    dlc: 'base',
    tags: ['Critical Hit', 'Critical Chance'],
    description:
      'When this weapon scores a Critical Hit, it increases Critical Chance and Critical Damage by 1% - 2% for 3s. Max 10 stacks.',
    maxLevelBonus: `Critical Hits from this weapon add 2 stacks. Increases duration by 2s.`,
    wikiLinks: [`https://remnant.wiki/Momentum`],
    location: { world: 'Yaesha', dungeon: ['Imperial Gardens'] },
  },
  {
    category: 'mutator',
    name: 'Near-Sighted',
    type: 'gun',
    dlc: 'dlc2',
    imagePath: '/items/mutators/near-sighted.png',
    saveFileSlug: 'MetaGem_nearsighted.MetaGem_nearsighted_C',
    id: '7Y9hfZ',
    tags: ['Ranged Damage', 'Critical Chance'],
    description:
      'Increases Ranged Damage of this weapon by 10% - 20% to enemies within 7m.',
    maxLevelBonus:
      'Increases Ranged Critical Chance of this weapon by 10% to enemies within 7m.',
    wikiLinks: [`https://remnant.wiki/Near-Sighted`],
    location: { world: 'Yaesha', dungeon: ['Infested Abyss'] },
  },
  {
    category: 'mutator',
    name: 'Opportunist',
    type: 'melee',
    imagePath: '/items/mutators/opportunist.png',
    saveFileSlug: 'MetaGem_Opportunist_C',
    id: 'qca3zh',
    dlc: 'base',
    tags: ['Perfect Dodge', 'Melee Critical Chance'],
    description:
      'Perfect Dodge activates OPPORTUNITY which increases Melee Critical Chance by 50% - 100% for 2s.',
    maxLevelBonus:
      'While OPPORTUNITY is active, any Dodge or Combat Slide refreshes the duration.',
    wikiLinks: [`https://remnant.wiki/Opportunist`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Overdrive',
    type: 'melee',
    imagePath: '/items/mutators/overdrive.png',
    saveFileSlug: 'MetaGem_Overdrive_C',
    id: 'mjzb0f',
    dlc: 'base',
    tags: ['Melee Critical Hit', 'Critical Hit', 'Critical Chance'],
    description: `Melee Critical Hits increase Melee Critical Chance by 2% - 5% for 10s. stacking up to 5 times.`,
    maxLevelBonus: `Melee Critical Strikes deal 25% additional damage.`,
    wikiLinks: [`https://remnant.wiki/Overdrive`],
    location: { world: 'Yaesha', dungeon: ['The Lament'] },
  },
  {
    category: 'mutator',
    name: 'Pressure Point',
    type: 'gun',
    imagePath: '/items/mutators/pressure_point.png',
    saveFileSlug: 'MetaGem_PressurePoint.MetaGem_PressurePoint_C',
    id: 'EV4ULr',
    dlc: 'dlc2',
    tags: ['Mod Damage', 'Ranged Damage', 'Stagger'],
    description:
      "Increases this weapon's Ranged and Mod Damage by 5% - 15% to enemies within 7m.",
    maxLevelBonus:
      "Activating this weapon's Mod triggers a fixed 7m blast, dealing 50 Explosive Damage per 100 Mod Power spent in a single cast. Inflicts 1.5 Stagger Damage.",
    externalTokens: [`Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Pressure_Point`],
    location: { world: 'Yaesha', dungeon: ['Ancient Canopy'] },
  },
  {
    category: 'mutator',
    name: 'Prophecy',
    type: 'gun',
    imagePath: '/items/mutators/prophecy.png',
    saveFileSlug: 'MetaGem_Prophecy_C',
    dlc: 'dlc1',
    id: 'lo6uce',
    tags: ['Mod Power'],
    description: `Using this weapon's Mod increases Mod Power Generation by 3% - 6% for 10s. Max 5 stacks.`,
    maxLevelBonus: `Increases Movement Speed by 3% per stack.`,
    wikiLinks: [`https://remnant.wiki/Prophecy`],
    location: { world: 'Losomn', dungeon: ['Pathway of the Fallen'] },
  },
  {
    category: 'mutator',
    name: 'Refunder',
    type: 'gun',
    imagePath: '/items/mutators/refunder.png',
    saveFileSlug: 'MetaGem_Refunder_C',
    id: 'fcl7u2',
    dlc: 'base',
    tags: ['Ammo Reserves'],
    description:
      'Shots from this weapon have a 20% - 50% chance to return spent Ammo to reserves.',
    maxLevelBonus: `Refunded Ammo has a 25% chance to also be added to stowed weapon reserves.`,
    wikiLinks: [`https://remnant.wiki/Refunder`],
    location: { world: `N'Erud`, dungeon: ['Tower of the Unseen'] },
  },
  {
    category: 'mutator',
    name: 'Reinvigorate',
    type: 'melee',
    imagePath: '/items/mutators/reinvigorate.png',
    saveFileSlug: 'MetaGem_Reinvigorate_C',
    id: '5bfv3p',
    dlc: 'base',
    tags: ['Charged Melee', 'Melee Critical Chance'],
    description:
      'Reduces the Stamina Cost of all Charged Melee Attacks by 25% - 50%.',
    maxLevelBonus: `Melee Charge Attacks gain 20% additional damage and 10% Critical Chance.`,
    wikiLinks: [`https://remnant.wiki/Reinvigorate`],
    location: { world: 'Yaesha', dungeon: ['Forgotten Field'] },
  },
  {
    category: 'mutator',
    name: 'Repercussion',
    type: 'gun',
    imagePath: '/items/mutators/repercussion.png',
    saveFileSlug: 'MetaGem_Repercussion_C', // TODO Check this
    id: 'jbrq12',
    dlc: 'dlc3',
    tags: ['Ranged Damage', 'Critical Chance'],
    description:
      'Each enemy hit by Primary Fire grants 1 stack of REPERCUSSION, increasing Ranged Damage by 3% - 6% per stack. Max 5 stacks. Shots consume stacks.',
    maxLevelBonus: `Increases this weapon's Critical Chance by 3% per stack of REPERCUSSION.`,
    wikiLinks: [`https://remnant.wiki/Repercussion`],
    location: {
      world: `N'Erud`,
      biome: `Towers of N'Erud`,
      injectable: 'Crop Lab',
    },
  },
  {
    category: 'mutator',
    name: 'Resentment',
    type: 'melee',
    imagePath: '/items/mutators/resentment.png',
    saveFileSlug: 'MetaGem_Resentment_C',
    id: 'ha3amj',
    dlc: 'base',
    tags: ['Melee Damage', 'Grey Health', 'Stagger'],
    description: 'Gain 15% - 35% Melee Damage when Grey Health is present.',
    maxLevelBonus: 'Reduces Stagger by 1 when using any Melee Attack.',
    wikiLinks: [`https://remnant.wiki/Resentment`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Searing Wounds',
    type: 'gun',
    imagePath: '/items/mutators/searing_wounds.png',
    saveFileSlug: 'MetaGem_SearingWounds.MetaGem_SearingWounds_C',
    dlc: 'dlc2',
    id: '9htako',
    tags: ['Ranged Damage', 'Critical Hit', 'Status Effect'],
    description:
      'Increases Ranged Damage of this weapon by 1% - 10% to BURNING targets.',
    maxLevelBonus: `This weapon's Ranged Weakspot and Ranged Critical Hits apply BURNING, dealing 50 FIRE damage over 5s.`,
    wikiLinks: [`https://remnant.wiki/Searing_Wounds`],
    location: { world: 'Yaesha', dungeon: [`Goddess's Rest`] },
  },
  {
    category: 'mutator',
    name: 'Sequenced Shot',
    type: 'gun',
    imagePath: '/items/mutators/sequenced_shot.png',
    saveFileSlug: 'MetaGem_SequencedShot_C',
    id: '23ztdj',
    dlc: 'base',
    tags: ['Charged Shot', 'Critical Chance'],
    description:
      "This weapon's Charged Shots decrease the Charge time of Subsequent Charge Shots by 10% - 35%  for 5s.",
    maxLevelBonus:
      'While active, Charged Primary Shots grant 1% Ranged Critical Chance per round spent. Max 15%.',
    wikiLinks: [`https://remnant.wiki/Sequenced_Shot`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Shielded Strike',
    saveFileSlug: 'MetaGem_ShieldBreaker_C',
    type: 'melee',
    imagePath: '/items/mutators/shielded_strike.png',
    id: 'bhov5r',
    dlc: 'base',
    tags: ['Charged Melee', 'Melee Damage'],
    description:
      'Melee Attacks grant a Shield for 5% - 10% of Max Health. Max 25% - 30%. Lasts 5s.',
    maxLevelBonus:
      'Charged Melee Attacks deal 25% additional Melee Damage based on current Shield amount.',
    wikiLinks: [`https://remnant.wiki/Shielded_Strike`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Shocker',
    type: 'melee',
    imagePath: '/items/mutators/shocker.png',
    saveFileSlug: 'MetaGem_Shocker_C',
    id: '7js906',
    dlc: 'base',
    tags: ['Charged Melee'],
    description: `Empowers weapon after 3 hits. While empowered. the next Charged Melee Hit strikes all enemies within 7m with 50 - 100 SHOCK Damage.`,
    maxLevelBonus:
      'The SHOCK  Damage now applies OVERLOADED dealing 125 damage every 5s over 25s.',
    externalTokens: [`AOE/Aura`],
    wikiLinks: [`https://remnant.wiki/Shocker`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Slayer',
    type: 'gun',
    imagePath: '/items/mutators/slayer1.png',
    saveFileSlug: 'MetaGem_Slayer_C',
    id: 'h98e7b',
    dlc: 'base',
    tags: ['Ranged Damage', 'Reload Speed'],
    description:
      "Reloading increases this damage of this weapon's next shot by 10% - 25%. Lasts 3s.",
    maxLevelBonus: `Increases Reload Speed by 15%.`,
    wikiLinks: [`https://remnant.wiki/Slayer`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Sleeper',
    type: 'gun',
    imagePath: '/items/mutators/sleeper.png',
    saveFileSlug: 'MetaGem_Sleeper_C',
    dlc: 'dlc1',
    id: 'xim1sx',
    tags: ['Critical Chance'],
    description:
      "This weapon becomes EMPOWERED when stowed for 5 seconds, granting 25% Critical Chance for 5s - 10s  after it's drawn.",
    maxLevelBonus:
      'While EMPOWERED, increases Critical Damage of this weapon by 15%',
    wikiLinks: [`https://remnant.wiki/Sleeper`],
    location: { world: 'Losomn', dungeon: ['Derelict Lighthouse'] },
  },
  {
    category: 'mutator',
    name: 'Spellweaver',
    type: 'gun',
    imagePath: '/items/mutators/spellweaver.png',
    saveFileSlug: 'MetaGem_Spellweaver.MetaGem_Spellweaver_C',
    dlc: 'base',
    id: '5Brz87',
    tags: ['Mod Damage', 'Mod Power', 'Reduce Skill Cooldown'],
    description:
      "Increases this weapon's Mod Damage and Mod Generation by 10% - 15% for 10s when activating a Skill.",
    maxLevelBonus:
      "Activating this weapon's Mod reduces Skill Cooldowns by 1% for every 100 Mod Power spent.",
    wikiLinks: [`https://remnant.wiki/Spellweaver`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Spirit Feeder',
    type: 'gun',
    saveFileSlug: 'MetaGem_BottomFeeder_C',
    imagePath: '/items/mutators/bottom_feeder.png',
    id: '90i71b',
    dlc: 'base',
    tags: [], // TODO Check tags
    description:
      'Reloading this weapon increases the damage of the Attached Mod by 10% - 25%. Lasts 5s.',
    maxLevelBonus: `Casting Attached Mod increases Reload Speed by 30%. Lasts 7s.`,
    wikiLinks: [`https://remnant.wiki/Spirit_Feeder`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Spirit Healer',
    type: 'gun',
    imagePath: '/items/mutators/spirit_healer.png',
    saveFileSlug: 'MetaGem_SpiritHealer_C',
    id: 'hk1k7k',
    dlc: 'base',
    tags: ['Mod Power', 'Heal'],
    description:
      'Regenerate 2% Health over 10s for every 150 - 50 Mod Power spent.',
    maxLevelBonus: `Allies within 15m are healed for 50% of the primary effect.`,
    wikiLinks: [`https://remnant.wiki/Spirit_Healer`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Steadfast',
    type: 'melee',
    imagePath: '/items/mutators/steadfast.png',
    saveFileSlug: 'MetaGem_Steadfast_C',
    id: 'yibeww',
    dlc: 'base',
    tags: ['Charged Melee', 'Damage Reduction', 'Grey Health'],
    description:
      'Charged Melee Attacks cannot be interrupted and gain 5% - 10% Damage Reduction from all sources.',
    maxLevelBonus:
      'All Damage taken during a Charged Melee Attack is converted to Grey Health.',
    wikiLinks: [`https://remnant.wiki/Steadfast`],
    location: {
      world: 'Losomn',
      biome: 'Fae Palace',
      injectable: 'As Above, So Below',
    },
  },
  {
    category: 'mutator',
    name: 'Stormbringer',
    type: 'melee',
    imagePath: '/items/mutators/stormbringer.png',
    saveFileSlug: 'MetaGem_Stormbringer_C',
    id: 'm87yf6',
    dlc: 'base',
    tags: ['Status Effect', 'Melee Damage', 'Charged Melee'],
    description:
      'Increases the Status Effect Damage applied by Melee Attacks by 25% - 50%.',
    maxLevelBonus:
      "Charged Melee Attacks lower enemy's Resistance to All Status damage by 10%. Lasts 10s.",
    wikiLinks: [`https://remnant.wiki/Stormbringer`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Striker',
    type: 'melee',
    imagePath: '/items/mutators/striker.png',
    saveFileSlug: 'MetaGem_Striker_C',
    id: '27rynt',
    dlc: 'base',
    tags: ['Melee Damage', 'Movement Speed'],
    description:
      'Melee Hits increase Melee Damage by 3% - 6% for 5s. Max 5 Stacks.',
    maxLevelBonus: `Increases Movement Speed by 3% per stack.`,
    wikiLinks: [`https://remnant.wiki/Striker`],
    location: { world: 'Losomn', dungeon: ['Morrow Parish'] },
  },
  {
    category: 'mutator',
    name: 'Supercharger',
    type: 'gun',
    imagePath: '/items/mutators/supercharger.png',
    saveFileSlug: 'MetaGem_Supercharger_C',
    id: 'omeu3c',
    dlc: 'base',
    tags: ['Charged Shot', 'Critical Chance'],
    description:
      'Increases Charge Speed for Bows and Fusion Rifles by 10% - 30%.',
    maxLevelBonus: `Charged Primary Shots of Bows and Fusion Rifles gain 15% Critical Chance.`,
    wikiLinks: [`https://remnant.wiki/Supercharger`],
    location: { world: 'Root Earth', dungeon: ['Twilight Vale'] },
  },
  {
    category: 'mutator',
    name: 'Superheated',
    type: 'gun',
    imagePath: '/items/mutators/superheated.png',
    saveFileSlug: 'MetaGem_Superheated_C', // TODO Check this
    id: '97fccn',
    dlc: 'dlc3',
    tags: ['Heat Generation', 'Status Effect'],
    externalTokens: ['Explosive Damage', 'AOE/Aura'],
    description:
      'When this weapon is above 25% Heat, a 7.5m Pulse deals 150 Explosive Damage once every  5s - 3s.',
    maxLevelBonus:
      'At Max Heat, a 10m Pulse deals 300 Explosive Damage which applies BURNING to all entities for 100 FIRE damage over 20s. Can only happen once every  5s - 3s.',
    wikiLinks: [`https://remnant.wiki/Superheated`],
    location: { world: `N'Erud`, dungeon: [`Stagnant Manufactory`] },
  },
  {
    category: 'mutator',
    name: 'Tainted Blade',
    type: 'melee',
    imagePath: '/items/mutators/tainted_blade.png',
    saveFileSlug: 'MetaGem_TaintedBlade_C',
    id: 'f32skd',
    dlc: 'base',
    tags: ['Melee Damage', 'Charged Melee'],
    description:
      'Increases Melee Damage by 5% - 8% per stack of CORRODED on the target. Max 5 stacks.',
    maxLevelBonus:
      'Charged Melee Attacks apply CORRODED, dealing 250 ACID Damage over 10s.',
    wikiLinks: [`https://remnant.wiki/Tainted_Blade`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Thousand Cuts',
    type: 'gun',
    imagePath: '/items/mutators/thousand_cuts.png',
    saveFileSlug: 'MetaGem_ThousandCuts.MetaGem_ThousandCuts_C',
    id: 'r8jxFF',
    dlc: 'dlc2',
    tags: ['Critical Chance', 'Critical Damage', 'Reload Speed'],
    description:
      "Increases this weapon's Critical Chance and Critical Damage by 0.1% - 0.5% for each shot fired. Lasts 0.125s. Max 50 stacks.",
    maxLevelBonus: "Increases this weapon's Reload Speed by 1% per stack.",
    wikiLinks: [`https://remnant.wiki/Thousand_Cuts`],
    location: {
      world: 'Yaesha',
      biome: 'Floating Forests',
      injectable: 'Shrine of the Doe',
    },
  },
  {
    category: 'mutator',
    name: 'Timewave',
    type: 'gun',
    imagePath: '/items/mutators/timewave.png',
    saveFileSlug: 'MetaGem_Timewave_C',
    id: 'dynus4',
    dlc: 'base',
    tags: ['Ranged Damage', 'Status Effect'],
    description:
      "Increase this weapon's Ranged damage by 5% - 20% to enemies inflicted with SLOW status.",
    maxLevelBonus: `Mod Use applies SLOW status on all enemies within 10m for 5s. Can only happen once every 10s.`,
    externalTokens: [`AOE/Aura`],
    wikiLinks: [`https://remnant.wiki/Timewave`],
    location: {
      world: `N'Erud`,
      biome: `Towers of N'Erud`,
      injectable: `Remains Below`,
    },
  },
  {
    category: 'mutator',
    name: 'Top Heavy',
    type: 'gun',
    imagePath: '/items/mutators/top_heavy.png',
    saveFileSlug: 'MetaGem_Topheavy_C',
    id: 'fknx4t',
    dlc: 'base',
    tags: ['Ranged Damage', 'Weakspot Damage'],
    description:
      "Increases this weapon's Ranged Damage by up to 7.5% - 15% based on how close the magazine capacity is to full.",
    maxLevelBonus: `Increases this weapon's Weakspot Damage by up to 20% based on how close the magazine capacity is to full.`,
    wikiLinks: [`https://remnant.wiki/Top_Heavy`],
    location: { world: 'Any', dungeon: 'Aberration' },
  },
  {
    category: 'mutator',
    name: 'Transference',
    type: 'melee',
    imagePath: '/items/mutators/transference.png',
    saveFileSlug: 'MetaGem_Transference_C',
    id: '0osd64',
    dlc: 'base',
    tags: ['Melee Damage', 'Mod Power', 'Ammo Reserves'],
    description:
      'Melee Hits generate 5% of Max Ammo Capacity to the Reserves for both Firearms. Cooldown 10s- 5s.',
    maxLevelBonus: `After Ammo is Transferred, increase Reload Speed of this weapon by 50% for 5s.`,
    wikiLinks: [`https://remnant.wiki/Transference`],
    location: { world: `N'Erud`, dungeon: ['Void Vessel Facility'] },
  },
  {
    category: 'mutator',
    name: 'Transpose',
    type: 'gun',
    imagePath: '/items/mutators/transpose.png',
    saveFileSlug: 'MetaGem_Transpose_C',
    id: '1cxn5s',
    dlc: 'base',
    tags: ['Ranged Damage', 'Ammo Reserves'],
    description: 'Gaining Ammo increases Ranged Damage by 5% - 15% for 15s.',
    maxLevelBonus:
      "New Ammo gains are added directly to into this weapon's magazine.\n\nBows: New Ammo gains grants this weapon Infinite Reserves for 15s.",
    wikiLinks: [`https://remnant.wiki/Transpose`],
    location: {
      world: `N'Erud`,
      biome: `N'Erud Underworld`,
      injectable: `Robot Hangar`,
    },
  },
  {
    category: 'mutator',
    name: 'Twisting Wounds',
    type: 'gun',
    imagePath: '/items/mutators/twisting_wounds.png',
    saveFileSlug: 'MetaGem_TwistingWounds_C',
    id: '7eodps',
    dlc: 'base',
    tags: ['Ranged Damage', 'Critical Hit', 'Weakspot Hit'],
    description:
      'Increases Ranged damage of this weapon by 1% - 10% to BLEEDING targets.',
    maxLevelBonus:
      "This weapon's Ranged Weakspot and Ranged Critical Hits apply BLEEDING, dealing 150 BLEED damage over 20s.",
    wikiLinks: [`https://remnant.wiki/Twisting_Wounds`],
    location: {
      world: 'Losomn',
      biome: 'Burning City',
      injectable: 'Oink',
    },
  },
  {
    category: 'mutator',
    name: 'Vampire Blade',
    type: 'melee',
    imagePath: '/items/mutators/vampire_blade.png',
    saveFileSlug: 'MetaGem_VampireBlade_C',
    id: 'dhwqt4',
    dlc: 'base',
    tags: ['Melee Damage', 'Lifesteal'],
    externalTokens: ['AOE/Aura'],
    description:
      'Increases Melee Damage by 10% - 30% while within 10m of a BLEEDING entity.', //No info whether its R or A
    maxLevelBonus: `Melee Hits vs BLEEDING targets will Lifesteal 3% of base damage dealt.`,
    wikiLinks: [`https://remnant.wiki/Vampire_Blade`],
    location: { world: 'Yaesha', dungeon: [`Endaira's End`] },
  },
  {
    category: 'mutator',
    name: 'Volatile Strike',
    type: 'melee',
    imagePath: '/items/mutators/volatilestrike.png',
    saveFileSlug: 'MetaGem_VolatileStrike_C', // TODO Check
    id: 'qej6k5',
    dlc: 'dlc3',
    tags: ['Melee Damage', 'Movement Speed'],
    externalTokens: ['AOE/Aura', 'Explosive Damage'],
    description: `Dealing Melee Damage creates a 3m blast which deals 50 → 150 Explosive Damage. Can only happen once every 1s.`,
    maxLevelBonus: `When Volatile Strike triggers a blast, increases Movement Speed by 20% for 5s.`,
    wikiLinks: [`https://remnant.wiki/Volatile_Strike`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mutator',
    name: 'Vengeful Strike',
    type: 'melee',
    imagePath: '/items/mutators/vengeful_strike.png',
    saveFileSlug: 'MetaGem_VengefulStrike_C',
    id: '8h8a9w',
    dlc: 'base',
    tags: ['Melee Damage', 'Critical Chance'],
    description:
      'Increases Melee damage by 25% - 50% when below 50% Max Health.',
    maxLevelBonus: `Increases Melee Critical Chance by 15% when below 50% Max Health.`,
    wikiLinks: [`https://remnant.wiki/Vengeful_Strike`],
    location: { world: 'Labyrinth', dungeon: ['Labyrinth'] },
  },
  {
    category: 'mutator',
    name: 'Weaponlord',
    type: 'melee',
    imagePath: '/items/mutators/weaponlord.png',
    saveFileSlug: 'MetaGem_WeaponLord_C',
    id: 'w6gpz2',
    dlc: 'base',
    tags: ['Melee Damage', 'Charged Melee', 'Critical Chance'],
    description:
      'Basic Melee Attacks increase the next Charge Attack by 7% - 15%. Max 3 stacks.',
    maxLevelBonus: `At Max Stacks, the next Charge Attack gains 100% Critical Chance.`,
    wikiLinks: [`https://remnant.wiki/Weaponlord`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
];
