import { type ConcoctionItem } from '@/app/(items)/_types/concotion-item';

export const concoctionItems: ConcoctionItem[] = [
  {
    category: 'concoction',
    name: 'Bark Extract',
    imagePath: '/items/consumables/barkextract.png',
    saveFileSlug: 'Consumable_BarkExtract_C',
    id: 'hqjxyn',
    dlc: 'base',
    tags: ['Armor Increase', 'Damage Reduction', 'Consumable'],
    description:
      'Increases Armor by 30. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Bark_Extract`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
    armor: 30,
  },
  {
    category: 'concoction',
    name: 'Bottled Shaedberry',
    imagePath: '/items/consumables/bottledshaedberry.png',
    saveFileSlug: 'Consumable_BottledShaedberry_C',
    id: 'qj302c',
    dlc: 'base',
    tags: ['Mod Power', 'Consumable'],
    description:
      'Increases Mod Power Generation by 10%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Bottled_Shaedberry`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'concoction',
    name: 'Chilled Steam',
    imagePath: '/items/consumables/chilledsteam.png',
    saveFileSlug: 'Consumable_ChilledSteam_C',
    id: 'fhm256',
    dlc: 'base',
    tags: ['Movement Speed', 'Consumable'],
    description:
      'Increases Movement Speed by 10%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Chilled_Steam`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'concoction',
    name: 'Dark Cider',
    imagePath: '/items/consumables/darkcider.png',
    saveFileSlug: 'Consumable_DarkCider_C',
    id: '8p2sj3',
    dlc: 'base',
    tags: ['Health', 'Stamina', 'Movement Speed', 'Consumable'],
    description:
      'Increases Health by 6.66%, Stamina by 6.66%, and Movement Speed by 6.66%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Dark_Cider`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
    healthPercent: 0.0666,
    staminaPercent: 0.0666,
  },
  {
    category: 'concoction',
    name: 'Dark Fluid',
    imagePath: '/items/consumables/darkfluid.png',
    saveFileSlug: 'Consumable_DarkFluid_C',
    id: 'byi9a5',
    dlc: 'base',
    tags: [
      'Perfect Dodge',
      'Neutral Dodge',
      'Perfect Neutral Evade',
      'Consumable',
    ],
    description:
      'Increases Distance of Evade and Combat Slide by 15% and reduces the cost by 20%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Dark_Fluid`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'concoction',
    name: 'Egg Drink',
    imagePath: '/items/consumables/eggdrink.png',
    saveFileSlug: 'Consumable_EggDrink.Consumable_EggDrink_C',
    id: 'byi9d',
    dlc: 'dlc2',
    tags: ['Encumbrance'],
    description:
      'Increases Dodge Weight Threshold by 10. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Egg_Drink`],
    location: { world: 'Ward 13', dungeon: 'Quest' },
    weightThreshold: 10,
  },
  {
    category: 'concoction',
    name: 'Meat Shake',
    imagePath: '/items/consumables/meatshake.png',
    saveFileSlug: 'Consumable_MeatShake_C',
    id: '4yzeco',
    dlc: 'base',
    tags: ['Damage Reduction', 'Consumable'],
    description:
      'Increases Damage Reduction by 6.5%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Meat_Shake`],
    location: { world: `Ward 13`, dungeon: 'Quest' },
  },
  {
    category: 'concoction',
    name: "Mudtooth's Elixir",
    imagePath: '/items/consumables/mudtoothselixir.png',
    saveFileSlug: 'Consumable_MudToothsElixir_C',
    tags: ['Consumable'],
    id: 'yduuj3',
    dlc: 'base',
    description:
      'Increases Experience Gains by 15%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Mudtooth's_Elixir`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'concoction',
    name: "Mudtooth's Stew",
    imagePath: '/items/consumables/mudtoothsstew.png',
    saveFileSlug: 'Consumable_MudToothsStew_C',
    id: '5yrxf1',
    dlc: 'base',
    tags: ['Stamina', 'Consumable'],
    description:
      'Increases Max Stamina by 20. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Mudtooth's_Stew`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
    stamina: 25,
  },
  {
    category: 'concoction',
    name: "Mudtooth's Tonic",
    imagePath: '/items/consumables/mudtoothstonic.png',
    saveFileSlug: 'Consumable_MudToothsTonic_C',
    id: 'p0ru94',
    dlc: 'base',
    tags: ['Health', 'Consumable'],
    description:
      'Increases Max Health by 20. Lasts 60m and will stay in effect after death.\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Mudtooth's_Tonic`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
    health: 20,
  },
  {
    category: 'concoction',
    name: 'Root Water',
    imagePath: '/items/consumables/rootwater.png',
    saveFileSlug: 'Consumable_RootWater_C',
    id: '56vkqr',
    dlc: 'base',
    tags: ['Heal', 'Consumable'],
    description:
      'Regenerates 1 Health per second. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Root_Water`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'concoction',
    name: 'Sacred Lakewater',
    imagePath: '/items/consumables/sacredlakewater.png',
    saveFileSlug: 'Consumable_SacredLakewater_C',
    id: 'dk9yg4',
    dlc: 'base',
    tags: ['Grey Health', 'Heal', 'Consumable'],
    description:
      'Increases Grey Health Conversion by 20% and Grey Health Regen by 2 per second. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Sacred_Lakewater`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'concoction',
    name: 'Sanguine Vapor',
    imagePath: '/items/consumables/sanguinevapor.png',
    saveFileSlug: 'Consumable_SanguineVapor_C',
    id: 'kyulid',
    dlc: 'base',
    tags: ['Lifesteal', 'Consumable'],
    description:
      'Increases Lifesteal by 2% of base damage. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Sanguine_Vapor`],
    location: {
      world: `N'Erud`,
      dungeon: ['Ascension Spire'],
    },
  },
  {
    category: 'concoction',
    name: 'Strong Drink',
    imagePath: '/items/consumables/strongdrink.png',
    saveFileSlug: 'Consumable_StrongDrink_C',
    id: 'to2dcw',
    dlc: 'base',
    tags: ['Encumbrance', 'Consumable'],
    description:
      'Reduces Encumbrance by 10. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Strong_Drink`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
    weight: -10,
  },
  {
    category: 'concoction',
    name: 'Tranquility Font',
    imagePath: '/items/consumables/tranquilityfont.png',
    saveFileSlug: 'Consumable_TranquilityFont_C',
    id: 'l7r9sm',
    dlc: 'base',
    tags: ['Spread', 'Recoil', 'Consumable'],
    description:
      'Reduces Reticle Sway, Spread, and Gun Recoil by 25%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Tranquility_Font`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'concoction',
    name: 'Verdant Tea',
    imagePath: '/items/consumables/verdanttea.png',
    saveFileSlug: 'Consumable_VerdantTea_C',
    id: 'qgare2',
    dlc: 'base',
    tags: ['Stamina', 'Consumable'],
    description:
      'Increases Stamina Recovery by 20 per second and reduces Stamina Regen Penalty by 50%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Verdant_Tea`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'concoction',
    name: 'Xenoplasm',
    imagePath: '/items/consumables/xenoplasm.png',
    saveFileSlug: 'Consumable_Xenoplasm_C',
    id: '2jeq07',
    dlc: 'base',
    tags: ['Reduce Skill Cooldown', 'Consumable'],
    description:
      'Reduces Skill Cooldowns 10%. Lasts 60m and will stay in effect after death.\n' +
      '\n' +
      'Only one Concoction may be active at a time.',
    wikiLinks: [`https://remnant.wiki/Xenoplasm`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
];
