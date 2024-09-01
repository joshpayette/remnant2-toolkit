import { getImageUrl } from '@repo/ui';

export function getDownloadUrl(bossName: string, bossAffixes: string[]) {
  const url = getImageUrl(`/world-save-archive/`);

  const cleanBossName = bossName
    // replace apostrophes with empty string
    .replace(/'/g, '')
    // replace commas with empty string
    .replace(/,/g, '')
    // replace colons with empty string
    .replace(/:/g, '')
    // replace spaces with underscores
    .replace(/ /g, '_')
    // replace open parentheses with empty string
    .replace(/\(/g, '')
    // replace close parentheses with empty string
    .replace(/\)/g, '')
    .toLowerCase();

  const cleanAffixes = bossAffixes
    .join(',')
    // replace spaces with underscores
    .replace(/ /g, '_')
    .toLowerCase();

  return `${url}${cleanBossName}/${
    cleanAffixes ? `${cleanAffixes}/` : ''
  }save_0.sav`;
}
