export interface ToolkitConfig {
  site: {
    title: string;
    description: string;
    urls: {
      changelog: string | undefined;
      discordInvite: string | undefined;
    };
  };
  user: {
    defaultBio: string;
    maxBioLength: 1000;
  };
}

export const BASE_CONFIG: ToolkitConfig = {
  site: {
    title: 'YourGamingToolkit.com',
    description: 'A collection of toolkits for some of your favorite games.',
    urls: {
      changelog: undefined,
      discordInvite: undefined,
    },
  },
  user: {
    defaultBio: 'No user bio set.',
    maxBioLength: 1000,
  },
};
