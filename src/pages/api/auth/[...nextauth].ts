import type { Session, User } from 'next-auth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import type { AppProviders } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema } from '../../../common/validation/auth';
import { prisma } from '../../../server/prisma';
import { verify } from 'argon2';
import * as process from 'process';
import type { JWT } from 'next-auth/jwt';

const providers: AppProviders = [];

const basicCredentials = CredentialsProvider({
  name: 'credentials',
  credentials: {
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'user@email.com',
    },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (
    credentials,
  ): Promise<null | {
    role: 'ADMIN' | 'EMPLOYEE' | 'OWNER' | 'GUEST';
    id: string;
    email: string;
    username: string;
  }> => {
    const creds = await loginSchema.parseAsync(credentials);
    const user = await prisma.user.findFirst({
      where: { email: creds.email },
    });

    if (!user) return null;

    const isValidPassword = await verify(user.password, creds.password);

    if (!isValidPassword) return null;

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  },
});

providers.push(basicCredentials);

export const nextAuthOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers,
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      const newUser: any = user;
      if (user) {
        token.id = newUser.id;
        token.email = newUser.email;
        token.role = newUser.role;
      }

      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      const newSesh: any = session;
      if (newSesh?.user) {
        newSesh.user.role = token.role;
      }
      return newSesh;
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
    newUser: '/sign-up',
  },
};
export default NextAuth(nextAuthOptions);
