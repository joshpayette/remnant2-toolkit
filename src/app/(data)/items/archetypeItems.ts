import { ArchetypeItem } from './types/ArchetypeItem'

export const archetypeItems: ArchetypeItem[] = [
  {
    category: 'archetype',
    name: 'Alchemist',
    imagePath: '/archtype/alchemist.png',
    id: '67pme7',
    description:
      'The ALCHEMIST specializes in powerful buffing Vials and consumable potency.',
    wikiLinks: [`https://remnant.wiki/Alchemist`],
    linkedItems: {
      traits: [
        { name: 'Potency', amount: 10 },
        { name: 'Spirit', amount: 2 },
        { name: 'Expertise', amount: 2 },
        { name: 'Vigor', amount: 1 },
      ],
      skills: [
        { name: 'Vial: Stone Mist' },
        { name: 'Vial: Frenzy Dust' },
        { name: 'Vial: Elixir of Life' },
      ],
      perks: [
        { name: 'Spirited' }, // * First perk should be prime perk
        { name: 'Liquid Courage' },
        { name: 'Panacea' },
        { name: 'Gold to Lead' },
        { name: 'Experimentalist' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Archon',
    imagePath: '/archtype/archon.png',
    id: 'og1fvq',
    description:
      'The ARCHON is the master of Weapon Mods and Mod Power generation.',
    wikiLinks: [`https://remnant.wiki/Archon`],
    linkedItems: {
      traits: [
        { name: 'Flash Caster', amount: 10 },
        { name: 'Spirit', amount: 3 },
        { name: 'Vigor', amount: 1 },
        { name: 'Endurance', amount: 1 },
      ],
      skills: [
        { name: 'Reality Rune' },
        { name: 'Chaos Gate' },
        { name: 'Havoc Form' },
      ],
      perks: [
        { name: 'Tempest' }, // * First perk should be prime perk
        { name: 'Amplify' },
        { name: 'Power Creep' },
        { name: 'Spirit Within' },
        { name: 'Power Leak' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Challenger',
    imagePath: '/archtype/challenger.png',
    id: 'wm2xsy',
    description:
      'The CHALLENGER specializes in close range combat and heightened survivability.',
    wikiLinks: [`https://remnant.wiki/Challenger`],
    linkedItems: {
      traits: [
        { name: 'Strong Back', amount: 10 },
        { name: 'Vigor', amount: 3 },
        { name: 'Endurance', amount: 2 },
      ],
      skills: [
        { name: 'War Stomp' },
        { name: 'Juggernaut' },
        { name: 'Rampage' },
      ],
      perks: [
        { name: 'Die Hard' }, // * First perk should be prime perk
        { name: 'Close Quarters' },
        { name: 'Intimidating Presence' },
        { name: 'Powerlifter' },
        { name: 'Face of Danger' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Engineer',
    imagePath: '/archtype/engineer.png',
    id: '98i1ka',
    description:
      'The ENGINEER specializes in Heavy Weaponry which can be carried or placed in turret mode.',
    wikiLinks: [`https://remnant.wiki/Engineer`],
    linkedItems: {
      traits: [
        { name: 'Fortify', amount: 10 },
        { name: 'Vigor', amount: 2 },
        { name: 'Endurance', amount: 2 },
        { name: 'Expertise', amount: 1 },
      ],
      skills: [
        { name: 'Heavy Weapon: Vulcan' },
        { name: 'Heavy Weapon: Flamethrower' },
        { name: 'Heavy Weapon: Impact Cannon' },
      ],
      perks: [
        { name: 'High Tech' }, // * First perk should be prime perk
        { name: 'Metalworker' },
        { name: 'Magnetic Field' },
        { name: 'Heavy Mobility' },
        { name: 'Surplus' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Explorer',
    imagePath: '/archtype/explorer.png',
    id: 'la3vvu',
    description:
      'The EXPLORER specializes in finding valuable items and overall team utility.',
    wikiLinks: [`https://remnant.wiki/Explorer`],
    linkedItems: {
      traits: [
        { name: 'Swiftness', amount: 10 },
        { name: 'Endurance', amount: 2 },
        { name: 'Spirit', amount: 2 },
        { name: 'Expertise', amount: 1 },
      ],
      skills: [
        { name: 'Plainswalker' },
        { name: 'Gold Digger' },
        { name: 'Fortune Hunter' },
      ],
      perks: [
        { name: 'Lucky' }, // * First perk should be prime perk
        { name: 'Scavenger' },
        { name: 'Metal Detector' },
        { name: 'Prospector' },
        { name: 'Self Discovery' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Gunslinger',
    imagePath: '/archtype/gunslinger.png',
    id: 'd2qga5',
    description:
      'The GUNSLINGER specializes in raw damage, firearm handling, and ammo conservation.',
    wikiLinks: [`https://remnant.wiki/Gunslinger`],
    linkedItems: {
      traits: [
        { name: 'Ammo Reserves', amount: 10 },
        { name: 'Vigor', amount: 2 },
        { name: 'Expertise', amount: 2 },
        { name: 'Endurance', amount: 1 },
      ],
      skills: [
        { name: 'Quick Draw' },
        { name: 'Sidewinder' },
        { name: 'Bulletstorm' },
      ],
      perks: [
        { name: 'Loaded' }, // * First perk should be prime perk
        { name: 'Swift Shot' },
        { name: 'Posse Up' },
        { name: 'Quick Hands' },
        { name: 'Sleight of Hand' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Handler',
    imagePath: '/archtype/handler.png',
    id: 'aazlxe',
    description:
      'The HANDLER specializes in teamwork in both solo and cooperative scenarios.',
    wikiLinks: [`https://remnant.wiki/Handler`],
    linkedItems: {
      traits: [
        { name: 'Kinship', amount: 10 },
        { name: 'Expertise', amount: 3 },
        { name: 'Vigor', amount: 1 },
        { name: 'Endurance', amount: 1 },
      ],
      skills: [
        { name: 'Guard Dog' },
        { name: 'Support Dog' },
        { name: 'Attack Dog' },
      ],
      perks: [
        { name: 'Bonded' }, // * First perk should be prime perk
        { name: 'Pack Hunter' },
        { name: 'Spirit of the Wolf' },
        { name: 'Teamwork' },
        { name: 'Best Friend' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Hunter',
    imagePath: '/archtype/hunter.png',
    id: '5tkqdz',
    description:
      'The HUNTER specializes in ranged damage, precision shots and marking enemies.',
    wikiLinks: [`https://remnant.wiki/Hunter`],
    linkedItems: {
      traits: [
        { name: 'Longshot', amount: 10 },
        { name: 'Endurance', amount: 2 },
        { name: 'Expertise', amount: 2 },
        { name: 'Vigor', amount: 1 },
      ],
      skills: [
        { name: `Hunter's Mark` },
        { name: `Hunter's Focus` },
        { name: `Hunter's Shroud` },
      ],
      perks: [
        { name: 'Dead to Rights' }, // * First perk should be prime perk
        { name: 'Deadeye' },
        { name: 'Return to Sender' },
        { name: 'Urgency' },
        { name: 'Intuition' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Invader',
    imagePath: '/archtype/invader.png',
    id: '0ipjpk',
    description: `The INVADER specializes elusiveness and misdirecting the enemy's focus.`,
    wikiLinks: [`https://remnant.wiki/Invader`],
    linkedItems: {
      traits: [
        { name: 'Untouchable', amount: 10 },
        { name: 'Endurance', amount: 4 },
        { name: 'Spirit', amount: 1 },
      ],
      skills: [
        { name: 'Void Cloak' },
        { name: 'Worm Hole' },
        { name: 'Reboot' },
      ],
      perks: [
        { name: 'Shadow' }, // * First perk should be prime perk
        { name: 'S.H.A.R.K.' },
        { name: 'Loophole' },
        { name: 'Circumvent' },
        { name: 'Override' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Invoker',
    imagePath: '/archtype/invoker-placeholder2.png', // TODO
    id: 'Y2NhrX',
    dlc: 'dlc2',
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: ['https://remnant.wiki/Invoker'],
    linkedItems: {
      traits: [
        { name: 'Gifted', amount: 10 },
        { name: 'Vigor', amount: 2 },
        { name: 'Expertise', amount: 3 },
      ],
      skills: [
        { name: 'Way of Kaeula' },
        { name: 'Way of Meidra' },
        { name: 'Way of Lydusa' },
      ],
      perks: [
        { name: 'Visionary' },
        { name: 'Entranced' },
        { name: 'Communion' },
        { name: 'Mind and Body' },
        { name: 'soothsayer' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Medic',
    imagePath: '/archtype/medic.png',
    id: 'd6fvmc',
    description:
      'The MEDIC specializes in survivability with enhanced healing and Relic effectiveness.',
    wikiLinks: [`https://remnant.wiki/Medic`],
    linkedItems: {
      traits: [
        { name: 'Triage', amount: 10 },
        { name: 'Vigor', amount: 2 },
        { name: 'Expertise', amount: 2 },
        { name: 'Spirit', amount: 1 },
      ],
      skills: [
        { name: 'Wellspring' },
        { name: 'Healing Shield' },
        { name: 'Redemption' },
      ],
      perks: [
        { name: 'Regenerator' }, // * First perk should be prime perk
        { name: 'Invigorated' },
        { name: 'Benevolence' },
        { name: 'Backbone' },
        { name: 'Benefactor' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Ritualist',
    imagePath: '/archtype/ritualist.png',
    id: '1q7z9d',
    dlc: 'dlc1',
    description:
      'The RITUALIST is a powerful class focusing on status effects and AOE damage, that can make enemies infect their allies with whatever status they are suffering',
    wikiLinks: [`https://remnant.wiki/Ritualist`],
    linkedItems: {
      traits: [
        { name: 'Affliction', amount: 10 },
        { name: 'Spirit', amount: 2 },
        { name: 'Expertise', amount: 2 },
        { name: 'Endurance', amount: 1 },
      ],
      skills: [
        { name: 'Eruption' },
        { name: 'Miasma' },
        { name: 'Death Wish' },
      ],
      perks: [
        { name: 'Vile' }, // * First perk should be prime perk
        { name: 'Wrath' },
        { name: 'Terrify' },
        { name: 'Dark Blood' },
        { name: 'Purge' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Summoner',
    imagePath: '/archtype/summoner.png',
    id: 'og0bwx',
    description:
      'The SUMMONER specializes in using Minions to do their bidding and sacrificing them.',
    wikiLinks: [`https://remnant.wiki/Summoner`],
    linkedItems: {
      traits: [
        { name: 'Regrowth', amount: 10 },
        { name: 'Spirit', amount: 3 },
        { name: 'Vigor', amount: 1 },
        { name: 'Expertise', amount: 1 },
      ],
      skills: [
        { name: 'Minion: Hollow' },
        { name: 'Minion: Flyer' },
        { name: 'Minion: Reaver' },
      ],
      perks: [
        { name: 'Ruthless' },
        { name: 'Dominator' },
        { name: 'Residue' },
        { name: 'Outrage' },
        { name: 'Incite' },
      ],
    },
  },
]
