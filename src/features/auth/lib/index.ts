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
  // Include user.id on session
  callbacks: {
    async signIn({ user }) {
      const isBanned = await prisma.bannedUsers.findFirst({
        where: { userId: user.id },
      })
      if (isBanned) return false

      // TODO need to get avatar based on id, not @me
      // // Get the user's latest avatar
      // const response = await fetch(`https://discord.com/api/v10/users/@me`, {
      //   method: 'get',
      //   headers: {
      //     Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      //   },
      // })
      // const data = await response.json()
      // if (data.avatar && data.id) {
      //   try {
      //     const userAvatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
      //     user.image = userAvatar
      //     await prisma.user.update({
      //       where: { id: user.id },
      //       data: { image: userAvatar },
      //     })
      //   } catch (e) {
      //     console.error('Error updating user avatar', e)
      //     return true
      //   }
      // }
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
