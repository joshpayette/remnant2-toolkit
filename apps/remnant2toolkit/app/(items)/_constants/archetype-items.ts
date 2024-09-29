import { type ArchetypeItem } from '@/app/(items)/_types/archetype-item';

export const archetypeItems: ArchetypeItem[] = [
  {
    category: 'archetype',
    name: 'Alchemist',
    imagePath: '/items/archetypes/alchemist.png',
    saveFileSlug: 'Engram_Alchemist_C',
    id: '67pme7',
    dlc: 'base',
    description:
      'The ALCHEMIST specializes in powerful buffing Vials and consumable potency.',
    wikiLinks: [`https://remnant.wiki/Alchemist`],
    location: { world: 'Losomn', dungeon: 'World Drop' },
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
    imagePath: '/items/archetypes/archon.png',
    saveFileSlug: 'Engram_Archon_C',
    id: 'og1fvq',
    dlc: 'base',
    description:
      'The ARCHON is the master of Weapon Mods and Mod Power generation.',
    wikiLinks: [`https://remnant.wiki/Archon`],
    location: { world: 'The Backrooms', dungeon: 'The Backrooms' },
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
    imagePath: '/items/archetypes/challenger.png',
    saveFileSlug: 'Engram_Challenger_C',
    id: 'wm2xsy',
    dlc: 'base',
    description:
      'The CHALLENGER specializes in close range combat and heightened survivability.',
    wikiLinks: [`https://remnant.wiki/Challenger`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
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
    imagePath: '/items/archetypes/engineer.png',
    saveFileSlug: 'Engram_Engineer_C',
    id: '98i1ka',
    dlc: 'base',
    description:
      'The ENGINEER specializes in Heavy Weaponry which can be carried or placed in turret mode.',
    wikiLinks: [`https://remnant.wiki/Engineer`],
    location: { world: `N'Erud`, dungeon: 'World Drop' },
    linkedItems: {
      traits: [
        { name: 'Fortify', amount: 10 },
        { name: 'Vigor', amount: 2 },
        { name: 'Endurance', amount: 3 },
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
    imagePath: '/items/archetypes/explorer.png',
    saveFileSlug: 'Engram_Explorer_C',
    id: 'la3vvu',
    dlc: 'base',
    description:
      'The EXPLORER specializes in finding valuable items and overall team utility.',
    wikiLinks: [`https://remnant.wiki/Explorer`],
    location: { world: 'Any', dungeon: 'Quest' },
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
    imagePath: '/items/archetypes/gunslinger.png',
    saveFileSlug: 'Engram_Gunslinger_C',
    id: 'd2qga5',
    dlc: 'base',
    description:
      'The GUNSLINGER specializes in raw damage, firearm handling, and ammo conservation.',
    wikiLinks: [`https://remnant.wiki/Gunslinger`],
    location: { world: 'Ward 13', dungeon: 'Quest' },
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
    imagePath: '/items/archetypes/handler.png',
    saveFileSlug: 'Engram_Handler_C',
    id: 'aazlxe',
    dlc: 'base',
    description:
      'The HANDLER specializes in teamwork in both solo and cooperative scenarios.',
    wikiLinks: [`https://remnant.wiki/Handler`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
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
    imagePath: '/items/archetypes/hunter.png',
    saveFileSlug: 'Engram_Hunter_C',
    id: '5tkqdz',
    dlc: 'base',
    description:
      'The HUNTER specializes in ranged damage, precision shots and marking enemies.',
    wikiLinks: [`https://remnant.wiki/Hunter`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
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
    imagePath: '/items/archetypes/invader.png',
    saveFileSlug: 'Engram_Invader_C',
    id: '0ipjpk',
    dlc: 'base',
    description: `The INVADER specializes elusiveness and misdirecting the enemy's focus.`,
    wikiLinks: [`https://remnant.wiki/Invader`],
    location: { world: 'Losomn', dungeon: 'Quest' },
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
    imagePath: '/items/archetypes/invoker.png',
    saveFileSlug: 'Engram_Invoker_C',
    id: 'Y2NhrX',
    dlc: 'dlc2',
    description: 'The INVOKER specializes in Skill Effectiveness and Buffs.',
    wikiLinks: ['https://remnant.wiki/Invoker'],
    location: { world: 'Yaesha', dungeon: 'Quest' },
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
        { name: 'Soothsayer' },
      ],
    },
  },
  {
    category: 'archetype',
    name: 'Medic',
    imagePath: '/items/archetypes/medic.png',
    saveFileSlug: 'Engram_Medic_C',
    id: 'd6fvmc',
    dlc: 'base',
    description:
      'The MEDIC specializes in survivability with enhanced healing and Relic effectiveness.',
    wikiLinks: [`https://remnant.wiki/Medic`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
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
    imagePath: '/items/archetypes/ritualist.png',
    saveFileSlug: 'Engram_Ritualist_C',
    id: '1q7z9d',
    dlc: 'dlc1',
    description:
      'The RITUALIST is a powerful class focusing on status effects and AOE damage, that can make enemies infect their allies with whatever status they are suffering',
    wikiLinks: [`https://remnant.wiki/Ritualist`],
    location: { world: 'Losomn', dungeon: 'Quest' },
    linkedItems: {
      traits: [
        { name: 'Affliction', amount: 10 },
        { name: 'Spirit', amount: 3 },
        { name: 'Expertise', amount: 2 },
      ],
      skills: [{ name: 'Eruption' }, { name: 'Miasma' }, { name: 'Deathwish' }],
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
    imagePath: '/items/archetypes/summoner.png',
    saveFileSlug: 'Engram_Summoner_C',
    id: 'og0bwx',
    dlc: 'base',
    description:
      'The SUMMONER specializes in using Minions to do their bidding and sacrificing them.',
    wikiLinks: [`https://remnant.wiki/Summoner`],
    location: { world: `Yaesha`, dungeon: 'Vendor' },
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
  {
    category: 'archetype',
    name: 'Warden',
    imagePath: '/items/archetypes/warden.png',
    saveFileSlug: 'Engram_Warden_C',
    id: 'tn0x3c',
    dlc: 'dlc3',
    externalTokens: [],
    description: 'TBD',
    wikiLinks: [`https://remnant.wiki/Warden`],
    location: { world: `N'Erud`, dungeon: 'Quest' },
    linkedItems: {
      traits: [
        { name: 'Barrier', amount: 10 },
        { name: 'Expertise', amount: 2 },
        { name: 'Endurance', amount: 1 },
        { name: 'Spirit', amount: 2 },
      ],
      skills: [
        { name: 'Drone: Shield' },
        { name: 'Drone: Heal' },
        { name: 'Drone: Combat' },
      ],
      perks: [
        { name: 'Dynamic' },
        { name: 'Warden Damage Perk' },
        { name: 'Warden Team Perk' },
        { name: 'Warden Utility Perk' },
        { name: 'Warden Relic Perk' },
      ],
    },
  },
];
