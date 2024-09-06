import { type Enemy } from '@/app/(enemies)/_types';

export const aberrationEnemies = [
  {
    id: 'bp8Z4T',
    name: 'Arcanum Diviner',
    category: 'aberration',
    imagePath: '/enemies/aberration/arcanum_diviner.jpg',
    wikiLinks: [],
    fireResistance: 10,
    acidResistance: 10,
  },
  {
    name: 'Atrophy',
    category: 'aberration',
    imagePath: '/enemies/aberration/atrophy1.jpg',
    location: { world: 'Yaesha', dungeon: [`Endaira's End`] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Atrophy'],
    id: 'a88PFZ',
  },
  {
    name: 'Bane',
    category: 'aberration',
    imagePath: '/enemies/aberration/bane.jpg',
    location: { world: 'Root Earth', dungeon: ['Twilight Vale'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Bane'],
    id: '73DHnC',
  },
  {
    name: 'Barghest the Vile',
    category: 'aberration',
    imagePath: '/enemies/aberration/barghest_the_vile.jpg',
    location: { world: 'Losomn', dungeon: [`Harvester's Reach`] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Barghest+the+Vile'],
    id: '8Xi7nS',
  },
  {
    id: 'H2iB8c',
    name: 'Bastion',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/bastion.jpg',
    location: { world: 'Labyrinth', dungeon: ['Labyrinth'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Bastion'],
    bleedResistance: 'immune',
    fireResistance: 50,
    shockResistance: 50,
    acidResistance: -25,
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'LZe8So',
    name: 'Befouled Larva',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/befouled_larva.jpg',
    wikiLinks: [],
    bleedResistance: 15,
    fireResistance: -15,
    shockResistance: -10,
    acidResistance: 10,
  },
  {
    name: 'Blightspawn',
    category: 'aberration',
    imagePath: '/enemies/aberration/blightspawn.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Blightspawn'],
    id: '57h9GC',
  },
  {
    id: 'Z7cMX3',
    name: 'Charred Sentry',
    dlc: 'dlc2',
    category: 'aberration',
    imagePath: '/enemies/aberration/charred_sentry.png',
    wikiLinks: [`https://remnant2.wiki.fextralife.com/Charred+Sentry`],
  },
  {
    id: 'htUq3D',
    name: 'C.E. Sigma',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/ce_sigma.jpg',
    wikiLinks: [],
    bleedResistance: 50,
    fireResistance: 15,
    shockResistance: -15,
    acidResistance: -15,
    notes: 'htUq3D',
  },
  {
    id: 'LTegp8',
    name: 'C.E. Theta',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/ce_theta.jpg',
    wikiLinks: [],
    bleedResistance: 50,
    fireResistance: 15,
    shockResistance: -15,
    acidResistance: -15,
  },
  {
    id: '8gdAsr',
    name: 'Cursed Wretch',
    dlc: 'dlc1',
    category: 'aberration',
    imagePath: '/enemies/aberration/cursed_wretch.jpg',
    location: { world: 'Losomn', dungeon: ['The Forgotten Commune'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Cursed+Wretch'],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    name: 'Deathsower',
    category: 'aberration',
    imagePath: '/enemies/aberration/deathsower.jpg',
    wikiLinks: [],
    id: '9WF4mB',
  },
  {
    id: 'BfQM69',
    name: 'Deceitful Augur',
    category: 'aberration',
    imagePath: '/enemies/aberration/deceitful_augur1.jpg',
    wikiLinks: [],
  },
  {
    name: 'Defiler',
    category: 'aberration',
    imagePath: '/enemies/aberration/defiler.jpg',
    location: { world: 'Yaesha', dungeon: ['Forgotten Field'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Defiler'],
    id: 'y55dZT',
  },
  {
    id: 'y38EwN',
    name: 'Desolate Stalker',
    category: 'aberration',
    imagePath: '/enemies/aberration/desolate_stalker2.jpg',
    wikiLinks: [],
  },
  {
    id: 'z4NeZM',
    name: 'Dire Fiend',
    dlc: 'dlc1',
    category: 'aberration',
    imagePath: '/enemies/aberration/dire_fiend.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Dire+Fiend'],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    id: '2yRGvb',
    name: 'E.D. Alpha',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/ed_alpha.jpg',
    location: { world: `N'Erud`, dungeon: ['Tower of the Unseen'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/E+D+Alpha'],
    bleedResistance: 50,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    id: 'ddJow9',
    name: 'E.D.V.A.',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/edva.jpg',
    wikiLinks: [],
    bleedResistance: 50,
    fireResistance: 10,
    shockResistance: -15,
    acidResistance: -15,
  },
  {
    id: 'J3FKtE',
    name: 'Emberkeeper',
    category: 'aberration',
    imagePath: '/enemies/aberration/emberkeeper.jpg',
    wikiLinks: [],
  },
  {
    id: 'kJdrM9',
    name: 'Emberwatcher',
    category: 'aberration',
    imagePath: '/enemies/aberration/emberwatcher.jpg',
    wikiLinks: [],
  },
  {
    name: 'Fester',
    category: 'aberration',
    imagePath: '/enemies/aberration/fester.jpg',
    location: { world: 'Yaesha', dungeon: [`Endaira's End`] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Fester'],
    id: 'Qpta3f',
  },
  {
    id: 'WYX6tH',
    name: 'Fetid Corpse',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/fetid_corpse.jpg',
    location: { world: `N'Erud`, dungeon: ['Void Vessel Facility'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Fetid+Corpse'],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    id: '2zRPQ5',
    name: 'Firth: The Oathkeeper',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/firth_the_oathkeeper.jpg',
    location: { world: 'Losomn', dungeon: ['Malefic Palace'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Firth:+The+Oathkeeper'],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    id: 'E4dD3r',
    name: 'Flintblade Marauder',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/flintblade_marauder.jpg',
    wikiLinks: [],
    bleedResistance: -10,
  },
  {
    id: 'E5j8Ge',
    name: 'Flintblade Prowler',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/flintblade_prowler.jpg',
    wikiLinks: [],
    bleedResistance: -10,
  },
  {
    id: 'As28CR',
    name: 'Gorecarver',
    dlc: 'dlc1',
    category: 'aberration',
    imagePath: '/enemies/aberration/gorecarver.jpg',
    location: { world: 'Losomn', dungeon: ['Derelict Lighthouse'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Gorecarver'],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    name: 'Goreglut',
    category: 'aberration',
    imagePath: '/enemies/aberration/goreglut.jpg',
    wikiLinks: [],
    id: 'ae4tUj',
  },
  {
    id: '2zr34P',
    name: 'Gorge',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/gorge.jpg',
    location: {
      world: 'Losomn',
      dungeon: [
        "Cotton's Kiln",
        "Butcher's Quarter",
        'Sunken Haunt',
        'Derelict Lighthouse',
      ],
    },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Gorge'],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    id: 'Shoq7M',
    name: 'Grimshot',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/grimshot1.jpg',
    wikiLinks: [],
    bleedResistance: -10,
  },
  {
    id: 'tYVip3',
    name: 'Highborn Stalker',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/highborn_stalker.jpg',
    wikiLinks: [],
  },
  {
    id: 'cTNC5t',
    name: 'Lichwing',
    category: 'aberration',
    imagePath: '/enemies/aberration/lichwing.jpg',
    wikiLinks: [],
  },
  {
    id: '5QcPV9',
    name: 'Little Gorge',
    dlc: 'dlc1',
    category: 'aberration',
    imagePath: '/enemies/aberration/little_gorge1.jpg',
    location: { world: 'Losomn', dungeon: ['Forlorn Coast'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Little+Gorge'],
  },
  {
    id: 'n9BjJm',
    name: 'Maleficient Glimmer',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/maleficient_glimmer1.jpg',
    wikiLinks: [],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    id: 'fALQ5i',
    name: 'Malpractitioner',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/malpractitioner.jpg',
    wikiLinks: [],
  },
  {
    id: '3GvXys',
    name: 'Mangled Atoner',
    dlc: 'dlc1',
    category: 'aberration',
    imagePath: '/enemies/aberration/mangled_atoner.jpg',
    location: { world: 'Losomn', dungeon: ['Forlorn Coast'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Mangled+Atoner'],
    bleedResistance: 5,
    fireResistance: 10,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    name: 'Mantagora',
    category: 'aberration',
    imagePath: '/enemies/aberration/mantagora.jpg',
    location: { world: 'Yaesha', dungeon: ['Imperial Gardens'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Mantagora'],
    id: 'UdHg8g',
  },
  {
    id: 'ypiHR2',
    name: 'Mournshot',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/mournshot.jpg',
    wikiLinks: [],
    bleedResistance: -10,
  },

  {
    id: 'Ls6k9S',
    name: 'Plaguebringer',
    category: 'aberration',
    imagePath: '/enemies/aberration/plaguebringer.jpg',
    wikiLinks: [],
  },
  {
    name: 'Progeny',
    category: 'aberration',
    imagePath: '/enemies/aberration/progeny.jpg',
    location: {
      world: `N'Erud`,
      dungeon: [
        'The Putrid Domain',
        'Vault of the Formless',
        'Void Vessel Facility',
        'The Hatchery',
        'The Dark Conduit',
      ],
    },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/The+Progeny'],
    id: '2SpwWM',
  },
  {
    name: 'Protector of the Grove',
    category: 'aberration',
    imagePath: '/enemies/aberration/protector_of_the_grove.png',
    wikiLinks: [],
    id: 'Xqp2j6',
  },
  {
    name: 'Restless Spirit',
    category: 'aberration',
    imagePath: '/enemies/aberration/restless_spirit.jpg',
    location: {
      world: `N'Erud`,
      dungeon: [
        `Astropath's Respite`,
        'Spectrum Nexus',
        'Terminus Station',
        'Tower of the Unseen',
      ],
    },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Restless+Spirit'],
    id: '9sBqhu',
  },
  {
    id: '2Af6cZ',
    name: 'Ripsaw',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/ripsaw.jpg',
    location: { world: 'Losomn', dungeon: ['Morrow Parish'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Ripsaw'],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    name: 'Rot',
    category: 'aberration',
    imagePath: '/enemies/aberration/rot.jpg',
    location: {
      world: 'Yaesha',
      dungeon: ['The Chimney', 'The Twisted Chantry'],
    },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Rot'],
    id: 'DZB6Ut',
  },
  {
    name: 'Ruinweaver',
    category: 'aberration',
    imagePath: '/enemies/aberration/ruinweaver.jpg',
    wikiLinks: [],
    id: '4N9moU',
  },
  {
    id: '4SkkwG',
    name: 'Scorchslinger',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/scorchslinger.jpg',
    wikiLinks: [],
    bleedResistance: -10,
    fireResistance: 10,
  },
  {
    id: 'tRC6Br',
    name: 'Scorchstrike',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/scorchstrike.jpg',
    wikiLinks: [],
    bleedResistance: -10,
    fireResistance: 10,
  },
  {
    name: 'S.D. OA7',
    category: 'aberration',
    imagePath: '/enemies/aberration/sd_0a7.jpg',
    location: { world: `N'Erud`, dungeon: [`Dormant N'Erudian Facility`] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/S.D.+0A7'],
    id: 'YwbM9W',
  },
  {
    name: 'S.D. OC1',
    category: 'aberration',
    imagePath: '/enemies/aberration/sd_oc1.jpg',
    wikiLinks: [],
    id: 'xMYk33',
  },
  {
    name: 'S.D.R. 17',
    category: 'aberration',
    imagePath: '/enemies/aberration/sdr17.jpg',
    wikiLinks: [],
    id: 'WFZqz9',
  },
  {
    id: '9jGvP5',
    name: 'Seer of the Veil',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/seer_of_the_veil.jpg',
    wikiLinks: [],
    fireResistance: 5,
    shockResistance: -5,
    acidResistance: 10,
    notes: 'Immune to Corroded Status',
  },
  {
    name: 'Severed Husk',
    category: 'aberration',
    imagePath: '/enemies/aberration/severed_husk1.jpg',
    wikiLinks: [],
    id: 'wnJEw3',
  },
  {
    id: 'xL33mc',
    name: 'Shadowrend Warden',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/shadowrend_warden.jpg',
    wikiLinks: [],
    bleedResistance: 15,
    shockResistance: -10,
  },
  {
    id: 'Tai6KG',
    name: 'Sliverwing Marauder',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/silverwing_marauder1.jpg',
    wikiLinks: [],
  },
  {
    id: 'h8nNGJ',
    name: 'Sorrow Weaver',
    category: 'aberration',
    imagePath: '/enemies/aberration/sorrow_weaver.jpg',
    wikiLinks: [],
  },
  {
    id: '',
    name: 'Soulshrieker',
    category: 'aberration',
    imagePath: '/enemies/aberration/soulshrieker.jpg',
    wikiLinks: [],
  },
  {
    name: 'Squalid Creeper',
    category: 'aberration',
    imagePath: '/enemies/aberration/squalid_creeper1.jpg',
    wikiLinks: [],
    id: 'cD4JJv',
  },
  {
    name: 'Stonewing Lurker',
    category: 'aberration',
    imagePath: '/enemies/aberration/stonewing_lurker.png',
    wikiLinks: [],
    id: 'Xwrqi2',
  },
  {
    name: 'Talonscythe',
    category: 'aberration',
    imagePath: '/enemies/aberration/talonscythe.jpg',
    wikiLinks: [],
    id: 'k5VEbQ',
  },
  {
    name: 'The Bloodless Heir',
    category: 'aberration',
    imagePath: '/enemies/aberration/the_bloodless_heir.png',
    wikiLinks: [],
    id: 'ox4KUX',
  },
  {
    id: 'gCm5Ry',
    name: 'The Emissary',
    category: 'aberration',
    imagePath: '/enemies/aberration/the_emissary.png',
    wikiLinks: [`https://remnant2.wiki.fextralife.com/The+Emissary`],
  },
  {
    id: '6o2WBN',
    name: 'The Executioner',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/executioner.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/The+Executioner'],
    bleedResistance: 5,
    fireResistance: 5,
    shockResistance: 5,
    acidResistance: 5,
  },
  {
    id: 'Cqqgq8',
    name: 'The Fractured',
    category: 'aberration',
    imagePath: '/enemies/aberration/the_fractured.png',
    wikiLinks: [],
  },
  {
    id: '5xJq5F',
    name: 'Thunderpiercer',
    dlc: 'dlc1',
    category: 'aberration',
    imagePath: '/enemies/aberration/thunderpiercer.jpg',
    location: { world: 'Losomn', dungeon: ['Derelict Lighthouse'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Thunderpiercer'],
    bleedResistance: -10,
  },
  {
    id: 'SRrDo3',
    name: 'Tortured Flame',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/tortured_flame.jpg',
    wikiLinks: [],
    bleedResistance: -10,
    fireResistance: 50,
    meleeResistance: -35,
    notes: 'Immune to Burning Status',
  },
  {
    id: '7KEpUS',
    name: 'Veilstalker',
    category: 'aberration',
    imagePath: '/enemies/aberration/veilstalker.jpg',
    wikiLinks: [],
  },
  {
    id: 'yyL5ZQ',
    name: 'Venomspine',
    category: 'aberration',
    imagePath: '/enemies/aberration/venomspine.jpg',
    wikiLinks: [],
  },
  {
    id: 'U7NzP4',
    name: 'Vilethorn Brawler',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/vilethorn_brawler.jpg',
    wikiLinks: [],
    bleedResistance: -10,
  },
  {
    id: 'xSk9aN',
    name: 'Vilethorn Scrapper',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/vilethorn_scrapper.jpg',
    wikiLinks: [],
    bleedResistance: -10,
  },
  {
    id: 'Y5Ak63',
    name: 'Void Illusion',
    category: 'aberration',
    imagePath: '/enemies/aberration/void_illusion.jpg',
    wikiLinks: [],
  },
  {
    name: 'Voidmaw',
    category: 'aberration',
    imagePath: '/enemies/aberration/voidmaw.jpg',
    wikiLinks: [],
    id: '38urCi',
  },
  {
    name: 'Voidmite',
    category: 'aberration',
    imagePath: '/enemies/aberration/voidmite.jpg',
    wikiLinks: [],
    id: 'Ly4tNo',
  },
  {
    name: 'W.D. 109',
    category: 'aberration',
    imagePath: '/enemies/aberration/wd_109.jpg',
    location: {
      world: `N'Erud`,
      dungeon: [
        'Void Vessel Facility',
        'The Putrid Domain',
        'Vault of the Formless',
        'The Hatchery',
        'The Dark Conduit',
      ],
    },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/W+D+109'],
    id: 'FH5Ttb',
  },
  {
    name: 'Weald Stalker and Gnarled Archer',
    category: 'aberration',
    imagePath: '/enemies/aberration/weald_stalker_and_gnarled_archer.jpg',
    location: { world: 'Yaesha', dungeon: ['Floating Forests'] },
    wikiLinks: [
      'https://remnant2.wiki.fextralife.com/The+Weald+Stalker+and+The+Gnarled+Archer',
    ],
    id: 'os8Epw',
  },
  {
    name: 'Wither',
    category: 'aberration',
    imagePath: '/enemies/aberration/wither.jpg',
    location: { world: 'Yaesha', dungeon: ['The Lament'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Wither'],
    id: 'o8tCDP',
  },
  {
    id: '64wuWP',
    name: 'Wraithliege',
    dlc: 'dlc1',
    category: 'aberration',
    imagePath: '/enemies/aberration/wraithliege.jpg',
    location: { world: 'Losomn', dungeon: ['Pathway of the Fallen'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Wraithliege'],
    bleedResistance: 10,
    fireResistance: -5,
    shockResistance: -10,
  },
  {
    name: 'Wretched Crawler',
    category: 'aberration',
    imagePath: '/enemies/aberration/wretched_crawler.jpg',
    wikiLinks: [],
    id: 'Pa46sk',
  },
] as const satisfies Enemy[];

const addsEnemies = [
  {
    id: '39Yoor',
    name: 'Astropath Phantom (Orange)',
    dlc: 'base',
    category: 'add',
    wikiLinks: [],
    bleedResistance: 'immune',
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'fV6d7N',
    name: 'Astropath Phantom (Pink)',
    dlc: 'base',
    category: 'add',
    wikiLinks: [],
    bleedResistance: 'immune',
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'Muo5Zc',
    name: 'Magister Dullain Flightless Fae Soldiers',
    dlc: 'base',
    category: 'add',
    wikiLinks: [],
    meleeResistance: -15,
  },
  {
    id: 'P6N7Rs',
    name: 'One True King Weapon',
    dlc: 'dlc1',
    category: 'add',
    wikiLinks: [],
  },
  {
    id: 'h2k3rG',
    name: 'Primogenitor Larva Corpse',
    dlc: 'base',
    category: 'add',
    wikiLinks: [],
    notes: '',
  },
  {
    id: 'YQZeR8',
    name: 'The Huntress Small Faerie',
    dlc: 'base',
    category: 'add',
    wikiLinks: [],
    fireResistance: -10,
    shockResistance: -10,
  },
  {
    id: 's8vXqN',
    name: 'The Nightweaver Bugs',
    dlc: 'base',
    category: 'add',
    wikiLinks: [],
  },

  {
    id: 'xMw8Bv',
    name: 'The Red Prince Clone',
    dlc: 'base',
    category: 'add',
    wikiLinks: [],
    bleedResistance: 25,
  },
] as const satisfies Enemy[];

export const bossEnemies = [
  {
    id: 'Ws384W',
    name: 'Abomination',
    dlc: 'base',
    category: 'boss',
    location: { world: `N'Erud`, dungeon: [`The Putrid Domain`] },
    imagePath: '/enemies/boss/abomination1.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Abomination'],
    bleedResistance: 15,
    fireResistance: -15,
    shockResistance: -15,
    acidResistance: 15,
  },
  {
    id: 'ug7BZq',
    name: 'Abyssal Dreadnought',
    dlc: 'base',
    category: 'aberration',
    imagePath: '/enemies/aberration/abyssal_dreadnought.jpg',
    wikiLinks: [],
    bleedResistance: 15,
    fireResistance: -15,
    shockResistance: -15,
    acidResistance: 15,
  },
  {
    name: 'Befouled Altar',
    category: 'boss',
    imagePath: '/enemies/boss/befouled_altar1.jpg',
    location: { world: 'Losomn', dungeon: ['The Forgotten Commune'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Befouled+Altar'],
    id: 'eN7hxx',
  },
  {
    name: 'Bloat King',
    category: 'boss',
    imagePath: '/enemies/boss/bloat_king2.jpg',
    location: { world: 'Losomn', dungeon: ['The Great Sewers'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Bloat+King'],
    id: '3efMrV',
  },
  {
    name: 'Bruin, Blade of the King',
    category: 'boss',
    imagePath: '/enemies/boss/bruin1.jpg',
    dlc: 'dlc1',
    location: { world: 'Losomn', dungeon: ['Glistering Cloister'] },
    wikiLinks: [
      'https://remnant2.wiki.fextralife.com/Bruin,+Blade+of+the+King',
    ],
    id: 'wEexW3',
  },
  {
    name: 'Cancer',
    category: 'boss',
    imagePath: '/enemies/boss/cancer.jpg',
    location: { world: 'Root Earth', dungeon: ['Ashen Wasteland'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Cancer'],
    id: 'jEFi2h',
  },
  {
    name: 'Cinderclad Forge',
    category: 'boss',
    dlc: 'dlc2',
    imagePath: '/enemies/boss/cinderclad_monolith.png',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Cinderclad+Monolith'],
    id: 'dA3qvW',
  },
  {
    id: '73ZNjb',
    name: 'Fae Knight Council',
    dlc: 'base',
    category: 'boss',
    imagePath: '/enemies/boss/fae_knight_council.jpg',
    location: { world: 'Losomn', dungeon: ['Council Chamber'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/The+Council'],
    bleedResistance: 15,
    fireResistance: 15,
    acidResistance: -10,
  },
  {
    id: '7utUfw',
    name: 'Gwendil: The Unburnt',
    dlc: 'base',
    category: 'boss',
    location: { world: 'Losomn', dungeon: [`Cotton's Kiln`] },
    imagePath: '/enemies/boss/gwendil1.jpg',
    wikiLinks: [`https://remnant2.wiki.fextralife.com/Gwendil+The+Unburnt`],
    bleedResistance: -10,
    fireResistance: 20,
    shockResistance: -15,
  },
  {
    name: `Kaeula's Shadow`,
    category: 'boss',
    imagePath: '/enemies/boss/kaeula.jpg',
    location: { world: 'Yaesha', dungeon: [`Kaeula's Rest`] },
    wikiLinks: [`https://remnant2.wiki.fextralife.com/Kaeula's+Shadow`],
    id: 'E7LieX',
  },
  {
    name: 'Legion',
    category: 'boss',
    imagePath: '/enemies/boss/legion.jpg',
    location: { world: 'Yaesha', dungeon: ['The Twisted Chantry'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Legion'],
    id: 'dtB8ac',
  },
  {
    id: 'BvjT2V',
    name: 'Magister Dullain',
    dlc: 'base',
    category: 'boss',
    location: { world: 'Losomn', dungeon: ['Shattered Gallery'] },
    imagePath: '/enemies/boss/magister_dullain.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Magister+Dullain'],
    fireResistance: 15,
    shockResistance: -10,
    acidResistance: 20,
    notes: 'Immune to Corroded Status',
  },
  {
    name: 'Master of Feasts',
    category: 'boss',
    imagePath: '/enemies/boss/master_of_feasts.jpg',
    location: { world: 'Losomn', dungeon: ['The Great Hall'] },
    wikiLinks: [],
    id: 'GkCc3H',
  },
  {
    name: 'Mother Mind',
    category: 'boss',
    imagePath: '/enemies/boss/mother_mind.jpg',
    location: { world: 'Yaesha', dungeon: ['The Nameless Nest'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Mother+Mind'],
    id: 'HTbt5M',
  },
  {
    id: 'JBn8ob',
    name: 'Primogenitor',
    dlc: 'base',
    category: 'boss',
    imagePath: '/enemies/boss/primogenitor.jpg',
    location: { world: `N'Erud`, dungeon: ['The Hatchery'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Primogenitor'],
  },
  {
    name: 'Root Nexus (Normal)',
    category: 'boss',
    imagePath: '/enemies/boss/root_nexus_normal.jpg',
    location: { world: 'Yaesha', dungeon: ['The Forgotten Grove'] },
    wikiLinks: [],
    id: 'tuJA9Q',
  },
  {
    name: 'Root Nexus (Fields)',
    category: 'boss',
    imagePath: '/enemies/boss/root_nexus_fields.jpg',
    location: { world: 'Yaesha', dungeon: ['Forgotten Field'] },
    wikiLinks: [],
    id: '4Hg99W',
  },
  {
    name: 'Seed Contraption',
    category: 'boss',
    imagePath: '/enemies/boss/seed_contraption.jpg',
    location: { world: 'Yaesha', dungeon: ['The Chimney'] },
    wikiLinks: [],
    id: '2HnPj9',
  },
  {
    name: 'Shrewd',
    category: 'boss',
    imagePath: '/enemies/boss/shrewd.jpg',
    location: { world: 'Yaesha', dungeon: ['The Expanding Glade'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Shrewd'],
    id: 'tfuw8P',
  },
  {
    id: '3GZ6k2',
    name: 'The Astropath',
    dlc: 'base',
    category: 'boss',
    imagePath: '/enemies/boss/astropath.jpg',
    location: { world: `N'Erud`, dungeon: [`Astropath's Respite`] },
    wikiLinks: [`https://remnant2.wiki.fextralife.com/The+Astropath`],
    bleedResistance: 'immune',
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'wb22RX',
    name: "The Custodian's Eye",
    dlc: 'base',
    category: 'boss',
    location: { world: `N'Erud`, dungeon: ['Spectrum Nexus'] },
    imagePath: '/enemies/boss/custodians_eye.jpg',
    wikiLinks: [`https://remnant2.wiki.fextralife.com/The+Custodian's+Eye`],
    bleedResistance: 25,
    fireResistance: 25,
    shockResistance: -15,
    acidResistance: -15,
  },
  {
    id: 'm2vW25',
    name: 'The Huntress',
    dlc: 'base',
    category: 'boss',
    location: {
      world: 'Losomn',
      dungeon: ['Brocwithe Quarter', 'Forsaken Quarter', 'Ironborough'],
    },
    imagePath: '/enemies/boss/huntress1.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/The+Huntress'],
    bleedResistance: -10,
    fireResistance: -10,
    acidResistance: 15,
  },
  {
    id: '35mW3e',
    name: 'The Red Prince',
    dlc: 'base',
    category: 'boss',
    imagePath: '/enemies/boss/red_prince.jpg',
    location: { world: 'Losomn', dungeon: ['Gilded Chambers'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/The+Red+Prince'],
    bleedResistance: 10,
    fireResistance: 20,
    shockResistance: -10,
  },
  {
    id: 'P2tk7e',
    name: 'The Stonewarden',
    category: 'boss',
    dlc: 'dlc2',
    imagePath: '/enemies/boss/the_stonewarden.png',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/The+Stonewarden'],
  },
  {
    id: 'S8mXCm',
    name: 'The Sunken Witch',
    dlc: 'dlc1',
    category: 'boss',
    imagePath: '/enemies/boss/sunken_witch.jpg',
    location: { world: 'Losomn', dungeon: ['Sunken Haunt'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Sunken+Witch'],
    fireResistance: -5,
  },
  {
    name: 'Venom',
    category: 'boss',
    imagePath: '/enemies/boss/venom.jpg',
    location: { world: 'Root Earth', dungeon: ['Corrupted Harbor'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Venom'],
    id: '5GEAx3',
  },
] as const satisfies Enemy[];

const enemies = [
  {
    id: 'aaL9vR',
    name: 'Barnacle Base',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    fireResistance: -10,
  },
  {
    id: 'co6zUD',
    name: 'Barnacle Crab',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    fireResistance: -15,
    shockResistance: -10,
    acidResistance: 10,
  },
  {
    id: 'mytK6V',
    name: 'Barnacle Crab Hatchery',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    fireResistance: -15,
    shockResistance: -10,
    acidResistance: 10,
    notes: 'Mini crabs (?)',
  },
  {
    id: 'u5zS7Z',
    name: 'Barnacle Hatchery',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    fireResistance: -15,
    shockResistance: -10,
    acidResistance: 10,
  },
  {
    id: 'vz7HU3',
    name: 'Dran Shotgunner',
    dlc: 'dlc1',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: -10,
  },
  {
    id: 'dvNi8s',
    name: 'Engineering Drone',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 50,
    fireResistance: 10,
    shockResistance: -10,
    acidResistance: -15,
  },
  {
    id: '3UVmMc',
    name: 'Engineering Drone Small Drone',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 50,
  },
  {
    id: '4GT9aa',
    name: 'Engineering Drone Variant',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 50,
    fireResistance: 10,
    shockResistance: -15,
    acidResistance: -15,
  },
  {
    id: 'oYyyh7',
    name: 'Fae Bone Harvester',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    fireResistance: -10,
    acidResistance: 10,
  },
  {
    id: 'n7bhQF',
    name: 'Fae Bone Harvester Albino',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    fireResistance: -10,
    acidResistance: 10,
    notes: 'Alchemist Event',
  },
  {
    id: 'XXeJ46',
    name: 'Fae Executioner',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    acidResistance: -5,
  },
  {
    id: '7TQzrc',
    name: 'Fae Feastmaster',
    dlc: 'dlc1',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    acidResistance: -5,
  },
  {
    id: 'g7iGJv',
    name: 'Fae Impaler',
    dlc: 'dlc1',
    category: 'enemy',
    wikiLinks: [],
  },
  {
    id: 'T4GJyN',
    name: 'Fae Iron Maiden',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 10,
    shockResistance: -10,
    acidResistance: -5,
  },
  {
    id: '8UMqKJ',
    name: 'Fae Knight Golden',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 10,
    fireResistance: -5,
    shockResistance: -10,
  },
  {
    id: 'bjFqc6',
    name: 'Fae Knight Shaed',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 10,
    fireResistance: -5,
    shockResistance: -10,
  },
  {
    id: 'UHva9T',
    name: 'Fae Painless',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 10,
  },
  {
    id: 'J7xN9S',
    name: 'Fae Penitent',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    fireResistance: 10,
    acidResistance: -10,
  },
  {
    id: '8o9cRY',
    name: 'Fae Penitent (Healer)',
    dlc: 'dlc1',
    category: 'enemy',
    wikiLinks: [],
    acidResistance: -10,
  },
  {
    id: 't8W3qT',
    name: 'Fae Royal Archer',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    shockResistance: -10,
  },
  {
    id: '5gpmSx',
    name: 'Fae Soldier',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
  },
  {
    id: 'EHHn7v',
    name: 'Fae Soldier Armored',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    shockResistance: -10,
  },
  {
    id: 'N48baF',
    name: 'Forgotten',
    dlc: 'dlc1',
    category: 'enemy',
    wikiLinks: [],
  },
  {
    id: 'g5VkSC',
    name: 'Forgotten (Purple)',
    dlc: 'dlc1',
    category: 'enemy',
    wikiLinks: [],
  },
  {
    id: 'S4jqVf',
    name: 'Granadier Dran',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: -10,
    fireResistance: 10,
  },
  {
    id: 'z4yZY4',
    name: 'Hollowed',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    fireResistance: -5,
    shockResistance: -5,
    meleeResistance: -15,
  },
  {
    id: '6A4c7x',
    name: 'Hollowed Psyker',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 10,
    fireResistance: -10,
    shockResistance: -10,
    acidResistance: 10,
  },
  {
    id: 'hB86F8',
    name: 'Labyrinth Creature',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    fireResistance: 50,
    shockResistance: 50,
    acidResistance: -25,
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'BvoK6t',
    name: 'Labyrinth Creature 0 Arms',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    fireResistance: 50,
    shockResistance: 50,
    acidResistance: -25,
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'qsAuH9',
    name: 'Labyrinth Creature Elite',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    fireResistance: 50,
    shockResistance: 50,
    acidResistance: -25,
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'EX99Ua',
    name: 'Labyrinth Pillar',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    fireResistance: 50,
    shockResistance: 50,
    acidResistance: -25,
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'eAt3EK',
    name: 'Labyrinth Sphere',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    fireResistance: 50,
    shockResistance: 50,
    acidResistance: -25,
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'DW5qp9',
    name: 'Labyrinth Watcher',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    fireResistance: 50,
    shockResistance: 50,
    acidResistance: -25,
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'gLut8N',
    name: 'Luminescent Bloat',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 15,
    fireResistance: -10,
    shockResistance: 15,
    acidResistance: -10,
  },
  {
    id: '73xW7r',
    name: 'Phantom (Green)',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'hR6Bp4',
    name: 'Phantom (Orange)',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    notes: 'Immune to Bleeding Status',
  },
  {
    id: 'h2FQkM',
    name: 'Phantom (Pink)',
    dlc: 'base',
    category: 'enemy',
    wikiLinks: [],
    bleedResistance: 'immune',
    notes: 'Immune to Bleeding Status',
  },
] as const satisfies Enemy[];

export const worldBossEnemies = [
  {
    name: 'Annihilation',
    category: 'world boss',
    imagePath: '/enemies/worldboss/annihilation1.jpg',
    location: { world: 'Root Earth', dungeon: ['Blackened Citadel'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Annihilation'],
    id: 'g9FwDF',
  },
  {
    name: 'Corrupted Ravager',
    category: 'world boss',
    imagePath: '/enemies/worldboss/ravager.jpg',
    location: { world: 'Yaesha', dungeon: [`Ravager's Lair`] },
    wikiLinks: [`https://remnant2.wiki.fextralife.com/Corrupted+Ravager`],
    id: '4zrNaX',
  },
  {
    name: 'Corruptor',
    category: 'world boss',
    imagePath: '/enemies/worldboss/corruptor.jpg',
    location: { world: 'Yaesha', dungeon: ['The Great Bole'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Corruptor'],
    id: '6ABbmi',
  },
  {
    id: '8xK6gM',
    name: 'Faelin',
    dlc: 'base',
    category: 'world boss',
    location: { world: 'Losomn', dungeon: ['Beatific Gallery'] },
    imagePath: '/enemies/worldboss/faelin1.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Faelin'],
    bleedResistance: 25,
    fireResistance: 15,
    acidResistance: -15,
  },
  {
    id: 'aJ8Tru',
    name: 'Faerin',
    dlc: 'base',
    category: 'world boss',
    location: { world: 'Losomn', dungeon: ['Malefic Gallery'] },
    imagePath: '/enemies/worldboss/faerin1.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Faerin'],
    bleedResistance: 25,
    fireResistance: 15,
    acidResistance: -15,
  },
  {
    id: 'R4iYM2',
    name: 'Lydusa',
    dlc: 'dlc2',
    category: 'world boss',
    imagePath: '/enemies/worldboss/lydusa.png',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Lydusa'],
  },
  {
    id: 'hZ7siN',
    name: 'Labyrinth Sentinel',
    dlc: 'base',
    category: 'world boss',
    location: { world: 'Labyrinth', dungeon: ['Labyrinth'] },
    imagePath: '/enemies/worldboss/labyrinth_sentinel.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Labyrinth+Sentinel'],
    bleedResistance: 'immune',
    fireResistance: 'immune',
    shockResistance: 'immune',
    acidResistance: 'immune',
    notes: 'Immune to all Statuses',
  },
  {
    name: `Sha'Hala: Guardian of N'Erud`,
    category: 'world boss',
    imagePath: '/enemies/worldboss/sha_hala_normal.jpg',
    location: { world: `N'Erud`, dungeon: [`Sentinel's Keep`] },
    wikiLinks: [
      `https://remnant2.wiki.fextralife.com/Sha'Hala+Spectral+Guardian+of+N'Erud`,
    ],
    id: '2ZmDKS',
  },
  {
    name: `Sha'Hala: Spectral Guardian of N'Erud`,
    category: 'world boss',
    imagePath: '/enemies/worldboss/sha_hala_metaphysical.jpg',
    location: { world: `N'Erud`, dungeon: [`Sentinel's Keep`] },
    wikiLinks: [
      `https://remnant2.wiki.fextralife.com/Sha'Hala+Spectral+Guardian+of+N'Erud`,
    ],
    id: 'S3JrnD',
  },
  {
    name: `Tal'Ratha`,
    category: 'world boss',
    imagePath: '/enemies/worldboss/tal_ratha_normal1.jpg',
    location: { world: `N'Erud`, dungeon: [`Forgotten Prison`] },
    wikiLinks: [`https://remnant2.wiki.fextralife.com/Tal+Ratha`],
    id: 'bFt8JS',
  },
  {
    name: `Tal'Ratha (Metaphysical)`,
    category: 'world boss',
    imagePath: '/enemies/worldboss/tal_ratha_metaphysical.jpg',
    location: { world: `N'Erud`, dungeon: [`Forgotten Prison`] },
    wikiLinks: [
      `https://remnant2.wiki.fextralife.com/Tal+Ratha+(Metaphysical)`,
    ],
    id: 'd5c8bN',
  },
  {
    id: '9TzbrC',
    name: 'The Nightweaver',
    dlc: 'base',
    category: 'world boss',
    location: { world: 'Losomn', dungeon: ['Tormented Asylum'] },
    imagePath: '/enemies/worldboss/nightweaver.jpg',
    wikiLinks: ['https://remnant2.wiki.fextralife.com/Nightweaver'],
    bleedResistance: 20,
    fireResistance: -10,
    shockResistance: -10,
    acidResistance: 10,
  },
  {
    id: 'Fjy5pF',
    name: 'The One True King',
    dlc: 'dlc1',
    category: 'world boss',
    imagePath: '/enemies/worldboss/one_true_king1.jpg',
    location: { world: 'Losomn', dungeon: ['Chamber of the Faithless'] },
    wikiLinks: ['https://remnant2.wiki.fextralife.com/One+True+King'],
  },
] as const satisfies Enemy[];

export const remnantEnemies: Enemy[] = [
  ...aberrationEnemies,
  ...addsEnemies,
  ...bossEnemies,
  ...enemies,
  ...worldBossEnemies,
];