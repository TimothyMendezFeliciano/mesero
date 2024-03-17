import NextAuth, { NextAuthOptions } from 'next-auth';
import type { AppProviders } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { loginSchema } from '../../../common/validation/auth';
import { prisma } from '../../../server/prisma';
import { verify } from 'argon2';

let useMockProvider = process.env.NODE_ENV === 'test';
const { GITHUB_CLIENT_ID, GITHUB_SECRET, NODE_ENV, APP_ENV, NEXTAUTH_SECRET } =
  process.env;
if (
  (NODE_ENV !== 'production' || APP_ENV === 'test') &&
  (!GITHUB_CLIENT_ID || !GITHUB_SECRET)
) {
  console.log('⚠️ Using mocked GitHub auth correct credentials were not added');
  useMockProvider = true;
}
const providers: AppProviders = [];
if (useMockProvider) {
  providers.push(
    CredentialsProvider({
      id: 'github',
      name: 'Mocked GitHub',
      async authorize(credentials) {
        if (credentials) {
          const name = credentials.name;
          return {
            id: name,
            name: name,
            email: name,
          };
        }
        return null;
      },
      credentials: {
        name: { type: 'test' },
      },
    }),
  );
} else {
  if (!GITHUB_CLIENT_ID || !GITHUB_SECRET) {
    throw new Error('GITHUB_CLIENT_ID and GITHUB_SECRET must be set');
  }
  providers.push(
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as any;
      },
    }),
  );
}

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
  authorize: async (credentials, request) => {
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
      role: user.isAdmin,
    };
  },
});

providers.push(basicCredentials);

export const nextAuthOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      session.user.role = token.role;
      return session;
    },
  },
  // session: async ({ session, token }) => {
  //   if (token) {
  //     session.id = token.id;
  //   }
  //
  //   return session;
  // },
  // jwt: {
  //   secret: NEXTAUTH_SECRET,
  //   maxAge: 15 * 24 * 30 * 60,
  // },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    newUser: '/sign-up',
  },
};
export default NextAuth(nextAuthOptions);
