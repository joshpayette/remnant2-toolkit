export const COMBOS = [
  {
    name: 'Athletic',
    fragments: ['c0hy5s', 'kp0rff'], // Movement Speed, Evade Speed
  },
  {
    name: 'Cleric',
    fragments: ['y52c32', 'omefk5'], // Healing Efficacy, Use Speed
  },
  {
    name: 'Flash',
    fragments: ['51y6ih', 'omefk5'], // Cast Speed, Use Speed
  },
  {
    name: 'Grip',
    fragments: ['oiiiu2', 'h9e463'], // Weapon Spread, Swap Speed
  },
  {
    name: 'Gunfighter',
    fragments: ['w8ruyt', '5wuf2j'], // Fire Rate, Reload Speed
  },
  {
    name: 'Hulk',
    fragments: ['6qz6t1', '4gbcn0'], // Health (Percent), Stamina (Percent)
  },
  {
    name: 'Longevity',
    fragments: ['c2t1p6', '7c8uka'], // Mod Duration, Skill Duration
  },
  {
    name: 'Mage',
    fragments: ['zkr2us', 'pk57hf'], // Mod Damage, Mod Generation
  },
  {
    name: 'Meta',
    fragments: ['oszz4u', '0qxyqo'], // Weakspot Damage, Critical Damage
  },
  {
    name: 'Munitions',
    fragments: ['dp184t', '3aqiq5'], // Ranged Crit Chance, Ammo Reserves
  },
  {
    name: 'Protected',
    fragments: ['alp59n', 'h6sk9p'], // Shield Efficacy, Armor (Flat)
  },
  {
    name: 'Pugilist',
    fragments: ['t8jgpe', 'qqmdc0'], // Melee Speed, Stamina (flat)
  },
  {
    name: 'Revitalize',
    fragments: ['bzxa98', '2bqp66'], // Health Regen, Skill Cooldown
  },
  {
    name: 'Rogue',
    fragments: ['m16fn9', 'kp0rff'], // Melee Critical Chance, Evade Speed
  },
  {
    name: 'Sniper',
    fragments: ['wlnbc1', 'i5kymp'], // Ranged Damage, Ideal Range
  },
  {
    name: 'Tank',
    fragments: ['1pddio', 'h6sk9p'], // Damage Reduction, Armor (Percent)
  },
  {
    name: 'Threshold',
    fragments: ['6qz6t1', 'aci99s'], // Health (Percent), Grey Health Conversion Rate
  },
  {
    name: 'Warrior',
    fragments: ['yu7d57', 't8jgpe'], // Melee Damage, Melee Speed
  },
  {
    name: 'Wizard',
    fragments: ['iyp5r3', 'o5sd30'], // Mod Crit, Skill Crit
  },
] as const;

export type Combo = (typeof COMBOS)[number];
