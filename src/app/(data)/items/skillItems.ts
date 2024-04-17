import { SkillItem } from './types/SkillItem'

export const skillItems: SkillItem[] = [
  {
    category: 'skill',
    name: 'War Stomp',
    imagePath: '/skill/war_stomp.png',
    id: 'qnz5iw',
    description: `Creates a high impact tremor that deals 150 damage [E] and additional stagger in a forward cone up to 7.5m. [A] Deals damage in all directions at point blank range. `,
    cooldown: 50,
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
    imagePath: '/skill/juggernaut.png',
    id: 'p7x9pq',
    description: `Become nearly unstoppable, gaining 3 Stack of BULWARK, 15% increased Movement, Melee Speed, and Reduces Stamina Cost. Increases Melee damage by 50%. Stagger Level reduced by 1. Lasts 25s.`,
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
    imagePath: '/skill/rampage.png',
    id: 'wyw9r4',
    description: `Enters a heightened state of battle which increases Fire Rate by 15%, Reload Speed by 25%, and Movement Speed by 15%. Lasts 10s. 

    Kills and dealing significant damage grant 1 Stack of RAGE which increases Ranged Damage by 2.5% per Stack. Upon reaching 10 Stacks, the CHALLENGER goes BERSERK, which reloads their current firearm and doubles Rampage effects for 15s.`,
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
    imagePath: '/skill/guard_dog.png',
    id: 'gpr2fw',
    description: `Companion [BLEEDING] will follow the HANDLER and generate 15% increased Threat while attacking. All damage to them is reduced by 20%. 

    SINGLE PRESS: Companion engages enemies near the targeted location.
    
    DOUBLE TAP: Companion returns to the HANDLER and remains by their side. 
    
    HOLD: Howl reduces damage by 15% to all allies within 20m [R] and the Companion generates additional Threat. Lasts 20s.`,
    cooldown: 90,
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
    imagePath: '/skill/support_dog.png',
    id: 'jz6x2w',
    description: `Companion [BLEEDING] will follow the HANDLER and continuously heal allies within 3.5m for 0.25% of Max Health per second. 

    SINGLE PRESS: Companion engages enemies near the targeted location. 
    
    DOUBLE TAP: Companion returns to the HANDLER and remains by their side.
    
    HOLD: Howl grants 2% of Max Health per second and 25% increased Movement Speed to all allies within 20m [R]. Lasts 25s`,
    cooldown: 90,
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
    imagePath: '/skill/attack_dog.png',
    id: '8trtzh',
    description: `Companion [BLEEDING] will follow the HANDLER and deal 20% additional damage. 

    SINGLE PRESS: Companion engages enemies near the targeted location. 
    
    DOUBLE TAP: Companion returns to the HANDLER and remains by their side. 
    
    HOLD: Howl increases damage by 20% for all allies within 20m [R]. Lasts 20s.`,
    cooldown: 90,
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
    imagePath: '/skill/wellspring.png',
    id: '7vtxrx',
    description: `The MEDIC channels healing energy into their fist, punching a hole in the ground [E] to create a 3m [A] Healing Spring AOE which restores 10.5 Health per second and greatly increases Blight Decay Rate. Lasts 15s.`,
    cooldown: 60,
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
    imagePath: '/skill/healing_shield.png',
    id: '8pu6y2',
    description: `The MEDIC Quickly expels healing energy to SHIELD all allies within 25m [A] for 100% of their Max Health for 10s. While shielded, allies regenerate 21% of their Max Health over the duration.`,
    cooldown: 100,
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
    imagePath: '/skill/redemption.png',
    id: 'zs77cb',
    description: `The MEDIC unleashes a 30m [A] shockwave that revives downed allies and restores 52.5% Max Health over 10s. For each additional 1s holding the SKILL button, the heal gains an additional 52.5% (up to 210% max)
    Revived allies will only receive 50% of the healing amount. If revived, allies cannot be revived again by Redemption for another 180s. Resets at Worldstone or on death.`,
    cooldown: 120,
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
    imagePath: '/skill/hunters_mark.png',
    id: 'jg82hi',
    tags: ['Critical Chance', 'Ranged Damage', 'Melee Damage'],
    description: `Increases the HUNTER's spatial awareness by casting an Aura that automatically applies MARK to all enemies within 35m. While senses are heightened, HUNTER also gains 15% increased Ranged and Melee damage. Lasts 25s.

    MARK: Crit Chance against MARKED enemies is increased by 15% for all allies.`,
    cooldown: 70,
    wikiLinks: [`https://remnant.wiki/Hunter%27s_Mark`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'skill',
    name: `Hunter's Focus`,
    imagePath: '/skill/hunters_focus.png',
    id: '5jh6qr',
    tags: [
      'Spread',
      'Ranged Damage',
      'Weakspot Damage',
      'Critical Chance',
      'Recoil',
    ],
    description: `Continuously Aiming Down Sights uninterrupted and without shooting for 0.5s causes the HUNTER to enter a FOCUSED state. 

    FOCUSED reduces Weapon Spread, Recoil, and Sway by 50% and grants 25% Ranged & Ranged Weakspot Damage, and 10% Ranged Crit Chance.
    
    While FOCUSED, Aiming at enemies will automatically apply MARK.
    
    Lasts 20s.
    
    FOCUSED state can last up to 10s after the Skill duration expires.
    
    MARK: Crit Chance against MARKED enemies is increased by 15% for all allies.`,
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
    imagePath: '/skill/hunters_shroud.png',
    id: 'ufkx9q',
    tags: ['Ranged Damage', 'Melee Damage', 'Critical Chance', 'Melee Hit'],
    description: `Hunter becomes Shrouded, reducing enemy awareness and making them harder to hit while moving. Attacking or activating a Mod or Skill will instantly exit Shroud.

    Exiting Shroud applies MARK to all enemies within 10m and grants AMBUSH to the Hunter for 2s.
    
    AMBUSH: Increases Ranged and Melee Damage by 50% which diminishes over its duration. Ranged and Melee attacks apply MARK.
    
    Hunter will automatically Shroud again after 1.15s if no offensive actions are performed.
    
    Lasts 15s.
    
    Cooldown: 90s.
    
    MARK: Crit Chance against MARKED enemies is increased by 15% for all allies.`,
    cooldown: 90,
    wikiLinks: [`https://remnant.wiki/Hunter%27s_Shroud`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'skill',
    name: 'Vial: Stone Mist',
    imagePath: '/skill/vial_stone_mist.png',
    id: 'y7ia9t',
    description: `Creates a mysterious vapor cloud which lasts 10s and applies STONESKIN.

    STONESKIN reduces incoming damage by 25%, reduces Stagger by 1, greatly increases Blight Buildup Decay Rate, and makes the target immune to STATUS Effects. Lasts 15s.
    
    PRESS: Slam Vial on the ground, creating the effect at the ALCHEMIST's feet [A].
    
    HOLD & RELEASE: Aim and throw the Vial causing the same effect where it lands [A].`,
    cooldown: 75,
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
    imagePath: '/skill/vial_frenzy_dust.png',
    id: 'xsniv3',
    description: `Creates a mysterious vapor cloud which lasts 10s and applies FRENZIED.

    FRENZIED increases Fire Rate, Reload Speed, and Melee Speed by 20%, and Movement Speed by 15%. Lasts 15s.

    PRESS: Slam Vial on the ground, creating the effect at the ALCHEMIST's feet. [A]
    
    HOLD & RELEASE: Aim and throw the Vial causing the same effect where it lands. [A]`,
    cooldown: 75,
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
    imagePath: '/skill/vial_elixir_of_life.png',
    id: '76554i',
    description: `Creates a mysterious vapor cloud that lasts 10s and applies LIVING WILL.

    LIVING WILL grants 5 Health Regeneration per second, and protects against fatal damage while active. Can revive downed players. Lasts 20s.
    
    Revived allies cannot be affected by Living Will for 180s. Resets at Worldstone or on death.
    
    PRESS: Slam Vial on the ground, creating the effect at the ALCHEMIST's feet. [A]
    
    HOLD & RELEASE: Aim and throw the Vial causing the same effect where it lands. [A]`,
    cooldown: 90,
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
    imagePath: '/skill/reality_rune.png',
    id: 'i3ddi7',
    description: `Conjures a 7m [A] protective dome which applies SLOW to any enemy or enemy projectiles.  Allies inside gain 25% Damage Reduction. Lasts 15s.`,
    cooldown: 75,
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
    imagePath: '/skill/chaos_gate.png',
    id: '9w7c5j',
    description: `Conjures a 7m [A] unstable zone which grants allies a 50% increase to All Damage Dealt and 25% increased Mod Generation while standing inside. Increases allies' damage taken by 15% while inside and for 10s after leaving. Lasts 20s.`,
    cooldown: 85,
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
    imagePath: '/skill/havoc_form.png',
    id: 'y72au6',
    description: `Unleashes the powers of the  Labyrinth to empower the caster with new abilities. Lasts 30s. Duration is reduced when Havoc Form special abilities are used.

    SHOOT: Blasts Lightning Tendrils from the ARCHON's hand, dealing 84.2 SHOCK Damage per second to targets within 15m.
    
    AIM: Raises a 3m [R] Energy Shield which deals 35 SHOCK damage per second and reduces incoming damage to all allies by 50%. 
    
    DODGE: Performs a Blink Evade that deals 100 SHOCK damage to enemies within 3m. [A]`,
    cooldown: 90,
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
    imagePath: '/skill/heavy_weapon_vulcan.png',
    id: 'pgmn4v',
    description: `PRESS: Deploys a Vulcan Cannon Turret which lasts until its Ammo is exhausted. Turrets that can aim will prioritize targets that the player Aims at. Press SKILL again to enable autonomous targeting.

    HOLD: Deploys to Heavy Carry Mode. If Engineer Prime is available, will Overclock the weapon if already in hand or on the battlefield.
    
    DOUBLE PRESS: The weapon is reclaimed, returning 75% of its remaining Ammo.
    
    Heavy Weapon Ammo is regenerated by 1.02% every second, and Heavy Weapons can only be deployed if at least 25% Ammo is available.`,
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
    imagePath: '/skill/heavy_weapon_flamethrower.png',
    id: '6fk8ea',
    description: `PRESS: Deploys a Flamethrower turret which lasts until its Ammo is exhausted. Turrets that can aim will prioritize targets that the player Aims at. Press SKILL again to enable autonomous targeting. [A]

    HOLD: Deploys to Heavy Carry Mode. If ENGINEER Prime is available, will Overclock the weapon if already in hand or on the battlefield.
    
    DOUBLE PRESS: The weapon is reclaimed, returning 75% of its remaining ammo
    
    Heavy weapon ammo is regenerated by 1.02% every second, and heavy weapons can only be deployed if at least 25% ammo is available.`,
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
    imagePath: '/skill/heavy_weapon_impact_cannon.png',
    id: 'ki92op',
    description: `PRESS: Deploys a Impact Cannon Turret [E] which lasts until its Ammo is exhausted. Turrets that can aim will prioritze targets that the player Aims at. Press SKILL again to enable autonomous targeting. [A]

    HOLD: Deploys to Heavy Carry Mode. If ENGINEER Prime is available, will Overclock the weapon if already in hand or on the battlefield.
    
    DOUBLE PRESS: The weapon is reclaimed, returning 75% of its remaining ammo.
    
    Heavy weapon ammo is regenerated by 1.02% every second, and heavy weapons can only be deployed if at least 25% ammo is available.`,
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
    imagePath: '/skill/plainswalker.png',
    id: 'a585sp',
    description: `Increases movement speed by 20% and reduces Stamina Cost by 80% for all allies. Lasts 30s.`,
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
    imagePath: '/skill/gold_digger.png',
    id: 'a2cik2',
    description: `Dig into the ground to spring a fountain which grants a random buff. Fountains last 45s and their buffs last 20s. [R]

    Fountains can grant either: 10% increased damage, 15% damage reduction, 2 Health Regeneration per second, or HASTE.`,
    cooldown: 44.1,
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
    imagePath: '/skill/fortune_hunter.png',
    id: 'dajt58',
    description: `Increases the EXPLORER's treasure sense to reveal special items within 40m for all allies. Lasts 60s.`,
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
    imagePath: '/skill/quick_draw.png',
    id: 'qdxjt7',
    description: `Pull out your trusty side piece and unload up to 6 Critical Shots from the hip. Each shot deals 52 base damage and double stagger value. 

    PRESS: Instantly fires towards all enemies in view within 25m. Upon release, rounds will be divided evenly among all targets.
    
    HOLD & RELEASE: Allows manual Aim and fires one single powerful shot upon release.`,
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
    imagePath: '/skill/sidewinder.png',
    id: 'jn34u8',
    description: `Calls upon the power of the Desert Sidewinder snake to increase ADS Movement Speed and Draw/Swap Speed by 50%. Cycling weapons will automatically reload incoming Firearms. Lasts 12s.`,
    cooldown: 80,
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
    imagePath: '/skill/bulletstorm.png',
    id: 'xpqq62',
    tags: ['Fire Rate', 'Reload Speed', 'Critical Chance', 'Projectile Speed'],
    description: `Unleashes the full power and speed of the GUNSLINGER. Increases Fire Rate 20% and Reload Speed 50% of all ranged weapons. Lasts 20s. 

    Single Shot Weapons become fully-automatic. Kills instantly reload the current weapon. 
    
    Instead of becoming fully-automatic, Bows and Crossbows gain 15% Critical Chance and 50% increased Projectile Speed.`,
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
    imagePath: '/skill/void_cloak.png',
    id: 'hvcxo8',
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
    imagePath: '/skill/worm_hole.png',
    id: 'y9oqq6',
    description: `Warps the caster forward through space-time. The next Melee or Ranged attack within 5s will deal 300% damage.

    Holding the Skill button will show the targeting device. If an enemy is directly targeted, the caster will emerge behind them.`,
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
    imagePath: '/skill/reboot.png',
    id: 'xx6sib',
    tags: [
      'Stamina',
      'Health',
      'Status Effect',
      'Movement Speed',
      'Damage Reduction',
    ],
    description: `Initiates a Data Backup of the caster's current Health, Stamina, Relic Charges, Ammo, and Negative Status Effects, which are stored for 30s.

    While the Backup is active, increases Movement Speed by 15% and Damage Reduction by 10%.
    
    Reactivating the Skill restores all saved values from the Backup and spawns a Decoy which lasts 3s.`,
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
    imagePath: '/skill/minion_hollow.png',
    id: 'kk4yre',
    description: `PRESS: Summons a Root Hollow Minion to fight by your side. Costs 15% of Max Health to summon, but will not kil SUMMONER. Max (2)

    HOLD: SACRIFICE Root Hollow Minion to explode, dealing 150 damage [E] within 5m. [A] Reduces Skill Cooldown by up to 50% based on remaining Health of each Minion Sacrificed.`,
    cooldown: 30,
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
    imagePath: '/skill/minion_flyer.png',
    id: 'o7pvqx',
    description: `Summons a Root Flyer Minion to fight by your side. Costs 10% of Max Health to summon, but will not kill Summoner. Max (2).

    HOLD: SACRIFICE Root Flyer Minions, dealing 50 Damage [E] within 3m [A] and spawning 3 homing projectiles which explode on contact for 150 damage each.
    
    Reduces Skill Cooldown by up to 50% based on remaining Health of each Minion Sacrificed.`,
    cooldown: 45,
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
    imagePath: '/skill/minion_reaver.png',
    id: 'gs8zdv',
    description: `PRESS: Summons a Root Reaver Minion to fight by your side. Costs 35% of Max Health to summon, but will not kill SUMMONER. Max (1).

    HOLD: SACRIFICE all Root Reaver Minion, dealing 200 damage [E] within 6m [A] and spawning Spore Bombs which bounce and explode on contact for 200 damage each.
    
    Reduces Skill Cooldown by up to 50% based on remaining Health of Minion.`,
    cooldown: 120,
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
    imagePath: '/skill/eruption.png',
    id: 'amqa83',
    tags: ['Status Effect'],
    description: `Creates 15m explosion for 150 damage [E] on all enemies within 1m. Explosion Radius and Damage increases 100% for each unique Status Effect on the target. Refreshes all current Status Effects on the target. [A]`,
    cooldown: 30,
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
    imagePath: '/skill/miasma.png',
    id: '3er3og',
    tags: ['Status Effect'],
    description: `Casts an AOE burst that applies BLEEDING, BURNING, OVERLOADED, and CORRODED to all enemies within 15m [A], and dealing a total of 1500 base damage. Lasts 11s.`,
    cooldown: 40,
    wikiLinks: [`https://remnant.wiki/Miasma`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'skill',
    name: 'Death Wish',
    imagePath: '/skill/death_wish.png',
    id: 'ux5f9v',
    tags: ['All Damage', 'Lifesteal'],
    description: `Negates all healing to self. Drain Health 300% over 20s. Increases all Damage by 35% and grants 10% Base Damage dealt as Lifesteal.`,
    cooldown: 90,
    wikiLinks: [`https://remnant.wiki/Death_Wish`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'skill',
    name: 'INVOKER SKILL #1', // TODO
    imagePath: 'placeholder.jpg', // TODO
    id: 'h4B9dD',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'skill',
    name: 'INVOKER SKILL #2', // TODO
    imagePath: 'placeholder.jpg', // TODO
    id: '7DnBmE',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'skill',
    name: 'INVOKER SKILL #3', // TODO
    imagePath: 'placeholder.jpg', // TODO
    id: 'T2xA6c',
    tags: [],
    description: 'NO DESCRIPTION YET', // TODO
    wikiLinks: [],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
]
