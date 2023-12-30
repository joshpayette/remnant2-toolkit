import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import { NextAuthOptions, getServerSession as auth } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import RedditProvider from 'next-auth/providers/reddit'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/app/(lib)/db'
import { AdapterUser } from 'next-auth/adapters'
import { redirect } from 'next/navigation'

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async signIn({ user }) {
      const isBanned = await prisma.bannedUsers.findFirst({
        where: { userId: user.id },
      })
      return isBanned ? false : true
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
