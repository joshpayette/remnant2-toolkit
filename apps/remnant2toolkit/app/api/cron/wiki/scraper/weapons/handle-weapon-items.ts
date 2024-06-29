import { getImageUrl } from '@repo/ui/utils/get-image-url'
import * as cheerio from 'cheerio'

import { weaponItems } from '@/app/(data)/items/weapon-items'
import { validateEnv } from '@/app/(validators)/validate-env'
import { REQUEST_DELAY } from '@/app/api/cron/wiki/scraper/constants'
import { weaponDataCompare } from '@/app/api/cron/wiki/scraper/weapons/compare'
import { weaponDataParse } from '@/app/api/cron/wiki/scraper/weapons/parse'

export async function handleWeaponItems() {
  const envVars = validateEnv()

  for (const item of weaponItems) {
    // Delay between each API request to not overload the wiki
    await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY))

    // get the item slug from the url
    // ex: https://remnant.wiki/Nebula -> Nebula
    const pageSlug = item.wikiLinks?.[0]?.split('wiki/').pop()
    if (!pageSlug) {
      console.error(`Failed to get page slug for ${item.name}`)
      continue
    }

    const apiUrl =
      `https://remnant.wiki/api.php?` +
      new URLSearchParams({
        action: 'parse',
        page: pageSlug,
        format: 'json',
        prop: 'text',
      })

    try {
      const req = await fetch(apiUrl)
      if (!req.ok) {
        throw new Error('Failed to fetch wiki page')
      }

      console.info(`Fetching ${item.name} data...`)

      const json = await req.json()
      const text = json.parse.text['*']
      const newData = weaponDataParse(cheerio.load(text), item)
      const dataComparison = weaponDataCompare(newData, item)

      if (dataComparison.dataDiffers) {
        const diffEmbedFields = []
        if (!dataComparison.descriptionMatches) {
          diffEmbedFields.push({
            name: 'New Description',
            value: `${newData.description}`,
          })
        }
        if (!dataComparison.damageMatches) {
          diffEmbedFields.push({
            name: 'Damage',
            value: `${item.damage} -> ${newData.damage}`,
          })
        }
        if (!dataComparison.rpsMatches) {
          diffEmbedFields.push({
            name: 'RPS',
            value: `${item.rps} -> ${newData.rps}`,
          })
        }
        if (!dataComparison.magazineMatches) {
          diffEmbedFields.push({
            name: 'Magazine Size',
            value: `${item.magazine} -> ${newData.magazine}`,
          })
        }
        if (!dataComparison.accuracyMatches) {
          diffEmbedFields.push({
            name: 'Accuracy',
            value: `${item.accuracy} -> ${newData.accuracy}`,
          })
        }
        if (!dataComparison.idealMatches) {
          diffEmbedFields.push({
            name: 'Ideal Range',
            value: `${item.ideal} -> ${newData.ideal}`,
          })
        }
        if (!dataComparison.falloffMatches) {
          diffEmbedFields.push({
            name: 'Falloff Range',
            value: `${item.falloff} -> ${newData.falloff}`,
          })
        }
        if (!dataComparison.ammoMatches) {
          diffEmbedFields.push({
            name: 'Ammo',
            value: `${item.ammo} -> ${newData.ammo}`,
          })
        }
        if (!dataComparison.critMatches) {
          diffEmbedFields.push({
            name: 'Crit Chance',
            value: `${item.crit} -> ${newData.crit}`,
          })
        }
        if (!dataComparison.weakspotMatches) {
          diffEmbedFields.push({
            name: 'Weakspot Damage',
            value: `${item.weakspot} -> ${newData.weakspot}`,
          })
        }
        if (!dataComparison.staggerMatches) {
          diffEmbedFields.push({
            name: 'Stagger Power',
            value: `${item.stagger} -> ${newData.stagger}`,
          })
        }

        // Send the update notification to Discord
        const params = {
          embeds: [
            {
              title: `${item.name} Data Mismatch`,
              color: 0xff0000,
              fields: diffEmbedFields,
              thumbnail: {
                url: getImageUrl(item.imagePath),
              },
            },
          ],
        }

        if (envVars.NODE_ENV === 'production') {
          const res = await fetch(`${envVars.WEBHOOK_WIKI_SCRAPER_FEED}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          })

          if (!res.ok) {
            console.error('Error in sending build webhook to Discord!')
          }
        } else {
          console.info(params.embeds[0]?.fields)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
}
