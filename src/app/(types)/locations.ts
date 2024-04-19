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

export type NErudDungeon =
  | `Seeker's Rest`
  | 'Phantom Wasteland'
  | 'Timeless Horizon'
  | `Sentinel's Keep`
  | `Forgotten Prison`
  | `Abyssyal Rift`
  | `The Eon Vault`
  | `Tal'Ratha's Refuge`
  | `Ascension Spire`
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
  | `Widow's Court`
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

export type RootEarthDungeon =
  | 'Ashen Wasteland'
  | 'Corrupted Harbor'
  | 'Blackened Citadel'
  | 'Twilight Vale'

export type LabyrinthDungeon = 'Labyrinth'

type WorldDrop = 'World Drop'
type Ward13 = 'Ward 13'

export type ItemLocation =
  | { world: 'Losomn'; dungeon: LosomnDungeon[] | WorldDrop }
  | { world: `N'Erud`; dungeon: NErudDungeon[] | WorldDrop }
  | { world: 'Yaesha'; dungeon: YaeshaDungeon[] | WorldDrop }
  | { world: 'Root Earth'; dungeon: RootEarthDungeon[] | WorldDrop }
  | { world: 'Labyrinth'; dungeon: LabyrinthDungeon[] | WorldDrop }
  | { world: Ward13; dungeon: Ward13 }
