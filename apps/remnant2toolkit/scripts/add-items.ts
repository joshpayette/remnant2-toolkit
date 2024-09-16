// INSERT INTO Item SET id="clrlgfe0j0000eioq7d5go8dn", itemId="5go8dn", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7dtn0x3c", itemId="tn0x3c", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7dc6k3ke", itemId="c6k3ke", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7dodd85z", itemId="odd85z", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7dw3gyt0", itemId="w3gyt0", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7d1yfbk0", itemId="1yfbk0", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7dno6oxo", itemId="no6oxo", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7dtt4r61", itemId="tt4r61", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7d966uvg", itemId="966uvg", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7dwqicx7", itemId="wqicx7", dlc="dlc3", isActive=1;
// INSERT INTO Item SET id="clrlgfe0j0000eioq7d9c311c", itemId="9c311c", dlc="dlc3", isActive=1;

import { prisma } from '@repo/db';

import { type Item } from '@/app/(items)/_types/item';

const items = [
  {
    //INSERT INTO Item SET id="clrlgfe0j0000eioq7d9c311c", itemId="9c311c", dlc="dlc3", isActive=1;
    category: 'trait',
    type: 'archetype',
    inGameOrder: 3, // TODO Check this
    name: 'Barrier',
    imagePath: '/items/traits/barrier_placeholder.png',
    saveFileSlug: 'Trait_Barrier_C', // TODO Check this
    id: '9c311c',
    dlc: 'dlc3',
    tags: [],
    description: 'Incaseses SHIELD amount by 1.5% - 15%.',
    wikiLinks: [`https://remnant.wiki/Barrier`],
    amount: 10,
    location: { world: `N'Erud`, dungeon: 'Linked Item' },
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7dwqicx7", itemId="wqicx7", dlc="dlc3", isActive=1;
    category: 'skill',
    name: 'Drone: Shield',
    saveFileSlug: 'Skill_DroneShield_C', // TODO Check this
    imagePath: '/items/skills/warden_drone_shield_placeholder.png',
    id: 'wqicx7',
    dlc: 'dlc3',
    tags: [],
    externalTokens: [],
    description:
      'Deploy Shield Drone with 200 Energy Reserves to follow and protect its Warded Target.\n' +
      '\n' +
      `The Warded Target gains increased Damage Reduction by 10%. When the Warded Target is not at Max SHIELD Capacity, the Drone consumes 25 energy to grant a SHIELD for 11.5% of the target's Max Health once every 1s. All Shields the Drone grants last until removed by damage, or until the Drone alters Warded Targets or is Stowed.\n` +
      '\n' +
      `When idle 5s the Drone goes Dormant, then gains 1% Energy Regen per second. When depleted of Energy the drone goes Inactive, then gains 2% Energy Regen per second until fully recharged.\n` +
      '\n' +
      `SINGLE PRESS: Drone alters its Warded Target to the targeted ally. Max 1 Shield Drone per target.\n` +
      '\n' +
      `DOUBLE TAP: Drone returns to the Warden and remains by their side.\n` +
      '\n' +
      `HOLD: Stow Drone to gain 4% Energy Regen per second.`,
    wikiLinks: ['https://remnant.wiki/Drone_Shield'],
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7d966uvg", itemId="966uvg", dlc="dlc3", isActive=1;
    category: 'skill',
    name: 'Drone: Heal',
    saveFileSlug: 'Skill_DroneHeal_C', // TODO Check this
    imagePath: '/items/skills/warden_drone_heal_placeholder.png',
    id: '966uvg',
    dlc: 'dlc3',
    tags: [],
    externalTokens: [],
    description:
      `Deploy Heal Drone with 200 Energy Reserves to follow and protect its Warded Target\n` +
      '\n' +
      `The Warded Target gains increased Relic Use Speed by 10%. When the Warded Target is not at Max Health, the Drone consumes 10 Energy to heal 10% of the target's Max Health once every 1s.\n` +
      '\n' +
      `When idle 5s the Drone goes Dormant, then gains 1% Energy Regen per second. When depleted of Energy the Drone goes Inactive, then gains 2.1% Energy Regen per second until fully recharged.\n` +
      '\n' +
      `SINGLE PRESS: Drone alters its Warded Target to the targeted ally. Max 1 Heal Drone per target.\n` +
      '\n' +
      `DOUBLE TAP: Drone returns to the Warden and remains by their side.\n` +
      '\n' +
      `HOLD: Stow Drone to gain 4.2% Energy Regen per second`,
    wikiLinks: ['https://remnant.wiki/Drone_Heal'],
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7dtt4r61", itemId="tt4r61", dlc="dlc3", isActive=1;
    category: 'skill',
    name: 'Drone: Combat',
    saveFileSlug: 'Skill_DroneCombat_C', // TODO Check this
    imagePath: '/items/skills/warden_drone_combat_placeholder.png',
    id: 'tt4r61',
    dlc: 'dlc3',
    tags: [],
    externalTokens: [],
    description:
      `Deploy Combat Drone with 200 Energy Reserves to follow and protect its Warded Target\n` +
      '\n' +
      `The Warded Target gains increased Fire Rate and Total Melee Speed by 10%, and decreased Firearm Charge Time by 10%. While in combat, the Drone attacks the Warded Target's focused enemy, consuming 10 Energy per barrage.\n` +
      '\n' +
      `When idle 5s the Drone goes Dormant, then gains 1% Energy Regen per second. When depleted of Energy the Drone goes Inactive, then gains 2.1% Energy Regen per second until fully recharged.\n` +
      '\n' +
      `SINGLE PRESS: Drone alters its Warded Target to the targeted ally. Max 1 Combat Drone per target.\n` +
      '\n' +
      `DOUBLE TAP: Drone returns to the Warden and remains by their side.\n` +
      '\n' +
      `HOLD: Stow Drone to gain 4.2% Energy Regen per second.\n`,
    wikiLinks: ['https://remnant.wiki/Drone_Combat'],
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7dno6oxo", itemId="no6oxo", dlc="dlc3", isActive=1;
    category: 'perk',
    name: 'Dynamic',
    saveFileSlug: 'Perk_Dynamic_C', // TODO Check this
    imagePath: '/items/perks/warden_dynamic_placeholder.png',
    type: 'prime',
    id: 'no6oxo',
    dlc: 'dlc3',
    tags: [],
    description:
      `After 10s of not being damaged, the Warden generates a SHIELD for 23% of their Max Health over 2s.\n` +
      '\n' +
      `Increases base N'Erudian Energy Reserves for Turret and Drone by 100%.`,
    wikiLinks: ['https://remnant.wiki/Dynamic'],
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7d1yfbk0", itemId="1yfbk0", dlc="dlc3", isActive=1;
    category: 'perk',
    name: 'Warden Damage Perk',
    saveFileSlug: 'Perk_WardenDamage_C', // TODO Update this
    imagePath: '/misc/placeholder.png',
    type: 'damage',
    id: '1yfbk0',
    dlc: 'dlc3',
    tags: [],
    description: 'TBD',
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7dw3gyt0", itemId="w3gyt0", dlc="dlc3", isActive=1;
    category: 'perk',
    name: 'Warden Team Perk',
    saveFileSlug: 'Perk_WardenTeam_C', // TODO Update this
    imagePath: '/misc/placeholder.png',
    type: 'team',
    id: 'w3gyt0',
    dlc: 'dlc3',
    tags: [],
    description: 'TBD',
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7dodd85z", itemId="odd85z", dlc="dlc3", isActive=1;
    category: 'perk',
    name: 'Warden Utility Perk',
    saveFileSlug: 'Perk_WardenUtility_C', // TODO Update this
    imagePath: '/misc/placeholder.png',
    type: 'utility',
    id: 'odd85z',
    dlc: 'dlc3',
    tags: [],
    description: 'TBD',
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7dc6k3ke", itemId="c6k3ke", dlc="dlc3", isActive=1;
    category: 'perk',
    name: 'Warden Relic Perk',
    saveFileSlug: 'Perk_WardenRelic_C', // TODO Update this
    imagePath: '/misc/placeholder.png',
    type: 'relic',
    id: 'c6k3ke',
    dlc: 'dlc3',
    tags: [],
    description: 'TBD',
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Warden',
      },
    },
  },
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7dtn0x3c", itemId="tn0x3c", dlc="dlc3", isActive=1;
    category: 'archetype',
    name: 'Warden',
    imagePath: '/misc/placeholder.jpg',
    saveFileSlug: 'Engram_Warden_C', // TODO Confirm this
    id: 'tn0x3c',
    dlc: 'dlc3',
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
  {
    // INSERT INTO Item SET id="clrlgfe0j0000eioq7d5go8dn", itemId="5go8dn", dlc="dlc3", isActive=1;
    category: 'weapon',
    type: 'hand gun',
    name: 'Repair Tool',
    saveFileSlug: 'Weapon_RepairTool_C', // TODO: Check this
    imagePath: '/items/weapons/repair_tool_placeholder.png',
    id: '5go8dn',
    dlc: 'dlc3',
    description:
      `In the heat of battle, it's easy to focus on taking down as many enemies as possible, but when an ally falls, your priorities have a way of shifting fast. This thing may not be the deadliest weapon, but its ability to heal those brave enough to fight at your side is invaluable.\n` +
      '\n' +
      `"For a species as long-lived as the Drzyr, the restorative capabilities of nanotechnology proved essential to the preservation of vitality. They knew that to prevent decay on a micro level was the first step in potentially unlocking the secret to preventing decay on the macro level as well."\n` +
      '\n' +
      `Fires a stream of nanomachines, dealing damage to enemies or healing allies for 3% of their Max Health per second. The nano-tech also restores N'Erudian Energy to Turrets`,
    wikiLinks: [`https://remnant.wiki/Repair_Tool`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
    damage: 10,
    rps: 11,
    magazine: 150,
    accuracy: 100,
    ideal: 15,
    falloff: 30,
    ammo: 300,
    crit: 5,
    weakspot: 80,
    stagger: -20,
  },
] as const satisfies Item[];

async function main() {
  for (const item of items) {
    const dlc = item.dlc ?? 'base';

    await prisma.item.upsert({
      where: { itemId: item.id },
      update: { dlc }, // update fields if necessary
      create: { itemId: item.id, dlc },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.info('Done with populating items table');
    await prisma.$disconnect();
  });
