import { RelicItem } from './types/RelicItem'

export const relicItems: RelicItem[] = [
  {
    category: 'relic',
    name: 'Bloodless Heart',
    imagePath: '/items/relics/bloodlessheart.png',
    id: 'LQho3X',
    dlc: 'dlc2',
    description:
      'Innate 50% Use Speed bonus. One use, grants a SHIELD that prevents nearly all damage for 3s.\n' +
      '\n' +
      'Cannot prevent certain death mechanics.',
    wikiLinks: [`https://remnant.wiki/Bloodless_Heart`],
  },
  {
    category: 'relic',
    name: 'Blooming Heart',
    imagePath: '/items/relics/bloomingheart.png',
    id: 'soyjpp',
    dlc: 'base',
    description:
      "On use, heals for 35% of Max Health over 5s. Spawns 3 Healing Orbs which grant 35% of caster's Max Health over 5s. Orbs last 20s. Recasting removes previous Orbs.",
    wikiLinks: [`https://remnant.wiki/Blooming_Heart`],
  },
  {
    category: 'relic',
    name: 'Broken Heart',
    imagePath: '/items/relics/brokenheart.png',
    dlc: 'dlc1',
    id: 'm71h9m',
    description:
      'Innate 50% Use Speed Bonus. Passively grants or removes 2 Health per sec until Health reaches 50%. On use, sets Health to 50%.\n' +
      '\n' +
      'Not affected by other healing items or perks.',
    wikiLinks: [`https://remnant.wiki/Broken_Heart`],
  },
  {
    category: 'relic',
    name: 'Constrained Heart',
    imagePath: '/items/relics/constrainedheart.png',
    id: 'rlezcg',
    dlc: 'base',
    description:
      'On use, regenerates 20 Health per second for 5s and grants 2 Stacks of BULWARK while heal is active.',
    wikiLinks: [`https://remnant.wiki/Constrained_Heart`],
  },
  {
    category: 'relic',
    name: 'Crystal Heart',
    imagePath: '/items/relics/crystalheart.png',
    id: '67tfbl',
    dlc: 'base',
    description:
      'On use, regenerates 100% of Max Health over 10s. Movement Speed is reduced by 50%, and incoming damage is reduced by 25%. Lasts 10s.',
    wikiLinks: [`https://remnant.wiki/Crystal_Heart`],
  },
  {
    category: 'relic',
    name: 'Decayed Heart',
    imagePath: '/items/relics/decayedheart.png',
    id: 'vhjydw',
    dlc: 'base',
    description: `On use, causes the next 3 instances of enemy damage taken to trigger 40 Health regeneration over 3s. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Decayed_Heart`],
  },
  {
    category: 'relic',
    name: 'Diverting Heart',
    imagePath: '/items/relics/divertingheart.png',
    id: '96f26y',
    dlc: 'base',
    tags: ['Reduce Skill Cooldown'],
    description:
      'Does not provide standard healing. On use, reduces Skill Cooldowns by 1s per second. Lasts 15s.',
    wikiLinks: [`https://remnant.wiki/Diverting_Heart`],
  },
  {
    category: 'relic',
    name: 'Dragon Heart',
    imagePath: '/items/relics/dragonheart.png',
    id: 'f96bom',
    dlc: 'base',
    description: 'On use, Heals 70 Health over 0.5s.',
    wikiLinks: [`https://remnant.wiki/Dragon_Heart`],
  },
  {
    category: 'relic',
    name: 'Enlarged Heart',
    imagePath: '/items/relics/enlargedheart.png',
    id: '4y2xb3',
    dlc: 'base',
    description:
      'Innate Double Use Speed. On use, heals 140 Health over 0.5s. Relic capacity is halved.',
    wikiLinks: [`https://remnant.wiki/Enlarged_Heart`],
  },
  {
    category: 'relic',
    name: 'Lifeless Heart',
    imagePath: '/items/relics/lifelessheart.png',
    id: 'k1de0f',
    dlc: 'base',
    description:
      'Innate 50% Use Speed Bonus, but provides no healing. Relic capacity is doubled.',
    wikiLinks: [`https://remnant.wiki/Lifeless_Heart`],
  },
  {
    category: 'relic',
    name: 'Paper Heart',
    imagePath: '/items/relics/paperheart.png',
    dlc: 'dlc1',
    id: 'n9fm2r',
    description:
      'On use, heals 100% Max Health and grants 10 Stacks of PAPER HEALTH. After 10s, each Stack is converted to 10% Grey Health.\n' +
      '\n' +
      'Dealing 75 Base Damage from any source removes 1 Stack of PAPER HEALTH.',
    wikiLinks: [`https://remnant.wiki/Paper_Heart`],
  },
  {
    category: 'relic',
    name: 'Profane Heart',
    imagePath: '/items/relics/profaneheart.png',
    id: '4v7sf4',
    dlc: 'dlc2',
    tags: ['Lifesteal'],
    description: `Innate 3% Lifesteal bonus. On use, increases all Lifesteal Efficacy by 50% for 15s.`,
    wikiLinks: [`https://remnant.wiki/Profane_Heart`],
  },
  {
    category: 'relic',
    name: 'Pulsing Heart',
    imagePath: '/items/relics/pulsingheart.png',
    id: 'xfwkzp',
    dlc: 'base',
    description: `On use, pulses every 3s, healing allies within 7m for 20 Health over 0.5s per pulse. Lasts 15s.`,
    wikiLinks: [`https://remnant.wiki/Pulsing_Heart`],
  },
  {
    category: 'relic',
    name: 'Quilted Heart',
    imagePath: '/items/relics/quiltedheart.png',
    id: '4v7sf3',
    dlc: 'base',
    description: `Does not provide standard healing. On use, negates Stamina Drain and cause Evades to heal for 15 Health over 0.25s. Lasts 20s.`,
    wikiLinks: [`https://remnant.wiki/Quilted_Heart`],
  },
  {
    category: 'relic',
    name: 'Reprocessed Heart',
    imagePath: '/items/relics/reprocessedheart.png',
    id: '06pxhy',
    dlc: 'base',
    tags: ['Grey Health'],
    description:
      'On use, converts 5 Health as Grey Health to 40 Mod Power per second for 25s for both weapons. Cannot die from conversion.',
    wikiLinks: [`https://remnant.wiki/Reprocessed_Heart`],
  },
  {
    category: 'relic',
    name: 'Resonating Heart',
    imagePath: '/items/relics/resonatingheart.png',
    id: '6ruk95',
    dlc: 'base',
    description:
      'On use, regenerates 50% of Max Health over 5s. When heal ends, any overhealed Health to self is Doubled and awarded over the next 20s.',
    wikiLinks: [`https://remnant.wiki/Resonating_Heart`],
  },
  {
    category: 'relic',
    name: 'Ripened Heart',
    imagePath: '/items/relics/ripenedheart.png',
    id: '5azu1p',
    dlc: 'base',
    description: `On use, heals 35 Health over 0.5s and an additional 70 over 5s.`,
    wikiLinks: [`https://remnant.wiki/Ripened_Heart`],
  },
  {
    category: 'relic',
    name: 'Runed Heart',
    imagePath: '/items/relics/runedheart.png',
    id: 'yb7v4c',
    dlc: 'base',
    description:
      'On use, increases Health Regeneration by 5 and generates 500 Mod Power over 10s for both weapons.',
    wikiLinks: [`https://remnant.wiki/Runed_Heart`],
  },
  {
    category: 'relic',
    name: 'Salvaged Heart',
    imagePath: '/items/relics/salvagedheart.png',
    id: '2rnl2d',
    dlc: 'base',
    description:
      'Innate 25% Use Speed bonus. On use, heals 30 Health over 0.25s and restores 300% of current Grey Health.',
    wikiLinks: [`https://remnant.wiki/Salvaged_Heart`],
  },
  {
    category: 'relic',
    name: 'Shielded Heart',
    imagePath: '/items/relics/shieldedheart.png',
    id: 'sge99k',
    dlc: 'base',
    description:
      'On use, grants a SHIELD for 100% of Max Health. Lasts 20s or until SHIELD is removed by damage.',
    wikiLinks: [`https://remnant.wiki/Shielded_Heart`],
  },
  {
    category: 'relic',
    name: 'Siphon Heart',
    imagePath: '/items/relics/siphonheart.png',
    id: '3awf5n',
    dlc: 'base',
    description: `On use, grants 10% of base damage dealt as Lifesteal for 15s.`,
    wikiLinks: [`https://remnant.wiki/Siphon_Heart`],
  },
  {
    category: 'relic',
    name: 'Tormented Heart',
    imagePath: '/items/relics/tormentedheart.png',
    id: 'rtmajx',
    dlc: 'base',
    description:
      'Innate 25% Relic Use Speed bonus. On use, deals 150 - 450 Explosive Damage to enemies within 5m and Lifesteals 20% of damage dealt.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Tormented_Heart`],
  },
  {
    category: 'relic',
    name: 'Tranquil Heart',
    imagePath: '/items/relics/tranquilheart.png',
    id: 'thgp2z',
    dlc: 'base',
    description: `Passively grants 2 Health Regeneration per second. On use, doubles All Health Regeneration for 15s.`,
    wikiLinks: [`https://remnant.wiki/Tranquil_Heart`],
  },
  {
    category: 'relic',
    name: 'Unsullied Heart',
    imagePath: '/items/relics/unsulliedheart.png',
    id: 'pj4ika',
    dlc: 'base',
    description: `On use, heals for 100% of Current Health over 0.5s.`,
    wikiLinks: [`https://remnant.wiki/Unsullied_Heart`],
  },
  {
    category: 'relic',
    name: 'Void Heart',
    imagePath: '/items/relics/voidheart.png',
    id: 'weaetb',
    dlc: 'base',
    description: `On use, reduces incoming damage by 50% for 4s. When buff ends, heals 100% of missing Health over 0.75s.`,
    wikiLinks: [`https://remnant.wiki/Void_Heart`],
  },
]
