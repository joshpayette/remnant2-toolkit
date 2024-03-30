import {
  bossEnemies,
  worldBossEnemies,
} from '@/features/enemies/remnantEnemies'

export const MAX_BOSS_AFFIXES = 2

export const BOSS_AFFIXES = [
  // Limited to aberrations
  // {
  //   name: 'Bursting',
  //   description: `Releases bouncing projectiles that burst into a pool of FAERIE FIRE.`,
  // },
  {
    name: 'Cloner',
    description: `Creates an unarmed copy of the Traveler, which will attempt to fight them with their fists.`,
  },
  {
    name: 'Cubes',
    description: `Creates four damaging cubes at the Aberration's location. The cubes spiral outward and grow in size.`,
  },
  {
    name: 'Detonate',
    description: `Can prime an explosion that affects a large area.`,
  },
  {
    name: 'Displacer',
    description: `Teleports the Traveler to a nearby location, often melee range.`,
  },
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
  {
    name: 'Empower',
    description: `Gains a damage buff whenever the Traveler uses a Skill.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Enchanter',
  //   description: `Summons several explosions in the area, which leave clouds of ROOT ROT.`,
  // },
  {
    name: 'Hearty',
    description: `Increased max health.`,
  },
  {
    name: 'Hexer',
    description: `Gains the ability to release homing projectile bursts of a random elemental damage type. Passively releases single projectiles everytime they are damaged. Releases a final burst of random projectiles on death.`,
  },
  {
    name: 'Minions',
    description: `Summons two or three standard Enemies as reinforcements. Replenishes them once they are dead.`,
  },
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
  {
    name: 'Shocking',
    description: `Summons lightning strikes around the area, inflicting OVERLOADED.`,
  },
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
    description: `Gains a damage increase as it loses health.`,
  },
  {
    name: 'Teleporter',
    description: `Periodically becomes surrounded by a distortion effect. If damaged during this time, it will teleport to a random nearby location.`,
  },
  {
    name: 'Thick Skin',
    description: `Reduced critical chance and critical damage against this target.`,
  },
  {
    name: 'Toxic',
    description: `Spews a stream of acid, which inflicts CORRODED.`,
  },
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
    description: `Increased damage.`,
  },
  {
    name: 'Vortex',
    description: `Passively pulls foes in its line of sight towards itself. Can activate the ability to greatly increase the pull for a short time.`,
  },
  // Limited to aberrations
  // {
  //   name: 'Waller',
  //   description: `Periodically creates destructible barriers in random formations around the area.`,
  // },
] as const satisfies { name: string; description: string }[]

export const BOSS_AFFIX_NAMES = BOSS_AFFIXES.map(({ name }) => name)

// Consolidate the remnantEnemies data with the world save slug data
const bossData = [...bossEnemies, ...worldBossEnemies]
const bossSlugs = [
  { name: 'Abomination', slug: 'abomination' },
  { name: 'Annihilation', slug: 'annihilation' },
  { name: 'Bloat King', slug: 'bloat_king' },
  { name: 'Bruin, Blade of the King', slug: 'bruin_blade_of_the_king' },
  { name: 'Cancer', slug: 'cancer' },
  { name: 'Corrupted Ravager', slug: 'corrupted_ravager' },
  { name: 'Corruptor', slug: 'corruptor' },
  { name: 'Faelin', slug: 'faelin' },
  { name: 'Faerin', slug: 'faerin' },
  { name: 'Gwendil: The Unburnt', slug: 'gwendil_the_unburnt' },
  { name: `Kaeula's Shadow`, slug: 'kaeulas_shadow' },
  { name: 'Labyrinth Sentinel', slug: 'labyrinth_sentinel' },
  { name: 'Magister Dullain', slug: 'magister_dullain' },
  { name: 'Mother Mind', slug: 'mother_mind' },
  { name: 'Legion', slug: 'legion' },
  { name: 'Primogenitor', slug: 'primogenitor' },
  {
    name: `Sha'Hala: Spectral Guardian of N'Erud`,
    slug: `sha_hala_spectral_guardian_of_nerud`,
  },
  { name: 'Shrewd', slug: 'shrewd' },
  { name: `Tal'Ratha`, slug: `tal'ratha` },
  { name: `Tal'Ratha (Metaphysical)`, slug: `tal'ratha_(metaphysical)` },
  { name: 'The Astropath', slug: 'the_astropath' },
  { name: `The Custodian's Eye`, slug: `the_custodians_eye` },
  { name: 'The Huntress', slug: 'the_huntress' },
  { name: 'The Nightweaver', slug: 'the_nightweaver' },
  { name: 'The One True King', slug: 'the_one_true_king' },
  { name: 'The Red Prince', slug: 'the_red_prince' },
  { name: 'The Sunken Witch', slug: 'the_sunken_witch' },
  { name: 'Venom', slug: 'venom' },
] as const satisfies Array<{
  name: (typeof bossData)[number]['name']
  slug: string
}>

/**
 * Combination of the remnantEnemies boss data and the
 * world-save-archive info
 */
export const BOSSES = bossSlugs.map((boss) => {
  const data = bossData.find(({ name }) => name === boss.name)
  if (!data) {
    throw new Error(`Boss not found: ${boss.name}`)
  }
  return { ...boss, imagePath: data.imagePath }
})
