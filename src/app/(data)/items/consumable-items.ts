import { ConsumableItem } from './types/ConsumableItem'

export const consumableItems: ConsumableItem[] = [
  {
    category: 'consumable',
    name: 'All-Seeing Eye',
    imagePath: '/items/consumables/allseeingeye.png',
    saveFileSlug: 'Consumable_AllSeeingEye_C',
    id: 'rw5Q9E',
    dlc: 'base',
    tags: [
      'Health',
      'Stamina',
      'Reduce Skill Cooldown',
      'Mod Power',
      'All Damage',
    ],
    description: `Grants a random buff or debuff. Lasts 3m.`,
    wikiLinks: [`https://remnant.wiki/All-Seeing_Eye`],
    location: { world: 'Losomn', dungeon: ['Morrow Parish'] },
  },
  {
    category: 'consumable',
    name: 'Ambit Ember',
    imagePath: '/items/consumables/ambitember.png',
    saveFileSlug: 'Consumable_Spice_C',
    id: '6lnae6',
    dlc: 'base',
    tags: ['Perfect Dodge', 'Neutral Dodge', 'Perfect Neutral Evade'],
    description: `Slightly increases Evade Window and Evade Speed by 15%. Lasts 60s.`,
    wikiLinks: [`https://remnant.wiki/Ambit_Ember`],
    location: { world: `N'Erud`, dungeon: 'World Drop' },
  },
  {
    category: 'consumable',
    name: 'Ammo Box',
    imagePath: '/items/consumables/ammocrate.png',
    saveFileSlug: 'Consumable_AmmoBox_C',
    id: 'v2usqs',
    dlc: 'base',
    tags: ['Ammo Reserves'],
    description: `Replenishes all reserve ammo.`,
    wikiLinks: [`https://remnant.wiki/Ammo_Box`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Antidote',
    imagePath: '/items/consumables/antidotesyringe.png',
    saveFileSlug: 'Consumable_Antidote_C',
    id: 'a34kjc',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Removes CORRODED effect and increases ACID resistance by 15. Lasts 10m.',
    wikiLinks: [`https://remnant.wiki/Antidote`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Bandage',
    imagePath: '/items/consumables/bandage.png',
    saveFileSlug: 'Consumable_Bandage_C',
    id: 'elazod',
    dlc: 'base',
    tags: ['Grey Health', 'Heal'],
    description: `Stops BLEEDING and restores all Grey Health.`,
    wikiLinks: [`https://remnant.wiki/Bandage`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Binding Orb',
    imagePath: '/items/consumables/bindingorb.png',
    saveFileSlug: 'Consumable_BindingOrb_C',
    id: 'edaeta',
    dlc: 'base',
    tags: ['Grenade', 'Status Effect'],
    description:
      'When thrown, Device becomes an anchor and applies SLOW to all enemies within 4m. Lasts 20s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Binding_Orb`],
    location: {
      world: `N'Erud`,
      dungeon: ['Ascension Spire'],
    },
  },
  {
    category: 'consumable',
    name: 'Black Tar',
    imagePath: '/items/consumables/blacktar.png',
    saveFileSlug: 'Consumable_BlackTar_C',
    tags: ['Grenade'],
    id: 'nrdcko',
    dlc: 'base',
    description:
      'When thrown, explodes in a 4m radius dealing 30 damage and creating a puddle lasting 15s which applies TARRED for 30s to creatures inside.\n' +
      ' \n' +
      ' Ranged damage and other FIRE sources ignite TARRED entities, dealing 250 BURNING damage over 10s.',
    wikiLinks: [`https://remnant.wiki/Black_Tar`],
    location: { world: 'Losomn', dungeon: 'World Drop' },
  },
  {
    category: 'consumable',
    name: 'Blood Root',
    imagePath: '/items/consumables/bloodroot.png',
    saveFileSlug: 'Consumable_BloodRoot_C',
    id: 'bisl2l',
    dlc: 'base',
    tags: ['Heal'],
    description: `Regenerates 1.5 Health per second. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Blood_Root`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Brightstone',
    imagePath: '/items/consumables/brightstone.png',
    saveFileSlug: 'Consumable_Brightstone_C',
    id: '937h03',
    dlc: 'base',
    tags: ['Grenade'],
    description:
      'When thrown, explodes in a 6m radius dealing 50 - 150 damage and leaving a mysterious Mist which causes enemies to receive 10% additional damage. Duration lasts 10s after enemies leave the Mist. Last 15s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Brightstone`],
    location: { world: 'Yaesha', dungeon: ['The Forgotten Grove'] },
  },
  {
    category: 'consumable',
    name: 'Celestial Thaen Fruit',
    imagePath: '/items/consumables/celestialthaenfruit.png',
    saveFileSlug: 'Consumable_ThaenFruit_Celestial_C',
    id: 'RCsP9c',
    dlc: 'base',
    description: `An ancient fruit that was harvested at its highest form. After consuming, upon death the hero will be revived with 50% Health, and be immune to STATUS effects for 30s%.
Cooldown: 60m.`,
    wikiLinks: [`https://remnant.wiki/Thaen_Fruit`],
    location: { world: 'Yaesha', dungeon: 'Quest' },
  },
  {
    category: 'consumable',
    name: 'Confidence Booster',
    imagePath: '/items/consumables/confidencebooster.png',
    saveFileSlug: 'Consumable_ConfidenceBooster_C',
    id: 'al8yob',
    dlc: 'base',
    tags: ['Damage Reduction', 'Stagger'],
    description: `Reduces incoming damage by 10% and Stagger by 1. Lasts 20s.`,
    wikiLinks: [`https://remnant.wiki/Confidence_Booster`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: `Dran's Dream`,
    imagePath: '/items/consumables/dransdream.png',
    saveFileSlug: 'Consumable_DransDream_C',
    id: '3KVVwq',
    dlc: 'dlc1',
    description: `It feels as though the soothing glow within this thing is calling to you, whispering of a dream yet unrealized and an escape from the cold grip of reality. You've seen too far many inexplicable things in your day, yet the lure of this dreamer's promise is too much to resist.`,
    wikiLinks: [`https://remnant.wiki/Dran%27s_Dream`],
    location: { world: 'Losomn', dungeon: ['Tormented Asylum'] },
  },
  {
    category: 'consumable',
    name: 'Dried Fruit',
    imagePath: '/items/consumables/driedfruit.png',
    saveFileSlug: 'Consumable_DriedFruit_C',
    id: 'Y8ey65',
    dlc: 'base',
    tags: ['Heal'],
    description: `Regenerates 5% Health instantly.`,
    wikiLinks: [`https://remnant.wiki/Dried_Fruit`],
    location: { world: 'Any', dungeon: 'Quest' },
  },
  {
    category: 'consumable',
    name: 'Elder Thaen Fruit',
    imagePath: '/items/consumables/elderthaenfruit.png',
    saveFileSlug: 'Consumable_ThaenFruit_Elder_C',
    id: 'JU5svc',
    dlc: 'base',
    description: `An ancient fruit that was harvested at amn older age. After consuming, upon death the hero will be revived with 40% Health, and be immune to STATUS Effects for 30s.
Cooldown: 60m.`,
    wikiLinks: [`https://remnant.wiki/Thaen_Fruit`],
    location: { world: 'Yaesha', dungeon: 'Quest' },
  },
  {
    category: 'consumable',
    name: 'Ethereal Orb',
    imagePath: '/items/consumables/etherealorb.png',
    saveFileSlug: 'Consumable_EtherealOrb_C',
    id: 'ffjbc9',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Removes OVERLOADED effect and increases SHOCK resistance by 15. Lasts 10m.',
    wikiLinks: [`https://remnant.wiki/Ethereal_Orb`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Faerie Needle',
    imagePath: '/items/consumables/faerieneedle.png',
    saveFileSlug: 'Consumable_FaerieNeedle_C',
    id: 'aqphr5',
    dlc: 'base',
    tags: ['Mod Power'],
    description: `Regenerates 10 Mod Power per second. Lasts 60s.`,
    wikiLinks: [`https://remnant.wiki/Faerie_Needle`],
    location: { world: 'Losomn', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Gul Serum',
    imagePath: '/items/consumables/gulserum.png',
    saveFileSlug: 'Consumable_GulSerum_C',
    id: 'm1gznf',
    dlc: 'base',
    tags: ['Stamina'],
    description: `Reduces Stamina Consumption by 50%. Lasts 60s.`,
    wikiLinks: [`https://remnant.wiki/Gul_Serum`],
    location: { world: 'Yaesha', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: `Huntress's Dream`,
    imagePath: '/items/consumables/huntressdream.png',
    saveFileSlug: 'Consumable_HuntersDream_C',
    id: 'PvwhJ5',
    dlc: 'base',
    description: `The sphere emits a soft breeze that smells of flowers and ash. You can't explain why, but you feel like it's watching you. Waiting.`,
    wikiLinks: [`https://remnant.wiki/Huntress%27s_Dream`],
    location: { world: 'Losomn', dungeon: [`Briella's Garden`] },
  },
  {
    category: 'consumable',
    name: 'Koara Pellet',
    imagePath: '/items/consumables/koarapellet.png',
    saveFileSlug: 'Consumable_KoaraPellet_C',
    id: '1585ah',
    dlc: 'base',
    tags: ['Heal'],
    description: `Consume to restore 10% Max Health instantly.`,
    wikiLinks: [`https://remnant.wiki/Koara_Pellet`],
    location: { world: 'Yaesha', dungeon: 'World Drop' },
  },
  {
    category: 'consumable',
    name: 'Liquid Escape',
    saveFileSlug: 'Consumable_LiquidEscape_C',
    imagePath: '/items/consumables/liquidescape.png',
    id: 'xgdk68',
    description: `When consumed, the hero will be returned to the last activated checkpoint.`,
    wikiLinks: [`https://remnant.wiki/Liquid_Escape`],
    dlc: 'base',
  },
  {
    category: 'consumable',
    name: 'Mature Thaen Fruit',
    imagePath: '/items/consumables/maturethaenfruit.png',
    saveFileSlug: 'Consumable_ThaenFruit_Mature_C',
    id: '3gZ3s3',
    dlc: 'base',
    description: `An ancient fruit that was harvested at a mid-life age. After consuming, upon death the hero will be revived with 30% Health, and be immune to STATUS Effects for 30s.
Cooldown: 60m.`,
    wikiLinks: [`https://remnant.wiki/Thaen_Fruit`],
    location: { world: 'Yaesha', dungeon: 'Quest' },
  },
  {
    category: 'consumable',
    name: 'Mud Rub',
    imagePath: '/items/consumables/mudrub.png',
    saveFileSlug: 'Consumable_MudRub_C',
    id: 'dvx5ib',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description: `Extinguishes BURNING effect and increases FIRE resistance by 15. Lasts 10m.`,
    wikiLinks: [`https://remnant.wiki/Mud_Rub`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Mystery Jerky',
    imagePath: '/items/consumables/mysteryjerkey.png',
    saveFileSlug: 'Consumable_MysteryJerky_C',
    id: '6aasor',
    dlc: 'base',
    tags: ['Grey Health'],
    description:
      'Converts  6.66 Health into Grey Health per second. Last  15s.',
    wikiLinks: [`https://remnant.wiki/Mystery_Jerky`],
    location: { world: 'Ward 13', dungeon: 'Quest' },
  },
  {
    category: 'consumable',
    name: `Nimue's Dream`,
    imagePath: '/items/consumables/nimuesdream.png',
    saveFileSlug: 'Consumable_NimuesDream_C',
    id: '4Sv3yg',
    dlc: 'base',
    description: `An alto hum emanates from the sphere, rising and falling seemingly at random in a peaceful, unrepeated melody.`,
    wikiLinks: [`https://remnant.wiki/Nimue%27s_Dream`],
    location: { world: 'Losomn', dungeon: [`Nimue's Retreat`] },
  },
  {
    category: 'consumable',
    name: 'Oilskin Balm',
    imagePath: '/items/consumables/oilskinbalm.png',
    saveFileSlug: 'Consumable_OilskinBalm_C',
    id: '0sec3n',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Cures ROOT ROT Blight and increases Blight Resistance by 25. Lasts 10m.',
    wikiLinks: [`https://remnant.wiki/Oilskin_Balm`],
    location: { world: 'Yaesha', dungeon: ['The Forgotten Grove'] },
  },
  {
    category: 'consumable',
    name: 'Orb of Undoing',
    imagePath: '/items/consumables/orbofundoing.png',
    saveFileSlug: 'Consumable_OrbOfUndoing_C',
    id: '4g6uzA',
    dlc: 'base',
    description: 'Resets all spent Trait points.',
    wikiLinks: [`https://remnant.wiki/Orb_of_Undoing`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Pipe Bomb',
    imagePath: '/items/consumables/pipebomb.png',
    saveFileSlug: 'Consumable_PipeBomb_C',
    id: 'kfwizc',
    dlc: 'base',
    tags: ['Grenade'],
    description:
      'When thrown, explodes in a 4m radius dealing 150 - 450 damage and applying BLEEDING, which deals an additional 250 - 750 BLEED damage over 30s.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Pipe_Bomb`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Poisoned Ambit Ember Capsule',
    imagePath: '/items/consumables/poisonedambitembercapsule.png',
    saveFileSlug: 'Consumable_PoisonedSpiceCapsule_C',
    id: '6awni8',
    dlc: 'base',
    description:
      'Use to equip the capsule which can be thrown by pressing FIRE. The capsule will detonate after 2s or upon hitting an enemy, releasing a chemical agent which dampens the psionic abilities of long-term Ambit Ember users.',
    wikiLinks: [`https://remnant.wiki/Poisoned_Ambit_Ember_Capsule`],
    location: {
      world: `N'Erud`,
      dungeon: ['Ascension Spire'],
    },
  },
  {
    category: 'consumable',
    name: 'Processed Koara',
    imagePath: '/items/consumables/processedkoarapellet.png',
    saveFileSlug: 'Consumable_ProcessedKoara_C',
    id: '4lvdgg',
    dlc: 'base',
    tags: ['Stamina'],
    description: `Decreases Stamina Recovery delay by 75% and Stamina Regen Penalty by 50%. Lasts 60s.`,
    wikiLinks: [`https://remnant.wiki/Processed_Koara`],
    location: { world: 'Yaesha', dungeon: 'World Drop' },
  },
  {
    category: 'consumable',
    name: 'Purified Salve',
    imagePath: '/items/consumables/purifiedsalve.png',
    saveFileSlug: 'Consumable_PurifiedSalve_C',
    id: 'wzi8il',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Cures CURSE and increases Blight Resistance by 25. Lasts 10m.',
    wikiLinks: [`https://remnant.wiki/Purified_Salve`],
    location: { world: 'Losomn', dungeon: 'World Drop' },
  },
  {
    category: 'consumable',
    name: 'Rocket Fuel',
    imagePath: '/items/consumables/rocketfuel.png',
    saveFileSlug: 'Consumable_RocketFuel_C',
    id: 'rlpblq',
    dlc: 'base',
    tags: ['Fire Rate', 'Melee Attack Speed'],
    description: `Increases Fire Rate by 10% and Melee Attack Speed by 15%. Lasts 20s.`,
    wikiLinks: [`https://remnant.wiki/Rocket_Fuel`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'consumable',
    name: 'Sweet Leaf',
    imagePath: '/items/consumables/sweetleaf.png',
    saveFileSlug: 'Consumable_SweetLeaf.Consumable_SweetLeaf_C',
    id: 'rlpblz',
    dlc: 'dlc2',
    tags: ['Damage Reduction'],
    description: `Grants 1 stack of BULWARK. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Sweet_Leaf`],
    location: { world: 'Yaesha', dungeon: 'World Drop' },
  },
  {
    category: 'consumable',
    name: 'Timeworn Unguent',
    imagePath: '/items/consumables/timewornunguent.png',
    saveFileSlug: 'Consumable_TimewornUnguent_C',
    id: 'li99wc',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Cures SUPPRESSION Blight and increases Blight Resistance by 25. Lasts 10m.',
    wikiLinks: [`https://remnant.wiki/Timeworn_Unguent`],
    location: {
      world: `N'Erud`,
      dungeon: ['Ascension Spire'],
    },
  },
  {
    category: 'consumable',
    name: `Walker's Dream`,
    imagePath: '/items/consumables/walkersdream.png',
    saveFileSlug: 'Consumable_RootWalkerDream_C',
    id: '5dUhG6',
    dlc: 'base',
    description: `A terrible cacophony emanates from this sphere. Chittering, howling, shrieking... as if every sound ever expressed has been compiled into one vile utterance, loud and erratic.`,
    wikiLinks: [`https://remnant.wiki/Walker%27s_Dream`],
    location: { world: 'Root Earth', dungeon: ['Corrupted Harbor'] },
  },
]
