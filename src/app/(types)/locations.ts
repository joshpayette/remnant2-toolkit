export type WorldLocation =
  | 'Losomn'
  | `N'Erud`
  | 'Yaesha'
  | 'Labyrinth'
  | 'Root Earth'

export type LosomnLocation =
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

export type NErudLocation =
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

export type YaeshaLocation =
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

export type RootEarthLocation =
  | 'Ashen Wasteland'
  | 'Corrupted Harbor'
  | 'Blackened Citadel'
  | 'Twilight Vale'

export type LabyrinthLocation = 'Labyrinth'

type WorldDrop = 'World Drop'

export type ItemLocation =
  | { world: 'Losomn'; dungeon: LosomnLocation[] | WorldDrop }
  | { world: `N'Erud`; dungeon: NErudLocation[] | WorldDrop }
  | { world: 'Yaesha'; dungeon: YaeshaLocation[] | WorldDrop }
  | { world: 'Root Earth'; dungeon: RootEarthLocation[] | WorldDrop }
  | { world: 'Labyrinth'; dungeon: LabyrinthLocation[] | WorldDrop }
