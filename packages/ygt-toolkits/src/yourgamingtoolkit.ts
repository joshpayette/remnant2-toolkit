import type { ToolkitConfig } from './types/toolkit-config';

export const CONFIG: ToolkitConfig = {
  NAV_ITEMS: {
    home: {
      label: 'Home',
      description:
        'Your Gaming Toolkit is a collection of toolkits for some of your favorite games.',
      href: '/',
      icon: null,
    },
  },
  SITE_TITLE: 'YourGamingToolkit.com',
  SITE_DESCRIPTION: 'A collection of toolkits for some of your favorite games.',
  URL_CHANGELOG: undefined,
  URL_DISCORD_INVITE: undefined,
  URL_IMAGE_BASE: 'https://dbv3oah7mgkxy.cloudfront.net/ygt',
  USER_DEFAULT_BIO: 'No user bio set.',
  USER_MAX_BIO_LENGTH: 1000,
};
