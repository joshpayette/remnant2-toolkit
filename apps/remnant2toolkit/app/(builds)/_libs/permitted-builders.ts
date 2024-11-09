/**
 * User IDs who are exempt from the moderation queue.
 */
const PERMITTED_BUILDERS = [
  {
    userId: 'clql3zq8k0000a6m41vtnvldq',
    avatar: '/avatars/custom/tk.png',
    bypassModeration: true,
    name: 'TK',
  },
  {
    userId: 'clqn2t09a0001u80kd4nl6tg4',
    avatar: undefined,
    bypassModeration: true,
    name: 'anarchang3l',
  },
  {
    userId: 'clrle2v5s0000ydtr0a15wt61',
    avatar: undefined,
    bypassModeration: true,
    name: 'alexij',
  },
  {
    userId: 'cltbq05oa00008jqqyvditdih',
    avatar: undefined,
    bypassModeration: true,
    name: 'amalie',
  },
  {
    userId: 'clrrp6s430005kvmg8p8nbjs2',
    avatar: '/avatars/custom/spoon.jpg',
    bypassModeration: true,
    name: 'spoon',
  },
  {
    userId: 'clrseiilb0000mabhs38eu7mo',
    avatar: undefined,
    bypassModeration: true,
    name: 'conraven',
  },
  {
    userId: 'clt8y6yhv0000jdzqau8e8dj6',
    avatar: undefined,
    bypassModeration: true,
    name: 'hiccup',
  },
  {
    userId: 'clrr3vtp90005sus5jt35tvro',
    avatar: undefined,
    bypassModeration: true,
    name: 'solar',
  },
  {
    userId: 'clr5hr7bu000091ttvgj8l5hz',
    avatar: undefined,
    bypassModeration: true,
    name: 'mr. nacho',
  },
  {
    userId: 'clugdu1t30000o61r2vxac32d',
    avatar: undefined,
    bypassModeration: true,
    name: 'cash vowaii',
  },
  {
    userId: 'clqvha5xy0007tfs2miqtj50q',
    avatar: undefined,
    bypassModeration: true,
    name: 'dots_Я_us',
  },
  {
    userId: 'clru44rg60000jwnmkoufy3yz',
    avatar: undefined,
    bypassModeration: true,
    name: 'mick1135',
  },
  {
    userId: 'clrz8vpta0006potkn61amnmv',
    avatar: undefined,
    bypassModeration: true,
    name: 'bo}|{omar',
  },
  {
    userId: 'clui2l27b00051462q13xv3wd',
    avatar: undefined,
    bypassModeration: true,
    name: 'dainurian',
  },
  {
    userId: 'clzslodmu0000f2scf7ratyk2',
    avatar: undefined,
    bypassModeration: true,
    name: 'komacoma',
  },
  {
    userId: 'clw3vxl11000512m0m8h5g4ar',
    avatar: '/avatars/custom/holymacgyver.png',
    bypassModeration: false,
    name: 'HolyMacGyver',
  },
  {
    userId: 'cm1mw8c5k000010q5fkz0ku5g',
    avatar: '/avatars/custom/phemeto.png',
    bypassModeration: false,
    name: 'Phemeto',
  },
] as const satisfies {
  userId: string;
  avatar: string | undefined;
  name: string;
  bypassModeration: boolean;
}[];

/**
 * Check if a user is exempt from the moderation queue.
 */
export function isPermittedBuilder(userId: string): boolean {
  return PERMITTED_BUILDERS.some(
    (builder) => builder.userId === userId && builder.bypassModeration,
  );
}

/**
 * Get a permitted builder by user ID.
 */
export function getPermittedBuilder(userId: string) {
  return PERMITTED_BUILDERS.find((builder) => builder.userId === userId);
}
