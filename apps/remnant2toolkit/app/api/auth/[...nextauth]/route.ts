import NextAuth from 'next-auth/next';

import { authOptions } from '@/app/(user)/_auth/configs/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
