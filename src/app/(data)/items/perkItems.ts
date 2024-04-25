import { PerkItem } from './types/PerkItem'

export const perkItems: PerkItem[] = [
  {
    category: 'perk',
    name: 'Dead to Rights',
    imagePath: '/perk/dead_to_rights.png',
    type: 'prime',
    id: 's8eytq',
    tags: ['Weakspot Damage'],
     description: `
    Dealing 65 Base Ranged or Melee Weakspot Damage extends the duration of active HUNTER Skills by 2.5s. Can extend timer beyond its initial duration

    Upgraded at Level 5
    Dealing 60 Base Ranged or Melee Weakspot Damage extends the duration of active HUNTER Skills by 3s. Can extend timer beyond its initial duration

    Upgraded at level 10
    Dealing 55 Base Ranged or Melee Weakspot Damage extends the duration of active HUNTER Skills by 3.5s. Can extend timer beyond its initial duration`,
    wikiLinks: [`https://remnant.wiki/Dead_to_Rights`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'perk',
    name: 'Deadeye',
    imagePath: '/perk/deadeye.png',
    type: 'damage',
    id: 'c4fx8u',
    tags: ['Ranged Damage', 'Weakspot Damage', 'Critical Chance'],
    description: `
    Unlocked at level 1
    Gain 4% Ranged Damage and 1.5% Weakspot Damage. Damage increases with HUNTER Level

  Upgrade Unlocked at level 5
  Gain 24% Ranged Damage, 9% Weakspot Damage and 5% Ranged Critical Chance.

  (Level 10: Gain 40% Ranged Damage and 15% Weakspot Damage)
    `,
    wikiLinks: [`https://remnant.wiki/Deadeye`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'perk',
    name: 'Return to Sender',
    imagePath: '/perk/return_to_sender.png',
    type: 'team',
    id: 'oyjp3t',
    tags: ['Critical Hit', 'Weakspot Hit'],
    description: `
    Unlocked at level 2
Kills due to Weakspot and Critical Hits increase Ammo drops by 25%

Upgrade unlocked at level 7
Kills due to Weakspot and Critical Hits increase Ammo drops by 50% and double the chance of Ammo drops.
    `,
    wikiLinks: [`https://remnant.wiki/Return_to_Sender`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'perk',
    name: 'Urgency',
    imagePath: '/perk/urgency.png',
    type: 'utility',
    id: '98yqyq',
    tags: ['Reload Speed', 'Movement Speed'],
    description: `
    Unlocked at level 3
Firearms gain 15% Reload Speed after a Kill. Lasts 3s

Upgrade unlocked at level 8
Firearms gain 15% Reload Speed and 15% Increased Movement Speed after a Kill. Lasts 5s
    `,
    wikiLinks: [`https://remnant.wiki/Urgency`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'perk',
    name: 'Intuition',
    imagePath: '/perk/intuition.png',
    id: '8d4diq',
    type: 'relic',
    tags: ['Relic Use Speed'],
    description: `
    Unlocked at level 4
Using a Relic extends the duration of any active HUNTER Skill by 5s. Effect degrades with each subsequent use.

Upgrade unlocked at level 9
Using a Relic extends the duration of any active HUNTER Skill by 10s. Effect degrades with each subsequent use. Weakspot Kills against MARKED enemies increase speed of next Relic Use within 15s by 5%. Stacks 10x.
    `,
    wikiLinks: [`https://remnant.wiki/Intuition`],
    linkedItems: {
      archetype: {
        name: 'Hunter',
      },
    },
  },
  {
    category: 'perk',
    name: 'Bonded',
    imagePath: '/perk/bonded.png',
    id: 'd58t4k',
    type: 'prime',
    description: `
    When HANDLER is downed, their Companion will attempt to revive them at 50% Max Health. Can be used to revive allies with Command. Downed ally must have a Relic charge. 
    Cooldown: 120s

    Upgraded at Level 5
    When HANDLER is downed, their Companion will attempt to revive them at 50% Max Health. Can be used to revive allies with Command. Downed ally must have a Relic charge.
    Cooldown: 105s

    Upgraded at level 10
    When HANDLER is downed, their Companion will attempt to revive them at 50% Max Health. Can be used to revive allies with Command. Downed ally must have a Relic charge.
    Cooldown: 90s`,
    wikiLinks: [`https://remnant.wiki/Bonded`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'perk',
    name: 'Pack Hunter',
    imagePath: '/perk/pack_hunter.png',
    type: 'damage',
    id: '485uc9',
    tags: ['Ranged Damage', 'Skill Damage', 'Critical Chance'],
    description: `
    Gain 3% Ranged, Melee, and Skill Damage while Companion is within 40m [A] of the HANDLER. Damage increases with HANDLER Level.
    
    Upgrade Unlocked at level 5
    Gain 18% Ranged, Melee, and Skill Damage and 5% Ranged, Melee, and Skill Critical Chance while Companion is active and within 40m of the Handler. Damage increases with HANDLER level.
      
    Upgrade Unlocked at level 10
    Gain 30% Ranged, Melee, and Skill Damage and 5% Ranged, Melee, and Skill Critical Chance while Companion is active and within 40m of the Handler. Damage increases with HANDLER level.
    `,
    wikiLinks: [`https://remnant.wiki/Pack_Hunter`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'perk',
    name: 'Spirit of the Wolf',
    imagePath: '/perk/spirit_of_the_wolf.png',
    type: 'team',
    id: 'z3sz58',
    tags: ['Movement Speed', 'Stamina'],
    description: `
    Increases Movement Speed by 10%. All allies within 10m [A] of the HANDLER gain the HANDLER's Movement Speed (if faster).

    Upgrade unlocked at level 7
    Increases Movement Speed by 10%. All allies within 10m of the HANDLER gain the HANDLER's Movement Speed (if faster). Reduces the Stamina Cost of actions for allies by 15%.`,
    wikiLinks: [`https://remnant.wiki/Spirit_of_the_Wolf`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'perk',
    name: 'Teamwork',
    imagePath: '/perk/teamwork.png',
    type: 'utility',
    id: 'y36q6p',
    tags: ['Damage Reduction'],
    description: `
    HANDLER and Companion gain 15% increased Revive Speed.

    Upgrade unlocked at level 8
    HANDLER and Companion gain 30% increased Revive Speed. While HANDLER or Companion are reviving, they receive 50% less damage.`,
    wikiLinks: [`https://remnant.wiki/Teamwork`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'perk',
    name: 'Best Friend',
    imagePath: '/perk/best_friend.png',
    type: 'relic',
    id: '8vh7yq',
    tags: ['Damage Reduction', 'All Damage'],
    description: `
    Using a Relic fully restores the Companion's health.

    Upgrade unlocked at level 9
    Using a Relic fully restores the Companion's health and grants them 25% Damage and 35% Damage Resistance for 15s.`,
    wikiLinks: [`https://remnant.wiki/Best_Friend`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'perk',
    name: 'Regenerator',
    imagePath: '/perk/regenerator.png',
    type: 'prime',
    id: 'io3m7t',
    description: `
    After restoring 350 Total Health to allies, regain a spent Relic charge. 
    Resting or Respawning at a Worldstone resets healing accumulation. Each additional player increases the healing requirement by 50%.

    Upgraded at Level 5
    After restoring 300 Total Health to allies, regain a spent Relic charge.
    Resting or Respawning at a Worldstone resets healing accumulation. Each additional player increases the healing requirement by 50%.

    Upgraded at level 10
    After restoring 250 Total Health to allies, regain a spent Relic charge.
    Resting or Respawning at a Worldstone resets healing accumulation. Each additional player increases the healing requirement by 50%.`,
    wikiLinks: [`https://remnant.wiki/Regenerator`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
  },
  {
    category: 'perk',
    name: 'Invigorated',
    imagePath: '/perk/invigorated.png',
    type: 'damage',
    id: 'errks7',
    tags: ['All Damage', 'Critical Chance'],
    description: `
    Grants a 2.5% increase to All Damage. Damage increases with MEDIC Level.

    Upgrade Unlocked at level 5
    Grants a 18% increase to All Damage and 5% Critical Chance
    
    (Level 10: Grants a 25% increase to All Damage and 5% Critical Chance)`,
    wikiLinks: [`https://remnant.wiki/Invigorated`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
  },
  {
    category: 'perk',
    name: 'Benevolence',
    imagePath: '/perk/benevolence.png',
    type: 'team',
    id: 't2fc7j',
    description: `
    Increases Relic Efficacy by 15% and heals nearby allies for 30% of the total healing value.

    Upgrade unlocked at level 7
    Increases Relic Efficacy by 15% and heals nearby allies for 30% of the total healing value, increasing to 60% for any below 35% max health.`,
    wikiLinks: [`https://remnant.wiki/Benevolence`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
  },
  {
    category: 'perk',
    name: 'Backbone',
    imagePath: '/perk/backbone.png',
    type: 'utility',
    id: 'z2xo76',
    tags: ['Grey Health'],
    description: `
Increases the hits MEDIC can take before losing Grey Health by 1

Upgrade unlocked at level 8
Increases the hits MEDIC can take before losing Grey Health by 2`,
    wikiLinks: [`https://remnant.wiki/Backbone`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
  },
  {
    category: 'perk',
    name: 'Benefactor',
    imagePath: '/perk/benefactor.png',
    type: 'relic',
    id: 'bp9pr7',
    tags: ['Relic Use Speed', 'Stagger'],
    description: `
    Increases Relic Use Speed by 20%

    Upgrade unlocked at level 9
    Increases Relic Use Speed by 20%. Relic Use gains -1 Stagger.`,
    wikiLinks: [`https://remnant.wiki/Benefactor`],
    linkedItems: {
      archetype: {
        name: 'Medic',
      },
    },
  },
  {
    category: 'perk',
    name: 'Loaded',
    imagePath: '/perk/loaded.png',
    type: 'prime',
    id: 'm6pvhd',
    tags: ['Reload Speed', 'Ammo Reserves'],
    description: `
    When activating any GUNSLINGER Skill, both weapons are instantly reloaded, and gain infinite reserve ammo on all weapons for 5s.

    Upgraded at Level 5
    When activating any GUNSLINGER Skill, both weapons are instantly reloaded, and gain infinite reserve ammo on all weapons for 6.5s
    
    Upgraded at level 10
    When activating any GUNSLINGER Skill, both weapons are instantly reloaded, and gain infinite reserve ammo on all weapons for 8s.`,
    wikiLinks: [`https://remnant.wiki/Loaded`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Swift Shot',
    imagePath: '/perk/swift_shot.png',
    type: 'damage',
    id: '7mbvc3',
    tags: ['Fire Rate', 'Ranged Damage', 'Critical Chance'],
    description: `
    Gain 1.5% Fire Rate and 2.5% Ranged Damage. Fire Rate and Damage increases with GUNSLINGER Level.
    
    Upgrade Unlocked at level 5
    Gain 15% Fire Rate and 25% Ranged Damage and 5% Crit Chance for all firearms.
  
   (Level 10: Gain 15% Fire Rate, 25% Ranged Damage and 5% Crit Chance for all firearms.)`,
    wikiLinks: [`https://remnant.wiki/Swift_Shot`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Posse Up',
    imagePath: '/perk/posse_up.png',
    type: 'team',
    id: 'ajobx6',
    tags: ['Ammo Reserves'],
    description: `
    Ammo pickups award 20% additional Ammo per player with the bonus split equally among teammates.

    Upgrade unlocked at level 7
    Ammo pickups award 30% additional Ammo per player with the bonus split equally among teammates. Causes Ammo Box to drop additional ammo on the ground.`,
    wikiLinks: [`https://remnant.wiki/Posse_Up`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Quick Hands',
    imagePath: '/perk/quick_hands.png',
    type: 'utility',
    id: '496x8y',
    tags: ['Reload Speed'],
    description: `
    Firearms gain 10% Reload Speed

    Upgrade unlocked at level 8
    Firearms gain 10% Reload Speed. Bonus is DOUBLED if magazine is empty`,
    wikiLinks: [`https://remnant.wiki/Quick_Hands`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Sleight of Hand',
    imagePath: '/perk/sleight_of_hand.png',
    type: 'relic',
    id: 'fspt8u',
    tags: ['Reload Speed', 'Ranged Damage'],
    description: `
    Using a Relic reloads equipped Firearm.

    Upgrade unlocked at level 9
    Using a Relic reloads equipped Firearm and increases Ranged Damage by 15% for 10s.`,
    wikiLinks: [`https://remnant.wiki/Sleight_of_Hand`],
    linkedItems: {
      archetype: {
        name: 'Gunslinger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Die Hard',
    imagePath: '/perk/die_hard.png',
    type: 'prime',
    id: 'je27uv',
    tags: ['Heal'],
    description: `
    When receiving fatal damage, the CHALLENGER becomes invulnerable for 3s and regenerates 50% of Max Health.
      While on cooldown, the Challenger gains 1 Stack of BULWARK. Can only happen once every 10 minutes. Resets at Wordstone or on death.

    Upgraded at Level 5
    When receiving fatal damage, the CHALLENGER becomes invulnerable for 2.5s and regenerates 75% of Max Health.
    While on cooldown, the Challenger gains 1 Stack of BULWARK. Can only happen once every 10 minutes. Resets at Wordstone or on death.

    Upgraded at level 10
    When receiving fatal damage, the CHALLENGER becomes invulnerable for 3s and regenerates 100% of Max Health.
    While on cooldown, the Challenger gains 1 Stack of BULWARK. Can only happen once every 10 minutes. Resets at Wordstone or on death.`,
    wikiLinks: [`https://remnant.wiki/Die_Hard`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Close Quarters',
    imagePath: '/perk/close_quarters.png',
    type: 'damage',
    id: 'f4jx9k',
    tags: ['All Damage', 'Critical Chance'],
    description: `
    Grants a 3.5% increase to All Damage to enemies within 10m. Damage bonus tapers off until 20m. Increases with CHALLENGER Level. 
    
    Upgrade Unlocked at level 5
    Grants a 21% increase to All Damage to enemies within 10m. Damage bonus tapers off until 20m. Critical Chance is increased by up to 5%.
          
    (Level 10: Grants a 35% increase to All Damage to enemies within 10m. Damage bonus tapers off until 20m. Critical Chance is increased by up to 5%.)`,
    wikiLinks: [`https://remnant.wiki/Close_Quarters`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Intimidating Presence',
    imagePath: '/perk/intimidating_presence.png',
    type: 'team',
    id: 'c92847',
    tags: ['Damage Reduction'],
    description: `
    After activating a CHALLENGER Skill, enemies within 10m deal 10% less damage for 15s. 

    Upgrade unlocked at level 7
    After activating a CHALLENGER Skill, enemies within 10m [A] deal 10% less damage for 15s, with an additional 2.5% damage reduction per enemy affected. (Max 10%)`,
    wikiLinks: [`https://remnant.wiki/Intimidating_Presence`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Powerlifter',
    imagePath: '/perk/powerlifter.png',
    type: 'utility',
    id: '8p55rw',
    tags: ['Stamina', 'Encumbrance'],
    description: `
    The Stamina Cost increases for each weight bracket is reduced by 50%.

    Upgrade unlocked at level 8
    Both the Stamina cost increase for each weight bracket and Stamina Regen Delay are reduced by 50%.`,
    wikiLinks: [`https://remnant.wiki/Powerlifter`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Face of Danger',
    imagePath: '/perk/face_of_danger.png',
    type: 'relic',
    id: '7dvm5a',
    tags: ['Damage Reduction', 'All Damage'],
    description: `
    Using a Relic within 10m of an enemy grants 2 stacks of BULWARK for 10s.

    Upgrade unlocked at level 9
    Using a Relic within 10m of an enemy grants 2 stacks of BULWARK and 10% Increased Damage for 10s.`,
    wikiLinks: [`https://remnant.wiki/Face_of_Danger`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Spirited',
    imagePath: '/perk/spirited.png',
    type: 'prime',
    id: 'rx6e2w',
    tags: ['Concoction'],
    description: `
    ALCHEMIST can have 1 additional Concotion buff active.

    Upgraded at Level 5
    ALCHEMIST can have 2 additional Concotions buff active.

    Upgraded at level 10
    ALCHEMIST can have 3 additional Concoctions Buffs active.`,
    wikiLinks: [`https://remnant.wiki/Spirited`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Liquid Courage',
    imagePath: '/perk/liquid_courage.png',
    type: 'damage',
    id: '5exhee',
    tags: ['All Damage', 'Critical Chance'],
    description: `Unlocked at level 1
    Gain 2.5%  increase to All Damage.
  
    Increases with ALCHEMIST Level.

    Upgrade Unlocked at level 5
    Grants a 25% increase to All Damage and 5% Critical Chance`,
    wikiLinks: [`https://remnant.wiki/Liquid_Courage`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Panacea',
    imagePath: '/perk/panacea.png',
    type: 'team',
    id: '49i5jm',
    tags: ['Damage Reduction'],
    description: `
    Curative effects apply to all allies within 15m and grant 15 additional Resistance.

    Upgrade unlocked at level 7
    Allies affected by Panacea gain +10% Status and Blight Resistance.`,
    wikiLinks: [`https://remnant.wiki/Panacea`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
    fireResistance: 15,
    shockResistance: 15,
    blightResistance: 15,
    bleedResistance: 15,
    toxinResistance: 15,
  },
  {
    category: 'perk',
    name: 'Gold to Lead',
    imagePath: '/perk/gold_to_lead.png',
    type: 'utility',
    id: '3a9dd2',
    tags: ['Ammo Reserves'],
    description: `
    Picking up Scrap has a 15% chance to also award Ammo to the ALCHEMIST.

    Upgrade unlocked at level 8
    Picking up Scrap or Metals also has a 15% chance to award Ammo to the ALCHEMIST
    `,
    wikiLinks: [`https://remnant.wiki/Gold_to_Lead`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Experimentalist',
    imagePath: '/perk/experimentalist.png',
    type: 'relic',
    id: 'cxnnz9',
    description: `
    Using a Relic applies a random buff on the ALCHEMIST for 30s. Cannot be overridden.                 

    Upgrade unlocked at level 9
    Using a Relic applies a random buff to the ALCHEMIST and allies within 20m for 60s. Cannot be overridden`,
    wikiLinks: [`https://remnant.wiki/Experimentalist`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Tempest',
    imagePath: '/perk/tempest.png',
    type: 'prime',
    id: 'dh2wih',
    tags: ['Mod Power'],
    description: `
    Automatically generate 15 Mod Power per second.

    Upgraded at Level 5
    Upgrade: Automatically generate 22.5 Mod Power per second. 

    Upgraded at level 10
    Upgrade: Automatically generate 30 Mod Power per second.`,
    wikiLinks: [`https://remnant.wiki/Tempest`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
  },
  {
    category: 'perk',
    name: 'Amplify',
    imagePath: '/perk/amplify.png',
    type: 'damage',
    id: 'yro37y',
    tags: ['Mod Damage', 'Critical Chance'],
    description: `
    Increases Mod Damage by +5%.
    Increases with ARCHON Level.
    
    Upgrade Unlocked at level 5
    Upgrade: Increases Mod Damage by +30% and grants +10% Mod Critical Chance.
    
    Damage increases with ARCHON Level.`,
    wikiLinks: [`https://remnant.wiki/Amplify`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
  },
  {
    category: 'perk',
    name: 'Power Creep',
    imagePath: '/perk/power_creep.png',
    type: 'team',
    id: '7ay3kh',
    tags: ['Mod Power'],
    description: `
    After casting a Mod, 5% of the Mod Power spent will be regenerated by all allies over 10s. 

    Upgrade unlocked at level 7
    Upgrade: While Power Creep is active. allies will also gain 5% Mod Power Generation.`,
    wikiLinks: [`https://remnant.wiki/Power_Creep`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
  },
  {
    category: 'perk',
    name: 'Spirit Within',
    imagePath: '/perk/spirit_within.png',
    type: 'utility',
    id: '5fz7xr',
    tags: ['Mod Power'],
    description: `
    Reduces the Mod Power requirement for all Mods by 5%.

    Upgrade unlocked at level 8
    Reduces the Mod Power requirement per charge by 10%`,
    wikiLinks: [`https://remnant.wiki/Spirit_Within`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
  },
  {
    category: 'perk',
    name: 'Power Leak',
    imagePath: '/perk/power_leak.png',
    type: 'relic',
    id: 'h42e2n',
    tags: ['Mod Power'],
    description: `
    Using a Relic grants 100 Mod Power for both equipped Mods.

    Upgrade unlocked at level 9
    Upgrade: Using a Relic grants 100 Mod Power for both equipped Mods, and an additional 100 to current Mod.`,
    wikiLinks: [`https://remnant.wiki/Power_Leak`],
    linkedItems: {
      archetype: {
        name: 'Archon',
      },
    },
  },
  {
    category: 'perk',
    name: 'High Tech',
    imagePath: '/perk/high_tech.png',
    type: 'prime',
    id: '98qnpc',
    description: `
    Holding the SKILL button will Overclock a Carried or Deployed Heavy Weapon. Overclocking grants infinite Ammo, increased Fire Rate, and a 25% damage increase for 15s.
    
    Cooldown: 60s

    Upgraded at Level 5
    Holding the SKILL button will Overclock a Carried or Deployed Heavy Weapon. Overclocking grants infinite Ammo, increased Fire Rate, and a 25% damage increase for 20s.
    
    Cooldown: 60s

    Upgraded at level 10
    Holding the SKILL button will Overclock a Carried or Deployed Heavy Weapon. Overclocking grants infinite Ammo, increased Fire Rate, and a 25% damage increase for 25s
    
    Cooldown: 60s`,
    wikiLinks: [`https://remnant.wiki/High_Tech`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Metalworker',
    imagePath: '/perk/metalworker.png',
    type: 'damage',
    id: '2hcif5',
    tags: ['Skill Damage', 'Critical Chance'],
    description: `
    Increases Skill Damage by 5% and Ranged Damage by 2.5%.
    Heavy Weapons gain 5% Ammo Capacity, 2.5% Max Health, and 2.5% Weakspot Damage.

    Unlocked at level 5
    Increases Skill Damage by 25% and Ranged Damage by 12.5%, and grants 5% Ranged and Skill Critical Chance
    Heavy Weapons gain 25% Ammo Capacity, 12% Max Health, and 25% Weakspot Damage.
    
    Unlocked at level 10
    Increases Skill Damage by 50% and Ranged Damage by 25%, and grants 5% Ranged and Skill Critical Chance.
    Heavy Weapons gain 50% Ammo Capacity, 25% Max Health, and 25% Weakspot Damage.
    `,

    wikiLinks: [`https://remnant.wiki/Metalworker`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Magnetic Field',
    imagePath: '/perk/magnetic_field.png',
    type: 'team',
    id: 'w6v2o6',
    tags: ['Damage Reduction', 'Ammo Reserves'],
    description: `
    Heavy Weapons grant 15% Damage Reduction to all allies within 2.5m.
    
    Upgrade unlocked at level 7
    Heavy Weapons grant 15% Damage Reduction and gradually restore Ammo to allies within 2.5m. [A]`,
    wikiLinks: [`https://remnant.wiki/Magnetic_Field`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Heavy Mobility',
    imagePath: '/perk/heavy_mobility.png',
    type: 'utility',
    id: 'htf7h4',
    tags: ['Movement Speed'],
    description: `
    Movement Speed while Carrying a Heavy Weapon is increased by 35%.

    Upgrade unlocked at level 8
    While Carrying a Heavy Weapon, Movement Speed is increased by 35% and both Evade Speed and Evade Distance are increased by 25%`,
    wikiLinks: [`https://remnant.wiki/Heavy_Mobility`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Surplus',
    imagePath: '/perk/surplus.png',
    type: 'relic',
    id: '2k4yzk',
    description: `
    Using a Relic refills 15% of Heavy Weapon Ammo. Bonus is doubled when Heavy Weapon is stowed. If the Stowed Heavy Weapon is overfilled, the ENGINEER will drop additional Ammo based on the surplus.
    
    Upgrade unlocked at level 9
    Using a Relic refills 15% of Heavy Weapon Ammo. Bonus is doubled when Heavy Weapon is stowed`,
    wikiLinks: [`https://remnant.wiki/Surplus`],
    linkedItems: {
      archetype: {
        name: 'Engineer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Lucky',
    imagePath: '/perk/lucky.png',
    type: 'prime',
    id: '82y94m',
    description: `
    Grants a 10% chance to spawn additional items and rarer drops when defeating stronger enemies.

    Upgraded at Level 5
    Grants a 20% chance to spawn additional items and rarer drops when defeating stronger enemies.

    Upgraded at level 10
    Grants a 35% chance to spawn additional items and rarer drops when defeating stronger enemies.`,
    wikiLinks: [`https://remnant.wiki/Lucky`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Scavenger',
    imagePath: '/perk/scavenger.png',
    type: 'damage',
    id: 'y6x5dr',
    tags: ['All Damage', 'Critical Chance'],
    description: `
    Pickups increase All Damage Dealt by 0.5% per stack for 20s. Additional Stacks increase Duration, up to 60s. Max 5 Stacks. Damage increases with EXPLORER Level
         
    Upgraded at level 5
    Scavenger also increase All Crit Chance by 5% while active.
        
    (Level 10: Pickups increase All Damage Dealt by 5% per stack for 20s. Scavenger also increase All Crit Chance by 5% while active. Additional Stacks increase Duration, up to 60s. Max 5 Stacks.)`,
    wikiLinks: [`https://remnant.wiki/Scavenger`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Metal Detector',
    imagePath: '/perk/metal_detector.png',
    type: 'team',
    id: 'w838yg',
    description: `
    Increase Ammo, Currency, and Metal Drop Rate Chance for entire party by 10%.
    
    Upgrade unlocked at level 7
    Prospector increases the chance of Consumables being rewarded from Chests`,
    wikiLinks: [`https://remnant.wiki/Metal_Detector`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Prospector',
    imagePath: '/perk/prospector.png',
    type: 'utility',
    id: 'o5q3p9',
    description: `
    Relic Fragments discovered by EXPLORER drop at a higher quality.

    Upgrade unlocked at level 8
    Relic Fragments discovered by the Explorer drop at a higher quality. When picking up a Fragment, the Explorer has a 5% chance of picking up a second one of the same type & quality.`,
    wikiLinks: [`https://remnant.wiki/Prospector`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Self Discovery',
    imagePath: '/perk/self_discovery.png',
    type: 'relic',
    id: 'rvb63g',
    description: `
    Using a Relic instantly fills Scavenger Stacks and prevents Stack Decay for 15s.
    
    Upgrade unlocked at level 9
    Using a Relic instantly fills Scavenger Stacks, grants +1 Stack, and prevents Stack Decay for 30s.`,
    wikiLinks: [`https://remnant.wiki/Self_Discovery`],
    linkedItems: {
      archetype: {
        name: 'Explorer',
      },
    },
  },
  {
    category: 'perk',
    name: 'Shadow',
    imagePath: '/perk/shadow.png',
    type: 'prime',
    id: 'yg77rq',
    tags: ['All Damage'],
    description: `
    Casting an INVADER Skill leaves a Decoy for 3s which draws enemy fire. Deal +5% additional damage to enemies not targeting INVADER.

    Upgraded at Level 5
    Casting an INVADER Skill leaves a Decoy for 3s which draws enemy fire. Deal +10% additional damage to enemies not targeting INVADER.

    Upgraded at level 10
    Casting an INVADER Skill leaves a Decoy for 3s which draws enemy fire. Deal +15% additional damage to enemies not targeting INVADER.`,
    wikiLinks: [`https://remnant.wiki/Shadow`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
  },
  {
    category: 'perk',
    name: 'S.H.A.R.K.',
    imagePath: '/perk/shark.png',
    type: 'damage',
    id: '59swqq',
    tags: [
      'Ranged Damage',
      'Melee Damage',
      'Melee Critical Chance',
      'Critical Chance',
    ],
    description: `
    Sprinting for 1s or Evading adds 1 Stack of Momentum which increases Ranged and Melee damage by 0.7% for 10s. Max 5 Stacks. Damage increases with INVADER level.
    
    Upgrade Unlocked at level 5
    Sprinting for 1s or Evading adds 1 Stack of Momentum which increases Ranged and Melee damage by 3.5% and Ranged and Melee Critical Chance by 1% for 10s. Max 5 Stacks. Damage increases with INVADER level.
    
    Unlocked at level 10
    Sprinting for 1s or Evading adds 1 Stack of Momentum which increases Ranged and Melee damage by 7% and Ranged and Melee Critical Chance by 1% for 10s. Max 5 Stacks. Damage increases with INVADER level.`,
    wikiLinks: [`https://remnant.wiki/S.H.A.R.K.`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
  },
  {
    category: 'perk',
    name: 'Loophole',
    imagePath: '/perk/loophole.png',
    type: 'team',
    id: 'd5qedi',
    tags: ['Lifesteal'],
    description: `
    All ally Ranged and Melee damage against enemies distracted by the INVADER's Decoy grants 5% as Lifesteal

    Upgrade unlocked at level 7
    All ally Ranged and Melee damage against enemies distracted by the INVADER's Decoy grants 7.5% as Lifesteal`,
    wikiLinks: [`https://remnant.wiki/Loophole`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
  },
  {
    category: 'perk',
    name: 'Circumvent',
    imagePath: '/perk/circumvent.png',
    type: 'utility',
    id: 'i9tjgk',
    tags: [
      'Perfect Neutral Evade',
      'Neutral Dodge',
      'Perfect Dodge',
      'Stamina',
    ],
    description: `
    Reduce Cost of Evade and Combat Slide by 10%

    Upgrade unlocked at level 8
    Reduce Cost of Evade and Combat Slide by 15%. perfect Dodges gain an additional 15% reduction`,
    wikiLinks: [`https://remnant.wiki/Circumvent`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
  },
  {
    category: 'perk',
    name: 'Override',
    imagePath: '/perk/override.png',
    type: 'relic',
    id: 'decoy8',
    description: `
    Using a Relic reduces Threat Generation by 25% for 10s. While Override is active, the next Evade leaves a Empowered Decoy which lasts 4s.
    
    Upgrade unlocked at level 9
    Using a Relic reduces Threat Generation by 25% for 10s. While Override is active, the next Evade leaves a Empowered Decoy which lasts 5.5s.`,
    wikiLinks: [`https://remnant.wiki/Override`],
    linkedItems: {
      archetype: {
        name: 'Invader',
      },
    },
  },
  {
    category: 'perk',
    name: 'Ruthless',
    imagePath: '/perk/ruthless.png',
    type: 'prime',
    id: 'tmc2tk',
    tags: ['Summon'],
    description: `
    When the SUMMONER deals damage to their Minion, it causes them to ENRAGE. Minions gain 10% Attack Speed along with 30% increased Damage and Movement Speed. Lasts 20s.
    
    Upgraded at Level 5
    When the SUMMONER deals damage to their Minion, it causes them to ENRAGE. Minions gain 15% Attack Speed along with 40% increased Damage and Movement Speed. Lasts 30s.
    
    Upgraded at level 10
    When the SUMMONER deals damage to their Minion, it causes them to ENRAGE. Minions gain 20% Attack Speed along with 50% increased Damage and Movement Speed. Lasts 40s.`,
    wikiLinks: [`https://remnant.wiki/Ruthless`],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
  },
  {
    category: 'perk',
    name: 'Dominator',
    imagePath: '/perk/dominator.png',
    type: 'damage',
    id: 'tu8pcp',
    tags: [
      'Mod Damage',
      'Skill Damage',
      'Ranged Damage',
      'Melee Damage',
      'Critical Chance',
      'Melee Critical Chance',
    ],
    description: `
    Grants a 3.5% increase to Mod, Skill, and Explosive Damage [E]. Damage increases with Summoner Level.
    
    Upgrade Unlocked at level 5
    Grants a 17.5% increase to Mod, Skill, and Explosive Damage [E], and 5% Mod, Skill, and Explosive Critical Chance. Damage increases with Summoner Level.  
      
    Upgrade Unlocked at level 10
    Grants a 35% increase to Mod, Skill, and Explosive Damage [E], and 5% Mod, Skill, and Explosive Critical Chance. Damage increases with Summoner Level.
    `,
    wikiLinks: [`https://remnant.wiki/Dominator`],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
  },
  {
    category: 'perk',
    name: 'Residue',
    imagePath: '/perk/residue.png',
    type: 'team',
    id: 'fzywc2',
    tags: ['Heal', 'Healing Effectivness'],
    description: `
    Minions that expire leave a 3m Aura which heals 2.5% Health per second. Lasts 10s.
    
    Upgrade unlocked at level 7
    Minions that expire leave a 3m Aura which heals 2.5% Health per second. and increases Healing by 20%. Lasts 10s.`,
    wikiLinks: [`https://remnant.wiki/Residue`],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
  },
  {
    category: 'perk',
    name: 'Outrage',
    imagePath: '/perk/outrage.png',
    type: 'utility',
    id: 't8bb9k',
    tags: ['Lifesteal', 'Movement Speed'],
    description: `
    Sacrifice grants 3% Lifesteal for each Minion Sacrificed. Lasts 10s.

    Upgrade unlocked at level 8
    Sacrifice grants 3% Lifesteal for each Minion Sacrificed, and increases Movement Speed by 15%. Lasts 10s.`,
    wikiLinks: [`https://remnant.wiki/Outrage`],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
  },
  {
    category: 'perk',
    name: 'Incite',
    imagePath: '/perk/incite.png',
    type: 'relic',
    id: 'd82mwz',
    description: `Using a Relic grants Minions 5% Max HP per second, and increases their damage dealt by 15%. Lasts 30s.

    Upgrade unlocked at level 9
    Using a Relic grants Minions 5% Max HP per second, and increases their damage dealt by 15% and Crit Chance by 15%. Lasts 30s.`,
    wikiLinks: [`https://remnant.wiki/Incite`],
    linkedItems: {
      archetype: {
        name: 'Summoner',
      },
    },
  },
  {
    category: 'perk',
    name: 'Vile',
    imagePath: '/perk/vile.png',
    type: 'prime',
    id: 'qewh6t',
    tags: ['Status Effect'],
    description: `
    Negative Status Effects applied by RITUALIST inflict Infected.
    Infected: Victim receives 5% more Status Effect damage, On death, spreads all statuses to nearby enemies within 5m. [A]
    
    Upgraded at Level 5
    Infected: Victim receives 10% more Status Effect damage. On death, spreads
    all statuses to nearby enemies within 10m.
    
    Upgraded at level 10
    Infected: Victim receives 15% more Status Effect damage. On death, spreads
    all statuses to nearby enemies within 15m.`,
    wikiLinks: [`https://remnant.wiki/Vile`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Wrath',
    imagePath: '/perk/wrath.png',
    type: 'damage',
    id: '6wc56t',
    tags: ['All Damage', 'Critical Chance', 'Status Effect'],
    description: `
    Increases all damage to enemies affected by a Negative Status Effect by 2%. Damage increases with RITUALIST Level.
    
    Upgrade Unlocked at level 5
    Increases all damage to enemies affected by a Negative Status Effect by 12%. Increases all Critical Chance against enemies affected by a Negative Status Effect by 5%.
         
    (Level 10: Increases all damage to enemies affected by a Negative Status Effect by 20%. Increases all Critical Chance against enemies affected by a Negative Status Effect by 5%.)`,
    wikiLinks: [`https://remnant.wiki/Wrath`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Terrify',
    imagePath: '/perk/terrify.png',
    type: 'team',
    id: 'h3ag53',
    tags: ['Damage Reduction', 'Ammo Reserves'],
    description: `
    Killing an entity applies TERRIFIED to all enemies within 5m of killed entity for 20s. TERRIFIED enemies deal 5% less damage.
    
    Upgrade unlocked at level 7
    Killing an entity applies TERRIFIED to all enemies within 5m of killed entity for 20s. TERRIFIED enemies are more likely to drop additional ammo on death. TERRIFIED enemies deal 5% less damage`,
    wikiLinks: [`https://remnant.wiki/Terrify`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Dark Blood',
    imagePath: '/perk/dark_blood.png',
    type: 'utility',
    id: 'qqhkw9',
    tags: ['Damage Reduction'],
    description: `
    Reduces damage received from Negative Status Effects by 25%.

    Upgrade unlocked at level 8
    Reduces damage received from Negative Status Effects by 25%. Reduces Blight Buildup by 50%.`,
    wikiLinks: [`https://remnant.wiki/Dark_Blood`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
    blightResistance: 50,
  },
  {
    category: 'perk',
    name: 'Purge',
    imagePath: '/perk/purge.png',
    type: 'relic',
    id: 'tr5r38',
    tags: ['Status Effect'],
    description: `
    On Relic Use, cleanses all Negative Status Effects.
    
    Upgrade unlocked at level 9
    On Relic Use, cleanses all Negative Status Effects. Negative Status Effects cleansed by Purge are applied to all enemies within 7.5m.`,
    wikiLinks: [`https://remnant.wiki/Purge`],
    linkedItems: {
      archetype: {
        name: 'Ritualist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Visionary',
    imagePath: '/perk/visionary.png',
    type: 'prime',
    id: 'hYsQ4M',
    dlc: 'dlc2',
    tags: ['Reduce Skill Cooldown'],
    description: `Doubles Base Skill Charges for all Archetypes. Skill activation reduces all Skill Cooldowns by 10%.
      
    For Heavy Weapons, doubles Heavy Base Ammo instead.`,
    wikiLinks: ['https://remnant.wiki/Visionary'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'perk',
    name: 'Entranced',
    imagePath: '/perk/entranced.png',
    type: 'damage',
    id: 'Y9Tj7F',
    dlc: 'dlc2',
    tags: [],
    description: `Increases Skill Damage by 30%, Elemental Damage by 15%, and Skill and Elemental Critical Chance by 5%.
      
      Damage increases with Invoker Level.`,
    wikiLinks: ['https://remnant.wiki/Entranced'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'perk',
    name: 'Communion',
    imagePath: '/perk/communion.png',
    type: 'team',
    id: 'GV9bDr',
    dlc: 'dlc2',
    tags: [],
    description:
      'Reduces Skill Cooldowns by 1% and Heals 2% Max Health once every 3s for allies while an Invoker Skill is active.',
    wikiLinks: ['https://remnant.wiki/Communion'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'perk',
    name: 'Mind and Body',
    imagePath: '/perk/mind_and_body.png',
    type: 'utility',
    id: 'T2U4dZ',
    dlc: 'dlc2',
    tags: [],
    description: `Increases Movement Speed by 5% and Damage Reduction by 5% while an Invoker Skill is active.`,
    wikiLinks: ['https://remnant.wiki/Mind_and_Body'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
  {
    category: 'perk',
    name: 'Soothsayer',
    imagePath: '/perk/soothsayer.png',
    type: 'relic',
    id: 'j7e5Bb',
    dlc: 'dlc2',
    tags: ['Relic Use Speed'],
    description: `On Relic use, extend the duration of active Invoker skills by 20% of the base duration. Cannot exceed base duration.

      Relic Use Speed increased by 25% while an Invoker Skill is active.`,
    wikiLinks: ['https://remnant.wiki/Soothsayer'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
]
