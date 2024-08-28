import { getImageUrl } from '@repo/ui';
import * as cheerio from 'cheerio';

import { perkItems } from '@/app/(data)/items/perk-items';
import { validateEnv } from '@/app/(validators)/validate-env';
import { REQUEST_DELAY } from '@/app/api/cron/wiki/scraper/constants';
import { perkDataCompare } from '@/app/api/cron/wiki/scraper/perks/compare';
import { perkDataParse } from '@/app/api/cron/wiki/scraper/perks/parse';

export async function handlePerkItems() {
  const envVars = validateEnv();

  for (const item of perkItems) {
    // Delay between each API request to not overload the wiki
    await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY));

    // get the item slug from the url
    // ex: https://remnant.wiki/Nebula -> Nebula
    const pageSlug = item.wikiLinks?.[0]?.split('wiki/').pop();
    if (!pageSlug) {
      console.error(`Failed to get page slug for ${item.name}`);
      continue;
    }

    const apiUrl =
      `https://remnant.wiki/api.php?` +
      new URLSearchParams({
        action: 'parse',
        page: pageSlug,
        format: 'json',
        prop: 'text',
      });

    try {
      const req = await fetch(apiUrl);
      if (!req.ok) {
        throw new Error('Failed to fetch wiki page');
      }

      console.info(`Fetching ${item.name} data...`);

      const json = await req.json();
      const text = json.parse.text['*'];
      const newData = perkDataParse(cheerio.load(text));
      const dataComparison = perkDataCompare(newData, item);

      if (dataComparison.dataDiffers) {
        const diffEmbedFields = [];
        if (!dataComparison.descriptionMatches) {
          diffEmbedFields.push({
            name: 'New Description',
            value: `${newData.description}`,
          });
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
        };

        if (envVars.NODE_ENV === 'production') {
          const res = await fetch(`${envVars.WEBHOOK_WIKI_SCRAPER_FEED}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          });

          if (!res.ok) {
            console.error('Error in sending build webhook to Discord!');
          }
        } else {
          console.info(params.embeds[0]?.fields);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
