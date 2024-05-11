/**
 * User IDs who are exempt from the moderation queue.
 */
const PERMITTED_BUILDERS = [
  'clql3zq8k0000a6m41vtnvldq', // me
  'clrle2v5s0000ydtr0a15wt61', // alexij
  'cltbq05oa00008jqqyvditdih', // amalie
  'clrrp6s430005kvmg8p8nbjs2', // spoon
  'clrseiilb0000mabhs38eu7mo', // conraven
  'clt8y6yhv0000jdzqau8e8dj6', // hiccup
  'clrr3vtp90005sus5jt35tvro', // solar
  'clr5hr7bu000091ttvgj8l5hz', // mr. nacho
  'clugdu1t30000o61r2vxac32d', // cash vowaii
  'clqvha5xy0007tfs2miqtj50q', // dots_Я_us
  'clru44rg60000jwnmkoufy3yz', // mick1135
]

export function isPermittedBuilder(userId: string): boolean {
  return PERMITTED_BUILDERS.includes(userId)
}
