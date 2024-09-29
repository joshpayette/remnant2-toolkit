import { type ModItem } from '@/app/(items)/_types/mod-item';

export const modItems: ModItem[] = [
  {
    category: 'mod',
    name: 'Abrasive Rounds',
    saveFileSlug: 'Mod_AbrasiveRounds_C',
    imagePath: '/items/mods/abrasiverounds.png',
    id: 'h9k5pd',
    dlc: 'dlc2',
    description:
      'Imbues ammunition with BLEED and increases Lifesteal by 5% for 20s. Shots also apply BLEEDING, dealing 200 damage over 10s.',
    wikiLinks: [`https://remnant.wiki/Abrasive_Rounds`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mod',
    name: '77 79 68',
    saveFileSlug: 'Mod_Polyactuator_C',
    imagePath: '/items/mods/polygun.png',
    dlc: 'dlc2',
    id: '777968',
    description: 'TOGGLE COMBAT FIRING MODESTOGGLE COMBAT FIRING MODES',
    wikiLinks: [`https://remnant.wiki/Polygun`],
    linkedItems: {
      weapon: {
        name: 'Polygun',
      },
    },
    location: { world: 'Labyrinth', dungeon: ['Labyrinth'] },
  },
  {
    category: 'mod',
    name: 'Accelerator',
    saveFileSlug: undefined,
    imagePath: '/items/mods/atomsmasher.png',
    id: 'h9k5pl',
    dlc: 'base',
    description: `Charge Melee Attacks increase the speed of all Melee Attacks by 10% for 5s.`,
    wikiLinks: [`https://remnant.wiki/Atom_Smasher`],
    linkedItems: {
      weapon: {
        name: 'Atom Smasher',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Aftermath',
    saveFileSlug: 'Mod_Aftermath_C', // TODO Check
    imagePath: '/items/mods/aftermath.png',
    id: 'vi86jx',
    dlc: 'dlc3',
    description: `On Relic Use, Redeemer stores the wielder's equipped Relic effect with the weapon as a launchable payload. Upon firing, the payload bursts across 4m when contacting a human ally, or lays dormant up to 15s until an ally gets close. Max 1 stored Relic which cannot be modified.`,
    wikiLinks: [`https://remnant.wiki/Redeemer`],
    linkedItems: {
      weapon: {
        name: 'Redeemer',
      },
    },
  },
  {
    category: 'mod',
    name: 'Astral Burst',
    saveFileSlug: 'Mod_AstralBurst_C',
    imagePath: '/items/mods/astralburst.png',
    id: 'mqta6g',
    dlc: 'base',
    description:
      'Fires a short range burst of 7 star fragments which deal 35 - 105 damage each. Fragments bounce off walls up to 3 times, dealing 35% additional damage per bounce. Weakspot hits deal reduced damage.',
    wikiLinks: [`https://remnant.wiki/Astral_Burst`],
    location: { world: 'Yaesha', dungeon: ['Cathedral of Omens'] },
  },
  {
    category: 'mod',
    name: 'Awakening',
    saveFileSlug: undefined,
    imagePath: '/items/mods/awakening.png',
    dlc: 'dlc1',
    id: 'wszjeu',
    description: `Incoming damage grants Awakening which increases Melee Damage by 5% per stack for 10s. Max 10 stacks.`,
    wikiLinks: [`https://remnant.wiki/Wrathbringer`],
    linkedItems: {
      weapon: {
        name: 'Wrathbringer',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Banish',
    saveFileSlug: 'Mod_Banish_C',
    imagePath: '/items/mods/banish.png',
    id: 'k7z7r2',
    dlc: 'base',
    description:
      "Banishes enemies or allies into another dimension for 4s. When Banish ends, enemies take 1.25x → 1.5x the damage from the Repulsor's primary fire for 8s.\n\nPowerful enemies won't be banished, but will take increased damage from any Repulsor while debuffed.",
    externalTokens: [`Multiplicative Debuffs`],
    wikiLinks: [`https://remnant.wiki/Repulsor`],
    linkedItems: {
      weapon: {
        name: 'Repulsor',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Beta Ray',
    imagePath: '/items/mods/betaray.png',
    saveFileSlug: 'Mod_BetaRay_C',
    id: '5ke493',
    dlc: 'base',
    description:
      'Brands a target for 30s. Branded enemies that die leave a Brand at their location.\n\nReloading or Swapping detonates Brands dealing 225 → 675 damage. Additional Brands (3 Max) on the same target deal 50% damage. Slain enemies return 5% - 15% of Ammo and Mod Power to the weapon.',
    externalTokens: [`Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Alpha_/_Omega`],
    linkedItems: {
      weapon: {
        name: 'Alpha-Omega',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Beyond the Veil',
    saveFileSlug: undefined,
    imagePath: '/items/mods/beyondtheveil.png',
    id: 'puif17',
    dlc: 'base',
    description: `Neutral Evade turns to mist, granting Nightshade 5% base damage as Lifesteal for 5s. Perfect Dodge doubles duration.`,
    wikiLinks: [`https://remnant.wiki/Nightshade`],
    linkedItems: {
      weapon: {
        name: 'Nightshade',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Big Bang',
    saveFileSlug: 'Mod_BigBang_C',
    imagePath: '/items/mods/bigbang.png',
    id: 's7ozpe',
    dlc: 'base',
    description:
      'Funnels all current Mod Charges into the next shot. Projectile deals 65 → 195 direct damage and 65 → 195 Explosive damage per Charge consumed in a 5m radius. Explosion applies 75 → 225 BURNING damage over 10s per Charge consumed.\n\nAdditional Charges consumed increase all damage by 5%. Max 5 Charges.',
    externalTokens: [`Explosive Damage`, `Amplitude`],
    wikiLinks: [`https://remnant.wiki/Star_Shot`],
    linkedItems: {
      weapon: {
        name: 'Star Shot',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Blaze',
    saveFileSlug: undefined,
    imagePath: '/items/mods/blaze.png',
    id: 'gdY2uZ',
    dlc: 'base',
    description:
      'Charge Melee Attacks apply BURNING which deals 200 - 600 FIRE damage over 5s.',
    wikiLinks: [`https://remnant.wiki/Smolder`],
    linkedItems: {
      weapon: {
        name: 'Smolder',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Blood Draw',
    saveFileSlug: 'Mod_BloodDraw_C',
    imagePath: '/items/mods/blooddraw.png',
    id: 'ss7zwt',
    dlc: 'base',
    description:
      'Shoots out razor-sharp Chain Shards which impale up to 5 targets within 15m, dealing 10 damage. On hit, chains are pulled towards the caster, dealing 250 damage split equally among enemies and applying 275 BLEEDING damage over 15s.',
    externalTokens: [`Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Blood_Draw`],
    location: { world: 'Losomn', dungeon: ['Gilded Chambers'] },
  },
  {
    category: 'mod',
    name: 'Bloodline',
    saveFileSlug: 'Mod_Bloodline_C',
    imagePath: '/items/mods/bloodline.png',
    id: 'yxxajn',
    dlc: 'base',
    description:
      'Fires a devastating blast which penetrates through all enemies in its path. Deals 150 → 450 damage with a 25% Critical damage bonus, and 3x additional stagger.\n\nBloodline damage increases by 50% for each enemy penetrated.',
    wikiLinks: [`https://remnant.wiki/Merciless`],
    linkedItems: {
      weapon: {
        name: 'Merciless',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Bloodshot',
    saveFileSlug: 'Mod_Bloodshot_C',
    imagePath: '/items/mods/bloodshot.png',
    id: 'tw8tbh',
    dlc: 'base',
    description:
      'While active, grants unlimited Reserve Ammo, increases Reload Speed by 50%, and shots appy 250 → 750  damage over 10s. If 3 shot hit a Weakspot reloading, Merciless will automatically perform a quick Reload. Lasts 13s.',
    wikiLinks: [`https://remnant.wiki/Corrupted_Merciless`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Merciless',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Bloodthirst',
    saveFileSlug: undefined,
    imagePath: '/items/mods/bloodthirst.png',
    id: '1rw0kk',
    dlc: 'base',
    description: `Attacks from behind enemies always count as Weakspots. Charge Attacks deal 200 - 600 BLEEDING damage over 10s.`,
    wikiLinks: [`https://remnant.wiki/Assassin's_Dagger`],
    linkedItems: {
      weapon: {
        name: `Assassin's Dagger`,
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Bore',
    saveFileSlug: 'Mod_Bore_C',
    imagePath: '/items/mods/bore.png',
    id: 'iq4wjy',
    dlc: 'base',
    tags: ['Critical Chance', 'Weakspot Damage'],
    description:
      'Fires a drill projectile which bores into enemies on contact, dealing 80 damage. After fully burrowing into an enemy, creates a Weakspot which grants 65% of normal Weakspot Damage on hit. If attached to an existing Weakspot, Ranged Crit Chance is increased by 15% when attacking the drill. Lasts 10s.',
    wikiLinks: [`https://remnant.wiki/Bore`],
    location: { world: `N'Erud`, dungeon: [`The Dark Conduit`] },
  },
  {
    category: 'mod',
    name: 'Chain of Command',
    saveFileSlug: undefined,
    dlc: 'dlc1',
    imagePath: '/items/mods/chainofcommand.png',
    id: 'lxt1j0',
    description:
      'Harpoon Mode: Fire Harpoon to mark target causing primary fire to become Homing Rounds dealing 15% reduced damage. Enemies hit by Homing Rounds build Influence. Recasting exits Mode.\n\nWhen Influence fills, Monarch automatically reloads, creates a shockwave, and gains 20% Increased Damage and Infinite Reserves. Lasts 20s.',
    wikiLinks: [`https://remnant.wiki/Monarch`],
    linkedItems: {
      weapon: {
        name: 'Monarch',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Chaos Driver',
    saveFileSlug: 'Mod_ChaosDriver_C',
    imagePath: '/items/mods/chaosdriver.png',
    id: 'dxnd9s',
    dlc: 'base',
    description:
      'Drives electrified rods which tether to other rods within 10m. Tethers last 10s and deal 20 → 60 SHOCK damage per second. \n\n Targets take 50 → 150 SHOCK damage per second, and 25% damage per extra rod. Increases 1.5x if linked to another rod. Rods in the same target will not link.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Enigma`],
    linkedItems: {
      weapon: {
        name: 'Enigma',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Concussive Shot',
    saveFileSlug: 'Mod_ConcussiveShot_C',
    imagePath: '/items/mods/concussiveshot.png',
    id: 'an140h',
    dlc: 'base',
    description:
      'Fires a focused blast of air through all targets within 8m, dealing 155 - 465 damage and 4x impact.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Concussive_Shot`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mod',
    name: 'Corrosive Rounds',
    saveFileSlug: 'Mod_CorrosiveRounds_C',
    imagePath: '/items/mods/corrosiverounds.png',
    id: 'hr3g7o',
    dlc: 'base',
    tags: ['Critical Chance'],
    description:
      'Imbues ammunition with ACID and increases Range Critical Chance by 15% for 20s. Shots apply CORRODED dealing 150 - 450 damage over 10s.',
    wikiLinks: [`https://remnant.wiki/Corrosive_Rounds`],
    location: { world: 'Losomn', dungeon: ['Shattered Gallery'] },
  },
  {
    category: 'mod',
    name: 'Creeping Mist',
    saveFileSlug: 'Mod_CreepingMist_C',
    imagePath: '/items/mods/creepingmist.png',
    dlc: 'dlc1',
    id: 'a3ctlf',
    description:
      'Shoots out a canister that shatters to reveal an expanding mist, starting at 7.5m and growing to 15m over 5s. Lasts 20s.\n\nEnemies within the mist receive 25% additional Status Effect Damage and are 5% more likely to be struck with a critical hit from any source. The mists debuff persists for 10s after targets exit the mist.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Creeping_Mist`],
    location: { world: 'Losomn', dungeon: ['Sunken Haunt'] },
  },
  {
    category: 'mod',
    name: 'Cube Room',
    saveFileSlug: 'Mod_CubeRoom_C',
    imagePath: '/items/mods/cuberoom.png',
    id: '2nMTRG',
    dlc: 'base',
    description:
      'Conjures a 5m anomalous Cube Room which grants allies an increase of 75% Heat Decay Rate, reduces Heat Generation per round when firing weapons that Overheat by 20% and automatically generates missing reserve ammo per second. Lasts 15s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Corrupted_Cube_Gun`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Cube Gun',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Cube Shield',
    saveFileSlug: 'Mod_CubeShield_C', // todo test this on loadout import
    imagePath: '/items/mods/cubeshield.png',
    id: '1bfanq',
    dlc: 'base',
    description:
      'Generates a Cube Shield with absorbs up to 500 → 1500 damage from incoming enemy projectiles. Lasts 15s.\n\nReactivating fires the Cube Shield with damages enemies as it travels. Damage is increased if the Cube Shield has absorbed enemy projectile damage before firing.',
    wikiLinks: [`https://remnant.wiki/Cube_Gun`],
    linkedItems: {
      weapon: {
        name: 'Cube Gun',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Cyclone',
    saveFileSlug: undefined,
    imagePath: '/items/mods/cyclone.png',
    id: '1bfadq',
    dlc: 'dlc2',
    description: `Maintaining an overhead Charged Melee forms a 5m sand cyclone, dealing 35 damage per second and pulls enemies towards the wielder. Each Cyclone hit applies EXPOSED for 3s. Max 15s.`,
    wikiLinks: [`https://remnant.wiki/Mirage`],
    linkedItems: {
      weapon: {
        name: 'Mirage',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Deadpoint',
    saveFileSlug: 'Mod_Mortar_C',
    imagePath: '/items/mods/corrupted_deadpoint.png',
    id: 'ysz4fw',
    dlc: 'base',
    description:
      'Fires a cluster bomb which detonates on impact across 2.5m. Each cluster deals up to 50 → 150 damage per explosion within 3.5m.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Corrupted_Meridian`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Meridian',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Deadwood',
    saveFileSlug: 'Mod_Deadwood_C',
    imagePath: '/items/mods/deadwood.png',
    externalTokens: ['Explosive Damage'],
    id: 'k7z7rz',
    dlc: 'dlc2',
    description:
      "Disables automatic BLOWBACK, while increasing Thorn's Reload Speed by 25%, and Fire Rate by 15%.\n\nReactivating the Mod will trigger an EMPOWERED BLOWBACK, which detonates all needles at once for 100% additional damage. Lasts 20s.",
    wikiLinks: [`https://remnant.wiki/Thorn`],
    linkedItems: {
      weapon: {
        name: 'Thorn',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Death Brand',
    saveFileSlug: 'Mod_DeathBrand_C',
    imagePath: '/items/mods/corrupted_deathbrand.png',
    id: 'd3q99g',
    dlc: 'base',
    description:
      'Applies Death Brand to all non-allies within 25m, increasing incoming damage by 10%. Enemies killed while bearing the Death Brand leave behind an Echo which lasts 10s before returning to the Nightmare Realm.\n\nEchoes are drawn to any survivor who walks within 3m, increasing Weakspot Damage dealt by 10% for 10s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Corrupted_Rune_Pistol`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Rune Pistol',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Death Sentence',
    saveFileSlug: undefined,
    imagePath: '/items/mods/feraljudgement.png',
    id: 'wilhsl',
    dlc: 'base',
    description:
      'Dealing Melee Damage 6 times over 10s empowers Feral Judgement. When empowered, Neutral Backdash Charge Attacks apply Death Sentence.\n\nAfter 1.5s of being sentenced, the enemy will suffer 10 Phantom Strikes, dealing 25 - 75 Damage each. Deals 25% additional damage to BLEEDING enemies.',
    wikiLinks: [`https://remnant.wiki/Feral_Judgement`],
    linkedItems: {
      weapon: {
        name: 'Feral Judgement',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Defrag',
    saveFileSlug: 'Mod_Defrag_C',
    imagePath: '/items/mods/defrag.png',
    id: '3hqdob',
    dlc: 'base',
    description:
      'Infects weapon with Malware for 30s, causing shots to apply FRAGMENTED for 5s. When a FRAGMENTED enemy dies, they create a Glitch that lasts 15s.\n\nPicking up a Glitch increases All damage by 20% for 15s.\n\nDestroying a Glitch causes it to destabilize, creating a 5m Virus Pool which deals 25 damage per second and applies the FRAGMENTED debuff to enemies inside. Virus Pools last 15s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Defrag`],
    location: { world: 'Root Earth', dungeon: ['Ashen Wasteland'] },
  },
  {
    category: 'mod',
    name: 'Dreadwalker',
    saveFileSlug: 'Mod_Dreadwalker_C',
    imagePath: '/items/mods/dreadwalker.png',
    id: 'ybej3w',
    dlc: 'base',
    description:
      'Enter the Nightmare Realm. Nightfall gains infinite Ammo, a 25% Fire Rate increase, 10% Lifesteal, and becomes fully automatic. The wielder becomes significantly harder to hit while moving.\n\nDisables other weapons and Skills for the duration, or until Dreadwalker is deactivated. Lasts 10s.',
    wikiLinks: [`https://remnant.wiki/Nightfall`],
    linkedItems: {
      weapon: {
        name: 'Nightfall',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Dreamwave',
    saveFileSlug: undefined,
    imagePath: '/items/mods/dreamwave.png',
    id: 'dwmc70',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      'After dealing 250 - 750 damage, Charge Attack will release a Dreamwave, floating outwards 20m and returning to caster.\n\nDreamwave applies SLOW to all enemies for 10s and grants a Stack of REVERIE for each enemy affected. Each Stack grants 2% to All Damage and 2% Movement Speed, which lasts 15s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Dreamcatcher`],
    linkedItems: {
      weapon: {
        name: 'Dreamcatcher',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Dying Breath',
    saveFileSlug: undefined,
    imagePath: '/items/mods/dyingbreath.png',
    id: '22nk8x',
    dlc: 'base',
    description: `When Infused, Neutral Backdash Charge Attack explodes in a 3m AOE and leaves an ACID Cloud which lasts for 15s.`,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Gas_Giant`],
    linkedItems: {
      weapon: {
        name: 'Gas Giant',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Energy Wall',
    imagePath: '/items/mods/energywall.png',
    saveFileSlug: 'Mod_EnergyWall_C', // todo test this on loadout import
    id: '8uluwc',
    dlc: 'base',
    description:
      'Deploys an energy barrier on impact with ground. Allies can shoot through Energy Wall but enemy projectiles are absorbed (up to 500 damage received). Max 1 Wall at a time. Lasts 30s.',
    wikiLinks: [`https://remnant.wiki/Energy_Wall`],
    location: { world: `N'Erud`, dungeon: ['Timeless Horizon'] },
  },
  {
    category: 'mod',
    name: 'Energy Wave',
    saveFileSlug: undefined,
    imagePath: '/items/mods/energywave.png',
    id: '7ztoh8',
    dlc: 'base',
    description:
      'Charge Attacks use Stamina to release an energy wave projectile, allowing the wielder to strike enemies from much farther away.',
    wikiLinks: [`https://remnant.wiki/Hero's_Sword`],
    linkedItems: {
      weapon: {
        name: "Hero's Sword",
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Eulogy',
    saveFileSlug: 'Mod_Eulogy_C',
    imagePath: '/items/mods/eulogy.png',
    id: '3xf7i2',
    dlc: 'base',
    description:
      'Recalls bolts which deal 30 → 90 damage when pulled from a target and when striking targets on their return. Recalled bolts grant 2% of Max Health.\n\nRecalled bolts can also overfill Sorrow up to +5. Any additional bolts will be returned to reserves.',
    externalTokens: [`Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Sorrow`],
    linkedItems: {
      weapon: {
        name: 'Sorrow',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Explosive Shot',
    saveFileSlug: 'Mod_ExplosiveShot_C',
    imagePath: '/items/mods/explosiveshot.png',
    id: 'hpfdzp',
    dlc: 'base',
    description:
      'Fires an explosive round that deals up to 175 → 525 FIRE damage within 9m and applies BURNING, dealing 250 → 750 FIRE damage over 10s.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Hellfire`],
    linkedItems: {
      weapon: {
        name: 'Hellfire',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Familiar',
    saveFileSlug: 'Mod_Familiar_C',
    imagePath: '/items/mods/familiar.png',
    id: 'sccdmt',
    dlc: 'base',
    description:
      'Summons Fearie Familiar to aid in combat. The Familiar selects a random enemy within 10m and slashes through them for 25 damage each attack. Familiar will select a new target when the previous one dies. Lasts 15s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Familiar`],
    location: { world: 'Losomn', dungeon: [`Briella's Garden`] },
  },
  {
    category: 'mod',
    name: 'Fargazer',
    saveFileSlug: 'Mod_Fargazer_C',
    imagePath: '/items/mods/fargazer.png',
    id: 'yedqs6',
    dlc: 'base',
    description:
      "Calls forth an eye of Legion to gaze at the player's AIM target. For every 0.25s Fargazer focuses on a target within 25m, a stack of MADNESS Status is applied for 5s. Each stack deals 3 Damage per second. Max 10 stacks. Lasts 30s.",
    wikiLinks: [`https://remnant.wiki/Fargazer`],
    location: { world: 'Yaesha', dungeon: ['The Twisted Chantry'] },
  },
  {
    category: 'mod',
    name: 'Fathomless Deep',
    saveFileSlug: undefined,
    imagePath: '/items/mods/fathomlessdeep.png',
    dlc: 'dlc1',
    id: 'o1zwol',
    description:
      'Charged Melee Hits grant Fathomless Deep which increases Melee Stagger by 10% per stack for 5s. Max 3 stacks.',
    wikiLinks: [`https://remnant.wiki/Abyssal_Hook`],
    linkedItems: {
      weapon: {
        name: 'Abyssal Hook',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Faultline',
    saveFileSlug: undefined,
    imagePath: '/items/mods/faultline.png',
    id: '5mlisj',
    dlc: 'base',
    description:
      'Melee Charge attacks fire off ground-based shockwaves which deal 115 - 345 damage.',
    wikiLinks: [`https://remnant.wiki/Stonebreaker`],
    linkedItems: {
      weapon: {
        name: 'Stonebreaker',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Firestorm',
    saveFileSlug: 'Mod_Firestorm_C',
    imagePath: '/items/mods/firestorm.png',
    id: 'snlx8w',
    dlc: 'base',
    description:
      'Creates a whirling cyclone that sucks in nearby targets and applies BURNING for 10s. The center of the cyclone deals 75 FIRE damage per second. Lasts 15s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Firestorm`],
    location: { world: 'Losomn', dungeon: ['Gilded Chambers'] },
  },
  {
    category: 'mod',
    name: 'Fission Strike',
    saveFileSlug: undefined,
    imagePath: '/items/mods/fissionstrike.png',
    id: 'd490vt',
    dlc: 'base',
    description:
      'On Neutral Evade Attacks Atom Splitter achieves Nuclear Fission, releashing a wave of charged particles which deals 150 - 450 damage to targets within 20m.\n\nCharged Neutral Evade Attacks increase range by 3x and damage by 25%.',
    wikiLinks: [`https://remnant.wiki/Atom_Splitter`],
    linkedItems: {
      weapon: {
        name: 'Atom Splitter',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Flying Bomb Trap',
    saveFileSlug: 'Mod_FlyingBombTrap_C',
    imagePath: '/items/mods/flyingbombtrap.png',
    id: '2GWpcL',
    dlc: 'dlc2',
    externalTokens: ['Amplitude'],
    description:
      'Fires a projectile that deploys up to 5 traps after contacting the ground.\n\nEach trap can launch a flask of deadly liquid up to 15m when an enemy travels above and will rearm once every 1.5s. Flask detonations release a 7m shockwave which deals 50 Damage and splashes targets within 4m of the center for 100 ACID Damage, applying CORRODED for 100 damage over 10s.\n\nLasts 20s or 10 total flask launches.',
    wikiLinks: [`https://remnant.wiki/Flying_Bomb_Trap`],
    location: { world: 'Yaesha', dungeon: ['Proving Grounds'] },
  },
  {
    category: 'mod',
    name: 'Fracture',
    saveFileSlug: undefined,
    imagePath: '/items/mods/fracture.png',
    id: 'x8vmra',
    dlc: 'base',
    description:
      'Charge Attacks taint the blood of targets, causing all attacks from Godsplitter to register as Weakspot hits for 2s.',
    wikiLinks: [`https://remnant.wiki/Godsplitter`],
    linkedItems: {
      weapon: {
        name: 'Godsplitter',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Fusion Cannon',
    saveFileSlug: 'Mod_FusionCannon_C',
    imagePath: '/items/mods/fusioncannon.png',
    id: 'D8obdv',
    dlc: 'base',
    description:
      'Funnels all current Mod Charges into a powerful penetrating rail dealing 100 → 300 base damage which is increased per Charge consumed. Max 5 Charges.\n\nConsuming a Charge refills 20% of the Primary Magazine.',
    wikiLinks: [`https://remnant.wiki/Corrupted_Savior`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Savior',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Gravity Core',
    saveFileSlug: 'Mod_GravityCore_C',
    imagePath: '/items/mods/gravitycore.png',
    id: 'kep3kb',
    dlc: 'base',
    description:
      'Fires a highly compressed sphere which creates a large Gravity Well on contact, pulling in enemies for 4s.\n\nWhen the Gravity Well expires, it deals 375 → 1125 damage within 10m. Adds 250 → 750 damage per enemy and divides total damage among all enemies.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Starkiller`],
    linkedItems: {
      weapon: {
        name: 'Starkiller',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: "Guardian's Call",
    saveFileSlug: 'Mod_GuardiansCall_C',
    imagePath: '/items/mods/guardianscall.png',
    id: 'anhbhf',
    dlc: 'base',
    description:
      'When Mod Power is full, Primary Fire becomes Empowered and highlights enemies it strikes.\n\nActivating the Mod calls down a Guardian Sword on enemies struck by an Empowered Energy Disc. Swords deal 150 → 450 damage and 3x stagger within 3m.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Twisted_Arbalest`],
    linkedItems: {
      weapon: {
        name: 'Twisted Arbalest',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: `Guardian's Fury`,
    saveFileSlug: 'Mod_GuardiansVigil_C',
    imagePath: '/items/mods/guardiansfury.png',
    id: 'WzXG4x',
    dlc: 'base',
    description:
      "Imbues the Arbalest with the power of Yaesha's corrupted guardian, increases Fire Rate by 20%, reduces Recoil and Sway by 25% and each disc impact with an enemy explodes over 3.5m for 69 → 207 damage. Lasts 15s.",
    externalTokens: [`Amplitude`, 'Explosive Damage'],
    wikiLinks: [`https://remnant.wiki/Corrupted_Arbalest`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Arbalest',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Harvester Bots',
    saveFileSlug: 'Mod_HarvesterBots_C', // TODO check
    imagePath: '/items/mods/harvesterbots.png',
    id: 'vk6XTW',
    dlc: 'dlc3',
    tags: ['Lifesteal'],
    description: `Releases 5 Harvester Bots for 30s that seek an enemy to siphon, granting allies within 30m a stack of DRAIN.\n\nDRAIN: Gain 1% of base damage dealt as Lifesteal per stack. Max 5 stacks.`,
    wikiLinks: [`https://remnant.wiki/Harvester_Bots`],
    location: { world: `N'Erud`, dungeon: [`Detritus Foundry`] },
  },
  {
    category: 'mod',
    name: 'Heatwave',
    saveFileSlug: 'Mod_Heatwave_C',
    imagePath: '/items/mods/heatwave.png',
    dlc: 'dlc2',
    id: 'vc3s1n',
    externalTokens: ['Amplitude'],
    description:
      'Activates a 15m aura of sweltering heat, causing enemies inside the aura for 3s to begin BURNING for 250 FIRE Damage over 5s. Lasts 30s.',
    wikiLinks: [`https://remnant.wiki/Heatwave`],
    location: { world: 'Yaesha', dungeon: ['Deserted Atelier'] },
  },
  {
    category: 'mod',
    name: 'Healing Shot',
    saveFileSlug: 'Mod_HealingShot_C',
    imagePath: '/items/mods/healingshot.png',
    id: 'vc361n',
    dlc: 'base',
    description:
      'Launches a payload that explodes on contact with allies, healing 35% of their max health. When no ally is struck, payload lays dormant until an ally gets close. Dormant payload lasts 30s, slowly losing healing potency over time.',
    wikiLinks: [`https://remnant.wiki/Healing_Shot`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mod',
    name: 'Heat Sink',
    saveFileSlug: 'Mod_HeatSink_C',
    imagePath: '/items/mods/heatsink.png',
    id: 's49h0c',
    dlc: 'base',
    description:
      "Forces open Plasma Cutter's heat vents dispersing all heat. While active, Plasma Cutter generates 50% less heat, and ramping damage cap is increased to 3x Damage. Overheats automatically when deactivated. Lasts 20s.",
    wikiLinks: [`https://remnant.wiki/Plasma_Cutter`],
    linkedItems: {
      weapon: {
        name: 'Plasma Cutter',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Helix',
    saveFileSlug: 'Mod_Helix_C',
    imagePath: '/items/mods/helix.png',
    externalTokens: ['Explosive Damage'],
    id: '1mtqkk',
    dlc: 'base',
    description:
      'Shoots a helix of missiles, dealing 120 - 360 damage. On contact, divides into 6 smaller rockets which seek additional targets, dealing 30 - 90 damage on contact.',
    wikiLinks: [`https://remnant.wiki/Helix`],
    location: { world: `N'Erud`, dungeon: [`Astropath's Respite`] },
  },
  {
    category: 'mod',
    name: 'Horizon Strike',
    saveFileSlug: undefined,
    imagePath: '/items/mods/horizonstrike.png',
    id: '2fjw9q',
    dlc: 'base',
    description:
      'Charge Attacks release a wide horizontal projectile that penetrates through multiple enemies dealing 101 - 302 damage.',
    wikiLinks: [`https://remnant.wiki/World's_Edge`],
    linkedItems: {
      weapon: {
        name: "World's Edge",
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Hot Shot',
    saveFileSlug: 'Mod_Hotshot_C',
    imagePath: '/items/mods/hotshot.png',
    id: '9vzb9r',
    dlc: 'base',
    description:
      'Imbues ammunition with FIRE and increases Ranged damage by 15% for 20s. Shots also apply BURNING, dealing 200 - 600 FIRE Damage over 10 seconds.',
    wikiLinks: [`https://remnant.wiki/Hot_Shot`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mod',
    name: 'Indomitable Strike',
    saveFileSlug: 'Mod_IndomitableStrike_C', // TODO Check
    imagePath: '/items/mods/indomitablestrike.png',
    id: '778jv8',
    dlc: 'dlc3',
    tags: [
      'Damage Reduction',
      'Grey Health',
      'Stagger',
      'Charged Melee Damage',
    ],
    description: `Charged Attacks become INDOMITABLE.\n\nINDOMITABLE: Grants 15% Damage Reduction, converts all damage taken to Grey Health, and prevents wielder from being staggered. Charging increases maximum damage by up to 350%.`,
    wikiLinks: [`https://remnant.wiki/Black_Greatsword`],
    location: { world: 'Any', dungeon: 'Linked Item' },
    linkedItems: {
      weapon: {
        name: 'Black Greatsword',
      },
    },
  },
  {
    category: 'mod',
    name: 'Javelin',
    saveFileSlug: undefined,
    imagePath: '/items/mods/athibar.png',
    id: '29kz6t',
    dlc: 'base',
    description: `Charge attacks use 25 stamina to throw the spear, which returns to the wielder's hand.`,
    wikiLinks: [`https://remnant.wiki/Huntress_Spear`],
    linkedItems: {
      weapon: {
        name: 'Huntress Spear',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Knight Guard',
    saveFileSlug: 'Mod_KnightGuard_C',
    imagePath: '/items/mods/knightguard.png',
    dlc: 'dlc1',
    id: 'e4n1w4',
    description:
      'Summons Knight Guard to aid in combat. The Guards hurl penetrating slashes at a random enemy dealing 15 damage. The Guards will melee enemies if close enough for 15 damage. Lasts 20s.',
    wikiLinks: [`https://remnant.wiki/Knight_Guard`],
    location: { world: 'Losomn', dungeon: ['Walk of Rememberance'] },
  },
  {
    category: 'mod',
    name: 'Krell Edge',
    saveFileSlug: undefined,
    imagePath: '/items/mods/krelledge.png',
    id: '38rncx',
    dlc: 'base',
    description:
      'Charge to throw the Krell Axe which applies OVERLOADED on hit, dealing 50 - 150 SHOCK damage every 5s for 20s. Shortly after throwing, another will appear in the wielders hand.\n\nCosts 25 Stamina.',
    wikiLinks: [`https://remnant.wiki/Krell_Axe`],
    linkedItems: {
      weapon: {
        name: 'Krell Axe',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Lifeline',
    saveFileSlug: undefined,
    imagePath: '/items/mods/lifeline.png',
    id: '4zqfhu',
    dlc: 'base',
    description:
      'After dealing 250 - 750 damage, the next Charge Attack causes the Spirit of the Red Doe to stampede forward, dealing 160  - 480 damage to enemies and regenerating 10% Health to allies.',
    wikiLinks: [`https://remnant.wiki/Red_Doe_Staff`],
    linkedItems: {
      weapon: {
        name: 'Red Doe Staff',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Loathe the Weak',
    saveFileSlug: 'Mod_LoathTheWeak_C',
    imagePath: '/items/mods/loaththeweak.png',
    externalTokens: ['Explosive Damage'],
    dlc: 'dlc1',
    id: 'aobtw7',
    description:
      'Rapidly fires volatile needles that explode after 1.5s dealing 30 → 90 explosive damage. Deals additional damage to targets with lower health. Lasts 10s.',
    wikiLinks: [`https://remnant.wiki/Anguish`],
    linkedItems: {
      weapon: {
        name: 'Anguish',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Mega Drive',
    saveFileSlug: 'Mod_MegaDrive_C', // TODO Check
    imagePath: '/items/mods/megadrive.png',
    id: '5s9x12',
    dlc: 'dlc3',
    description: `Activate while a valid target is in-sights, marking it with quantum Entanglement. All Genesis projectiles seek to the Entanglement target after initial impact, dealing 50% of Primary Fire damage.\n\nWhile active, activating can switch Entanglement target. Lasts 15s.`,
    wikiLinks: [`https://remnant.wiki/Genesis`],
    linkedItems: {
      weapon: {
        name: 'Genesis',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Micronova',
    saveFileSlug: 'Mod_Micronova_C',
    imagePath: '/items/mods/corrupted_micronova.png',
    id: '8izb2g',
    dlc: 'base',
    description:
      "Fires 5 shattered star orbs. On contact, they each explode for 75 → 225 FIRE damage, and apply 200 → 600 BURNING damage over 10s to all targets within 2.75m.\n\nStriking the Micronova with Corrupted Aphelion's primary fire causes a chain reaction of larger and more powerful detonations which also apply the initial BURNING amount.\n\nGenerates 1 Primary Ammo on Fire.",
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Corrupted_Aphelion`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Aphelion',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Moonlight Barrage',
    saveFileSlug: 'Mod_MoonlightBarrage_C',
    imagePath: '/items/mods/moonlightbarrage.png',
    id: 'wfak3h',
    dlc: 'base',
    description:
      'Empowers the Bow for 15s. Arrows apply Moonlight to enemies for 3s. Enemies struck by Crescent Moon while Moonlit release a Moon Essence which returns 1 arrow, heals 5% of Max Health, and grants 15% Fire and Reload Speed for 5s.\n\nBasic Shots automatically become Charged Shots. Perfect Shots fire two arrows.',
    wikiLinks: [`https://remnant.wiki/Crescent_Moon`],
    linkedItems: {
      weapon: {
        name: 'Crescent Moon',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Nano Phase',
    saveFileSlug: 'Mod_NanoPhase_C',
    imagePath: '/items/mods/nanophase.png',
    id: 'WARGv3',
    dlc: 'base',
    description:
      'Detonate active Nano-bots, each dealing 100 → 300 ACID damage plus an additional 25 → 75 ACID damage per Nano-bot detonated to enemies within 2m and applies CORRODED, dealing 50 → 150 damage over 10s per Nano-bot detonated.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Corrupted_Nebula`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Nebula',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Nano Swarm',
    saveFileSlug: 'Mod_NanoSwarm_C',
    imagePath: '/items/mods/nanoswarm.png',
    id: '8ko9zz',
    dlc: 'base',
    description:
      'Unleash a swarm of Nanomachines that seek after enemies within 20 meters and repeatedly attack dealing 6 → 18 ACID damage per hit and applying CORRODED dealing 100 → 300 ACID damage over 10s. Lasts 15 seconds.',
    wikiLinks: [`https://remnant.wiki/Nebula`],
    linkedItems: {
      weapon: {
        name: 'Nebula',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Ouroboros',
    saveFileSlug: 'Mod_Ouroboros_C',
    imagePath: '/items/mods/ouroboros.png',
    id: 'czgb8w',
    dlc: 'base',
    description:
      'Conjures 3 sword fragments that encircle the wielder for 30s. Performing a Melee Attack lets loose a Fragment which taints the blood of targets, causing all attacks from Deceit to register as Weakspot hits for a short period of time.\n\nCharge Melee Attacks fire all remaining Fragments at once but they taint blood for a shorter duration for each thrown.',
    wikiLinks: [`https://remnant.wiki/Deceit`],
    linkedItems: {
      weapon: {
        name: 'Deceit',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Overflow',
    saveFileSlug: 'Mod_Overflow_C',
    imagePath: '/items/mods/overflow.png',
    id: 'tya9an',
    dlc: 'base',
    description:
      'Imbues ammunition with SHOCK and increases Fire Rate by 15% and Reload Speed by 15% for 20 seconds. Shots also apply OVERLOADED, dealing 35 SHOCK Damage every 5s for 15s.',
    wikiLinks: [`https://remnant.wiki/Overflow`],
    location: {
      world: `N'Erud`,
      dungeon: ['Ascension Spire'],
    },
  },
  {
    category: 'mod',
    name: 'Power Stone',
    saveFileSlug: undefined,
    imagePath: '/items/mods/powerstone.png',
    id: '2JimAt',
    dlc: 'dlc2',
    tags: ['Status Effect'],
    description:
      'Charged Melee empowers the staff for 10s, causing Melee Attacks to launch an energy bolt that seeks enemies within 30m, dealing 50 - 150 SHOCK Damage and grants 1 stack of POWER STONE. Max 10 stacks.\n\nWhile empowered, Charged Melee calls a 6m shockwave dealing 75 - 225 SHOCK Damage and ends POWER STONE. For each POWER STONE stack built when ended, release 1 energy bolt that seeks a random enemy and applies OVERLOADED to 10s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Crystal_Staff`],
    linkedItems: {
      weapon: {
        name: 'Crystal Staff',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Prismatic Driver',
    saveFileSlug: 'Mod_PrismaticDriver_C', // todo test this on loadout import
    imagePath: '/items/mods/prismaticdriver.png',
    id: 'vtcg3o',
    dlc: 'base',
    description:
      'Fires a superheated beam which deals 25 Mod Damage per second. Sustaining the beam on a target causes an explosion which deals 150 Mod damage in a 3m AOE.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Prismatic_Driver`],
    location: { world: `N'Erud`, dungeon: [`Spectrum Nexus`] },
  },
  {
    category: 'mod',
    name: 'Reaver',
    saveFileSlug: undefined,
    imagePath: '/items/mods/reaver.png',
    dlc: 'dlc1',
    id: 'geb8ho',
    description: `Increases Melee Damage by 10% if the target is suffering from a Negative Status Effect.`,
    wikiLinks: [`https://remnant.wiki/Ritualist_Scythe`],
    linkedItems: {
      weapon: {
        name: 'Ritualist Scythe',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Recoil Dampener',
    saveFileSlug: 'Mod_RecoilDampener_C', // TODO Check
    imagePath: '/items/mods/recoildampener.png',
    id: 'Rix6Sr',
    dlc: 'dlc3',
    tags: ['Charged Shot', 'Recoil', 'Critical Chance', 'Critical Damage'],
    description: `Activation stabilizes Monorail, increasing Charge Speed by 25% and reducing Recoil and Sway by 75%. Lasts 20s.\n\nAdditional, for each 5% of the Charge Meter filled upon firing, gain 1% Critical Chance and Critical Damage. Max 20%.`,
    wikiLinks: [`https://remnant.wiki/Monorail`],
    linkedItems: {
      weapon: {
        name: 'Monorail',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Ring of Spears',
    saveFileSlug: 'Mod_RingOfSpears_C',
    imagePath: '/items/mods/ringofspears.png',
    dlc: 'dlc1',
    id: '4rdl8r',
    description:
      'Calls forth 7 Phantom Spears to encircle the wielder for 25s. Deals up to 35 damage per second to nearby enemies, based on the number of spears remaining in the ring.\n\nWhile active, spears can be thrown by reactivating the Mod. Spears deal 100 and will remain at their impact point for the duration of the Mod.\n\nHolding the Mod Button recalls embedded Spears, dealing 50 damage to enemies along their path. When all recalled spears return, they cause an Explosion dealing up to 350 damage based on the number of spears recalled.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Ring_of_Spears`],
    location: { world: 'Losomn', dungeon: ['Glistering Cloister'] },
  },
  {
    category: 'mod',
    name: 'Rootlash',
    saveFileSlug: 'Mod_Rootlash_C',
    imagePath: '/items/mods/rootlash.png',
    id: 'nfw6ja',
    dlc: 'base',
    description:
      "Launches a projectile which summons a Root Tentacle. Tentacles deal 30 - 90 damage and steal 1.5% of the hero's Max Health per hit. Lasts 20s. (Max 2)",
    wikiLinks: [`https://remnant.wiki/Rootlash`],
    location: { world: 'Yaesha', dungeon: [`Kaeula's Rest`] },
  },
  {
    category: 'mod',
    name: 'Rotted Arrow',
    saveFileSlug: 'Mod_RottedArrow_C',
    imagePath: '/items/mods/rottedarrow.png',
    id: 'vgin4w',
    dlc: 'base',
    description:
      'Fires a rotten arrow that deals 75 - 225 Base Damage with a 125% bonus Weakspot modifier. Detonates for another 100 - 300 damage within 1.5m.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Rotted_Arrow`],
    location: { world: 'Yaesha', dungeon: ['The Expanding Glade'] },
  },
  {
    category: 'mod',
    name: 'Sandstorm',
    saveFileSlug: 'Mod_Sandstorm_C',
    imagePath: '/items/mods/sandstorm.png',
    dlc: 'dlc2',
    id: 'ozNPv9',
    tags: [],
    description:
      "Launch a sphere of loam. Impact creates a 5m swirling storm of sand which seeks to center itself on an enemy and deals 45 → 135 Elemental damage per second. When Sandstorm's focused target dies, it will seek a new enemy within 10m. Lasts 15s.",
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Monolith`],
    linkedItems: {
      weapon: {
        name: 'Monolith',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Scrap Shot',
    saveFileSlug: 'Mod_ScrapShot_C',
    imagePath: '/items/mods/scrapshot.png',
    id: 'hcv400',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      'Fires a canister that releases Caltrops over an area of 6m. Caltrops apply SLOW and BLEEDING to enemies, dealing 400 - 1,200 damage over 10s. Lasts 10s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Scrap_Shot`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mod',
    name: 'Screamer',
    saveFileSlug: 'Mod_Screamer_C',
    imagePath: '/items/mods/screamer.png',
    id: '4aeebu',
    dlc: 'base',
    description:
      'Fires a high-powered rocket that deals up to 200 → 600 damage within 2.5m.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Meridian`],
    linkedItems: {
      weapon: {
        name: 'Meridian',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Shatterstar',
    saveFileSlug: 'Mod_Shatterstar_C',
    imagePath: '/items/mods/shatterstar.png',
    id: 'z9e8qq',
    dlc: 'base',
    description:
      'Imbues ammunition with FIRE. Hits apply BURNING, which deals 250 → 750 FIRE damage over 10 seconds. Lasts 20s.\n\nHitting an enemy causes the shot to fragment, striking enemies within 7m for 30% of the initial damage dealt and also apply BURNING. Lasts 20s.',
    wikiLinks: [`https://remnant.wiki/Savior`],
    linkedItems: {
      weapon: {
        name: 'Savior',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Shielding Shot',
    saveFileSlug: 'Mod_ShieldingShot_C', // TODO Check this
    imagePath: '/items/mods/shieldingshot.png',
    id: 'DUs5M2',
    dlc: 'dlc3',
    description: `Launches a payload that bursts on contact with allies, applying a SHIELD for 25% of their Max Health for 15s. Max 50% SHIELD. When no ally is struck, payload lays dormant until an ally gets close. Dormant payload lasts 30s and slowly loses Shield potency over time.`,
    wikiLinks: [`https://remnant.wiki/Shielding_Shot`],
    location: { world: `N'Erud`, dungeon: [`Anathaeum Wek`] },
  },
  {
    category: 'mod',
    name: 'Skewer 2.0',
    saveFileSlug: 'Mod_Skewer_C',
    imagePath: '/items/mods/skewer.png',
    id: 'cpvech',
    dlc: 'base',
    description:
      'Fires a Wretched Spear which embeds itself on contact. Spears deal 125 damage on hit, rapidly dividing inside the target until bursting, dealing 140 damage to all targets within 3m. Spears embedded in the environment remain in place for 10s.',
    externalTokens: ['Amplitude'],
    wikiLinks: [`https://remnant.wiki/Skewer_2.0`],
    location: { world: 'Root Earth', dungeon: ['Corrupted Harbor'] },
  },
  {
    category: 'mod',
    name: 'Song of Eafir',
    saveFileSlug: 'Mod_SongOfEafir_C',
    imagePath: '/items/mods/songofeafir.png',
    id: 'edm644',
    dlc: 'base',
    tags: ['Status Effect', 'Damage Reduction'],
    description:
      'Fires a shot infused with the binding power of the Song of Eafir. Staggers most ground enemies within 10m and deals 150 - 450 damage to Flying enemies within the same range.\n\nThe song continues for 15s, afflicting targets within 15m with SLOW reducing their damage by 10%.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Song_of_Eafir`],
    location: { world: 'Yaesha', dungeon: 'Quest' },
  },
  {
    category: 'mod',
    name: 'Soul Brand',
    saveFileSlug: 'Mod_Soulbrand_C',
    imagePath: '/items/mods/soulbrand.png',
    id: 'imk8xh',
    dlc: 'base',
    description:
      'Applies Soul Brand to all enemies within 25m which lasts 25s. Enemies killed while bearing the Soul Brand leave behind an Echo which lasts 10s before returning to the Nightmare Realm.\n\nEchoes are drawn to any survivor who walks within 3m, granting 20% of Max Health on contact.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Rune_Pistol`],
    linkedItems: {
      weapon: {
        name: 'Rune Pistol',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Soulbinder',
    saveFileSlug: 'Mod_Soulbinder_C',
    imagePath: '/items/mods/soulbinder.png',
    id: '5bb0mv',
    dlc: 'base',
    description:
      'Fires a projectile that attaches to the enemy dealing 40 damage. Enemies within 7m become bound to the primary target after impact and share 60% of damage dealt to them. Lasts 15s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Soulbinder`],
    location: { world: 'Yaesha', dungeon: ['The Chimney'] },
  },
  {
    category: 'mod',
    name: 'Space Crabs',
    saveFileSlug: 'Mod_SpaceCrabs_C',
    imagePath: '/items/mods/spacecrabs.png',
    externalTokens: ['Explosive Damage'],
    id: '4wd3gm',
    dlc: 'base',
    description:
      'Launch an alien egg that bursts on impact, releasing 5 Space Crabs. Crabs follow the caster, leaping towards enemies within 4m, and exploding, dealing 60 - 180 damage each.',
    wikiLinks: [`https://remnant.wiki/Space_Crabs`],
    location: { world: `N'Erud`, dungeon: [`The Hatchery`] },
  },
  {
    category: 'mod',
    name: 'Spore Shot',
    saveFileSlug: 'Mod_SporeShot_C',
    imagePath: '/items/mods/sporeshot.png',
    id: '9fi67v',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      'Fires a rotten spore that releases a specialized gas cloud over 6m. Applies SLOW to enemies while dealing 15 → 45 damage per second for 7s. Grants HASTE to allies, which lasts 5s after leaving the cloud.',
    wikiLinks: [`https://remnant.wiki/Sporebloom`],
    linkedItems: {
      weapon: {
        name: 'Sporebloom',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Starfall',
    saveFileSlug: 'Mod_Starfall_C',
    imagePath: '/items/mods/starfall.png',
    id: 'j9wkb3',
    dlc: 'base',
    description:
      'Fires a magical arrow which deals 30 → 90 damage and opens a 7m portal that rains down star fragments. Each fragment deals 50 → 150 damage within 2m. Last 6s.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Sagittarius`],
    linkedItems: {
      weapon: {
        name: 'Sagittarius',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Stasis Beam',
    saveFileSlug: 'Mod_StasisBeam_C',
    imagePath: '/items/mods/stasisbeam.png',
    id: 'rer73h',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      'Fires a beam which deals 15 - 45 damage per second, and applies SLOW Debuff. After 2s of application to an enemy, SLOW becomes STASIS, freezing the target in place for 10s.',
    wikiLinks: [`https://remnant.wiki/Stasis_Beam`],
    location: { world: `N'Erud`, dungeon: 'World Drop' },
  },
  {
    category: 'mod',
    name: 'Supernova',
    saveFileSlug: 'Mod_Supernova_C',
    imagePath: '/items/mods/supernova.png',
    id: '9rxk65',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      "Fires the compressed remains of a dying star. On contact, explodes for 150 → 450 FIRE damage, and 350 → 1050 BURNING damage over 10s to all targets within 4m.\n\nStriking the Supernova with Aphelion's primary fire spawns a massive shockwave which greatly increases the area of effect, total damage, and applies the initial BURNING amount.\n\nGenerates 1 Primary Ammo on Fire.",
    externalTokens: [`Amplitude`, 'Explosive Damage'],
    wikiLinks: [`https://remnant.wiki/Aphelion`],
    linkedItems: {
      weapon: {
        name: 'Aphelion',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Time Lapse',
    saveFileSlug: 'Mod_TimeLapse_C',
    imagePath: '/items/mods/timelapse.png',
    id: 'nn1q6k',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      'Creates a 6m blast which freezes all standard enemies for 7s.\n\nDealing damage to frozen enemies immediately breaks the Time Lapse effect, applying SLOW for the remaining duration.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Time_Lapse`],
    location: { world: 'Losomn', dungeon: ['Hewdas Clock'] },
  },
  {
    category: 'mod',
    name: 'Tremor',
    saveFileSlug: 'Mod_Tremor_C',
    imagePath: '/items/mods/tremor.png',
    id: 'g6glpj',
    dlc: 'base',
    description:
      'Fires a projectile that cracks the ground and spawns shockwaves that deal 75 damage Within 9m for 6s. Shockwaves inflict 3x impact.',
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Tremor`],
    location: { world: 'Yaesha', dungeon: ['The Nameless Nest'] },
  },
  {
    category: 'mod',
    name: 'Voidlight',
    saveFileSlug: 'Mod_Voidlight_C',
    imagePath: '/items/mods/voidlight.png',
    id: '0ycjs9',
    dlc: 'dlc3',
    description: `Launches a projectile that releases Voidlight which remains dormant for 10s. While active, aborbs other damage sources.\n\nAfter expiration, explodes and fires up to 5 protectiles which home in on enemies within 22.5m. Projectiles deal 250 → 750 Mod Damage split among enemies hit, dealing an additional 150 → 450 per 100 Base Damage absorbed. Max 5x.`,
    wikiLinks: [`https://remnant.wiki/Voidlight`],
    location: { world: 'Ward 13', dungeon: 'Vendor' },
  },
  {
    category: 'mod',
    name: 'Voltaic Rondure',
    saveFileSlug: 'Mod_VoltaicRondure_C',
    imagePath: '/items/mods/voltaicrondure.png',
    id: 'wjopwy',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      'Launches a slow-moving orb that pulses every 0.5s, striking enemies within 3m for 20 → 60 SHOCK damage and applying OVERLOADED, dealing 25 → 75 SHOCK damage every 5s for 15s. The orb lasts 20s.\n\nRepeatedly damaging the orb overcharges it, increasing its radius. Overcharged orb deals 50% increased pulse damage.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Voltaic_Rondure`],
    location: { world: 'Losomn', dungeon: ['The Great Sewers'] },
  },
  {
    category: 'mod',
    name: 'Whirlwind',
    saveFileSlug: undefined,
    imagePath: '/items/mods/whirlwind.png',
    id: '2y6xm7',
    dlc: 'base',
    description:
      'Performing a Charged Melee Attack during a Neutral Backdash creates a Whirlwind of slashes which strike all enemies within 8m for 91 - 273 damage.',
    wikiLinks: [`https://remnant.wiki/Spectral_Blade`],
    linkedItems: {
      weapon: {
        name: 'Spectral Blade',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Will of the Wisp',
    saveFileSlug: 'Mod_WillOfTheWisp_C',
    imagePath: '/items/mods/willofthewisp.png',
    id: '9jwTXR',
    dlc: 'base',
    description:
      'Launches a Wisp that uniquely seeks to one anchored primary fire bolt location. Bolts anchored to enemies deal 100 → 300 damage per Wisp. Bolts anchored to allies heal 10% Max Health per Wisp. Bolts are consumed when impacted by a Wisp.',
    wikiLinks: [`https://remnant.wiki/Corrupted_Sorrow`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Sorrow',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Windfall',
    saveFileSlug: 'Mod_Windfall_C',
    imagePath: '/items/mods/corrupted_windfall.png',
    id: '82v8kz',
    dlc: 'base',
    description:
      'Fires a ring of spinning blades which penetrates targets as it travels up to 20m before returning to the weapon. While traveling, activating Windfall again causes the projectile to spin in place for up to 3s. Activating it once more will recall it.\n\nEnemies struck by the Windfall obtain Tainted Blood for 3s causing all attacks from Deceit to trigger as Weakspot hits.',
    wikiLinks: [`https://remnant.wiki/Corrupted_Deceit`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Deceit',
      },
    },
    location: { world: 'Any', dungeon: 'Linked Item' },
  },
  {
    category: 'mod',
    name: 'Witchfire',
    saveFileSlug: 'Mod_Witchfire_C',
    imagePath: '/items/mods/witchfire.png',
    id: 'ggf5qe',
    dlc: 'base',
    description:
      'Fires a highly volatile projectile that explodes to leave a line of flaming terrain. Deals 55 FIRE Damage per second, and applies BURNING, dealing 200 damage over 10s. Lasts 5s.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Witchfire`],
    location: { world: 'Losomn', dungeon: [`Cotton's Kiln`] },
  },
];
