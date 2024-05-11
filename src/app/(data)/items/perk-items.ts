import { PerkItem } from './types/PerkItem'

export const perkItems: PerkItem[] = [
  {
    category: 'perk',
    name: 'Dead to Rights',
    imagePath: '/items/perks/hunter_deadtorights.png',
    type: 'prime',
    id: 's8eytq',
    dlc: 'base',
    tags: ['Weakspot Damage'],
    description:
      'Level 1:\n' +
      'Dealing 65 Base Ranged or Melee Weakspot Damage extends the duration of active Hunter Skills by 2.5s. Can extend timer beyond its initial duration.\n' +
      '\n' +
      'Level 5:\n' +
      'Dealing 60 Base Ranged or Melee Weakspot Damage extends the duration of active Hunter Skills by 3s. Can extend timer beyond its initial duration.\n' +
      '\n' +
      'Level 10:\n' +
      'Dealing 55 Base Ranged or Melee Weakspot Damage extends the duration of active Hunter Skills by 3.5s. Can extend timer beyond its initial duration.',
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
    imagePath: '/items/perks/hunter_deadeye.png',
    type: 'damage',
    id: 'c4fx8u',
    dlc: 'base',
    tags: ['Ranged Damage', 'Weakspot Damage', 'Critical Chance'],
    description:
      'Gain 4% Ranged Damage and 1.5% Weakspot Damage.\n' +
      '\n' +
      'Increases with Hunter Level.',
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
    imagePath: '/items/perks/hunter_returntosender.png',
    type: 'team',
    id: 'oyjp3t',
    dlc: 'base',
    tags: ['Critical Hit', 'Weakspot Hit'],
    description:
      'Kills due to Weakspot and Critical Hits increase Ammo drops by 25%.',
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
    imagePath: '/items/perks/hunter_urgency.png',
    type: 'utility',
    id: '98yqyq',
    dlc: 'base',
    tags: ['Reload Speed', 'Movement Speed'],
    description: 'Firearms gain 15% Reload Speed after a Kill. Lasts 3s.',
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
    imagePath: '/items/perks/hunter_intuition.png',
    id: '8d4diq',
    dlc: 'base',
    type: 'relic',
    tags: ['Relic Use Speed'],
    description:
      'Using a Relic extends the duration of any active Hunter Skill by 5s. Effect degrades with each subsequent use.',
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
    imagePath: '/items/perks/handler_bonded.png',
    id: 'd58t4k',
    dlc: 'base',
    type: 'prime',
    description:
      'Base:\n' +
      'When Handler is downed, Companion will attempt to revive them at 50% Max Health. Can be used to revive allies with Command. Downed ally must have a Relic charge.\n' +
      '\n' +
      'Cooldown: 120s.\n' +
      '\n' +
      'Level 5:\n' +
      'When Handler is downed, Companion will attempt to revive them at 50% Max Health. Can be used to revive allies with Command. Downed ally must have a Relic charge.\n' +
      '\n' +
      'Cooldown: 105s.\n' +
      '\n' +
      'Level 10:\n' +
      'When Handler is downed, Companion will attempt to revive them at 50% Max Health. Can be used to revive allies with Command. Downed ally must have a Relic charge.\n' +
      '\n' +
      'Cooldown: 90s.',
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
    imagePath: '/items/perks/handler_packhunter.png',
    type: 'damage',
    id: '485uc9',
    dlc: 'base',
    tags: ['Ranged Damage', 'Skill Damage', 'Critical Chance'],
    description:
      'Level 1:\n' +
      'Gain 3% Ranged, Melee, and Skill Damage while Companion is active and within 40m of the Handler.\n' +
      '\n' +
      'Damage increases with Handler Level.\n' +
      '\n' +
      'Level 6:\n' +
      'Gain 18% Ranged, Melee, and Skill Damage and 5% Ranged, Melee, and Skill Critical Chance while Companion is active and within 40m of the Handler.\n' +
      '\n' +
      'Damage increases with Handler Level.\n' +
      '\n' +
      'Level 10:\n' +
      'Gain 30% Ranged, Melee, and Skill Damage and 5% Ranged, Melee, and Skill Critical Chance while Companion is active and within 40m of the Handler.\n' +
      '\n' +
      'Damage increases with Handler Level.',
    wikiLinks: [`https://remnant.wiki/Pack_Hunter`],
    externalTokens: [`Amplitude`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'perk',
    name: 'Spirit of the Wolf',
    imagePath: '/items/perks/handler_spiritofthewolf.png',
    type: 'team',
    id: 'z3sz58',
    dlc: 'base',
    tags: ['Movement Speed', 'Stamina'],
    description:
      'Level 2:\n' +
      "Increases Movement Speed by 10%. All allies within 10m of the Handler gain the Handler's Movement Speed (if faster).\n" +
      '\n' +
      'Level 7:\n' +
      "Increases Movement Speed by 10%. All allies within 10m of the Handler gain the Handler's Movement Speed (if faster). Reduces the Stamina Cost of actions for allies by 15%",
    wikiLinks: [`https://remnant.wiki/Spirit_of_the_Wolf`],
    externalTokens: [`Amplitude`],
    linkedItems: {
      archetype: {
        name: 'Handler',
      },
    },
  },
  {
    category: 'perk',
    name: 'Teamwork',
    imagePath: '/items/perks/handler_teamwork.png',
    type: 'utility',
    id: 'y36q6p',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Level 3:\n' +
      'Handler and Companion gain 15% increased Revive Speed.\n' +
      '\n' +
      'Level 8:\n' +
      'Handler and Companion gain 15% increased Revive Speed. While Handler or Companion are reviving, they receive 50% less damage.',
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
    imagePath: '/items/perks/handler_bestfriend.png',
    type: 'relic',
    id: '8vh7yq',
    dlc: 'base',
    tags: ['Damage Reduction', 'All Damage'],
    description:
      'Level 4:\n' +
      "Using a Relic fully restores the Companion's health.\n" +
      '\n' +
      'Level 9:\n' +
      "Using a Relic fully restores the Companion's health and grants them 25% Damage and 35% Damage Resistance for 15s.",
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
    imagePath: '/items/perks/medic_regenerator.png',
    type: 'prime',
    id: 'io3m7t',
    dlc: 'base',
    description:
      'Base:\n' +
      'After restoring 350 Total Health to allies, regain a spent Relic charge.\n' +
      '\n' +
      'Resting or Respawning at a Worldstone resets healing accumulation. Each additional player increases the healing requirement by 50%.\n' +
      '\n' +
      'Level 5:\n' +
      'After restoring 300 Total Health to allies, regain a spent Relic charge.\n' +
      '\n' +
      'Resting or Respawning at a Worldstone resets healing accumulation. Each additional player increases the healing requirement by 50%.\n' +
      '\n' +
      'Level 10:\n' +
      'After restoring 250 Total Health to allies, regain a spent Relic charge.\n' +
      '\n' +
      'Resting or Respawning at a Worldstone resets healing accumulation. Each additional player increases the healing requirement by 50%.',
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
    imagePath: '/items/perks/medic_invigorated.png',
    type: 'damage',
    id: 'errks7',
    dlc: 'base',
    tags: ['All Damage', 'Critical Chance'],
    description:
      'Grants a 2.5% increase to All Damage.\n\nIncreases with Medic Level.',
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
    imagePath: '/items/perks/medic_benevolence.png',
    type: 'team',
    id: 't2fc7j',
    dlc: 'base',
    description:
      'Level 2:\n' +
      'Increases Relic Efficacy by 15% and heals nearby allies for 30% of the total healing value.\n' +
      '\n' +
      'Level 7:\n' +
      'Increases Relic Efficacy by 15% and heals nearby allies for 30% of the total healing value, increasing to 60% for any ally below 35% max health.',
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
    imagePath: '/items/perks/medic_backbone.png',
    type: 'utility',
    id: 'z2xo76',
    dlc: 'base',
    tags: ['Grey Health'],
    description:
      'Increases the hits Medic can take before losing Grey Health by 1.',
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
    imagePath: '/items/perks/medic_benefactor.png',
    type: 'relic',
    id: 'bp9pr7',
    dlc: 'base',
    tags: ['Relic Use Speed', 'Stagger'],
    description:
      'Level 4:\n' +
      'Increases Relic Use Speed by 20%.\n' +
      '\n' +
      'Level 9:\n' +
      'Increases Relic Use Speed by 20%. Relic Use gains -1 Stagger.',
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
    imagePath: '/items/perks/gunslinger_loaded.png',
    type: 'prime',
    id: 'm6pvhd',
    dlc: 'base',
    tags: ['Reload Speed', 'Ammo Reserves'],
    description:
      'Base:\n' +
      'When activating any Gunslinger Skill, both weapons are instantly reloaded, and gain infinite reserve ammo on all weapons for 5s .\n' +
      '\n' +
      'Level 5:\n' +
      'When activating any Gunslinger Skill, both weapons are instantly reloaded, and gain infinite reserve ammo on all weapons for 6.5s .\n' +
      '\n' +
      'Level 10:\n' +
      'When activating any Gunslinger Skill, both weapons are instantly reloaded, and gain infinite reserve ammo on all weapons for 8s .',
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
    imagePath: '/items/perks/gunslinger_swiftshot.png',
    type: 'damage',
    id: '7mbvc3',
    dlc: 'base',
    tags: ['Fire Rate', 'Ranged Damage', 'Critical Chance'],
    description:
      'Base:\n' +
      'Gain 1.5% Fire Rate and 2.5% Ranged Damage.\n' +
      '\n' +
      'Increases with Gunslinger Level.\n' +
      '\n' +
      'Level 6:\n' +
      'Gain 9% Fire Rate, 15% Ranged Damage, and 5% Crit Chance for all firearms.\n' +
      '\n' +
      'Fire Rate and Damage increases with Gunslinger Level.\n' +
      '\n' +
      'Level 10:\n' +
      'Gain 15% Fire Rate, 25% Ranged Damage, and 5% Crit Chance for all firearms.\n' +
      '\n' +
      'Fire Rate and Damage increases with Gunslinger Level.',
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
    imagePath: '/items/perks/gunslinger_posseup.png',
    type: 'team',
    id: 'ajobx6',
    dlc: 'base',
    tags: ['Ammo Reserves'],
    description:
      'Ammo pickups award 20% additional Ammo per player with the bonus split equally among teammates.',
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
    imagePath: '/items/perks/gunslinger_quickhands.png',
    type: 'utility',
    id: '496x8y',
    dlc: 'base',
    tags: ['Reload Speed'],
    description: 'Firearms gain 10% Reload Speed.',
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
    imagePath: '/items/perks/gunslinger_sleightofhand.png',
    type: 'relic',
    id: 'fspt8u',
    dlc: 'base',
    tags: ['Reload Speed', 'Ranged Damage'],
    description: 'Using a Relic reloads equipped Firearm.',
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
    imagePath: '/items/perks/challenger_diehard.png',
    type: 'prime',
    id: 'je27uv',
    dlc: 'base',
    tags: ['Heal'],
    description:
      'Base:\n' +
      'When receiving fatal damage, the Challenger becomes invulnerable for 3s and regenerates 50% of Max Health.\n' +
      '\n' +
      'While on cooldown, the Challenger gains 1 Stack of BULWARK. Can only happen once every 10 minutes. Resets at Worldstone or on death.\n' +
      '\n' +
      'Level 5:\n' +
      'When receiving fatal damage, the Challenger becomes invulnerable for 3s and regenerates 75% of Max Health.\n' +
      '\n' +
      'While on cooldown, the Challenger gains 1 Stack of BULWARK. Can only happen once every 10 minutes. Resets at Worldstone or on death.\n' +
      '\n' +
      'Level 10:\n' +
      'When receiving fatal damage, the Challenger becomes invulnerable for 3s and regenerates 100% of Max Health.\n' +
      '\n' +
      'While on cooldown, the Challenger gains 1 Stack of BULWARK. Can only happen once every 10 minutes. Resets at Worldstone or on death.',
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
    imagePath: '/items/perks/challenger_closequarters.png',
    type: 'damage',
    id: 'f4jx9k',
    dlc: 'base',
    tags: ['All Damage', 'Critical Chance'],
    description:
      'Level 1:\n' +
      'Grants a 3.5% increase to All Damage to enemies within 10m. Damage bonus tapers off until 20m.\n' +
      '\n' +
      'Increases with Challenger Level.\n' +
      '\n' +
      'Level 6:\n' +
      'Grants a 21% increase to All Damage to enemies within 10m. Damage bonus tapers off until 20m. Critical Chance is increased by 5%.\n' +
      '\n' +
      'Damage increases with Challenger Level.\n' +
      '\n' +
      'Level 10:\n' +
      'Grants a 35% increase to All Damage to enemies within 10m. Damage bonus tapers off until 20m. Critical Chance is increased by 5%.',
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
    imagePath: '/items/perks/challenger_intimidatingpresence.png',
    type: 'team',
    id: 'c92847',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'After activating a Challenger Skill, enemies within 15m deal 10% less damage for 15s.',
    wikiLinks: [`https://remnant.wiki/Intimidating_Presence`],
    externalTokens: [`Amplitude`],
    linkedItems: {
      archetype: {
        name: 'Challenger',
      },
    },
  },
  {
    category: 'perk',
    name: 'Powerlifter',
    imagePath: '/items/perks/challenger_powerlifter.png',
    type: 'utility',
    id: '8p55rw',
    dlc: 'base',
    tags: ['Stamina', 'Encumbrance'],
    description:
      'The Stamina Cost increase for each weight bracket is reduced by 50%.',
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
    imagePath: '/items/perks/challenger_faceofdanger.png',
    type: 'relic',
    id: '7dvm5a',
    dlc: 'base',
    tags: ['Damage Reduction', 'All Damage'],
    description:
      'Level 4:\n' +
      'Using a Relic within 10m of an enemy grants 2 stacks of Bulwark for 10s.\n' +
      '\n' +
      'Level 9:\n' +
      'Using a Relic within 10m of an enemy grants 2 stacks of Bulwark and 10% Increased Damage for 10s.',
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
    imagePath: '/items/perks/alchemist_spirited.png',
    type: 'prime',
    id: 'rx6e2w',
    dlc: 'base',
    tags: ['Concoction'],
    description:
      'Base:\n' +
      'Alchemist can have 1 additional Concoction buff active.\n' +
      '\n' +
      'Level 5:\n' +
      'Alchemist can have 2 additional Concoction buffs active.\n' +
      '\n' +
      'Level 10:\n' +
      'Alchemist can have 3 additional Concoction buffs active.',
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
    imagePath: '/items/perks/alchemist_liquidcourage.png',
    type: 'damage',
    id: '5exhee',
    dlc: 'base',
    tags: ['All Damage', 'Critical Chance'],
    description:
      'Level 1:\n' +
      'Grant a 2.5% increase to All Damage.\n' +
      '\n' +
      'Damage increasees with Alchemist Level.\n' +
      '\n' +
      'Level 6:\n' +
      'Grant a 15% increase to All Damage and 5% Critical Chance.\n' +
      '\n' +
      'Damage increasees with Alchemist Level.\n' +
      '\n' +
      'Level 10:\n' +
      'Grant a 25% increase to All Damage and 5% Critical Chance.\n' +
      '\n' +
      'Damage increasees with Alchemist Level.',
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
    imagePath: '/items/perks/alchemist_panacea.png',
    type: 'team',
    id: '49i5jm',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Level 2:\n' +
      'Curative effects apply to all allies within 15m, and grant 15 additional Resistance.\n' +
      '\n' +
      'Level 7:\n' +
      'Curative effects apply to all allies within 15m, and grant 15 additional Resistance. Allies affected by Panacea gain 10 Status and Blight Resistance.',
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
    imagePath: '/items/perks/alchemist_goldtolead.png',
    type: 'utility',
    id: '3a9dd2',
    dlc: 'base',
    tags: ['Ammo Reserves'],
    description:
      'Level 3:\n' +
      'Picking up Scrap has a 15% chance to also award Ammo to the Alchemist.\n' +
      '\n' +
      'Level 8:\n' +
      'Picking up Scrap or Metals has a 15% chance to award Ammo to the Alchemist.',
    wikiLinks: [`https://remnant.wiki/Gold_To_Lead`],
    linkedItems: {
      archetype: {
        name: 'Alchemist',
      },
    },
  },
  {
    category: 'perk',
    name: 'Experimentalist',
    imagePath: '/items/perks/alchemist_experimentalist.png',
    type: 'relic',
    id: 'cxnnz9',
    dlc: 'base',
    description:
      'Level 4:\n' +
      'Using a Relic applies a random buff on the Alchemist for 30s. Cannot be overriden.\n' +
      '\n' +
      'Level 9:\n' +
      'Using a Relic applies a random buff on the Alchemist and all allies within 20m for 60s. Cannot be overriden.',
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
    imagePath: '/items/perks/archon_tempest.png',
    type: 'prime',
    id: 'dh2wih',
    dlc: 'base',
    tags: ['Mod Power'],
    description:
      'Base:\n' +
      'Automatically generate 5 Mod Power per second. Casting a Mod doubles this value for 10s.\n' +
      '\n' +
      'Level 5:\n' +
      'Automatically generate 10 Mod Power per second. Casting a Mod doubles this value for 10s.\n' +
      '\n' +
      'Level 10:\n' +
      'Automatically generate 15 Mod Power per second. Casting a Mod doubles this value for 10s.',
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
    imagePath: '/items/perks/archon_amplify.png',
    type: 'damage',
    id: 'yro37y',
    dlc: 'base',
    tags: ['Mod Damage', 'Critical Chance'],
    description:
      'Level 1:\n' +
      'Increases Mod Damage by 5%.\n' +
      '\n' +
      'Increases with Archon Level.\n' +
      '\n' +
      'Level 5:\n' +
      'Increases Mod Damage by 25% and grants 10% Mod Critical Chance.\n' +
      '\n' +
      'Increases with Archon Level.\n' +
      '\n' +
      'Level 10:\n' +
      'Increases Mod Damage by 50% and grants 10% Mod Critical Chance.\n' +
      '\n' +
      'Increases with Archon Level.',
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
    imagePath: '/items/perks/archon_powercreep.png',
    type: 'team',
    id: '7ay3kh',
    dlc: 'base',
    tags: ['Mod Power'],
    description:
      'After casting a Mod, 10% of the Mod Power spent will be regenerated by all allies over 10s.',
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
    imagePath: '/items/perks/archon_spiritwithin.png',
    type: 'utility',
    id: '5fz7xr',
    dlc: 'base',
    tags: ['Mod Power'],
    description:
      'Level 3:\n' +
      'Reduces Mod Power requirement per charge by 5%\n' +
      '\n' +
      'Level 8:\n' +
      'Reduces Mod Power requirement per charge by 10%.',
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
    imagePath: '/items/perks/archon_powerleak.png',
    type: 'relic',
    id: 'h42e2n',
    dlc: 'base',
    tags: ['Mod Power'],
    description:
      'Level 4:\n' +
      'Using a Relic grants 100 Mod Power for both equipped Mods.\n' +
      '\n' +
      'Level 9:\n' +
      'Using a Relic grants 100 Mod Power for both equipped Mods, and an additional 100 to current Mod.',
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
    imagePath: '/items/perks/engineer_hightech.png',
    type: 'prime',
    id: '98qnpc',
    dlc: 'base',
    description:
      'Base:\n' +
      'Holding the SKILL button will Overclock a Carried or Deployed Heavy Weapon. Overclocking grants Infinite Ammo, Increased Fire Rate, and a 25% Damage increase for 15s.\n' +
      '\n' +
      'Cooldown: 60s\n' +
      '\n' +
      'Level 5:\n' +
      'Holding the SKILL button will Overclock a Carried or Deployed Heavy Weapon. Overclocking grants Infinite Ammo, Increased Fire Rate, and a 25% Damage increase for 20s.\n' +
      '\n' +
      'Cooldown: 60s\n' +
      '\n' +
      'Level 10:\n' +
      'Holding the SKILL button will Overclock a Carried or Deployed Heavy Weapon. Overclocking grants Infinite Ammo, Increased Fire Rate, and a 25% Damage increase for 25s.\n' +
      '\n' +
      'Cooldown: 60s',
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
    imagePath: '/items/perks/engineer_metalworker.png',
    type: 'damage',
    id: '2hcif5',
    dlc: 'base',
    tags: ['Skill Damage', 'Critical Chance'],
    description:
      'Level 1:\n' +
      'Increases Skill Damage by 5% and Ranged Damage by 2.5%.\n' +
      '\n' +
      'Heavy Weapons gain 5% Ammo Capacity, 2.5% Max Health, and 2.5% Weakspot Damage.\n' +
      '\n' +
      'Level 6:\n' +
      'Increases Skill Damage by 25% and Ranged Damage by 12.5%, and grants 5% Skill and Ranged Critical Chance.\n' +
      '\n' +
      'Heavy Weapons gain 25% Ammo Capacity, 12.5% Max Health, and 12.5% Weakspot Damage.\n' +
      '\n' +
      'Level 10:\n' +
      'Increases Skill Damage by 50% and Ranged Damage by 25%, and grants 5% Skill and Ranged Critical Chance.\n' +
      '\n' +
      'Heavy Weapons gain 50% Ammo Capacity, 25% Max Health, and 25% Weakspot Damage.',

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
    imagePath: '/items/perks/engineer_magneticfield.png',
    type: 'team',
    id: 'w6v2o6',
    dlc: 'base',
    tags: ['Damage Reduction', 'Ammo Reserves'],
    description:
      'Level 2:\n' +
      'Heavy Weapons grant 15% Damage Reduction to all allies within 2.5m.\n' +
      '\n' +
      'Level 7:\n' +
      'Heavy Weapons grant 15% Damage Reduction and gradually restore Ammo to all allies within 2.5m.',
    externalTokens: [`Amplitude`],
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
    imagePath: '/items/perks/engineer_heavymobility.png',
    type: 'utility',
    id: 'htf7h4',
    dlc: 'base',
    tags: ['Movement Speed'],
    description:
      'Level 3:\n' +
      'Movement Speed while Carrying a Heavy Weapon is increased by 35%.\n' +
      '\n' +
      'Level 8:\n' +
      'While Carrying a Heavy Weapon, Movement Speed is increased by 35%, and both Evade Speed and Evade Distance are increased by 25%.',
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
    imagePath: '/items/perks/engineer_surplus.png',
    type: 'relic',
    id: '2k4yzk',
    dlc: 'base',
    description:
      'Level 4:\n' +
      'Using a Relic refills 15% of Heavy Weapon Ammo. Bonus is doubled when Heavy Weapon is stowed.\n' +
      '\n' +
      'Level 9:\n' +
      'Using a Relic refills 15% of Heavy Weapon ammo. Bonus is doubled when Heavy Weapon is stowed. If the Stowed Heavy Weapon is overfilled, the Engineer will drop additional Ammo based on the surplus.',
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
    imagePath: '/items/perks/explorer_lucky.png',
    type: 'prime',
    id: '82y94m',
    dlc: 'base',
    description:
      'Grants a 10% chance to spawn additional items and rarer drops when defeating stronger enemies.',
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
    imagePath: '/items/perks/explorer_scavenger.png',
    type: 'damage',
    id: 'y6x5dr',
    dlc: 'base',
    tags: ['All Damage', 'Critical Chance'],
    description:
      'Pickups increase All Damage dealt by 0.5% per stack for 20s. Additional Stacks increase Duration up to 60s. Max 5 stacks.\n' +
      '\n' +
      'Effect increase with Explorer level.',
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
    imagePath: '/items/perks/explorer_metaldetector.png',
    type: 'team',
    id: 'w838yg',
    dlc: 'base',
    description:
      'Increase Ammo, Currency, and Metal Drop Rate Chance for entire party by 10%.',
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
    imagePath: '/items/perks/explorer_prospector.png',
    type: 'utility',
    id: 'o5q3p9',
    dlc: 'base',
    description:
      'Relic Fragments discovered by the Explorer drop at a higher quality.',
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
    imagePath: '/items/perks/explorer_selfdiscovery.png',
    type: 'relic',
    id: 'rvb63g',
    dlc: 'base',
    description:
      'Using a Relic instantly fills Scavenger Stacks and prevents Stack Decay for 15s.',
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
    imagePath: '/items/perks/invader_shadow.png',
    type: 'prime',
    id: 'yg77rq',
    dlc: 'base',
    tags: ['All Damage'],
    description:
      'Base:\n' +
      'Casting an Invader Skill leaves a Decoy for 3s which draws enemy fire. Deal 5% additional damage to enemies not targeting Invader.\n' +
      '\n' +
      'Level 5:\n' +
      'Casting an Invader Skill leaves a Decoy for 3s which draws enemy fire. Deal 10% additional damage to enemies not targeting Invader.\n' +
      '\n' +
      'Level 10:\n' +
      'Casting an Invader Skill leaves a Decoy for 3s which draws enemy fire. Deal 15% additional damage to enemies not targeting Invader.',
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
    imagePath: '/items/perks/invader_shark.png',
    type: 'damage',
    id: '59swqq',
    dlc: 'base',
    tags: [
      'Ranged Damage',
      'Melee Damage',
      'Melee Critical Chance',
      'Critical Chance',
    ],
    description:
      'Base:\n' +
      'Sprinting for 1s or Evading adds 1 Stack of Momentum which increases Ranged and Melee damage by 0.7% for 10s. Max 5 Stacks.\n' +
      '\n' +
      'Damage increases with Invader level.\n' +
      '\n' +
      'Level 5:\n' +
      'Sprinting for 1s or Evading adds 1 Stack of Momentum which increases Ranged and Melee damage by 3.5% and Ranged and Melee Critical Chance by 1% for 10s. Max 5 Stacks.\n' +
      '\n' +
      'Damage increases with Invader level.\n' +
      '\n' +
      'Level 10:\n' +
      'Sprinting for 1s or Evading adds 1 Stack of Momentum which increases Ranged and Melee damage by 7% and Ranged and Melee Critical Chance by 1% for 10s. Max 5 Stacks.\n' +
      '\n' +
      'Damage increases with Invader level.',
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
    imagePath: '/items/perks/invader_loophole.png',
    type: 'team',
    id: 'd5qedi',
    dlc: 'base',
    tags: ['Lifesteal'],
    description:
      "All ally Ranged and Melee damage against enemies distracted by the Invader's Decoy grants 5% base damage as Lifesteal.",
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
    imagePath: '/items/perks/invader_circumvent.png',
    type: 'utility',
    id: 'i9tjgk',
    dlc: 'base',
    tags: [
      'Perfect Neutral Evade',
      'Neutral Dodge',
      'Perfect Dodge',
      'Stamina',
    ],
    description: 'Reduce Cost of Evade and Combat Slide by 10%.',
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
    imagePath: '/items/perks/invader_override.png',
    type: 'relic',
    id: 'decoy8',
    dlc: 'base',
    description:
      'Using a Relic reduces Threat Generation by 25% for 10s. While Override is active, the next Evade leaves an Empowered Decoy which lasts 4s.',
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
    imagePath: '/items/perks/summoner_ruthless.png',
    type: 'prime',
    id: 'tmc2tk',
    dlc: 'base',
    tags: ['Summon'],
    description:
      'Base:\n' +
      'When the Summoner deals damage to their Minion, it causes them to ENRAGE. Minions gain 10% Attack Speed along with 30% increased Damage and Movement Speed. Lasts 20s.\n' +
      '\n' +
      'Level 5:\n' +
      'When the Summoner deals damage to their Minion, it causes them to ENRAGE. Minions gain 15% Attack Speed along with 40% increased Damage and Movement Speed. Lasts 30s.\n' +
      '\n' +
      'Level 10:\n' +
      'When the Summoner deals damage to their Minion, it causes them to ENRAGE. Minions gain 20% Attack Speed along with 50% increased Damage and Movement Speed. Lasts 40s.',
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
    imagePath: '/items/perks/summoner_dominator.png',
    type: 'damage',
    id: 'tu8pcp',
    dlc: 'base',
    tags: [
      'Mod Damage',
      'Skill Damage',
      'Ranged Damage',
      'Melee Damage',
      'Critical Chance',
      'Melee Critical Chance',
    ],
    description:
      'Level 1:\n' +
      'Grants a 3.5% increase to Mod, Skill, and Explosive Damage.\n' +
      '\n' +
      'Damage increases with Summoner Level.\n' +
      '\n' +
      'Level 5:\n' +
      'Grants a 17.5% increase to Mod, Skill, and Explosive Damage, and 5% Mod, Skill, and Explosive Critical Chance.\n' +
      '\n' +
      'Damage increases with Summoner Level.\n' +
      '\n' +
      'Level 10:\n' +
      'Grants a 35% increase to Mod, Skill, and Explosive Damage, and 5% Mod, Skill, and Explosive Critical Chance.\n' +
      '\n' +
      'Damage increases with Summoner Level.',
    externalTokens: [`Explosive Damage`],
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
    imagePath: '/items/perks/summoner_residue.png',
    type: 'team',
    id: 'fzywc2',
    dlc: 'base',
    tags: ['Heal', 'Healing Effectiveness'],
    description:
      'Level 2:\n' +
      'Minions that expire leave a 3m Aura which heals 2.5% Health per second. Lasts 10s.\n' +
      '\n' +
      'Level 7:\n' +
      'Minions that expire leave a 3m Aura which heals 2.5% Health per second and increases Healing by 20%. Lasts 10s.',
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
    imagePath: '/items/perks/summoner_outrage.png',
    type: 'utility',
    id: 't8bb9k',
    dlc: 'base',
    tags: ['Lifesteal', 'Movement Speed'],
    description:
      'Level 3:\n' +
      'Sacrifice grants 3% Lifesteal for each Minion Sacrificed. Lasts 10s.\n' +
      '\n' +
      'Level 8:\n' +
      'Sacrifice grants 3% Lifesteal for each Minion Sacrificed, and increases Movement Speed by 15%. Lasts 10s.',
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
    imagePath: '/items/perks/summoner_incite.png',
    type: 'relic',
    id: 'd82mwz',
    dlc: 'base',
    description:
      'Level 4:\n' +
      'Using a Relic grants Minions 5% Max HP per second, and increases their damage dealt by 15%. Lasts 30s.\n' +
      '\n' +
      'Level 9:\n' +
      'Using a Relic grants Minions 5% Max HP per second, and increases their damage dealt by 15% and Crit Chance by 15%. Lasts 30s.',
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
    imagePath: '/items/perks/ritualist_vile.png',
    type: 'prime',
    id: 'qewh6t',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      'Base:\n' +
      'Negative Status Effects applied by Ritualist inflict Infected.\n' +
      '\n' +
      'Infected: Victim receives 5% more Status Effect damage. On death, spreads all statuses to nearby enemies within 5m.\n' +
      '\n' +
      'Level 5:\n' +
      'Negative Status Effects applied by Ritualist inflict Infected.\n' +
      '\n' +
      'Infected: Victim receives 10% more Status Effect damage. On death, spreads all statuses to nearby enemies within 10m.\n' +
      '\n' +
      'Level 10:\n' +
      'Negative Status Effects applied by Ritualist inflict Infected.\n' +
      '\n' +
      'Infected: Victim receives 15% more Status Effect damage. On death, spreads all statuses to nearby enemies within 15m.',
    externalTokens: [`Amplitude`],
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
    imagePath: '/items/perks/ritualist_wrath.png',
    type: 'damage',
    id: '6wc56t',
    dlc: 'base',
    tags: ['All Damage', 'Critical Chance', 'Status Effect'],
    description:
      'Level 1:\n' +
      'Increases all damage to enemies affected by a Negative Status Effect by 2%.\n' +
      '\n' +
      'Damage increases with Ritualist Level\n' +
      '\n' +
      'Level 6:\n' +
      'Increases all damage to enemies affected by a Negative Status Effect by 12%. Increases all Critical Chance against enemies affected by a Negative Status Effect by 5%.\n' +
      '\n' +
      'Damage increases with Ritualist Level\n' +
      '\n' +
      'Level 10:\n' +
      'Increases all damage to enemies affected by a Negative Status Effect by 25%. Increases all Critical Chance against enemies affected by a Negative Status Effect by 5%.\n' +
      '\n' +
      'Damage increases with Ritualist Level',
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
    imagePath: '/items/perks/ritualist_terrify.png',
    type: 'team',
    id: 'h3ag53',
    dlc: 'base',
    tags: ['Damage Reduction', 'Ammo Reserves'],
    description:
      'Level 2:\n' +
      'Killing an entity applies TERRIFIED to all enemies within 5m of killed entity for 20s.\n' +
      '\n' +
      'TERRIFIED enemies deal 5% less damage.\n' +
      '\n' +
      'Level 7:\n' +
      'Killing an entity applies TERRIFIED to all enemies within 5m of killed entity for 20s. TERRIFIED enemies are more likely to drop additional Ammo on death.\n' +
      '\n' +
      'TERRIFIED enemies deal 5% less damage.',
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
    imagePath: '/items/perks/ritualist_darkblood.png',
    type: 'utility',
    id: 'qqhkw9',
    dlc: 'base',
    tags: ['Damage Reduction'],
    description:
      'Level 3:\n' +
      'Reduces damage received from Negative Status Effects by 25%.\n' +
      '\n' +
      'Level 8:\n' +
      'Reduces damage received from Negative Status Effects by 25%. Reduces Blight Buildup by 50%.',
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
    imagePath: '/items/perks/ritualist_purge.png',
    type: 'relic',
    id: 'tr5r38',
    dlc: 'base',
    tags: ['Status Effect'],
    description:
      'Level 4:\n' +
      'On Relic Use, cleanses all Negative Status Effects.\n' +
      '\n' +
      'Level 9:\n' +
      'On Relic Use, cleanses all Negative Status Effects. Negative Status Effects cleansed by Purge are applied to all enemies within 7.5m.',
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
    imagePath: '/items/perks/invoker_visionary.png',
    type: 'prime',
    id: 'hYsQ4M',
    dlc: 'dlc2',
    tags: ['Reduce Skill Cooldown'],
    description:
      'Doubles Base Skill Charges for all Archetypes. Skill activation reduces all Skill Cooldowns by 10%.\n' +
      '\n' +
      'For Heavy Weapons, doubles Heavy Base Ammo instead.',
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
    imagePath: '/items/perks/invoker_entranced.png',
    type: 'damage',
    id: 'Y9Tj7F',
    dlc: 'dlc2',
    tags: [],
    description:
      'Increases Skill Damage by 30%, Elemental Damage by 15%, and Skill and Elemental Critical Chance by 5%.\n' +
      '\n' +
      'Damage increases with Invoker Level.',
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
    imagePath: '/items/perks/invoker_communion.png',
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
    imagePath: '/items/perks/invoker_mindandbody.png',
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
    imagePath: '/items/perks/invoker_soothsayer.png',
    type: 'relic',
    id: 'j7e5Bb',
    dlc: 'dlc2',
    tags: ['Relic Use Speed'],
    description:
      'On Relic use, extend the duration of active Invoker skills by 20% of the base duration. Cannot exceed base duration.\n' +
      '\n' +
      'Relic Use Speed increased by 25% while an Invoker Skill is active.',
    wikiLinks: ['https://remnant.wiki/Soothsayer'],
    linkedItems: {
      archetype: {
        name: 'Invoker',
      },
    },
  },
]
