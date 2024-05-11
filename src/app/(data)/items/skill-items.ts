import { SkillItem } from './types/SkillItem'

export const skillItems: SkillItem[] = [
  {
    category: 'skill',
    name: 'War Stomp',
    imagePath: '/items/skills/challenger_warstomp.png',
    id: 'qnz5iw',
    dlc: 'base',
    description:
      'Creates a high-impact tremor that deals 150 damage and additional stagger in a forward cone up to 7.5m. Deals damage in all directions at point blank range.',
    cooldown: 50,
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/War_Stomp`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'skill',
    name: 'Juggernaut',
    imagePath: '/items/skills/challenger_juggernaut.png',
    id: 'p7x9pq',
    dlc: 'base',
    description:
      'Become nearly unstoppable, gaining 3 Stacks of BULWARK, 15% Movement, Melee Speed, and Reduced Stamina Cost. Increases Melee damage by 50%. Stagger Level reduced by 1. Lasts 25s.',
    cooldown: 60,
    wikiLinks: [`https://remnant.wiki/Juggernaut`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'skill',
    name: 'Rampage',
    imagePath: '/items/skills/challenger_rampage.png',
    id: 'wyw9r4',
    dlc: 'base',
    description:
      'Enters a heightened state of battle which increases Fire Rate by 10%, Reload Speed by 25%, and Movement Speed by 15%. Lasts 10s.\n' +
      '\n' +
      'Kills and dealing significant damage grant 1 Stack of RAGE which increases Ranged Damage by 2.5% per Stack. Upon reaching 10 Stacks, the Challenger goes BERSERK, which reloads their current firearm and doubles Rampage effects for 15s.',
    cooldown: 90,
    wikiLinks: [`https://remnant.wiki/Rampage`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'skill',
    name: 'Guard Dog',
    imagePath: '/items/skills/handler_guard.png',
    id: 'gpr2fw',
    dlc: 'base',
    description:
      'Companion will follow the Handler and generate 15% increased Threat while attacking. All damage to them is reduced by 20%.\n' +
      '\n' +
      'SINGLE PRESS: Companion engages enemies near the targeted location.\n' +
      '\n' +
      'DOUBLE TAP: Companion returns to the Handler and remains by their side.\n' +
      '\n' +
      'HOLD: Howl reduces damage by 15% to all allies within 20m and the Companion generates additional Threat. Lasts 20s.',
    cooldown: 90,
    externalTokens: [`Amplitude`, `Dog`],
    wikiLinks: [`https://remnant.wiki/Guard_Dog`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'skill',
    name: 'Support Dog',
    imagePath: '/items/skills/handler_support.png',
    id: 'jz6x2w',
    dlc: 'base',
    description:
      'Companion will follow the Handler and continuously heal allies within 3.5m for 0.25% of Max Health per second.\n' +
      '\n' +
      'SINGLE PRESS: Companion engages enemies near the targeted location.\n' +
      '\n' +
      'DOUBLE TAP: Companion returns to the Handler and remains by their side.\n' +
      '\n' +
      'HOLD: Howl grants 2% of Max Health per second and 25% increased Movement Speed to all allies within 20m. Lasts 25s.',
    cooldown: 90,
    externalTokens: [`Amplitude`, `Dog`],
    wikiLinks: [`https://remnant.wiki/Support_Dog`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'skill',
    name: 'Attack Dog',
    imagePath: '/items/skills/handler_attack.png',
    id: '8trtzh',
    dlc: 'base',
    description:
      'Companion will follow the Handler and deal 20% additional damage.\n' +
      '\n' +
      'SINGLE PRESS: Companion engages enemies near the targeted location.\n' +
      '\n' +
      'DOUBLE TAP: Companion returns to the Handler and remains by their side.\n' +
      '\n' +
      'HOLD: Howl increases damage by 20% for all allies within 20m. Lasts 20s.',
    cooldown: 90,
    externalTokens: [`Amplitude`, `Dog`],
    wikiLinks: [`https://remnant.wiki/Attack_Dog`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'skill',
    name: 'Wellspring',
    imagePath: '/items/skills/medic_wellspring.png',
    id: '7vtxrx',
    dlc: 'base',
    description:
      'The Medic channels healing energy into their fist, punching a hole into the ground to create a 3m Healing Spring AOE which restores 10 Health per second and greatly increases Blight Decay Rate. Lasts 15s.',
    cooldown: 60,
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Wellspring`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
  },
  {
    category: 'skill',
    name: 'Healing Shield',
    imagePath: '/items/skills/medic_healingshield.png',
    id: '8pu6y2',
    dlc: 'base',
    description:
      'The Medic quickly expels healing energy to SHIELD all allies within 25m for 100% of their Max Health for 10s. While shielded, allies regenerate 20% of their Max Health over the duration.',
    cooldown: 100,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Healing_Shield`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
  },
  {
    category: 'skill',
    name: 'Redemption',
    imagePath: '/items/skills/medic_redemption.png',
    id: 'zs77cb',
    dlc: 'base',
    description:
      'The Medic unleashes a 30m shockwave that revives downed allies and restores 50% Max Health over 10s. For each additional 1s holding the SKILL button, the heal gains an additional 50% (up to 200% max).\n' +
      '\n' +
      'Revived allies will only receive 50% of the healing amount. If revived, allies cannot be revived again by Redemption for another 180s. Resets at Worldstone or on death.',
    cooldown: 120,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Redemption`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
  },
  {
    category: 'skill',
    name: `Hunter's Mark`,
    imagePath: '/items/skills/hunter_huntersmark.png',
    id: 'jg82hi',
    dlc: 'base',
    tags: ['Critical Chance', 'Ranged Damage', 'Melee Damage'],
    description:
      "Increases the Hunter's spatial awareness by casting an Aura that automatically applies MARK to all enemies within 35m. While senses are heightened, Hunter also gains 15% increased Ranged and Melee damage. Lasts 25s.\n" +
      '\n' +
      'MARK: Crit Chance against MARKED enemies is increased by 10% for all allies.',
    cooldown: 70,
    wikiLinks: [`https://remnant.wiki/Hunter's_Mark`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'skill',
    name: `Hunter's Focus`,
    imagePath: '/items/skills/hunter_focus.png',
    id: '5jh6qr',
    dlc: 'base',
    tags: [
      'Spread',
      'Ranged Damage',
      'Weakspot Damage',
      'Critical Chance',
      'Recoil',
    ],
    description:
      'Continuously Aiming Down Sights uninterrupted and without shooting for 0.5s causes the Hunter to enter a FOCUSED state. Wears off after 0.75s of leaving Aim. Lasts 25s.\n' +
      '\n' +
      'FOCUSED reduces Weapon Spread, Recoil, and Sway by 50% and grants 25% Ranged & Ranged Weakspot Damage.\n' +
      '\n' +
      'While FOCUSED, Aiming at enemies will automatically apply MARK.\n' +
      '\n' +
      'FOCUSED state can last up to 10s after the Skill duration expires.\n' +
      '\n' +
      'MARK: Crit Chance against MARKED enemies is increased by 10% for all allies.',
    cooldown: 50,
    wikiLinks: [`https://remnant.wiki/Hunter's_Focus`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'skill',
    name: `Hunter's Shroud`,
    imagePath: '/items/skills/hunter_huntersshroud.png',
    id: 'ufkx9q',
    dlc: 'base',
    tags: ['Ranged Damage', 'Melee Damage', 'Critical Chance', 'Melee Hit'],
    description:
      'Hunter becomes Shrouded, reducing enemy awareness and making them harder to hit while moving. Attacking or activating a Mod or Skill will instantly exit Shroud.\n' +
      '\n' +
      'Exiting Shroud applies MARK to all enemies within 10m and grants AMBUSH to the Hunter for 2s.\n' +
      '\n' +
      'AMBUSH: Increases Ranged and Melee Damage by 50% which diminishes over its duration. Ranged and Melee attacks apply MARK.\n' +
      '\n' +
      'Hunter will automatically Shroud again after 1.15s if no offensive actions are performed.\n' +
      '\n' +
      'Lasts 15s.\n' +
      '\n' +
      'MARK: Crit Chance against MARKED enemies is increased by 10% for all allies.',
    cooldown: 90,
    wikiLinks: [`https://remnant.wiki/Hunter's_Shroud`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'skill',
    name: 'Vial: Stone Mist',
    imagePath: '/items/skills/alchemist_stonemist.png',
    id: 'y7ia9t',
    dlc: 'base',
    description:
      'Creates a mysterious vapor cloud which lasts  and applies STONESKIN.\n' +
      '\n' +
      'STONESKIN reduces incoming damage by 25%, reduces Stagger by 1, greatly increases Blight Buildup Decay Rate, and makes the target immune to STATUS Effects. Lasts 15s.\n' +
      '\n' +
      "PRESS: Slam Vial on the ground, creating the effect at the Alchemist's feet.\n" +
      '\n' +
      'HOLD & RELEASE: Aim and throw the Vial causing the same effect where it lands.',
    cooldown: 75,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Vial:_Stone_Mist`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
  },
  {
    category: 'skill',
    name: 'Vial: Frenzy Dust',
    imagePath: '/items/skills/alchemist_frenzydust.png',
    id: 'xsniv3',
    dlc: 'base',
    description:
      'Creates a mysterious vapor cloud which lasts 10s and applies FRENZIED.\n' +
      '\n' +
      'FRENZIED increases Fire Rate, Reload Speed, and Melee Speed by 20%, and Movement Speed by 15%. Lasts 15s.\n' +
      '\n' +
      "PRESS: Slam Vial on the ground, creating the effect at the Alchemist's feet.\n" +
      '\n' +
      'HOLD & RELEASE: Aim and throw the Vial causing the same effect where it lands.',
    cooldown: 75,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Vial:_Frenzy_Dust`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
  },
  {
    category: 'skill',
    name: 'Vial: Elixir of Life',
    imagePath: '/items/skills/alchemist_elixiroflife.png',
    id: '76554i',
    dlc: 'base',
    description:
      'Creates a mysterious vapor cloud which lasts 10s and applies LIVING WILL.\n' +
      '\n' +
      'LIVING WILL grants 5 Health Regeneration per second, and protects against fatal damage. Can revive downed players. Lasts 20s.\n' +
      '\n' +
      'Revived allies cannot be affected by Living Will for 180s. Resets at Worldstone or on death.\n' +
      '\n' +
      "PRESS: Slam Vial on the ground, creating the effect at the Alchemist's feet.\n" +
      '\n' +
      'HOLD & RELEASE: Aim and throw the Vial causing the same effect where it lands.',
    cooldown: 90,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Vial:_Elixir_of_Life`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
  },
  {
    category: 'skill',
    name: 'Reality Rune',
    imagePath: '/items/skills/archon_realityrune.png',
    id: 'i3ddi7',
    dlc: 'base',
    tags: ['Status Effect', 'Damage Reduction'],
    description: `Conjures a 7m protective dome which applies SLOW to any enemy or enemy projectile. Allies inside gain 25% Damage Reduction and automatically generate 50 Mod Power per second. Lasts 15s.`,
    cooldown: 75,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Reality_Rune`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
  },
  {
    category: 'skill',
    name: 'Chaos Gate',
    imagePath: '/items/skills/archon_chaosgate.png',
    id: '9w7c5j',
    dlc: 'base',
    description:
      'Conjures a 7m unstable zone which grants stacks of UNBRIDLED CHAOS. Lasts 20s.\n' +
      '\n' +
      'UNBRIDLED CHAOS: Allies gain 0.7% to All Damage dealt and receive 0.3% damage taken. Stacks up to 50 times. Lasts 10s.\n' +
      '\n' +
      'Having any stacks grants 10% Mod Generation.',
    cooldown: 85,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Chaos_Gate`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
  },
  {
    category: 'skill',
    name: 'Havoc Form',
    imagePath: '/items/skills/archon_havocform.png',
    id: 'y72au6',
    dlc: 'base',
    description:
      'Unleashes the power of the Labyrinth to empower the caster with new abilities. Lasts 30s.\n' +
      '\n' +
      'Duration is reduced when Havoc Form special abilities are used.\n' +
      '\n' +
      "FIRE: Blasts Lightning Tendrils from the Archon's hand, dealing 160 SHOCK Damage per second to targets within 15m.\n" +
      '\n' +
      'AIM: Raises a 3m Energy Shield which reduces incoming damage to all allies by 50%.\n' +
      '\n' +
      'DODGE: Performs a Blink Evade that deals 150 SHOCK damage to enemies within 5m.',
    cooldown: 90,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Havoc_Form`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
  },
  {
    category: 'skill',
    name: 'Heavy Weapon: Vulcan',
    imagePath: '/items/skills/engineer_gatling.png',
    id: 'pgmn4v',
    dlc: 'base',
    description:
      'PRESS: Deploys a Vulcan Cannon Turret which lasts until its Ammo is exhausted. Turrets that can aim will prioritize targets that the player Aims at. Press SKILL again to enable autonomous targeting.\n' +
      '\n' +
      'HOLD: Deploys to Heavy Carry Mode. If Engineer Prime is available, will Overclock the weapon if already in hand or on the battlefield.\n' +
      '\n' +
      'DOUBLE PRESS: The weapon is reclaimed, returning 75% of its remaining Ammo.\n' +
      '\n' +
      'Heavy Weapon Ammo is regenerated by 1.02% every second, and Heavy Weapons can only be deployed if at least 25% Ammo is available.',
    wikiLinks: [`https://remnant.wiki/Heavy_Weapon:_Vulcan`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
  },
  {
    category: 'skill',
    name: 'Heavy Weapon: Flamethrower',
    imagePath: '/items/skills/engineer_flamethrower.png',
    id: '6fk8ea',
    dlc: 'base',
    description:
      'PRESS: Deploys a Flamethrower Turret which lasts until its Ammo is exhausted. Turrets that can aim will prioritize targets that the player Aims at. Press SKILL again to enable autonomous targeting.\n' +
      '\n' +
      'HOLD: Deploys to Heavy Carry Mode. If Engineer Prime is available, will Overclock the weapon if already in hand or on the battlefield.\n' +
      '\n' +
      'DOUBLE PRESS: The weapon is reclaimed, returning 75% of its remaining Ammo.\n' +
      '\n' +
      'Heavy Weapon Ammo is regenerated by 1.02% every second, and Heavy Weapons can only be deployed if at least 25% Ammo is available.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Heavy_Weapon:_Flamethrower`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
  },
  {
    category: 'skill',
    name: 'Heavy Weapon: Impact Cannon',
    imagePath: '/items/skills/engineer_impactcannon.png',
    id: 'ki92op',
    dlc: 'base',
    description:
      'PRESS: Deploys a Impact Cannon Turret which lasts until its Ammo is exhausted. Turrets that can aim will prioritize targets that the player Aims at. Press SKILL again to enable autonomous targeting.\n' +
      '\n' +
      'HOLD: Deploys to Heavy Carry Mode. If Engineer Prime is available, will Overclock the weapon if already in hand or on the battlefield.\n' +
      '\n' +
      'DOUBLE PRESS: The weapon is reclaimed, returning 75% of its remaining Ammo.\n' +
      '\n' +
      'Heavy Weapon Ammo is regenerated by 1.02% every second, and Heavy Weapons can only be deployed if at least 25% Ammo is available.',
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Heavy_Weapon:_Impact_Cannon`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
  },
  {
    category: 'skill',
    name: 'Plainswalker',
    imagePath: '/items/skills/explorer_plainswalker.png',
    id: 'a585sp',
    dlc: 'base',
    description:
      'Increases Movement Speed by 20% and reduces Stamina Cost by 80% for all allies. Lasts 30s.',
    cooldown: 60,
    wikiLinks: [`https://remnant.wiki/Plainswalker`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
  },
  {
    category: 'skill',
    name: 'Gold Digger',
    imagePath: '/items/skills/explorer_golddigger.png',
    id: 'a2cik2',
    dlc: 'base',
    description:
      'Dig into the ground to spring a fountain which grants a random buff. Fountains last 45s and their buff lasts 20s.\n' +
      '\n' +
      'Fountains can grant either: 10% increased All Damage dealt, 15% Damage Reduction, 2 Health Regeneration per second, or HASTE.',
    cooldown: 45,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Gold_Digger`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
  },
  {
    category: 'skill',
    name: 'Fortune Hunter',
    imagePath: '/items/skills/explorer_fortunehunter.png',
    id: 'dajt58',
    dlc: 'base',
    description:
      "Increases the Explorer's Treasure Sense to reveal special items within 40m for all allies. Lasts 60s.",
    cooldown: 90,
    wikiLinks: [`https://remnant.wiki/Fortune_Hunter`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
  },
  {
    category: 'skill',
    name: 'Quick Draw',
    imagePath: '/items/skills/gunslinger_quickdraw.png',
    id: 'qdxjt7',
    dlc: 'base',
    description:
      'Pull out your trusty side piece and upload up to 6 Critical Shots from the hip. Each shot deals 52 base damage and double stagger value.\n' +
      '\n' +
      'PRESS: Instantly fires towards all enemies in view within 25m. Upon release, rounds will be divided evenly among all targets.\n' +
      '\n' +
      'HOLD & RELEASE: Allows manual Aim and fires one single powerful shot upon release.',
    cooldown: 40,
    wikiLinks: [`https://remnant.wiki/Quick_Draw`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
  },
  {
    category: 'skill',
    name: 'Sidewinder',
    imagePath: '/items/skills/gunslinger_sidewinder.png',
    id: 'jn34u8',
    dlc: 'base',
    description:
      'Calls upon the power of the Desert Sidewinder snake to increase ADS Movement Speed by 50% and Draw/Swap Speed by 35%. Cycling weapons will automatically reload incoming Firearms. When a Weapon Swap provides Ammo to an incoming weapon, Duration is reduced by 6s. Lasts 60s.',
    cooldown: 50,
    wikiLinks: [`https://remnant.wiki/Sidewinder`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
  },
  {
    category: 'skill',
    name: 'Bulletstorm',
    imagePath: '/items/skills/gunslinger_bulletstorm.png',
    id: 'xpqq62',
    dlc: 'base',
    tags: ['Fire Rate', 'Reload Speed', 'Critical Chance', 'Projectile Speed'],
    description:
      'Unleashes the full power and speed of the Gunslinger. Increases Fire Rate 20% and Reload Speed 50% of all ranged weapons. Lasts 20s.\n' +
      '\n' +
      'Single Shot Weapons become fully-automatic. Kills instantly reload the current weapon.\n' +
      '\n' +
      'Instead of becoming fully-automatic, Bows and Crossbows gain 15% Critical Chance and 50% increased Projectile Speed.',
    cooldown: 60,
    wikiLinks: [`https://remnant.wiki/Bulletstorm`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
  },
  {
    category: 'skill',
    name: 'Void Cloak',
    imagePath: '/items/skills/invader_voidcloak.png',
    id: 'hvcxo8',
    dlc: 'base',
    description: `Automatically Perfect Dodge incoming direct damage for 60s. Each auto-evade reduces timer by 33% - 100% based on damage absorbed and spawns a Decoy for 3s.`,
    cooldown: 75,
    wikiLinks: [`https://remnant.wiki/Void_Cloak`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
  },
  {
    category: 'skill',
    name: 'Worm Hole',
    imagePath: '/items/skills/invader_wormhole.png',
    id: 'y9oqq6',
    dlc: 'base',
    description:
      'Warps the caster forward through space-time. The next Melee or Ranged attack within 5s will deal 300% damage. Counts as a Perfect Dodge.\n' +
      '\n' +
      'Holding the Skill button will show the targeting device. If an enemy is directly targeted, the caster will emerge behind them.',
    cooldown: 35,
    wikiLinks: [`https://remnant.wiki/Worm_Hole`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
  },
  {
    category: 'skill',
    name: 'Reboot',
    imagePath: '/items/skills/invader_reboot.png',
    id: 'xx6sib',
    dlc: 'base',
    tags: [
      'Stamina',
      'Health',
      'Status Effect',
      'Movement Speed',
      'Damage Reduction',
    ],
    description:
      "Initiates a Data Backup of the caster's current Health, Stamina, Relic Charges, Ammo, and Negative Status Effects, which are stored for 30s.\n" +
      '\n' +
      'While the Backup is active, increases Movement Speed by 15% and Damage Reduction by 10%.\n' +
      '\n' +
      'Reactivating the Skill restores all saved values from the Backup and spawns a Decoy which lasts 3s.',
    cooldown: 55,
    wikiLinks: [`https://remnant.wiki/Reboot`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
  },
  {
    category: 'skill',
    name: 'Minion: Hollow',
    imagePath: '/items/skills/summoner_hollow.png',
    id: 'kk4yre',
    dlc: 'base',
    description:
      'PRESS: Summons a Root Hollow Minion to fight by your side. Costs 15% of Max Health to summon, but will not kill Summoner. Max (2).\n' +
      '\n' +
      'HOLD: SACRIFICE Root Hollow Minions to explode, dealing 150 damage within 5m. Reduces Skill Cooldown by up to 50% based on remaining Health of each Minion Sacrificed.',
    cooldown: 30,
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Minion:_Hollow`],
    tags: ['Reduce Skill Cooldown', 'Summon'],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
  },
  {
    category: 'skill',
    name: 'Minion: Flyer',
    imagePath: '/items/skills/summoner_flyer.png',
    id: 'o7pvqx',
    dlc: 'base',
    description:
      'Summons a Root Flyer Minion to fight by your side. Costs 10% of Max Health to summon, but will not kill Summoner. Max (2).\n' +
      '\n' +
      'HOLD: SACRIFICE Root Flyer Minions, dealing 50 Damage within 3m and spawning 3 homing projectiles which explode on contact for 150 damage each.\n' +
      '\n' +
      'Reduces Skill Cooldown by up to 50% based on remaining Health of each Minion Sacrificed.',
    cooldown: 45,
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Minion:_Flyer`],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
  },
  {
    category: 'skill',
    name: 'Minion: Reaver',
    imagePath: '/items/skills/summoner_reaver.png',
    id: 'gs8zdv',
    dlc: 'base',
    description:
      'PRESS: Summons a Root Reaver Minion to fight by your side. Costs 35% of Max Health to summon, but will not kill Summoner. Max (1).\n' +
      '\n' +
      'HOLD: SACRIFICE Root Reaver Minion, dealing 200 Damage within 6m and spawning Spore Bombs which bounce and explode on contact for 200 damage each.\n' +
      '\n' +
      'Reduces Skill Cooldown by up to 50% based on remaining Health of Minion.',
    cooldown: 120,
    externalTokens: [`Amplitude`, `Explosive Damage`],
    tags: ['Reduce Skill Cooldown', 'Summon'],
    wikiLinks: [`https://remnant.wiki/Minion:_Reaver`],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
  },
  {
    category: 'skill',
    name: 'Eruption',
    imagePath: '/items/skills/ritualist_eruption.png',
    id: 'amqa83',
    dlc: 'base',
    tags: ['Status Effect'],
    description: `Creates 15m explosion for 150 damage on all enemies within 1m. Explosion Radius and Damage increases 100% for each unique Status Effect on the target. Refreshes all current Status Effects on the target.`,
    cooldown: 40,
    externalTokens: [`Amplitude`, `Explosive Damage`],
    wikiLinks: [`https://remnant.wiki/Eruption`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'skill',
    name: 'Miasma',
    imagePath: '/items/skills/ritualist_miasma.png',
    id: '3er3og',
    dlc: 'base',
    tags: ['Status Effect'],
    description: `Casts an AOE burst that applies BLEEDING, BURNING, OVERLOADED, and CORRODED to all enemies within 15m, and dealing a total 300 base damage. Lasts 10s.`,
    cooldown: 45,
    externalTokens: [`Amplitude`],
    wikiLinks: [`https://remnant.wiki/Miasma`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'skill',
    name: 'Deathwish',
    imagePath: '/items/skills/ritualist_deathwish.png',
    id: 'ux5f9v',
    dlc: 'base',
    tags: ['All Damage', 'Lifesteal'],
    description: `Negates all healing to self. Drain 300% Health over 20s. Increases all Damage by 50% and grants 10% Base Damage dealt as Lifesteal.`,
    cooldown: 90,
    wikiLinks: [`https://remnant.wiki/Deathwish`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'skill',
    name: 'Way of Kaeula',
    imagePath: '/items/skills/invoker_wayofkaeula.png',
    id: 'h4B9dD',
    dlc: 'dlc2',
    tags: [],
    description:
      'Invoke Kaeula to cast a Tidal Wave, dealing 150 - 450 Elemental damage and conjuring a 30m Rainstorm for 15s. Allies inside Rainstorm gain HASTE. Enemies inside Rainstorm gain DRENCHED for 10s.\n' +
      '\n' +
      'DRENCHED: Reduces Movement Speed by 10%. Every few seconds, lightning strikes enemies dealing 300 - 900 base SHOCK damage split among DRENCHED targets.',
    cooldown: 120,
    wikiLinks: ['https://remnant.wiki/Way_of_Kaeula'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'skill',
    name: 'Way of Meidra',
    imagePath: '/items/skills/invoker_wayofmeidra.png',
    id: '7DnBmE',
    dlc: 'dlc2',
    tags: ['Heal', 'Lifesteal'],
    description:
      'Invoke Meidra to heal all allies for 20% Max Health over 1.5s and conjure a 20m Forest Growth for 15s. After fully blooming, allies in the Forest Growth heal 2% Max Health per second and gain 3% of base damage dealt as Lifesteal. Enemies inside Forest Growth gain GLOOM for 10s.\n' +
      '\n' +
      'GLOOM: Increases incoming Elemental damage by 15%.',
    cooldown: 120,
    externalTokens: ['Amplitude'],
    wikiLinks: ['https://remnant.wiki/Way_of_Meidra'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'skill',
    name: 'Way of Lydusa',
    imagePath: '/items/skills/invoker_wayoflydusa.png',
    id: 'T2xA6c',
    dlc: 'dlc2',
    tags: ['Critical Chance', 'Critical Damage', 'Elemental Damage'],
    externalTokens: ['Amplitude'],
    description:
      'Invoke Lydusa to infuse Ranged and Melee Damage with the power to apply BRITTLE, allowing the Invoker to generate Sand Devils through damage or kills. Lasts 15s\n' +
      '\n' +
      'Reactivating the skill consumes all Sand Devils generated and casts a 15m Sand Blast dealing 100 Elemental Damage per charge. Max 10 charges.\n' +
      '\n' +
      'BRITTLE: Increases incoming Critical Chance by 10% and Critical Damage by 15%.',
    cooldown: 120,
    wikiLinks: ['https://remnant.wiki/Way_of_Lydusa'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
]
