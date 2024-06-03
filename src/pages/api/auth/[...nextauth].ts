import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import type { AppProviders } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import * as process from 'process';
import { prisma } from '../../../server/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

const providers: AppProviders = [];

const googleCredentials = GoogleProvider({
  name: 'google',
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
    },
  },
});

const facebookCredentials = Facebook({
  name: 'facebook',
  clientId: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  authorization: {
    params: {
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
    },
  },
});

providers.push(googleCredentials);
providers.push(facebookCredentials);

export const nextAuthOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      return !!user;
    },
    session: async ({ session, user, newSession, token, trigger }) => {
      let sesh: Session = session;

      if (session.user?.email) {
        const realUser = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });

        sesh = {
          ...session,
          user: realUser,
        };
      }

      return sesh;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    newUser: '/dashboard/admin',
  },
};
export default NextAuth(nextAuthOptions);
