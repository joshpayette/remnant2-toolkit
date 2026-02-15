import { type Enemy } from '@/app/(enemies)/_types';
import { type BossTrackerCategory } from '@/app/(enemies)/boss-tracker/_types';

export function getTrackerProgress(
  bosses: Array<Enemy & { discovered: boolean }>,
  bossCategory: BossTrackerCategory,
) {
  const discoveredCount = bosses.filter((boss) => {
    return boss.category === bossCategory.category && boss.discovered;
  }).length;

  let discoveredPercent = Math.round((discoveredCount / bosses.length) * 100);

  if (isNaN(discoveredPercent)) discoveredPercent = 0;

  const totalDiscoverableBosses = bosses.filter(
    (boss) => boss.category === bossCategory.category,
  ).length;

  return `${discoveredCount} / ${totalDiscoverableBosses} (${discoveredPercent}%)`;
}
