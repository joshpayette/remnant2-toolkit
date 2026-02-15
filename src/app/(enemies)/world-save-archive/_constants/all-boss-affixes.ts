export const ALL_BOSS_AFFIXES = [
  // Limited to aberrations
  // {
  //   name: 'Bursting',
  //   description: `Releases bouncing projectiles that burst into a pool of FAERIE FIRE.`,
  // },
  // Limited to aberrations
  // {
  //   name: 'Cloner',
  //   description: `Creates an unarmed copy of the Traveler, which will attempt to fight them with their fists.`,
  // },
  // Limited to aberrations
  // {
  //   name: 'Cubes',
  //   description: `Creates four damaging cubes at the Aberration's location. The cubes spiral outward and grow in size.`,
  // },
  // Limit to aberrations
  // {
  //   name: 'Detonate',
  //   description: `Can prime an explosion that affects a large area.`,
  // },
  // Limited to aberrations
  // {
  //   name: 'Displacer',
  //   description: `Teleports the Traveler to a nearby location, often melee range.`,
  // },
  {
    name: 'Drain',
    description: `Has lifesteal.`,
  },
  {
    name: 'Elemental Resist',
    description: `Increased elemental resistances.`,
  },
  {
    name: 'Empathy',
    description: `Recovers some amount of health over a short time whenever the Traveler uses a Relic. `,
  },
  // Limited to aberrations
  // {
  //   name: 'Empower',
  //   description: `Gains a damage buff whenever the Traveler uses a Skill.`,
  // },
  // Limited to aberrations
  // {
  //   name: 'Enchanter',
  //   description: `Summons several explosions in the area, which leave clouds of ROOT ROT.`,
  // },
  {
    name: 'Hearty',
    description: `Increased max health by 15%.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Hexer',
  //   description: `Gains the ability to release homing projectile bursts of a random Elemental Damage type. Passively releases single projectiles everytime they are damaged. Releases a final burst of random projectiles on death.`,
  // },
  // Limited to aberrations
  // {
  //   name: 'Minions',
  //   description: `Summons two or three standard Enemies as reinforcements. Replenishes them once they are dead.`,
  // },
  // Limited to aberrations
  // {
  //   name: 'Rat Swarm',
  //   description: `Summons several hostile Losomn Rats which scatter around the area and bit at foes. The rats can be killed.`,
  // },
  {
    name: 'Regenerator',
    description: `Passively recovers health over time.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Root Grab',
  //   description: `Creates numerous Root Snares in the area. Stepping into one forces the Traveler into a quick time event until they free themselves or are hit by an enemy.`,
  // },
  // Limited to aberrations
  // {
  //   name: 'Shocking',
  //   description: `Summons lightning strikes around the area, inflicting OVERLOADED.`,
  // },
  {
    name: 'Skullcracker',
    description: `Attacks stagger the Traveler more easily.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Slow Puddles',
  //   description: `Summons two or three destructible growths in the area, which periodically release SUPPRESSION fluid.`,
  // },
  {
    name: 'Spiteful',
    description: `Gains a 0% - 25% damage increase as it loses health.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Teleporter',
  //   description: `Periodically becomes surrounded by a distortion effect. If damaged during this time, it will teleport to a random nearby location.`,
  // },
  {
    name: 'Thick Skin',
    description: `Reduced critical chance by 10% and critical damage by 15% against this target.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Toxic',
  //   description: `Spews a stream of acid, which inflicts CORRODED.`,
  // },
  {
    name: 'Trapper',
    description: `Creates a damaging field of corruption beneath the Traveler whenever they dodge. Neutral backstep and slide evades are unaffected.`,
  },
  {
    name: 'Unstoppable',
    description: `Cannot be staggered.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Vanguard',
  //   description: `Summons shortlived duplicates of Fae Knights, which will perform either a melee strike or their projectile throw.`,
  // },
  {
    name: 'Vicious',
    description: `Increased damage by 15%.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Vortex',
  //   description: `Passively pulls foes in its line of sight towards itself. Can activate the ability to greatly increase the pull for a short time.`,
  // },
  // Limited to aberrations
  // {
  //   name: 'Waller',
  //   description: `Periodically creates destructible barriers in random formations around the area.`,
  // },
] as const satisfies { name: string; description: string }[];

export const BOSS_AFFIX_NAMES = ALL_BOSS_AFFIXES.map(({ name }) => name);
