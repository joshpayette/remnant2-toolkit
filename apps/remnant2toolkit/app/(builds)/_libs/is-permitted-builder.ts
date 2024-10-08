/**
 * User IDs who are exempt from the moderation queue.
 */
const PERMITTED_BUILDERS = [
  {
    userId: 'clql3zq8k0000a6m41vtnvldq',
    avatar: '/avatars/custom/spoon.jpg',
    name: 'TK',
  },
  {
    userId: 'clrle2v5s0000ydtr0a15wt61',
    avatar: undefined,
    name: 'alexij',
  },
  {
    userId: 'cltbq05oa00008jqqyvditdih',
    avatar: undefined,
    name: 'amalie',
  },
  {
    userId: 'clrrp6s430005kvmg8p8nbjs2',
    avatar: '/avatars/custom/spoon.jpg',
    name: 'spoon',
  },
  {
    userId: 'clrseiilb0000mabhs38eu7mo',
    avatar: undefined,
    name: 'conraven',
  },
  {
    userId: 'clt8y6yhv0000jdzqau8e8dj6',
    avatar: undefined,
    name: 'hiccup',
  },
  {
    userId: 'clrr3vtp90005sus5jt35tvro',
    avatar: undefined,
    name: 'solar',
  },
  {
    userId: 'clr5hr7bu000091ttvgj8l5hz',
    avatar: undefined,
    name: 'mr. nacho',
  },
  {
    userId: 'clugdu1t30000o61r2vxac32d',
    avatar: undefined,
    name: 'cash vowaii',
  },
  {
    userId: 'clqvha5xy0007tfs2miqtj50q',
    avatar: undefined,
    name: 'dots_Я_us',
  },
  {
    userId: 'clru44rg60000jwnmkoufy3yz',
    avatar: undefined,
    name: 'mick1135',
  },
  {
    userId: 'clrz8vpta0006potkn61amnmv',
    avatar: undefined,
    name: 'bo}|{omar',
  },
  {
    userId: 'clui2l27b00051462q13xv3wd',
    avatar: undefined,
    name: 'dainurian',
  },
  {
    userId: 'clzslodmu0000f2scf7ratyk2',
    avatar: undefined,
    name: 'komacoma',
  },
] as const;

export function isPermittedBuilder(userId: string): boolean {
  return PERMITTED_BUILDERS.some((builder) => builder.userId === userId);
}

export function getPermittedBuilder(userId: string) {
  return PERMITTED_BUILDERS.find((builder) => builder.userId === userId);
}
