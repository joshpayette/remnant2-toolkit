import { type NextRequest } from 'next/server';

import { validateEnv } from '@/app/_libs/validate-env';
import { allItems } from '@/app/(items)/_constants/all-items';

/** The amount of time between each request to not flood the wiki */
const REQUEST_DELAY = 100;

export async function GET(request: NextRequest) {
  const envVars = validateEnv();

  const authHeader = request.headers.get('authorization');
  if (
    authHeader !== `Bearer ${envVars.CRON_SECRET}` &&
    envVars.NODE_ENV === 'production'
  ) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const noWikiLinks: string[] = [];
  const badWikiLinks: string[] = [];
  const goodWikiLinks: string[] = [];

  for (const item of allItems) {
    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY));

    console.info(`Validating Wiki Link for ${item.name}`);

    if (!item.wikiLinks) {
      noWikiLinks.push(item.name);
      continue;
    }
    const wikiLink = item.wikiLinks[0];
    if (!wikiLink) {
      noWikiLinks.push(item.name);
      continue;
    }
    try {
      const response = await fetch(wikiLink);
      if (!response.ok) {
        badWikiLinks.push(item.name);
        continue;
      }
      goodWikiLinks.push(item.name);
    } catch (e) {
      console.error(`Error validating Wiki Link for ${item.name}`, e);
      badWikiLinks.push(item.name);
    }
  }

  if (noWikiLinks.length > 0) {
    console.error(`No Wiki Links Found.`, noWikiLinks);
    // Send the error to Discord
    const params = {
      embeds: [
        {
          title: `Items Without Wiki Links`,
          color: 0xff0000,
          fields: [
            {
              name: 'Items',
              value: noWikiLinks.join(','),
            },
          ],
        },
      ],
    };

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
  }
  if (badWikiLinks.length > 0) {
    console.error(`Bad Wiki Links Found.`, badWikiLinks);
    // Send the error to Discord
    const params = {
      embeds: [
        {
          title: `Items With Bad Wiki Links`,
          color: 0xff0000,
          fields: [
            {
              name: 'Items',
              value: badWikiLinks.join(','),
            },
          ],
        },
      ],
    };

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
  }

  if (noWikiLinks.length === 0 && badWikiLinks.length === 0) {
    console.info('All Wiki Links are valid.');
    // Send the success to Discord
    const params = {
      embeds: [
        {
          title: `All Wiki Links are valid.`,
          color: 0x00ff00,
          fields: [
            {
              name: 'All wiki links validated!',
              value: ':)',
            },
          ],
        },
      ],
    };

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
  }

  console.info('Wiki Link Validation Complete.');
  return Response.json({ success: false });
}
