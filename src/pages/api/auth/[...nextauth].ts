import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import type { AppProviders } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import * as process from 'process';
import { prisma } from '../../../server/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Stripe from 'stripe';
import { getUserByEmail } from '../../../controllers/User.Controller';
import { AdapterUser } from 'next-auth/adapters';

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
    signIn: async ({ user }: { user: User | AdapterUser }) => {
      return !!user;
    },
    session: async ({ session, user }) => {
      let sesh: Session = session;

      if (session.user?.email) {
        const realUser = await getUserByEmail(session.user.email, prisma);

        if (realUser) {
          sesh = {
            ...session,
            user: realUser,
          };
        }
      }

      if (sesh?.user && 'stripeCustomerId' in user && user?.stripeCustomerId) {
        if (
          'stripeCustomerId' in user &&
          'isActive' in user &&
          'stripeCustomerId' in sesh?.user &&
          'isActive' in sesh.user
        ) {
          sesh.user.stripeCustomerId = user.stripeCustomerId;
          sesh.user.isActive = user.isActive;
        }
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
    signOut: '/',
    signIn: '/dashboard',
    newUser: '/dashboard/admin',
  },
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10',
      });

      await stripe.customers
        .create({
          email: user.email!,
          name: user.name!,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
};
export default NextAuth(nextAuthOptions);
