import NextAuth from 'next-auth/next'

import { authOptions } from '@/features/auth/lib'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
