import { DefaultSession, Profile as DefaultProfile } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string
      displayName: string
      role: string
    } & DefaultSession['user']
  }

  interface Profile {
    image_url: string & DefaultProfile
  }
}
