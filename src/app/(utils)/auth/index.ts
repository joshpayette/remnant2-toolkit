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

import { prisma } from '@/app/(utils)/db'
import { DEFAULT_DISPLAY_NAME } from '@/app/profile/[userId]/(lib)/constants'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user }) {
      // Check if user is banned
      const isBanned = await prisma.bannedUsers
        .findFirst({
          where: { userId: user.id },
        })
        .catch((e) => {
          console.info(
            `${e.message}. No banned user found for User ID: ${user.id}`,
          )
        })
      if (isBanned) return false

      return true
    },

    async session({ session, user }) {
      // Check if user is banned
      const isBanned = await prisma.bannedUsers
        .findFirst({
          where: { userId: user.id },
        })
        .catch((e) => {
          console.error(
            `Session callback error on ban check, ${e.message} - User ID: ${user.id}`,
          )
        })
      if (isBanned) {
        console.info(`User ${user.id} is banned`)
        redirect('/api/auth/signout')
      }

      // Create user profile if it doesn't exist
      const existingProfile = await prisma.userProfile.findFirst({
        where: { userId: user.id },
      })
      if (!existingProfile) {
        await prisma.userProfile
          .create({
            data: {
              userId: user.id,
              bio: 'No bio set.',
            },
          })
          .catch((e) => {
            console.error(
              `Session callback error on profile creation: ${e.message} - User ID: ${user.id}`,
            )
          })
      }

      // Update the user's avatar
      // Ensure the user's display name is defaulted
      const displayName = (user as AdapterUser & { displayName: string })
        .displayName

      await prisma.user
        .update({
          where: { id: user.id },
          data: {
            image: user.image,
            displayName: displayName ?? user.name ?? DEFAULT_DISPLAY_NAME,
          },
        })
        .catch((e) => {
          console.error(
            `Session callback error on avatar update: ${e.message} - User ID: ${user.id}`,
          )
        })

      // Update the session user object
      if (session.user) {
        session.user.id = user.id
        session.user.role = (user as AdapterUser & { role: string }).role
        session.user.displayName = displayName
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
