import NextAuth, {
  Account,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from 'next-auth';
import type { AppProviders, CredentialInput } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import * as process from 'process';
import { prisma } from '../../../server/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Stripe from 'stripe';
import {
  createUser,
  getUserByEmail,
  userExists,
} from '../../../controllers/User.Controller';
import { AdapterUser } from 'next-auth/adapters';
import { createSession } from '../../../controllers/Session.Controller';

const providers: AppProviders = [];

const googleCredentials = GoogleProvider({
  name: 'google',
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
  clientId: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
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
  debug: true,
  callbacks: {
    signIn: async ({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: User | AdapterUser;
      account: Account;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, CredentialInput>;
    }) => {
      console.log('YahdielPollo1', [
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
      ]);
      console.log('userPollo', {
        user,
        account,
        profile,
        email,
        credentials,
      });

      const exists = await userExists(user, { prisma: prisma });
      let result = {};

      if (exists) {
        if (exists.sessions[0].expires > Date.now()) {
        } else {
          await createSession(user, account, { prisma });
        }
      } else {
        result = await createUser(user, account, { prisma });
      }
      console.log('ResultPollo - Entro el usuario?', result);
      return !!user;
    },
    async redirect({ url, baseUrl }) {
      console.log('YahdielPollo2', [
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
      ]);
      console.log('REDIRECT-POLLO', [url, baseUrl]);
      return baseUrl;
    },
    session: async ({ session, user }) => {
      console.log('YahdielPollo3', [
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
      ]);
      let sesh: Session = session;
      try {
        if (session.user?.email) {
          const realUser = await getUserByEmail(session.user.email, prisma);

          if (realUser) {
            sesh = {
              ...session,
              user: realUser,
            };
          }
        }
        if (sesh.user?.stripeCustomerId) {
          return sesh;
        }
        if (
          sesh?.user &&
          'stripeCustomerId' in user &&
          user?.stripeCustomerId
        ) {
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
      } catch (e) {
        console.log('Ichigo', typeof e);
        console.error('Ichigo 2', e);
      }
      return sesh;
    },
  },
  session: {
    strategy: 'database',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signOut: '/',
    signIn: '/dashboard',
    newUser: '/dashboard',
  },
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-04-10',
      });

      await stripe.customers
        .create({
          email: user.email,
          name: user.name,
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
