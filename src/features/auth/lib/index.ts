import { PrismaAdapter } from '@auth/prisma-adapter'
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import { redirect } from 'next/navigation'
import { getServerSession as auth, NextAuthOptions } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import DiscordProvider from 'next-auth/providers/discord'
import RedditProvider from 'next-auth/providers/reddit'

import { prisma } from '@/features/db'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, profile }) {
      const isBanned = await prisma.bannedUsers.findFirst({
        where: { userId: user.id },
      })
      if (isBanned) return false

      if (profile?.image_url) {
        // * Deliberately not awaiting because we don't want to delay sign in for
        // * the background image update
        prisma.user
          .update({
            where: { id: user.id },
            data: { image: profile.image_url },
          })
          .catch((e) => {
            console.error(`${e.message} - ${user.id}`)
            return true
          })
      }

      return true
    },

    async session({ session, user }) {
      if (session.user) {
        const isBanned = await prisma.bannedUsers.findFirst({
          where: { userId: user.id },
        })
        if (isBanned) {
          redirect('/api/auth/signout')
        }

        session.user.id = user.id
        session.user.displayName = (
          user as AdapterUser & { displayName: string }
        ).displayName

        if (!session.user.displayName) {
          await prisma.user.update({
            where: { id: user.id },
            data: { displayName: user.name || DEFAULT_DISPLAY_NAME },
          })
        }
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    // }),
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID ?? '',
      clientSecret: process.env.REDDIT_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          duration: 'permanent',
        },
      },
    }),
  ],
}

/**
 * Helper function that wraps the next-auth
 * getServerSession with the correct options
 */
export function getServerSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return auth(...args, authOptions)
}
