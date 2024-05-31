import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import type { AppProviders } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import * as process from 'process';
import { prisma } from '../../../server/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

const providers: AppProviders = [];

// const basicCredentials = CredentialsProvider({
//   name: 'credentials',
//   credentials: {
//     email: {
//       label: 'Email',
//       type: 'email',
//       placeholder: 'user@email.com',
//     },
//     password: { label: 'Password', type: 'password' },
//   },
//   authorize: async (
//     credentials,
//   ): Promise<null | {
//     role: 'ADMIN' | 'EMPLOYEE' | 'OWNER' | 'GUEST';
//     id: string;
//     email: string;
//     username: string;
//   }> => {
//     const creds = await loginSchema.parseAsync(credentials);
//     const user = await prisma.user.findFirst({
//       where: { email: creds.email },
//     });
//
//     if (!user) return null;
//
//     const isValidPassword = await verify(user.password, creds.password);
//
//     if (!isValidPassword) return null;
//
//     return {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       role: user.role,
//     };
//   },
// });

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

providers.push(googleCredentials);

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

        console.log('RealUser', realUser);

        sesh = {
          ...session,
          user: realUser,
        };
      }

      console.log('Succesful Sesh', {
        session,
        user,
        newSession,
        token,
        sesh,
      });
      return sesh;
    },
  },
  // callbacks: {
  //   jwt: async ({ token, user }: { token: JWT; user: User }) => {
  //     const newUser: any = user;
  //     if (user) {
  //       token.id = newUser.id;
  //       token.email = newUser.email;
  //       token.role = newUser.role;
  //     }
  //
  //     return token;
  //   },
  //   session: async ({ session, token }: { session: Session; token: JWT }) => {
  //     const newSesh: any = session;
  //     if (newSesh?.user) {
  //       newSesh.user.role = token.role;
  //     }
  //     return newSesh;
  //   },
  // },
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
