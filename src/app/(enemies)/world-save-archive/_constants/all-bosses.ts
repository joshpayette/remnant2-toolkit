import {
  bossEnemies,
  worldBossEnemies,
} from '@/app/(enemies)/_constants/remnant-enemies';

// Consolidate the remnantEnemies data with the world save slug data
const bossData = [...bossEnemies, ...worldBossEnemies];
const bossNames = [
  { name: 'Abomination' },
  { name: 'Alepsis Taura (0 active crystals)' },
  { name: 'Alepsis Taura (1 active crystal)' },
  { name: 'Alepsis Taura (2 active crystals)' },
  { name: 'Amalgam Duo' },
  { name: 'Annihilation' },
  { name: 'Bloat King' },
  { name: 'Bruin, Blade of the King' },
  { name: 'Cancer' },
  { name: 'Cinderclad Forge' },
  { name: 'Corrupted Ravager' },
  { name: 'Corruptor' },
  { name: 'Faelin' },
  { name: 'Faerin' },
  { name: 'Gwendil: The Unburnt' },
  { name: `Kaeula's Shadow` },
  { name: 'Labyrinth Sentinel' },
  { name: 'Legion' },
  { name: 'Lydusa' },
  { name: 'Magister Dullain' },
  { name: 'Mother Mind' },
  { name: `N'Erudian Reaper` },
  { name: 'Primogenitor' },
  { name: `Sha'Hala: Guardian of N'Erud` },
  { name: `Sha'Hala: Guardian of N'Erud (Phase 2)` },
  {
    name: `Sha'Hala: Spectral Guardian of N'Erud`,
  },
  { name: 'Shrewd' },
  { name: `Tal'Ratha` },
  { name: `Tal'Ratha (Metaphysical)` },
  { name: 'The Astropath' },
  { name: `The Custodian's Eye` },
  { name: 'The Huntress' },
  { name: 'The Nightweaver' },
  { name: 'The One True King' },
  { name: 'The Red Prince' },
  { name: 'The Stonewarden' },
  { name: 'The Sunken Witch' },
  { name: 'Venom' },
] as const satisfies Array<{
  name:
    | (typeof bossData)[number]['name']
    | `Sha'Hala: Guardian of N'Erud (Phase 2)`
    | `Alepsis Taura (0 active crystals)`
    | `Alepsis Taura (1 active crystal)`
    | `Alepsis Taura (2 active crystals)`;
}>;

/**
 * Combination of the remnantEnemies boss data and the
 * world-save-archive info
 */
export const ALL_BOSSES = bossNames.map((boss) => {
  const data = bossData.find(({ name }) => name === boss.name);
  if (data) return { ...boss, imagePath: data.imagePath };

  // If no data found, it must be one of the additional bosses
  if (boss.name === `Sha'Hala: Guardian of N'Erud (Phase 2)`) {
    return { ...boss, imagePath: '/enemies/worldboss/sha_hala_normal.jpg' };
  }
  if (boss.name === 'Alepsis Taura (0 active crystals)') {
    return { ...boss, imagePath: '/enemies/worldboss/alepsis-taura.jpg' };
  }
  if (boss.name === 'Alepsis Taura (1 active crystal)') {
    return { ...boss, imagePath: '/enemies/worldboss/alepsis-taura.jpg' };
  }
  if (boss.name === 'Alepsis Taura (2 active crystals)') {
    return { ...boss, imagePath: '/enemies/worldboss/alepsis-taura.jpg' };
  }

  throw new Error(`No data found for boss: ${boss.name}`);
});
