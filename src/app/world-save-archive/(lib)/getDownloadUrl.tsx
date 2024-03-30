export function getDownloadUrl(bossName: string, bossAffixes: string[]) {
  let url = `https://${process.env.NEXT_PUBLIC_IMAGE_URL}/world-save-archive/`

  const cleanBossName = bossName
    // replace apostrophes with empty string
    .replace(/'/g, '')
    // replace commas with empty string
    .replace(/,/g, '')
    // replace colons with empty string
    .replace(/:/g, '')
    // replace spaces with underscores
    .replace(/ /g, '_')
    .toLowerCase()

  const cleanAffixes = bossAffixes
    .join(',')
    // replace spaces with underscores
    .replace(/ /g, '_')
    .toLowerCase()

  return `${url}${cleanBossName}/${
    cleanAffixes ? `${cleanAffixes}/` : ''
  }save_0.sav`
}
