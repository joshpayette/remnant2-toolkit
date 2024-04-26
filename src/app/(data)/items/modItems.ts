import { ModItem } from './types/ModItem'

export const modItems: ModItem[] = [
  {
    category: 'mod',
    name: 'Abrasive Rounds',
    imagePath: '/mod/abrasive_rounds.png',
    id: 'h9k5pd',
    dlc: 'dlc2',
    description: `Imbues ammunition with BLEED and increases Lifesteal by 5% for 20s. Shots also apply BLEEDING, dealing 200 damage over 10s.`,
    wikiLinks: [`https://remnant.wiki/Abrasive_Rounds`],
  },
  {
    category: 'mod',
    name: '77 79 68',
    imagePath: '/placeholder.jpg',
    dlc: 'dlc2',
    id: '777968',
    description: `84 79 71 71 76 69 32 67 79 77 66 65 84 32 70 73 82 73 78 71 32 77 79 68 69 83`,
    wikiLinks: [`https://remnant.wiki/77_79_68`],
    linkedItems: {
      weapon: {
        name: 'Polygun',
      },
    },
  },
  {
    category: 'mod',
    name: 'Accelerator',
    imagePath: '/mod/accelerator.png',
    id: 'h9k5pl',
    description: `Charge Melee Attacks increase the speed of all Melee Attacks by 10% for 5s.`,
    wikiLinks: [`https://remnant.wiki/Accelerator`],
    linkedItems: {
      weapon: {
        name: 'Atom Smasher',
      },
    },
  },
  {
    category: 'mod',
    name: 'Astral Burst',
    imagePath: '/mod/astral_burst.png',
    id: 'mqta6g',
    description: `Fires a short range burst of 7 star fragments which deal 35 damage each. Fragments bounce off walls up to 3 times, dealing 35% additional damage per bounce. Weakspot hits deal reduced damage.`,
    wikiLinks: [`https://remnant.wiki/Astral_Burst`],
  },
  {
    category: 'mod',
    name: 'Javelin',
    imagePath: '/mod/athibar.png',
    id: '29kz6t',
    description: `Charge attacks use 25 stamina to throw the spear, which returns to the wielder's hand.`,
    wikiLinks: [`https://remnant.wiki/Athibar`],
    linkedItems: {
      weapon: {
        name: 'Huntress Spear',
      },
    },
  },
  {
    category: 'mod',
    name: 'Awakening',
    imagePath: '/mod/awakening.png',
    dlc: 'dlc1',
    id: 'wszjeu',
    description: `Incoming damage grants Awakening which increases Melee Damage by 5% per stack for 10s. Max 10 stacks.`,
    wikiLinks: [`https://remnant.wiki/Awakening`],
    linkedItems: {
      weapon: {
        name: 'Wrathbringer',
      },
    },
  },
  {
    category: 'mod',
    name: 'Banish',
    imagePath: '/mod/banish1.png',
    id: 'k7z7r2',
    description: `Banishes enemies or allies into another dimension for 4s. When Banish ends, enemies take 1.25x the damage [MD] from the Repulsor's primary fire for 8s. Powerful enemies won't be banished, but will take increased damage from any Repulsor while debuffed.`,
    wikiLinks: [`https://remnant.wiki/Banish`],
    linkedItems: {
      weapon: {
        name: 'Repulsor',
      },
    },
  },
  {
    category: 'mod',
    name: 'Beta Ray',
    imagePath: '/mod/beta_ray.png',
    id: '5ke493',
    description: `Brands a target for 30s. Branded enemies that die leave a Brand at their location.
    Reloading or Swapping detonates Brands dealing 225 damage [E].
    Additional Brands (3 Max) on the same target deal 50% damage.
    Slain enemies return 5-15% of Ammo and Mod power to the weapon.`,
    wikiLinks: [`https://remnant.wiki/Beta_Ray`],
    linkedItems: {
      weapon: {
        name: 'Alpha-Omega',
      },
    },
  },
  {
    category: 'mod',
    name: 'Beyond the Veil',
    imagePath: '/mod/beyond_the_veil.png',
    id: 'puif17',
    description: `Neutral Evade turns to mist, granting Nightshade 5% base damage as Lifesteal for 5s. Perfect Dodge doubles duration.`,
    wikiLinks: [`https://remnant.wiki/Beyond_The_Veil`],
    linkedItems: {
      weapon: {
        name: 'Nightshade',
      },
    },
  },
  {
    category: 'mod',
    name: 'Big Bang',
    imagePath: '/mod/big_bang.png',
    id: 's7ozpe',
    description: `Funnels all current Mod Charges into the next shot. Projectiles deal 65 direct damage and 65 Explosive damage [E] in a 5m [A] per Charge consumed. Explosion applies 75 BURNING damage over 10s per Charge consumed. 
    Additional Charges consumed increase all damage by 5%. Max 5 Charges`,
    wikiLinks: [`https://remnant.wiki/Big_Bang`],
    linkedItems: {
      weapon: {
        name: 'Star Shot',
      },
    },
  },
  {
    category: 'mod',
    name: 'Blaze',
    imagePath: '/mod/blaze1.png',
    id: 'gdY2uZ',
    description: `Charge Melee Attacks apply BURNING which deals 150 FIRE damage over 5s`,
    wikiLinks: [`https://remnant.wiki/Blaze`],
    linkedItems: {
      weapon: {
        name: 'Smolder',
      },
    },
  },
  {
    category: 'mod',
    name: 'Blood Draw',
    imagePath: '/mod/blood_draw.png',
    id: 'ss7zwt',
    description: `Shoots out razor-sharp Chain Shards which impale up to 5 targets within 15m, dealing 10 damage [E]. On hit, chains are pulled towards the caster, dealing 250damage split equally among enemies and applying 275 BLEEDING damage over 15s.`,
    wikiLinks: [`https://remnant.wiki/Blood_Draw`],
  },
  {
    category: 'mod',
    name: 'Bloodline',
    imagePath: '/mod/bloodline.png',
    id: 'yxxajn',
    description: `Fires a devastating blast which penetrates through all enemies in its path. Deals 120 damage with a 25% Critical Damage bonus, and 2x additional stagger. Bloodline damage increases by 50% for each enemy penetrated.`,
    wikiLinks: [`https://remnant.wiki/Bloodline`],
    linkedItems: {
      weapon: {
        name: 'Merciless',
      },
    },
  },
  {
    category: 'mod',
    name: 'Bloodshot',
    imagePath: '/mod/bloodshot1.png',
    id: 'tw8tbh',
    description: `While active, grants unlimited Reserve Ammo and increases Reload Speed by 30%. If the entire magazine hits a Weakspot, Merciless will automatically perform a quick Reload. Lasts 13s.`,
    wikiLinks: [`https://remnant.wiki/Bloodshot`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Merciless',
      },
    },
  },
  {
    category: 'mod',
    name: 'Bloodthirst',
    imagePath: '/mod/bloodthirst.png',
    id: '1rw0kk',
    description: `Damage increases by +25% against BLEEDING enemies, and +25% when attacking from behind. Charge Attacks deal 100 BLEEDING damage over 10s`,
    wikiLinks: [`https://remnant.wiki/Bloodthirst`],
    linkedItems: {
      weapon: {
        name: `Assassin's Dagger`,
      },
    },
  },
  {
    category: 'mod',
    name: 'Bore',
    imagePath: '/mod/bore.png',
    id: 'iq4wjy',
    tags: ['Critical Chance', 'Weakspot Damage'],
    description: `Fires a drill projectile which bores into enemies on contact, dealing 80 damage. After fully burrowing into an enemy, creates a Weakspot which grants 50% of normal Weakspot Damage on hit. If attached to an existing Weakspot, Ranged Crit Chance is increased by 15% when attacking the drill. Lasts 6s.`,
    wikiLinks: [`https://remnant.wiki/Bore`],
  },
  {
    category: 'mod',
    name: 'Chain of Command',
    dlc: 'dlc1',
    imagePath: '/mod/chain_of_command.png',
    id: 'lxt1j0',
    description: `Harpoon Mode: Fire Harpoon to mark target causing primary fire to become Homing Rounds dealing 15% reduced damage. Enemies hit by Homing Rounds build Influence. Recasting exits Mode. When Influence fills, Monarch automatically reloads and creates a shockwave, and wielder becomes a Tyrant, gaining 20% Increased Damage and Infinite Reserves. Lasts 20s.`,
    wikiLinks: [`https://remnant.wiki/Chain_of_Command`],
    linkedItems: {
      weapon: {
        name: 'Monarch',
      },
    },
  },
  {
    category: 'mod',
    name: 'Chaos Driver',
    imagePath: '/mod/chaos_driver.png',
    id: 'dxnd9s',
    description: `Drives electrified rods into targets which tether to other rods within 10m. [A] Tethers deal 20 SHOCK damage per second.
    Targets embedded with a rod take 50 SHOCK damage per second. They take 20% additionally damage per extra rod in the target. Damage is increased by 1.5% if linked to another rod. Rods in the same target will not link.`,
    wikiLinks: [`https://remnant.wiki/Chaos_Driver`],
    linkedItems: {
      weapon: {
        name: 'Enigma',
      },
    },
  },
  {
    category: 'mod',
    name: 'Concussive Shot',
    imagePath: '/mod/concussive_shot.png',
    id: 'an140h',
    description: `Fires a focused blast of air through all targets within 8m [A], dealing 155 damage and 4x impact.`,
    wikiLinks: [`https://remnant.wiki/Concussive_Shot`],
  },
  {
    category: 'mod',
    name: 'Corrosive Rounds',
    imagePath: '/mod/corrosive_rounds.png',
    id: 'hr3g7o',
    tags: ['Critical Chance'],
    description: `Imbues ammunition with ACID and increases Range Critical Chance by 15% for 20s. Shots apply CORRODED dealing 150 damage over 10s.`,
    wikiLinks: [`https://remnant.wiki/Corrosive_Rounds`],
  },
  {
    category: 'mod',
    name: 'Creeping Mist',
    imagePath: '/mod/creeping_mist.png',
    dlc: 'dlc1',
    id: 'a3ctlf',
    description: `Shoots a cannister out that shatters on impact to reveal an expanding mist, starting at 7.5m and growing to 15m [A] over 5s. The mist lasts 20s. While affected, enemies receive 25% additional Status Effect Damage and are 5% more likely to be struck with a critical hit from any source. The mists debuff persists for 10s after target exits the mist.`,
    wikiLinks: [`https://remnant.wiki/Creeping_Mist`],
  },
  {
    category: 'mod',
    name: 'Cube Room',
    imagePath: '/mod/cube_room.png',
    id: '2nMTRG',
    description: `Conjures a 5m [A] anomalous Cube Room which grants allies an increase of 50% Heat Decay Rate, reduces Heat Generation per round when firing weapons that Overheat by 15% and automatically generates missing reserve ammo per second. Lasts 15s.`,
    wikiLinks: [],
    linkedItems: {
      weapon: {
        name: 'Corrupted Cube Gun',
      },
    },
  },
  {
    category: 'mod',
    name: 'Cube Shield',
    imagePath: '/mod/cube_shield.png',
    id: '1bfanq',
    description: `Generates a shield which absorbs up to 500 damage from incoming enemy projectiles. Lasts 15s.
    Reactivating fires the Cube Shield damage enemies as is travels. Damage is increased if the Cube Shield has absorbed enemy projectile damage before firing.`,
    wikiLinks: [`https://remnant.wiki/Cube_Shield`],
    linkedItems: {
      weapon: {
        name: 'Cube Gun',
      },
    },
  },
  {
    category: 'mod',
    name: 'Cyclone',
    imagePath: '/mod/cyclone.png',
    id: '1bfadq',
    dlc: 'dlc2',
    description: `Maintaining an overhead Charged Melee forms a 5m sand cyclone, dealing 55 - 168 damage per second and pulls enemies towards the wielder. Each Cyclone hit applies EXPOSED for 3s. Max 15s.`,
    wikiLinks: [`https://remnant.wiki/Cyclone`],
    linkedItems: {
      weapon: {
        name: 'Mirage',
      },
    },
  },
  {
    category: 'mod',
    name: 'Deadpoint',
    imagePath: '/mod/deadpoint.png',
    id: 'ysz4fw',
    description: `Fires a cluster bomb which detonates on impact across 2.5m. each cluster deals up to 150 damage [E] per explosion within 3.5m. [A]`,
    wikiLinks: [`https://remnant.wiki/Deadpoint`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Meridian',
      },
    },
  },
  {
    category: 'mod',
    name: 'Deadwood',
    imagePath: '/mod/deadwood.png',
    id: 'k7z7rz',
    dlc: 'dlc2',
    description: `Disables automatic BLOWBACK, while increasing Thorn's Reload Speed by 25%, and Fire Rate by 15%.

    Reactivating the Mod will trigger an EMPOWERED BLOWBACK, which detonates all needles at once for 100% additional damage. Lasts 20s.`,
    wikiLinks: [`https://remnant.wiki/Deadwood`],
    linkedItems: {
      weapon: {
        name: 'Thorn',
      },
    },
  },
  {
    category: 'mod',
    name: 'Death Brand',
    imagePath: '/mod/death_brand1.png',
    id: 'd3q99g',
    description: `Applies Death Brand to all enemies within 25m. [A] increasing incoming damage by 10%. Enemies killed while bearing the Death Brand leave behind an Echo which lasts 10s before returning to the Nightmare Realm. Echoes are drawn to any survivor who walks within 3m. increasing Weakspot Damage dealt by 10% for 10s.`,
    wikiLinks: [`https://remnant.wiki/Death_Brand`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Rune Pistol',
      },
    },
  },
  {
    category: 'mod',
    name: 'Death Sentence',
    imagePath: '/mod/death_sentence.png',
    id: 'wilhsl',
    description: `Dealing Melee Damage 6 times over 10s empowers Feral Judgement. When empowered, Neutral Backdash Charge Attacks apply Death Sentence. After 1.5s of being sentenced, the enemy will suffer 10 Phantom Strikes, dealing X25Damage each. Deals 25% additional damage to BLEEDING enemies.`,
    wikiLinks: [`https://remnant.wiki/Death_Sentence`],
    linkedItems: {
      weapon: {
        name: 'Feral Judgement',
      },
    },
  },
  {
    category: 'mod',
    name: 'Defrag',
    imagePath: '/mod/defrag.png',
    id: '3hqdob',
    description: `Infects weapon with Malware for 30s, causing shots to apply FRAGMENTED for 15s. When a FRAGMENTED enemy dies, they create a Glitch that lasts 5s. 
    Picking up a Glitch increases All damage by 20% for 5s. 
    Destroying a Glitch causes it to destabilize, creating a 5m [A] Virus Pool which deals 25 damage per second and applies the FRAGMENTED debuff to enemies inside. Virus Pools last 15s.`,
    wikiLinks: [`https://remnant.wiki/Defrag`],
  },
  {
    category: 'mod',
    name: 'Dreadwalker',
    imagePath: '/mod/dreadwalker.png',
    id: 'ybej3w',
    description: `Enter the Nightmare Realm. Nightfall gains infinite Ammo, a 35% Fire Rate increase, 10% Lifesteal, and becomes fully automatic. The wielder becomes significantly harder to hit while moving. 
    Disables other weapons and Skills for the duration, or until Dreadwalker is deactivated. Lasts 10s.`,
    wikiLinks: [`https://remnant.wiki/Dreadwalker`],
    linkedItems: {
      weapon: {
        name: ' Nightfall',
      },
    },
  },
  {
    category: 'mod',
    name: 'Dreamwave',
    imagePath: '/mod/dreamwave.png',
    id: 'dwmc70',
    tags: ['Status Effect'],
    description: `After dealing 250 damage, Charge Attack will release a Dreamwave, flowing outwards 20m [A] and returning to caster. Dreamwave applies SLOW to all enemies for 10s and grants a Stack of REVERIE for each enemy affected. Each Stack grants +2% to All Damage and +2% Movement Speed, which lasts 15s.`,
    wikiLinks: [`https://remnant.wiki/Dreamwave`],
    linkedItems: {
      weapon: {
        name: 'Dreamcatcher',
      },
    },
  },
  {
    category: 'mod',
    name: 'Dying Breath',
    imagePath: '/mod/dying_breath.png',
    id: '22nk8x',
    description: `When infused, Neural Backdash Charge Attack explodes in a 3m. [A] AOE and leaves an ACID Cloud which last for 15s.`,
    wikiLinks: [`https://remnant.wiki/Dying_Breath`],
    linkedItems: {
      weapon: {
        name: 'Gas Giant',
      },
    },
  },
  {
    category: 'mod',
    name: 'Energy Wall',
    imagePath: '/mod/energy_wall.png',
    id: '8uluwc',
    description: `Deploys an energy barrier on impact with ground. Allies can shoot through Energy Wall but enemy projectiles are absorbed (up to 500 damage received). Max 1 Wall at a time. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Energy_Wall`],
  },
  {
    category: 'mod',
    name: 'Energy Wave',
    imagePath: '/mod/energy_wave.png',
    id: '7ztoh8',
    description: `Charge attacks use 35 stamina to release an energy wave projectile allowing the wielder to strike enemies from much farther away.`,
    wikiLinks: [`https://remnant.wiki/Energy_Wave`],
    linkedItems: {
      weapon: {
        name: "Hero's Sword",
      },
    },
  },
  {
    category: 'mod',
    name: 'Eulogy',
    imagePath: '/mod/eulogy.png',
    id: '3xf7i2',
    description: `Recalls bolts which deal 30 damage [E] when pulled from a target and when striking targets on their return. Recalled bolts grant 2% of Max HP. Recalled bolts can also overfill Sorrow by up to +5. Any additional bolts will be returned to reserves.`,
    wikiLinks: [`https://remnant.wiki/Eulogy`],
    linkedItems: {
      weapon: {
        name: 'Sorrow',
      },
    },
  },
  {
    category: 'mod',
    name: 'Explosive Shot',
    imagePath: '/mod/explosive_shot.png',
    id: 'hpfdzp',
    // TODO Check this; notes say `base damage increased from 155 -> 175`
    // TODO Check this; notes say `increased fire dot from 100 damage over 5s to 250 damage over 10s`
    description: `Fires an explosive round [E] that deals up to 465 FIRE damage within 9m [A] and applies BURNING, dealing 300 FIRE damage over 5s.`,
    wikiLinks: [`https://remnant.wiki/Explosive_Shot`],
    linkedItems: {
      weapon: {
        name: 'Hellfire',
      },
    },
  },
  {
    category: 'mod',
    name: 'Familiar',
    imagePath: '/mod/familiar.png',
    id: 'sccdmt',
    description: `Summons Faerie Familiar to aid in combat. The Familiar selects a random enemy within 10m [A] and slashes through them for 25 damage each attack. Familiar will select a new target when the previous one dies. Lasts 15s.`,
    wikiLinks: [`https://remnant.wiki/Familiar`],
  },
  {
    category: 'mod',
    name: 'Fargazer',
    imagePath: '/mod/fargazer.png',
    id: 'yedqs6',
    description: `Calls forth an eye of Legion to gaze at player's AIM target. For every 0.25sFargazer focuses on a target within 25m, a stack of MADNESS Status is applied for 5s. Each stack deals 3 Damage per second. Max 10 stacks. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Fargazer`],
  },
  {
    category: 'mod',
    name: 'Fathomless Deep',
    imagePath: '/mod/fathomless_deep.png',
    dlc: 'dlc1',
    id: 'o1zwol',
    description: `Charged Melee Hits grant Fathomless Deep which increases Melee Stagger by 10% per stack for 5s. Max 3 attacks.`,
    wikiLinks: [`https://remnant.wiki/Fathomless_Deep`],
    linkedItems: {
      weapon: {
        name: 'Abyssal Hook',
      },
    },
  },
  {
    category: 'mod',
    name: 'Faultline',
    imagePath: '/mod/faultline.png',
    id: '5mlisj',
    description: `Charge to fire off ground-based shockwaves which deal 115 damage. Costs 35Stamina`,
    wikiLinks: [`https://remnant.wiki/Faultline`],
    linkedItems: {
      weapon: {
        name: 'Stonebreaker',
      },
    },
  },
  {
    category: 'mod',
    name: 'Firestorm',
    imagePath: '/mod/firestorm.png',
    id: 'snlx8w',
    description: `Creates a whirling cyclone that sucks in nearby targets [A] and applies BURNING for 10s. The center of the cyclone deals 75 FIRE damage per second. Lasts 15s.`,
    wikiLinks: [`https://remnant.wiki/Firestorm`],
  },
  {
    category: 'mod',
    name: 'Fission Strike',
    imagePath: '/mod/fission_strike.png',
    id: 'd490vt',
    description: `On Neutral Evade Attacks Atom Splitter achieves Nuclear Fission, releasing a wave of charged particles which deals 151.5 Damage to targets within 10m. Charged Neutral Evade Attacks increase range by 3x and Damage by 25%`,
    wikiLinks: [`https://remnant.wiki/Fission_Strike`],
    linkedItems: {
      weapon: {
        name: 'Atom Splitter',
      },
    },
  },
  {
    category: 'mod',
    name: 'Flying Bomb Trap',
    imagePath: '/mod/flying_bomb_trap.png',
    id: '2GWpcL',
    dlc: 'dlc2',
    description: `Fires a projectile that deploys up to 5 traps after contacting the ground.

    Each trap can launch a flask of deadly liquid up to 15m when an enemy travels above and will rearm once every 1.5s. Flask detonations release a 7m shockwave which deals 50 Damage and splashes targets within 4m of the center for 100 ACID Damage, applying CORRODED for 100 damage over 10s.
    
    Lasts 20s or 10 total flask launches.`,
    wikiLinks: [`https://remnant.wiki/Flying_Bomb_Trap`],
  },
  {
    category: 'mod',
    name: 'Fracture',
    imagePath: '/mod/fracture.png',
    id: 'x8vmra',
    description: `Charge Attacks taint the blood of targets, causing all attacks from Godsplitter to register as Weakspot hits for 3s seconds. Duration increases with additional fragments. Max 35s.`,
    wikiLinks: [`https://remnant.wiki/Fracture`],
    linkedItems: {
      weapon: {
        name: 'Godsplitter',
      },
    },
  },
  {
    category: 'mod',
    name: 'Fusion Cannon',
    imagePath: '/mod/fusion_cannon.png',
    id: 'D8obdv',
    description: `Funnels all current Mod Charges into a powerful penetrating beam. The beam deals 100 damage and increases damage dealt, recoil, and beam thickness per Charge consumed. Max 5 Charges.`,
    linkedItems: {
      weapon: {
        name: 'Corrupted Savior',
      },
    },
  },
  {
    category: 'mod',
    name: 'Gravity Core',
    imagePath: '/mod/gravity_core1.png',
    id: 'kep3kb',
    description: `Fires a highly compressed sphere which draws in objects and deals 50 damage on impact. When colliding with a target, a large Gravity Well opens and draws in objects for 5s.

    When the Gravity Well expires, it deals 250 [E] damage within 10m [A]. Adds 200 damage per enemy and divides total damage among all enemies.`,
    wikiLinks: [`https://remnant.wiki/Gravity_Core`],
    linkedItems: {
      weapon: {
        name: 'Starkiller',
      },
    },
  },
  {
    category: 'mod',
    name: "Guardian's Call",
    imagePath: '/mod/guardians_call.png',
    id: 'anhbhf',
    description: `When Mod Power is full, Primary Fire becomes Empowered and highlights enemies it strikes.
    Activating the mod calls down a Guardian Sword on enemies struck by an Empowered Energy Disc. Swords deal 450 damage [E] and 3x stagger within 3m. [A]
    `,
    wikiLinks: [`https://remnant.wiki/Guardian's_Call`],
    linkedItems: {
      weapon: {
        name: 'Twisted Arbalest',
      },
    },
  },
  {
    category: 'mod',
    name: `Guardian's Fury`,
    imagePath: '/mod/guardians_fury.png',
    id: 'WzXG4x',
    description: `Imbues the Arbalest with the power of Yaesha's corrupted guardian, increases Fire Rate by 20%, reduces Recoil and Sway by 25% and each disc impact with an enemy exlpodes over 3.5m [A] for 69 damage [E]. Lasts 1.5s`,
    linkedItems: {
      weapon: {
        name: 'Corrupted Arbalest',
      },
    },
  },
  {
    category: 'mod',
    name: 'Heatwave',
    imagePath: '/mod/heatwave.png',
    dlc: 'dlc2',
    id: 'vc3s1n',
    description: `Activates a 15m aura of sweltering heat, causing enemies inside the aura for 3s to begin BURNING for 50 FIRE Damage per second for 5s. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Heatwave`],
  },
  {
    category: 'mod',
    name: 'Healing Shot',
    imagePath: '/mod/healing_shot.png',
    id: 'vc361n',
    description: `Launches a payload that explodes on contact with allies, healing 35% of their max health. When no ally is struck, payload lays dormant until an ally gets close. Dormant payload lasts 30s, slowly losing healing potency over time.`,
    wikiLinks: [`https://remnant.wiki/Healing_Shot`],
  },
  {
    category: 'mod',
    name: 'Heat Sink',
    imagePath: '/mod/heat_sink.png',
    id: 's49h0c',
    description: `Forces open Plasma Cutter's heat vents dispersing all heat. While active, Plasma Cutter generates 50% less heat, and ramping damage cap is increased to 3xDamage. Overheats automatically when deactivated. Lasts 20s.`,
    wikiLinks: [`https://remnant.wiki/Heat_Sink`],
    linkedItems: {
      weapon: {
        name: 'Plasma Cutter',
      },
    },
  },
  {
    category: 'mod',
    name: 'Helix',
    imagePath: '/mod/helix.png',
    id: '1mtqkk',
    description: `Shoots a helix of missiles, dealing 120 damage [E]. On contact, divides into 6 smaller rockets which seek additional targets, dealing 30 damage [E] on contact.`,
    wikiLinks: [`https://remnant.wiki/Helix`],
  },
  {
    category: 'mod',
    name: 'Horizon Strike',
    imagePath: '/mod/horizon_strike1.png',
    id: '2fjw9q',
    description: `Charge Attacks release a wide horizontal projectile that penetrates through multiple enemies dealing 116 damage.`,
    wikiLinks: [`https://remnant.wiki/Horizon_Strike`],
    linkedItems: {
      weapon: {
        name: "World's Edge",
      },
    },
  },
  {
    category: 'mod',
    name: 'Hot Shot',
    imagePath: '/mod/hot_shot.png',
    id: '9vzb9r',
    description: `Imbues ammunition with FIRE and increases Ranged damage by 15% for 20s. Shots also apply BURNING, dealing 200 FIRE Damage over 10 seconds.`,
    wikiLinks: [`https://remnant.wiki/Hot_Shot`],
  },
  {
    category: 'mod',
    name: 'Knight Guard',
    imagePath: '/mod/knight_guard.png',
    dlc: 'dlc1',
    id: 'e4n1w4',
    description: `Summons Knight Guard to aid in combat. The Guards hurl penetrating slashes at a random enemy dealing 15 damage. The Guards will melee enemies if close enough for 15 damage. Lasts 20s`,
    wikiLinks: [`https://remnant.wiki/Knight_Guard`],
  },
  {
    category: 'mod',
    name: 'Krell Edge',
    imagePath: '/mod/krell_edge.png',
    id: '38rncx',
    description: `Charge to throw the Krell Axe which applies OVERLOADED on hit, dealing 50 SHOCK Damage every 5s for 10s. Shortly after throwing, another will appear in the wielders hand. Costs 25 Stamina`,
    wikiLinks: [`https://remnant.wiki/Krell_Edge`],
    linkedItems: {
      weapon: {
        name: 'Krell Axe',
      },
    },
  },
  {
    category: 'mod',
    name: 'Lifeline',
    imagePath: '/mod/lifeline.png',
    id: '4zqfhu',
    description: `After dealing 250 damage, the next charge attack causes the spirit of the RED DOE to stampede forward, dealing 160 damage to enemies and regenerating 10% Health to allies in its path.`,
    wikiLinks: [`https://remnant.wiki/Lifeline`],
    linkedItems: {
      weapon: {
        name: 'Red Doe Staff',
      },
    },
  },
  {
    category: 'mod',
    name: 'Loathe the Weak',
    imagePath: '/mod/loath_the_weak.png',
    dlc: 'dlc1',
    id: 'aobtw7',
    description: `Rapidly fires volatile needles that explode after 1.5s dealing 90 explosive damage [E].`,
    wikiLinks: [`https://remnant.wiki/Loath_The_Weak`],
    linkedItems: {
      weapon: {
        name: 'Anguish',
      },
    },
  },
  {
    category: 'mod',
    name: 'Micronova',
    imagePath: '/mod/micronova1.png',
    id: '8izb2g',
    description: `Fires 5 shattered compressed remains of a dying star. On contact or when hit with the primary fire, Micronova explodes for 50 FIRE damage [E], and 350 BURNING damage over 10s to all targets within 2m. [A]
    Striking the Micronova with Corrupted Aphelion's primary fire increases its explosion radius by 25%, damage by 50%, and spawns a shockwave that deals 100 FIRE damage, detonates any nearby Micronovas and applies the initial BURNING amount.`,
    wikiLinks: [`https://remnant.wiki/Micronova`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Aphelion',
      },
    },
  },
  {
    category: 'mod',
    name: 'Moonlight Barrage',
    imagePath: '/mod/moonlight_barrage.png',
    id: 'wfak3h',
    description: `Empowers the Bow for 15s. Arrows apply Moonlight to enemies for 3s. Enemies struck by Crescent Moon while Moonlit release a Moon Essence which returns 1 arrow, heals 5% of Max Health, and grants 15% Fire and Reload Speed for 5s.
    Basic Shots automatically become Charged Shots. Perfect Shots fire two arrows.`,
    wikiLinks: [`https://remnant.wiki/Moonlight_Barrage`],
    linkedItems: {
      weapon: {
        name: 'Crescent Moon',
      },
    },
  },
  {
    category: 'mod',
    name: 'Nano Phase',
    imagePath: '/mod/nano_phase.png',
    id: 'WARGv3',
    description: `Detonate active Nano-bots, each dealing 100 ACID damage [E] plus an additional 25 ACID damage per Nano-bot detonated to enemies within 2m [A] and applies CORRODED, dealing 50 damage [E] over 10s per Nano-bot detonated.`,
    linkedItems: {
      weapon: {
        name: 'Corrupted Nebula',
      },
    },
  },
  {
    category: 'mod',
    name: 'Nano Swarm',
    imagePath: '/mod/nano_swarm.png',
    id: '8ko9zz',
    description: `Unleash a swarm of Nanomachines that seek after enemies within 20 meters and repeatedly attack dealing 6 ACID damage per hit and applying CORRODED dealing 100 ACID damage over 10s. Lasts 15 seconds`,
    wikiLinks: [`https://remnant.wiki/Nano_Swarm`],
    linkedItems: {
      weapon: {
        name: 'Nebula',
      },
    },
  },
  // TODO Check this; description may be updated based on patch notes
  {
    category: 'mod',
    name: 'Ouroboros',
    imagePath: '/mod/ouroboros.png',
    id: 'czgb8w',
    description: `Conjures 6 sword fragments that encircle the wielder for 20s. Performing a Melee Attacks lets loose a Fragment which taints the blood of targets, causing all attacks from Deceit to register as Weakspot hits for a short period of time. Charge Melee attack fires all remaining Fragments at once.`,
    wikiLinks: [`https://remnant.wiki/Ouroboros`],
    linkedItems: {
      weapon: {
        name: 'Deceit',
      },
    },
  },
  {
    category: 'mod',
    name: 'Overflow',
    imagePath: '/mod/overflow.png',
    id: 'tya9an',
    description: `Imbues ammunition with SHOCK and increases Fire Rate by 15% and Reload Speed by 15% for 20 seconds. Shots also apply OVERLOADED, dealing 35 SHOCK Damage every 5s for 15s.`,
    wikiLinks: [`https://remnant.wiki/Overflow`],
  },
  {
    category: 'mod',
    name: 'Power Stone',
    imagePath: '/mod/power_stone.png',
    id: '2JimAt',
    dlc: 'dlc2',
    tags: ['Status Effect'],
    description: `Charged Melee empowers the staff for 10s, causing Melee Attacks to launch an energy bolt that seeks enemies within 30m [A], dealing 50 SHOCK Damage and grants 1 stack of POWER STONE. Max 10 stacks.
    
    While empowered, Charged Melee calls 9m [A] shockwave dealing 75 SHOCK Damage and ends POWER STONE. For each POWER STONE stack built when ended, release 1 energy bolt that seeks a random enemy and applies OVERLOADED for 40s.`,
    wikiLinks: [`https://remnant.wiki/Power_Stone`],
    linkedItems: {
      weapon: {
        name: 'Crystal Staff',
      },
    },
  },
  {
    category: 'mod',
    name: 'Prismatic Driver',
    imagePath: '/mod/prismatic_driver.png',
    id: 'vtcg3o',
    description: `Fires a superheated beam which deals 25 Mod Damage per second. Sustaining the beam on a target causes an explosion which deals 150 Mod damage [E] in a 3m [A] AOE.`, //(sic!) mod damage instead of damage
    wikiLinks: [`https://remnant.wiki/Prismatic_Driver`],
  },
  {
    category: 'mod',
    name: 'Reaver',
    imagePath: '/mod/reaver1.png',
    dlc: 'dlc1',
    id: 'geb8ho',
    description: `Increases Melee Damage by 10% if the target is suffering from a Negative Status Effect.`,
    wikiLinks: [`https://remnant.wiki/Reaver`],
    linkedItems: {
      weapon: {
        name: 'Ritualist Scythe',
      },
    },
  },
  {
    category: 'mod',
    name: 'Ring of Spears',
    imagePath: '/mod/ring_of_spears.png',
    dlc: 'dlc1',
    id: '4rdl8r',
    description: `Calls forth 7 phantom spears to encircle the wielder [A] for 25 seconds. This ring will deal up to 35 damage per second to nearby enemies, based on the number of spears remaining in the ring. While the mod is active, these spears can be thrown by tapping the mod button, dealing 100 damage to the first enemy hit. Spears will remain at their impact point for the duration of the mod or until recalled by holding the mod button. When recalled, spears will return to the wielder, dealing 50 damage to enemies along their path. When all recalled spears have reached the wielder, they cause an explosion dealing up to 350 damage [E] based on the number of spears recalled.`,
    wikiLinks: [`https://remnant.wiki/Ring_of_Spears`],
  },
  {
    category: 'mod',
    name: 'Rootlash',
    imagePath: '/mod/rootlash.png',
    id: 'nfw6ja',
    description: `Launches a projectile which summons a Root Tentacle. Tentacles deal 30 damage and steal 1.5% of the hero's Max Health per hit. Lasts 20s. (Max 2)`,
    wikiLinks: [`https://remnant.wiki/Rootlash`],
  },
  {
    category: 'mod',
    name: 'Rotted Arrow',
    imagePath: '/mod/rotted_arrow.png',
    id: 'vgin4w',
    // TODO Check this; damage 19.8 -> 75
    // TODO Check this; `removed damage over time`
    description: `Fires a rotten arrow that deals 75 damage and detonates for another 60 damage [E] within 4m. [A] A deadly gas cloud is left behind that deals 200.`,
    wikiLinks: [`https://remnant.wiki/Rotted_Arrow`],
  },
  {
    category: 'mod',
    name: 'Sandstorm',
    imagePath: '/mod/sandstorm.png',
    dlc: 'dlc2',
    id: 'ozNPv9',
    tags: [],
    description: `Launch a sphere of loam. Impact creates a 5m [A] swirling storm of sand which seeks to center itself on an enemy and deals x Elemental damage per second. When Sandstorm's focused target dies, it will seek a new enemy within 10m [A]. Lasts 15s.`,
    wikiLinks: [`https://remnant.wiki/Sandstorm`],
    linkedItems: {
      weapon: {
        name: 'Monolith',
      },
    },
  },
  {
    category: 'mod',
    name: 'Scrap Shot',
    imagePath: '/mod/scrap_shot.png',
    id: 'hcv400',
    tags: ['Status Effect'],
    description: `Fires a caltrops grenade that explodes to cover an area of 6m. [A] Caltrops deal 20 damage per second and SLOW to enemies that walk over them. Lasts 10s.`,
    wikiLinks: [`https://remnant.wiki/Scrap_Shot`],
  },
  {
    category: 'mod',
    name: 'Screamer',
    imagePath: '/mod/screamer.png',
    id: '4aeebu',
    description: `Fire a high-powered rocket that deals up to 200 damage [E] within 2.5m. [A]`,
    wikiLinks: [`https://remnant.wiki/Screamer`],
    linkedItems: {
      weapon: {
        name: 'Meridian',
      },
    },
  },
  // TODO Check this; description may have changed based on patch notes
  {
    category: 'mod',
    name: 'Shatterstar',
    imagePath: '/mod/shatterstar1.png',
    id: 'z9e8qq',
    description: `Imbues shots with White hot FIRE. Hits apply BURNING, dealing 250 FIRE damage over 10 seconds. Lasts 20s.

    Weakspot Hits and Kills cause shots to fragment, automatically targeting nearby enemies. Fragments strike for 30% of the initial damage dealt and apply BURNING.`,
    wikiLinks: [`https://remnant.wiki/Shatterstar`],
    linkedItems: {
      weapon: {
        name: 'Savior',
      },
    },
  },
  {
    category: 'mod',
    name: 'Skewer 2.0',
    imagePath: '/mod/skewer.png',
    id: 'cpvech',
    description: `Fires a Wretched Spear which embeds itself on contact. Spears deal 125 damage on hit, rapidly dividing inside the target until bursting, dealing 140 damage to all targets within 3m. [A] Spears embedded in the environment remain in place for 10s.`,
    wikiLinks: [`https://remnant.wiki/Skewer`],
  },
  {
    category: 'mod',
    name: 'Song of Eafir',
    imagePath: '/mod/song_of_eafir.png',
    id: 'edm644',
    tags: ['Status Effect'],
    // TODO Check this; damage reduction 15% -> 10%
    description: `Fires a shot infused with the binding power of the Song of Eafir. Staggers most ground enemies within 10m [A] and deals 150 damage [E] to Flying enemies within the same range.
    The song continues for 15s, afflicting targets within 15m [A] with SLOW, and a 10% decrease to damage dealt.`,
    wikiLinks: [`https://remnant.wiki/Song_of_Eafir`],
  },
  {
    category: 'mod',
    name: 'Soul Brand',
    imagePath: '/mod/soul_brand.png',
    id: 'imk8xh',
    description: `Applies a Soul Brand to all enemies within 25m [A] which lasts 25s. Enemies killed while bearing the Soul Brand leave behind an Echo which lasts 10s before returning to the Nightmare Realm. Echoes are drawn to any survivor who walks within 3m, granting 10% of Max Health on contact.`,
    wikiLinks: [`https://remnant.wiki/Soul_Brand`],
    linkedItems: {
      weapon: {
        name: 'Rune Pistol',
      },
    },
  },
  {
    category: 'mod',
    name: 'Soulbinder',
    imagePath: '/mod/soulbinder.png',
    id: '5bb0mv',
    description: `Fires a projectile that attaches to the enemy dealing 40 damage. Enemies within 7m [A] become bound to the primary target after impact and share 60% of damage dealt to them. Lasts 15s.`,
    wikiLinks: [`https://remnant.wiki/Soulbinder`],
  },
  {
    category: 'mod',
    name: 'Space Crabs',
    imagePath: '/mod/space_crabs.png',
    id: '4wd3gm',
    description: `Launch an alien egg that bursts on impact, releasing 5 Space Crabs. Crabs follow the caster, leaping towards enemies within 4m, and exploding, dealing 60 damage [E] each.`,
    wikiLinks: [`https://remnant.wiki/Space_Crabs`],
  },
  {
    category: 'mod',
    name: 'Spore Shot',
    imagePath: '/mod/spore_shot1.png',
    id: '9fi67v',
    tags: ['Status Effect'],
    description: `Fires a rotten spore that leaves a deadly gas cloud that applies SLOW to while dealing 15 - 45 damage per second for 7s to enemies, and gives allies HASTE.`,
    wikiLinks: [`https://remnant.wiki/Spore_Shot`],
    linkedItems: {
      weapon: {
        name: 'Sporebloom',
      },
    },
  },
  {
    category: 'mod',
    name: 'Starfall',
    imagePath: '/mod/starfall.png',
    id: 'j9wkb3',
    description: `Fires a powerful arrow which deals 30 damage and opens a 7m [A] portal that rains down star fragments. Each fragment deals 50 damage [E] within 4m. [A] Lasts 6s.`,
    wikiLinks: [`https://remnant.wiki/Starfall`],
    linkedItems: {
      weapon: {
        name: 'Sagittarius',
      },
    },
  },
  {
    category: 'mod',
    name: 'Stasis Beam',
    imagePath: '/mod/stasis_beam.png',
    id: 'rer73h',
    tags: ['Status Effect'],
    description: `Fires a beam which deals 15 damage per second, and applies SLOW Debuff. After 2s of application to a target, SLOW becomes STASIS, freezing the target in place for 10s.`,
    wikiLinks: [`https://remnant.wiki/Stasis_Beam`],
  },
  {
    category: 'mod',
    name: 'Supernova',
    imagePath: '/mod/supernova.png',
    id: '9rxk65',
    tags: ['Status Effect'],
    description: `Fires the compressed remains of a dying star. On contact or hit wit the primary fire, causes Supernova to explode for 150 FIRE Damage, and 350 BURNING Damage over 10s to all targets within 4m [A].

    Striking the Supernova with Aphelion's primary fire increases its explosion radius by 25% and damage by 50%, and spawns a massive shockwave that deals 300 FIRE damage and also applies the initial BURNING amount.`,
    wikiLinks: [`https://remnant.wiki/Supernova`],
    linkedItems: {
      weapon: {
        name: 'Aphelion',
      },
    },
  },
  {
    category: 'mod',
    name: 'Time Lapse',
    imagePath: '/mod/time_lapse.png',
    id: 'nn1q6k',
    tags: ['Status Effect'],
    description: `Creates a 6m [A] blast which freezes all standard enemies for 7s. 
    Dealing damage to frozen enemies immediately breaks the Time Lapse effect, applying SLOW for the remaining duration.`,
    wikiLinks: [`https://remnant.wiki/Time_Lapse`],
  },
  {
    category: 'mod',
    name: 'Tremor',
    imagePath: '/mod/tremor.png',
    id: 'g6glpj',
    description: `Fires a projectile that cracks the ground and spawns shockwaves that deal 75 damage [E] within 9m [A] for 6s. Shockwaves inflict 3x impact.`,
    wikiLinks: [`https://remnant.wiki/Tremor`],
  },
  {
    category: 'mod',
    name: 'Voltaic Rondure',
    imagePath: '/mod/voltaic_rondure.png',
    id: 'wjopwy',
    tags: ['Status Effect'],
    description: `Launches a slow-moving orb that pulses every 0.5s, striking enemies within 3m [A] for 20 SHOCK damage and applying OVERLOADED for 15s. The orb lasts 20s. The orb can be overcharged by striking it with additional damage.`,
    wikiLinks: [`https://remnant.wiki/Voltaic_Rondure`],
  },
  {
    category: 'mod',
    name: 'Whirlwind',
    imagePath: '/mod/whirlwind.png',
    id: '2y6xm7',
    description: `Performing a Charge Melee Attack during a Neutral Backdash creates a Whirlwind of slashes which strike all enemies within 8m for 91-273 damage.`,
    wikiLinks: [`https://remnant.wiki/Whirlwind`],
    linkedItems: {
      weapon: {
        name: 'Spectral Blade',
      },
    },
  },
  {
    category: 'mod',
    name: 'Will of the Wisp',
    imagePath: '/mod/will_of_the_wisp.png',
    id: '9jwTXR',
    description: `Launches a Wisp that uniquely seeks to one anchored primary fire bolt location. Bolts anchored to enemies deal 100 damage per Wisp. Bolts anchored to allies heal 10% Max Health per Wisp. Bolts are consumed when impacted by a Wisp.`,
    linkedItems: {
      weapon: {
        name: 'Corrupted Sorrow',
      },
    },
  },
  // TODO Check this; description may have changed based on the patch notes
  {
    category: 'mod',
    name: 'Windfall',
    imagePath: '/mod/windfall1.png',
    id: '82v8kz',
    description: `Fires a ring of spinning blades which penetrates targets as it travels up to 20m before returning to the weapon. While traveling, activating Windfall again causes the projectile to spin in place for up to 3s. Activating it once more will recall it. Enemies struck by the Windfall obtain Tainted Blood for 3s causing all attacks from Deceit to trigger as Weakspot hits.`,
    wikiLinks: [`https://remnant.wiki/Windfall`],
    linkedItems: {
      weapon: {
        name: 'Corrupted Deceit',
      },
    },
  },
  {
    category: 'mod',
    name: 'Witchfire',
    imagePath: '/mod/witchfire.png',
    id: 'ggf5qe',
    description: `Fires a highly volatile projectile that explodes to leave a line of flaming terrain. [A] Deals 55 FIRE Damage per second, and applies BURNING, dealing 200 damage over 10s. Lasts 5s.`,
    wikiLinks: [`https://remnant.wiki/Witchfire`],
  },
]
