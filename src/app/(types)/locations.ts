export type WorldLocation =
  | 'Losomn'
  | `N'Erud`
  | 'Yaesha'
  | 'Labyrinth'
  | 'Root Earth'

export type LosomnDungeon =
  | 'Morrow Parish'
  | 'Forsaken Quarter'
  | 'Tormented Asylum'
  | 'Beatific Palace'
  | 'Ironborough'
  | 'Brocwithe Quarter'
  | 'Malefic Palace'
  | 'Beatific Gallery'
  | 'Malefic Gallery'
  | `Nimue's Retreat`
  | `Cotton's Kiln`
  | `The Great Sewers`
  | `Gilded Chambers`
  | 'Shattered Gallery'
  | `Butcher's Quarter`
  | 'Council Chamber'
  | 'The Great Hall'
  | `Harvester's Reach`
  | `Postulant's Parlor`
  | `Tiller's Rest`
  | `Briella's Garden`
  | `Hewdas Clock`
  | 'Lemark District'
  | `Oracle's Refuge`
  | `Forlorn Coast`
  | `Palace of the One True King`
  | `Chamber of the Faithless`
  | `Glistering Cloister`
  | `Sunken Haunt`
  | `Derelict Lighthouse`
  | `The Forgotten Commune`
  | `Pathway of the Fallen`
  | `Walk of Rememberance`
  | `Luminous Vale`

export type NErudDungeon =
  | `Seeker's Rest`
  | 'Phantom Wasteland'
  | 'Timeless Horizon'
  | `Sentinel's Keep`
  | `Forgotten Prison`
  | `Abyssyal Rift`
  | `The Eon Vault`
  | `Tal'Ratha's Refuge`
  | `Astropath's Respite`
  | `The Hatchery`
  | `The Putrid Domain`
  | `Spectrum Nexus`
  | `The Dark Conduit`
  | `Dormant N'Erudian Facility`
  | `Terminus Station`
  | `Tower of the Unseen`
  | `Vault of the Formless`
  | `Void Vessel Facility`
  | `Extraction Hub`
  | `Titan's Reach`

export type YaeshaDungeon =
  | `The Red Throne`
  | `Withering Weald`
  | `The Far Woods`
  | `The Widow's Court`
  | `The Great Bole`
  | `The Forbidden Grove`
  | `Faithless Thicket`
  | `Ravager's Lair`
  | `The Expanding Glade`
  | `Kaeula's Rest`
  | `The Nameless Nest`
  | `The Twisted Chantry`
  | `Cathedral of Omens`
  | `The Chimney`
  | `Endaira's End`
  | `Forgotten Field`
  | `Imperial Gardens`
  | `The Lament`
  | `Dappled Glade`
  | `Kaora Kuri Nest`
  | `Root Nexus`
  | `The Forgotten Grove`
  | 'Floating Forests'
  | 'Infested Abyss'
  | 'Ancient Canopy'
  | 'Proving Grounds'
  | `Goddess's Rest`
  | `Deserted Atelier`

export type RootEarthDungeon =
  | 'Ashen Wasteland'
  | 'Corrupted Harbor'
  | 'Blackened Citadel'
  | 'Twilight Vale'

const BIOMES = [
  {
    name: 'Burning City',
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
    ],
  },
  {
    name: 'Floating Forests',
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
    dungeons: [
      `Phantom Wasteland`,
      `Abyssyal Rift`,
      `Timeless Horizon`,
      `The Eon Vault`,
    ],
    injectables: [`Ascension Spire`, `Titan's Reach`, `Extraction Hub`],
  },
  {
    name: 'Streets of Losomn',
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
    dungeons: [`The Twisted Chantry`, `The Chimney`, `The Lament`],
    injectables: [`Living Stone`, `Sarcophagus`, `Hidden Crypt`],
  },
  {
    name: `Ziggurats`,
    dungeons: [`Kaeula's Rest`, `Endaira's End`, `Cathedral of Omens`],
    injectables: [`Hidden Chamber`, `Wind Hollow`, `Library`, `Moon's Path`],
  },
] as const satisfies Array<{
  name: string
  dungeons:
    | LosomnDungeon[]
    | NErudDungeon[]
    | YaeshaDungeon[]
    | RootEarthDungeon[]
    | 'Labyrinth'
  injectables: string[]
}>
export type Biome = (typeof BIOMES)[number]['name']
export type Injectable = (typeof BIOMES)[number]['injectables'][number]

export type ItemLocation =
  | {
      world: 'Losomn'
      dungeon: LosomnDungeon[] | 'World Drop' | 'Vendor' | 'Quest'
      biome?: never
      injectable?: Injectable
    }
  | { world: 'Losomn'; dungeon?: never; biome: Biome; injectable?: Injectable }
  | {
      world: `N'Erud`
      dungeon: NErudDungeon[] | 'World Drop' | 'Vendor' | 'Quest'
      biome?: never
      injectable?: Injectable
    }
  | { world: `N'Erud`; dungeon?: never; biome: Biome; injectable?: Injectable }
  | {
      world: 'Yaesha'
      dungeon: YaeshaDungeon[] | 'World Drop' | 'Vendor' | 'Quest'
      biome?: never
      injectable?: Injectable
    }
  | { world: 'Yaesha'; dungeon?: never; biome: Biome; injectable?: Injectable }
  | {
      world: 'Root Earth'
      dungeon: RootEarthDungeon[] | 'World Drop' | 'Vendor' | 'Quest'
      biome?: never
      injectable?: Injectable
    }
  | {
      world: 'Root Earth'
      dungeon?: never
      biome: Biome
      injectable?: Injectable
    }
  | {
      world: 'Labyrinth'
      dungeon: 'Labyrinth' | 'World Drop' | 'Vendor' | 'Quest'
      biome?: never
      injectable?: Injectable
    }
  | {
      world: 'Labyrinth'
      dungeon?: never
      biome: Biome
      injectable?: Injectable
    }
  | { world: 'Ward 13'; dungeon: 'Ward 13' | 'Vendor' | 'Quest' }
  | { world: 'The Backrooms'; dungeon: 'The Backrooms' }
  | { world: 'Any'; dungeon: 'Quest' | 'Linked Weapon' }
