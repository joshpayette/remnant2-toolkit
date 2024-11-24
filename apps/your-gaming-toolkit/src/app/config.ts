import {
  BASE_CONFIG,
  type ToolkitConfig,
} from '@repo/constants/toolkit-config';

export const CONFIG: ToolkitConfig = {
  ...BASE_CONFIG,
  site: {
    title: 'YourGamingToolkit.com',
    description: 'A collection of toolkits for some of your favorite games.',
    urls: {
      changelog: undefined,
      discordInvite: undefined,
    },
  },
  user: {
    ...BASE_CONFIG.user,
    defaultBio: 'No user bio set.',
  },
};
