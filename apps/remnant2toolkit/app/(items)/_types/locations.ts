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
  'Earthen Colosseum',
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
      `Lemark District`,
      `Sunken Haunt`,
      `Derelict Lighthouse`,
    ],
    injectables: [`Fiery Graveyard`, `Rookery`, `Oink`, `Ethereal Manor`],
  },
  {
    name: 'Fae Palace',
    world: 'Losomn',
    dungeons: [
      `Beatific Palace`,
      `Beatific Gallery`,
      `Gilded Chambers`,
      `Council Chamber`,
      `Postulant's Parlor`,
      `Glistering Cloister`,
      `Walk of Rememberance`,
    ],
    injectables: [
      `As Above, So Below`,
      `Black and White`,
      `Silver and Gold`,
      `Reflection`,
      `The Flames Event`,
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
      `The Red Throne`,
      `The Widow's Court`,
      `The Great Bole`,
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
      `Dormant N'Erudian Facility`,
    ],
    injectables: [
      `Black Hole`,
      `Robot Hangar`,
      `Sewage Facility`,
      `Shockwire`,
      `Store Room`,
      `The Claw`,
    ],
  },
  {
    name: `N'Erud Wasteland`,
    world: `N'Erud`,
    dungeons: [
      `Phantom Wasteland`,
      `Abyssyal Rift`,
      `Timeless Horizon`,
      `The Eon Vault`,
      'Stagnant Manufactory', // TODO CHECK THIS
    ],
    // TODO Check this
    injectables: [
      `Ascension Spire`,
      `Titan's Reach`,
      `Extraction Hub`,
      `Stealth Maze`,
    ],
  },
  {
    name: 'Streets of Losomn',
    world: `Losomn`,
    dungeons: [
      `Morrow Parish`,
      `Brocwithe Quarter`,
      `Briella's Garden`,
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
      `Seeker's Rest`,
      `Sentinel's Keep`,
    ],
    injectables: [`Elevator Shaft`, `Remains Below`],
  },
  {
    name: `Undead Tombs`,
    world: 'Yaesha',
    dungeons: [`The Twisted Chantry`, `The Chimney`, `The Lament`],
    injectables: [`Living Stone`, `Sarcophagus`, `Hidden Crypt`, `Pillar Hall`],
  },
  {
    name: `Ziggurats`,
    world: 'Yaesha',
    dungeons: [`Endaira's End`, `Proving Grounds`, `Earthen Colosseum`],
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
