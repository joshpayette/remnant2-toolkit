export const WORLD_LOCATIONS = [
  'Losomn',
  `N'Erud`,
  'Yaesha',
  'Labyrinth',
  'Root Earth',
] as const satisfies string[];
export type WorldLocation = (typeof WORLD_LOCATIONS)[number];

export const LOSOMN_DUNGEONS = [
  'Morrow Parish',
  'Forsaken Quarter',
  'Tormented Asylum',
  'Beatific Palace',
  'Ironborough',
  'Brocwithe Quarter',
  'Malefic Palace',
  'Beatific Gallery',
  'Malefic Gallery',
  `Nimue's Retreat`,
  `Cotton's Kiln`,
  `The Great Sewers`,
  `Gilded Chambers`,
  'Shattered Gallery',
  `Butcher's Quarter`,
  'Council Chamber',
  'The Great Hall',
  `Harvester's Reach`,
  `Postulant's Parlor`,
  `Tiller's Rest`,
  `Briella's Garden`,
  `Briella's Reverie`,
  `Hewdas Clock`,
  'Lemark District',
  `Oracle's Refuge`,
  `Forlorn Coast`,
  `Palace of the One True King`,
  `Chamber of the Faithless`,
  `Glistering Cloister`,
  `Sunken Haunt`,
  `Derelict Lighthouse`,
  `The Forgotten Commune`,
  `Pathway of the Fallen`,
  `Walk of Rememberance`,
] as const satisfies string[];
export type LosomnDungeon = (typeof LOSOMN_DUNGEONS)[number];

export const NERUD_DUNGEONS = [
  `Seeker's Rest`,
  'Phantom Wasteland',
  'Timeless Horizon',
  `Sentinel's Keep`,
  `Forgotten Prison`,
  `Abyssyal Rift`,
  `The Eon Vault`,
  `Tal'Ratha's Refuge`,
  `Astropath's Respite`,
  `The Hatchery`,
  `The Putrid Domain`,
  `Spectrum Nexus`,
  `The Dark Conduit`,
  `Dormant N'Erudian Facility`,
  `Terminus Station`,
  `Tower of the Unseen`,
  `Vault of the Formless`,
  `Void Vessel Facility`,
  `Extraction Hub`,
  `Titan's Reach`,
  `Alepsis-Taura`,
  'Ascension Spire',
  `Stagnant Manufactory`,
  `Withered Necropolis`,
  'Detritus Foundry',
  'Logistics Bridge',
  'Agronomy Sector',
  'Athenaeum Wek',
  'Mucid Terrarium',
  'Bicentennial Man',
  'Devoid Quietus',
] as const satisfies string[];
export type NErudDungeon = (typeof NERUD_DUNGEONS)[number];

export const YAESHA_DUNGEONS = [
  `The Red Throne`,
  `Withering Weald`,
  `The Far Woods`,
  `The Widow's Court`,
  `The Great Bole`,
  `The Forbidden Grove`,
  `Faithless Thicket`,
  `Ravager's Lair`,
  `The Expanding Glade`,
  `Kaeula's Rest`,
  `The Nameless Nest`,
  `The Twisted Chantry`,
  `Cathedral of Omens`,
  `The Chimney`,
  `Endaira's End`,
  `Forgotten Field`,
  `Imperial Gardens`,
  `The Lament`,
  `Dappled Glade`,
  `Kaora Kuri Nest`,
  `Root Nexus`,
  `The Forgotten Grove`,
  'Floating Forests',
  'Infested Abyss',
  'Ancient Canopy',
  'Proving Grounds',
  `Goddess's Rest`,
  `Deserted Atelier`,
  `Bloodless Throne`,
  `Glittering Grotto`,
  'Luminous Vale',
  'Earthen Coliseum',
] as const satisfies string[];
export type YaeshaDungeon = (typeof YAESHA_DUNGEONS)[number];

export const ROOT_EARTH_DUNGEONS = [
  'Ashen Wasteland',
  'Corrupted Harbor',
  'Blackened Citadel',
  'Twilight Vale',
] as const satisfies string[];
export type RootEarthDungeon = (typeof ROOT_EARTH_DUNGEONS)[number];

export const LABYRINTH_DUNGEONS = [
  'Labyrinth',
  'Fractured Ingress',
] as const satisfies string[];
export type LabyrinthDungeon = (typeof LABYRINTH_DUNGEONS)[number];

export const BIOMES = [
  {
    name: 'Burning City',
    world: 'Losomn',
    dungeons: [
      `Cotton's Kiln`,
      `Butcher's Quarter`,
      `Sunken Haunt`,
      `Derelict Lighthouse`,
    ],
    injectables: [`Fiery Graveyard`, `Rookery`, `Oink`, `Ethereal Manor`],
  },
  {
    name: 'Fae Palace',
    world: 'Losomn',
    dungeons: [
      `Gilded Chambers`,
      `Council Chamber`,
      `Glistering Cloister`,
      `Pathway of the Fallen`,
      `Shattered Gallery`,
      `The Great Hall`,
    ],
    injectables: [
      `As Above, So Below`,
      `Black and White`,
      `Silver and Gold`,
      `Reflection`,
    ],
  },
  {
    name: 'Floating Forests',
    world: 'Yaesha',
    dungeons: [
      `The Nameless Nest`,
      `The Expanding Glade`,
      `Forgotten Field`,
      `Imperial Gardens`,
      `Deserted Atelier`,
      `Goddess's Rest`,
    ],
    injectables: [`Broken Tomb`, `Tower`, `Island Jump`, `Shrine of the Doe`],
  },
  {
    name: 'Jungles of Yaesha',
    world: 'Yaesha',
    dungeons: [
      `Withering Weald`,
      `The Forbidden Grove`,
      `The Far Woods`,
      `Faithless Thicket`,
    ],
    injectables: [`Dappled Glave`, `Koara Kuri Nest`, `Root Nexus`],
  },
  {
    name: 'Losomn Sewers',
    world: 'Losomn',
    dungeons: [
      `The Great Sewers`,
      `Harvester's Reach`,
      `Tiller's Rest`,
      `The Forgotten Commune`,
    ],
    injectables: [`Rising Tides`, `Fae Nest`, `Dran Safe`, `Corpse Drop`],
  },
  {
    name: `N'Erud Underworld`,
    world: `N'Erud`,
    dungeons: [
      `The Putrid Domain`,
      `Vault of the Formless`,
      `Void Vessel Facility`,
      `The Hatchery`,
      `The Dark Conduit`,
      `Mucid Terrarium`,
      `Logistics Bridge`,
      `Stagnant Manufactory`,
    ],
    injectables: [
      `Black Hole`,
      'Power Hub',
      `Robot Hangar`,
      `Sewage Facility`,
      `Shockwire`,
      `Store Room`,
      `The Claw`,
      `Security Drone Maze`,
    ],
  },
  {
    name: `N'Erud Wasteland`,
    world: `N'Erud`,
    dungeons: [
      `Timeless Horizon`,
      `The Eon Vault`,
    ],
    injectables: [`Titan's Reach`, `Extraction Hub`],
  },
  {
    name: 'Streets of Losomn',
    world: `Losomn`,
    dungeons: [
      `Morrow Parish`,
      `Brocwithe Quarter`,
      `Forsaken Quarter`,
      `Ironborough`,
    ],
    injectables: [`Oracle's Refuge`, `Hewdas Clock`, `Briella's Garden`],
  },
  {
    name: `Towers of N'Erud`,
    world: `N'Erud`,
    dungeons: [
      `Astropath's Respite`,
      `Spectrum Nexus`,
      `Terminus Station`,
      `Tower of the Unseen`,
      `Detritus Foundry`,
      `Athenaeum Wek`,
    ],
    injectables: [
      `Elevator Shaft`,
      `Remains Below`,
      `Stargazer's Tomb`,
      `Crop Lab`,
    ],
  },
  {
    name: `Undead Tombs`,
    world: 'Yaesha',
    dungeons: [
      `The Twisted Chantry`,
      `The Chimney`,
      `The Lament`,
      `Infested Abyss`,
    ],
    injectables: [`Living Stone`, `Sarcophagus`, `Hidden Crypt`, `Pillar Hall`],
  },
  {
    name: `Ziggurats`,
    world: 'Yaesha',
    dungeons: [`Endaira's End`, `Proving Grounds`, `Earthen Coliseum`],
    injectables: [`Hidden Chamber`, `Wind Hollow`, `Library`, `Moon's Path`],
  },
] as const satisfies Array<
  | {
      name: string;
      world: 'Losomn';
      dungeons: LosomnDungeon[];
      injectables: string[];
    }
  | {
      name: string;
      world: `N'Erud`;
      dungeons: NErudDungeon[];
      injectables: string[];
    }
  | {
      name: string;
      world: 'Yaesha';
      dungeons: YaeshaDungeon[];
      injectables: string[];
    }
>;
type Injectable = (typeof BIOMES)[number]['injectables'][number];

type LosomnBiome = Extract<(typeof BIOMES)[number], { world: 'Losomn' }>;
type LosomnBiomeName = Extract<
  (typeof BIOMES)[number],
  { world: 'Losomn' }
>['name'];

type NErudBiome = Extract<(typeof BIOMES)[number], { world: `N'Erud` }>;
type NErudBiomeName = Extract<
  (typeof BIOMES)[number],
  { world: `N'Erud` }
>['name'];

type YaeshaBiome = Extract<(typeof BIOMES)[number], { world: 'Yaesha' }>;
type YaeshaBiomeName = Extract<
  (typeof BIOMES)[number],
  { world: 'Yaesha' }
>['name'];

export const LOSOMN_BIOMES = BIOMES.filter(
  (biome) => biome.world === 'Losomn',
) as LosomnBiome[];
export const NERUD_BIOMES = BIOMES.filter(
  (biome) => biome.world === `N'Erud`,
) as NErudBiome[];
export const YAESHA_BIOMES = BIOMES.filter(
  (biome) => biome.world === 'Yaesha',
) as YaeshaBiome[];

type OtherLocation =
  | 'World Drop'
  | 'Vendor'
  | 'Quest'
  | 'Aberration'
  | 'Linked Item';

export type ItemLocation =
  | {
      world: 'Losomn';
      dungeon: LosomnDungeon[] | OtherLocation;
      biome?: never;
      injectable?: Injectable;
    }
  | {
      world: 'Losomn';
      dungeon?: never;
      biome: LosomnBiomeName;
      injectable?: Injectable;
    }
  | {
      world: `N'Erud`;
      dungeon: NErudDungeon[] | OtherLocation;
      biome?: never;
      injectable?: Injectable;
    }
  | {
      world: `N'Erud`;
      dungeon?: never;
      biome: NErudBiomeName;
      injectable?: Injectable;
    }
  | {
      world: 'Yaesha';
      dungeon: YaeshaDungeon[] | OtherLocation;
      biome?: never;
      injectable?: Injectable;
    }
  | {
      world: 'Yaesha';
      dungeon?: never;
      biome: YaeshaBiomeName;
      injectable?: Injectable;
    }
  | {
      world: 'Root Earth';
      dungeon: RootEarthDungeon[] | OtherLocation;
      biome?: never;
      injectable?: Injectable;
    }
  | {
      world: 'Labyrinth';
      dungeon: LabyrinthDungeon[] | OtherLocation;
      biome?: never;
      injectable?: Injectable;
    }
  | { world: 'Ward 13'; dungeon: 'Ward 13' | OtherLocation }
  | { world: 'The Backrooms'; dungeon: 'The Backrooms' }
  | { world: 'Any'; dungeon: OtherLocation };

/**
 * Some items are found in only some of the biome dungeons
 * These overrides allow that logic to be implemented
 */
export const DUNGEON_OVERRIDES: Array<{
  itemId: string;
  dungeons:
    | LosomnDungeon[]
    | NErudDungeon[]
    | YaeshaDungeon[]
    | RootEarthDungeon[]
    | LabyrinthDungeon[];
}> = [
  {
    itemId: 'm0l0u5', // Golden Ribbon
    dungeons: [`Gilded Chambers`, `Council Chamber`, `Glistering Cloister`],
  },
  {
    itemId: 'k8j2r3', // Silver Ribbon
    dungeons: [`Shattered Gallery`, `The Great Hall`, `Pathway of the Fallen`],
  },
  {
    itemId: 'ygwrpd', // Vice Grips, Ascension Spire is both an injectable and dungeon
    dungeons: ['Ascension Spire'],
  },
  {
    itemId: '2rnl2d', // Salvaged Heart, Ascension Spire is both an injectable and dungeon
    dungeons: ['Ascension Spire'],
  },
  {
    itemId: 'rtfwr5', // Microcompressor, Ascension Spire is both an injectable and dungeon
    dungeons: ['Ascension Spire'],
  },
  {
    itemId: 'ayje99', // Meteorite Shard Ring, Ascension Spire is both an injectable and dungeon
    dungeons: ['Ascension Spire'],
  },
  {
    itemId: 'k89bxv', // Burden of the Mariner, Ascension Spire is both an injectable and dungeon
    dungeons: ['Ascension Spire'],
  },
];
