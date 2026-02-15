import { type DefaultSession, type Profile as DefaultProfile } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      displayName: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface Profile {
    image_url: string & DefaultProfile;
  }
}
