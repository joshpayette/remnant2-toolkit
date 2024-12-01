import type { ToolkitConfig } from './types/toolkit-config';

export const CONFIG: ToolkitConfig = {
  NAV_ITEMS: {
    home: {
      label: 'Home',
      description:
        'Remnant 2 is a collection of toolkits for some of your favorite games.',
      href: '/',
      icon: null,
    },
  },
  SITE_TITLE: 'Remnant2Toolkit.com',
  SITE_DESCRIPTION:
    'Remnant 2 item tracking, build sharing, item database, and more!',
  URL_CHANGELOG: undefined,
  URL_DISCORD_INVITE: undefined,
  URL_IMAGE_BASE: `https://dbv3oah7mgkxy.cloudfront.net/remnant2toolkit`,
  USER_DEFAULT_BIO: 'No user bio set.',
  USER_MAX_BIO_LENGTH: 1000,
};
