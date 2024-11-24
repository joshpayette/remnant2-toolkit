import {
  BASE_CONFIG,
  type ToolkitConfig,
} from '@repo/constants/toolkit-config';

export const CONFIG: ToolkitConfig = {
  ...BASE_CONFIG,
  site: {
    ...BASE_CONFIG.site,
    title: 'Remnant2Toolkit',
    description: 'A collection of toolkits for some of your favorite games.',
    urls: {
      ...BASE_CONFIG.site.urls,
      changelog: undefined,
      discordInvite: undefined,
    },
  },
  user: {
    ...BASE_CONFIG.user,
    defaultBio: 'No user bio set.',
  },
};
