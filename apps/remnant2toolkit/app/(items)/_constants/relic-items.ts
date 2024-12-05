import { type RelicItem } from '@/app/(items)/_types/relic-item';

export const relicItems: RelicItem[] = [
  {
    category: 'relic',
    name: 'Bloodless Heart',
    imagePath: '/items/relics/bloodlessheart.png',
    saveFileSlug: 'Relic_Consumable_BloodlessHeart_C',
    id: 'LQho3X',
    dlc: 'dlc2',
    description:
      'Innate 50% Use Speed bonus. On use, grants a SHIELD that prevents nearly all damage for 3s.\n\nCannot prevent certain death mechanics.',
    wikiLinks: [`https://remnant.wiki/Bloodless_Heart`],
    location: { world: 'Yaesha', dungeon: [`Goddess's Rest`] },
  },
  {
    category: 'relic',
    name: 'Blooming Heart',
    imagePath: '/items/relics/bloomingheart.png',
    saveFileSlug: 'Relic_Consumable_BloomingHeart_C',
    id: 'soyjpp',
    dlc: 'base',
    description:
      "On use, heals for 35% of Max Health over 5s. Spawns 3 Healing Orbs which grant 35% of caster's Max Health over 5s. Orbs last 20s. Recasting removes previous Orbs.",
    wikiLinks: [`https://remnant.wiki/Blooming_Heart`],
    location: {
      world: 'Yaesha',
      biome: 'Floating Forests',
      injectable: 'Tower',
    },
  },
  {
    category: 'relic',
    name: 'Broken Heart',
    imagePath: '/items/relics/brokenheart.png',
    saveFileSlug: 'Relic_Consumable_BrokenHeart_C',
    dlc: 'dlc1',
    id: 'm71h9m',
    description:
      'Innate 50% Use Speed Bonus. Passively grants or removes 2 Health per sec until Health reaches 50%. On use, sets Health to 50%.\n\nNot affected by other healing items or perks.',
    wikiLinks: [`https://remnant.wiki/Broken_Heart`],
    location: { world: 'Losomn', dungeon: 'Quest' },
  },
  {
    category: 'relic',
    name: 'Constrained Heart',
    imagePath: '/items/relics/constrainedheart.png',
    saveFileSlug: 'Relic_Consumable_ConstrainedHeart_C',
    id: 'rlezcg',
    dlc: 'base',
    description:
      'On use, regenerates 20 Health per second for 5s and grants 2 Stacks of BULWARK while heal is active.',
    wikiLinks: [`https://remnant.wiki/Constrained_Heart`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'relic',
    name: 'Crystal Heart',
    imagePath: '/items/relics/crystalheart.png',
    saveFileSlug: 'Relic_Consumable_CrystalHeart_C',
    id: '67tfbl',
    dlc: 'base',
    description:
      'On use, regenerates 100% of Max Health over 10s. Movement Speed is reduced by 50%, and incoming damage is reduced by 25%. Lasts 10s.',
    wikiLinks: [`https://remnant.wiki/Crystal_Heart`],
    location: { world: `N'Erud`, dungeon: [`The Dark Conduit`] },
  },
  {
    category: 'relic',
    name: 'Decayed Heart',
    imagePath: '/items/relics/decayedheart.png',
    saveFileSlug: 'Relic_Consumable_DecayedHeart_C',
    id: 'vhjydw',
    dlc: 'base',
    description: `On use, causes the next 3 instances of enemy damage taken to trigger 40 Health regeneration over 3s. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Decayed_Heart`],
    location: { world: 'Root Earth', dungeon: ['Corrupted Harbor'] },
  },
  {
    category: 'relic',
    name: 'Diverting Heart',
    imagePath: '/items/relics/divertingheart.png',
    saveFileSlug: 'Relic_Consumable_DivertingHeart_C',
    id: '96f26y',
    dlc: 'base',
    tags: ['Reduce Skill Cooldown'],
    description:
      'Does not provide standard healing. On use, reduces Skill Cooldowns by 1s per second. Lasts 15s.',
    wikiLinks: [`https://remnant.wiki/Diverting_Heart`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'relic',
    name: 'Dragon Heart',
    imagePath: '/items/relics/dragonheart.png',
    saveFileSlug: 'Consumable_DragonHeart_C',
    id: 'f96bom',
    dlc: 'base',
    description: 'On use, Heals 70 Health over 0.5s.',
    wikiLinks: [`https://remnant.wiki/Dragon_Heart`],
    location: { world: 'Ward 13', dungeon: 'Quest' },
  },
  {
    category: 'relic',
    name: 'Enlarged Heart',
    imagePath: '/items/relics/enlargedheart.png',
    saveFileSlug: 'Relic_Consumable_EnlargedHeart_C',
    id: '4y2xb3',
    dlc: 'base',
    description:
      'Innate Double Use Speed. On use, heals 140 Health over 0.5s. Relic capacity is halved.',
    wikiLinks: [`https://remnant.wiki/Enlarged_Heart`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'relic',
    name: 'Gossamer Heart',
    imagePath: '/items/relics/gossamerheart.png',
    saveFileSlug: 'Relic_Consumable_GossamerHeart_C',
    id: '4yjd4c',
    dlc: 'dlc3',
    description: `Innate base Evade Window Frames increased by 1. On use, increases Evade Window Bonus Frames by an additional 2 for 15s.`,
    wikiLinks: [`https://remnant.wiki/Gossamer_Heart`],
    location: {
      world: `N'Erud`,
      biome: `Towers of N'Erud`,
      injectable: `Crop Lab`,
    },
  },
  {
    category: 'relic',
    name: 'Latent Heart',
    imagePath: '/items/relics/latentheart.png',
    saveFileSlug: 'Relic_Consumable_LatentHeart_C', // TODO: Check this
    id: 'x66ure',
    dlc: 'dlc3',
    description: `On use, absorbs 95% incoming damage for 5s. Upon expiring, the absorbed damage is then applied to the wearer at a rate of 10% of the total absorbed damage per second for 10s.\n\nDamage reduction does not apply to SHIELD.`,
    wikiLinks: [`https://remnant.wiki/Latent_Heart`],
    location: { world: `N'Erud`, dungeon: ['Agronomy Sector'] },
  },
  {
    category: 'relic',
    name: 'Lifeless Heart',
    imagePath: '/items/relics/lifelessheart.png',
    saveFileSlug: 'Relic_Consumable_LifelessHeart_C',
    id: 'k1de0f',
    dlc: 'base',
    description:
      'Innate 50% Use Speed Bonus, but provides no healing. Relic capacity is doubled.',
    wikiLinks: [`https://remnant.wiki/Lifeless_Heart`],
    location: { world: 'Yaesha', dungeon: 'Quest' },
  },
  {
    category: 'relic',
    name: 'Paper Heart',
    imagePath: '/items/relics/paperheart.png',
    saveFileSlug: 'Relic_Consumable_PaperHeart_C',
    dlc: 'dlc1',
    id: 'n9fm2r',
    description:
      'On use, heals 100% Max Health and grants 10 Stacks of PAPER HEALTH. After 10s, each Stack is converted to 10% Grey Health.\n\nDealing 75 Base Damage from any source removes 1 Stack of PAPER HEALTH.',
    wikiLinks: [`https://remnant.wiki/Paper_Heart`],
    location: { world: 'Losomn', dungeon: ['Chamber of the Faithless'] },
  },
  {
    category: 'relic',
    name: 'Profane Heart',
    imagePath: '/items/relics/profaneheart.png',
    saveFileSlug: 'Relic_Consumable_profaneHeart_C',
    id: '4v7sf4',
    dlc: 'dlc2',
    tags: ['Lifesteal'],
    description: `Innate 3% Lifesteal bonus. On use, increases all Lifesteal Efficacy by 50% for 15s.`,
    wikiLinks: [`https://remnant.wiki/Profane_Heart`],
    location: { world: 'Yaesha', dungeon: ['Infested Abyss'] },
  },
  {
    category: 'relic',
    name: 'Pulsing Heart',
    imagePath: '/items/relics/pulsingheart.png',
    saveFileSlug: 'Relic_Consumable_PulsingHeart_C',
    id: 'xfwkzp',
    dlc: 'base',
    description: `On use, pulses every 3s, healing allies within 7m for 20 Health over 0.5s per pulse. Lasts 15s.`,
    wikiLinks: [`https://remnant.wiki/Pulsing_Heart`],
    location: { world: 'Yaesha', dungeon: [`Endaira's End`] },
  },
  {
    category: 'relic',
    name: 'Quilted Heart',
    imagePath: '/items/relics/quiltedheart.png',
    saveFileSlug: 'Relic_Consumable_QuiltedHeart_C',
    id: '4v7sf3',
    dlc: 'base',
    description: `Does not provide standard healing. On use, negates Stamina Drain and cause Evades to heal for 15 Health over 0.25s. Lasts 20s.`,
    wikiLinks: [`https://remnant.wiki/Quilted_Heart`],
    location: {
      world: 'Losomn',
      biome: 'Streets of Losomn',
      injectable: `Oracle's Refuge`,
    },
  },
  {
    category: 'relic',
    name: 'Reprocessed Heart',
    imagePath: '/items/relics/reprocessedheart.png',
    saveFileSlug: 'Relic_Consumable_ReprocessedHeart_C',
    id: '06pxhy',
    dlc: 'base',
    tags: ['Grey Health'],
    description:
      'On use, converts 5 Health as Grey Health to 40 Mod Power per second for 25s for both weapons. Cannot die from conversion.',
    wikiLinks: [`https://remnant.wiki/Reprocessed_Heart`],
    location: { world: 'Labyrinth', dungeon: ['Labyrinth'] },
  },
  {
    category: 'relic',
    name: 'Resonating Heart',
    imagePath: '/items/relics/resonatingheart.png',
    saveFileSlug: 'Relic_Consumable_ResonatingHeart_C',
    id: '6ruk95',
    dlc: 'base',
    description:
      'On use, regenerates 50% of Max Health over 5s. When heal ends, any overhealed Health to self is Doubled and awarded over the next 20s.',
    wikiLinks: [`https://remnant.wiki/Resonating_Heart`],
    location: { world: 'Root Earth', dungeon: ['Ashen Wasteland'] },
  },
  {
    category: 'relic',
    name: 'Ripened Heart',
    imagePath: '/items/relics/ripenedheart.png',
    saveFileSlug: 'Relic_Consumable_RipenedHeart_C',
    id: '5azu1p',
    dlc: 'base',
    description: `On use, heals 35 Health over 0.5s and an additional 70 over 5s.`,
    wikiLinks: [`https://remnant.wiki/Ripened_Heart`],
    location: { world: 'Yaesha', dungeon: [`The Widow's Court`] },
  },
  {
    category: 'relic',
    name: 'Runed Heart',
    imagePath: '/items/relics/runedheart.png',
    saveFileSlug: 'Relic_Consumable_RunedHeart_C',
    id: 'yb7v4c',
    dlc: 'base',
    description:
      'On use, increases Health Regeneration by 5 and generates 500 Mod Power over 10s for both weapons.',
    wikiLinks: [`https://remnant.wiki/Runed_Heart`],
    location: { world: 'Labyrinth', dungeon: ['Labyrinth'] },
  },
  {
    category: 'relic',
    name: 'Salvaged Heart',
    imagePath: '/items/relics/salvagedheart.png',
    saveFileSlug: 'Relic_Consumable_SalvagedHeart_C',
    id: '2rnl2d',
    dlc: 'base',
    description:
      'Innate 25% Use Speed bonus. On use, heals 30 Health over 0.25s and restores 300% of current Grey Health.',
    wikiLinks: [`https://remnant.wiki/Salvaged_Heart`],
    location: {
      world: `N'Erud`,
      dungeon: 'Vendor',
    },
  },
  {
    category: 'relic',
    name: 'Shielded Heart',
    imagePath: '/items/relics/shieldedheart.png',
    saveFileSlug: 'Relic_Consumable_ShieldedHeart_C',
    id: 'sge99k',
    dlc: 'base',
    description:
      'On use, grants a SHIELD for 100% of Max Health. Lasts 20s or until SHIELD is removed by damage.',
    wikiLinks: [`https://remnant.wiki/Shielded_Heart`],
    location: { world: `N'Erud`, dungeon: ['Tower of the Unseen'] },
  },
  {
    category: 'relic',
    name: 'Siphon Heart',
    imagePath: '/items/relics/siphonheart.png',
    saveFileSlug: 'Relic_Consumable_SiphonHeart_C',
    id: '3awf5n',
    dlc: 'base',
    description: `On use, grants 10% of base damage dealt as Lifesteal for 15s.`,
    wikiLinks: [`https://remnant.wiki/Siphon_Heart`],
    location: {
      world: `N'Erud`,
      dungeon: ['Ascension Spire'],
    },
  },
  {
    category: 'relic',
    name: 'Tormented Heart',
    imagePath: '/items/relics/tormentedheart.png',
    saveFileSlug: 'Relic_Consumable_TormentedHeart_C',
    id: 'rtmajx',
    dlc: 'base',
    description:
      'Innate 25% Relic Use Speed bonus. On use, deals 150 - 450 Explosive Damage to enemies within 5m and Lifesteals 20% of damage dealt.',
    externalTokens: [`AOE/Aura`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Tormented_Heart`],
    location: { world: 'Losomn', dungeon: ['Tormented Asylum'] },
  },
  {
    category: 'relic',
    name: 'Tranquil Heart',
    imagePath: '/items/relics/tranquilheart.png',
    saveFileSlug: 'Relic_Consumable_TranquilHeart_C',
    id: 'thgp2z',
    dlc: 'base',
    description: `Passively grants 2 Health Regeneration per second. On use, doubles All Health Regeneration for 15s.`,
    wikiLinks: [`https://remnant.wiki/Tranquil_Heart`],
    location: { world: 'Losomn', dungeon: [`Nimue's Retreat`] },
  },
  {
    category: 'relic',
    name: 'Unsullied Heart',
    imagePath: '/items/relics/unsulliedheart.png',
    saveFileSlug: 'Relic_Consumable_UnsulliedHeart_C',
    id: 'pj4ika',
    dlc: 'base',
    description: `On use, heals for 100% of Current Health over 0.5s.`,
    wikiLinks: [`https://remnant.wiki/Unsullied_Heart`],
    location: { world: 'Losomn', dungeon: ['Beatific Palace'] },
  },
  {
    category: 'relic',
    name: 'Void Heart',
    imagePath: '/items/relics/voidheart.png',
    saveFileSlug: 'Relic_Consumable_VoidHeart_C',
    id: 'weaetb',
    dlc: 'base',
    description: `On use, reduces incoming damage by 50% for 4s. When buff ends, heals 100% of missing Health over 0.75s.`,
    wikiLinks: [`https://remnant.wiki/Void_Heart`],
    location: { world: `N'Erud`, dungeon: ['Alepsis-Taura'] },
  },
];
