import * as cheerio from 'cheerio'

import { armorItems } from '@/app/(data)/items/armor-items'
import { getImageUrl } from '@/app/(utils)/get-image-url'
import { validateEnv } from '@/app/(validators)/validate-env'
import { armorDataCompare } from '@/app/api/cron/wiki/scraper/armor/compare'
import { armorDataParse } from '@/app/api/cron/wiki/scraper/armor/parse'
import { REQUEST_DELAY } from '@/app/api/cron/wiki/scraper/constants'

export async function handleArmorItems() {
  const envVars = validateEnv()

  for (const item of armorItems) {
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
      const newData = armorDataParse(cheerio.load(text))
      const dataComparison = armorDataCompare(newData, item)

      if (dataComparison.dataDiffers) {
        const diffEmbedFields = []
        if (!dataComparison.armorMatches) {
          diffEmbedFields.push({
            name: 'Armor',
            value: `${item.armor} -> ${newData.armor}`,
          })
        }
        if (!dataComparison.weightMatches) {
          diffEmbedFields.push({
            name: 'Weight',
            value: `${item.weight} -> ${newData.weight}`,
          })
        }
        if (!dataComparison.bleedResistanceMatches) {
          diffEmbedFields.push({
            name: 'Bleed Resistance',
            value: `${item.bleedResistance} -> ${newData.bleedResistance}`,
          })
        }
        if (!dataComparison.fireResistanceMatches) {
          diffEmbedFields.push({
            name: 'Fire Resistance',
            value: `${item.fireResistance} -> ${newData.fireResistance}`,
          })
        }
        if (!dataComparison.shockResistanceMatches) {
          diffEmbedFields.push({
            name: 'Shock Resistance',
            value: `${item.shockResistance} -> ${newData.shockResistance}`,
          })
        }
        if (!dataComparison.toxinResistanceMatches) {
          diffEmbedFields.push({
            name: 'Toxin Resistance',
            value: `${item.toxinResistance} -> ${newData.toxinResistance}`,
          })
        }
        if (!dataComparison.blightResistanceMatches) {
          diffEmbedFields.push({
            name: 'Blight Resistance',
            value: `${item.blightResistance} -> ${newData.blightResistance}`,
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
