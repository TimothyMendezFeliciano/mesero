import NextAuth, { NextAuthOptions } from 'next-auth';
import type { AppProviders } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../server/prisma';
import * as process from 'process';
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
      const exmapeleuser = {
        id: '105680055446691089020',
        name: 'Timothy Mendez',
        email: 'timothym.apps@gmail.com',
        image:
          'https://lh3.googleusercontent.com/a/ACg8ocKmhrkUoSaEA5cPsm2PIqwh69wPNjJ8dKF8-rTe5h0x3Q=s96-c',
      };
      const exmapeleaccount = {
        provider: 'google',
        type: 'oauth',
        providerAccountId: '105680055446691089020',
        access_token:
          'ya29.a0Ad52N38dLTYYWEYCDMLFN2JZglkWFqF_mlSdEyOg4wWN-Pt4ErMf5MUAdKFFNDu4hqXevPzlojvQmh3lQ2YKsVhicfcxrzFR9KSGABgD0w86HLnk7k7VA2x4WG76WOldhnu7tFLoZ5Y1AymzlJmW-e8orrRaTVnXLZT8aCgYKARYSARESFQHGX2Mib07numtWXhEPTz9PxfqzuA0171',
        expires_at: 1710804203,
        refresh_token:
          '1//05O7iI9GKko9bCgYIARAAGAUSNwF-L9IrlmHO8hOif2Fq6BbLHKCyQvxB62rB1xpFN9QtxRtlZUtN39KaPUyKipZIaSIfj6stGrQ',
        scope:
          'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
        token_type: 'Bearer',
        id_token: `eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5YmNmODAyOGUwNjUzN2Q0ZDNhZTRkODRmNWM1YmFiY2YyYzBmMGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNzQ0NDMxOTM5MjYtYjltZmh2ZGg4cHF1MzkxY2UxZ2QyZmFuNTc2dT
        drZDcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNzQ0NDMxOTM5MjYtYjltZmh2ZGg4cHF1MzkxY2UxZ2QyZmFuNTc2dTdrZDcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDU2ODAwNTU0NDY2OTEwODkwMjAiLCJlbWFpbCI6InRpbW90aHltLmFwcHNAZ21haWwuY2
        9tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJzNE84b3JnR0FVSFB2Ri1TNzFhN0VBIiwibmFtZSI6IlRpbW90aHkgTWVuZGV6IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0ttaHJrVW9TYUVBNWNQc20yUElxd2g2OXdQTmpKOGRLRjgtcl
        RlNWgweDNRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlRpbW90aHkiLCJmYW1pbHlfbmFtZSI6Ik1lbmRleiIsImlhdCI6MTcxMDgwMDYwNCwiZXhwIjoxNzEwODA0MjA0fQ.VWKXOMmR-TqeX7mgcIjb2LncshOUYQQGKJsu-RjM_BNhtVYJz9vgAfSUW4HpN8cs6fBHOdz9MuBcaBNxZ_sB6UZ7OAgIO1kUX74pfCq
        P-zrpzbtm7nfk2hQD-axRSgsJVSTYKpebixKNmzokcaPveXI83Dpq8mXxrGjK25kpQvmYn_NQFcvSl52nBoekmlO9TbPbx_4-AFKaqfD8bvsmNnlOqSmmDpTfPBfuwPWqM7V3wlxHb5fUvnH-Fy6qztKH_p_8jU7DlaLHoe3QnM9wktx64LzMlvNqXgxIkZ1i6TD8cxUoGuHncx27HCPfr04KwRR91hOETzjnfxnE4E9Vmg`,
      };
      const exmapeleprofile = {
        iss: 'https://accounts.google.com',
        azp: '374443193926-b9mfhvdh8pqu391ce1gd2fan576u7kd7.apps.googleusercontent.com',
        aud: '374443193926-b9mfhvdh8pqu391ce1gd2fan576u7kd7.apps.googleusercontent.com',
        sub: '105680055446691089020',
        email: 'timothym.apps@gmail.com',
        email_verified: true,
        at_hash: 's4O8orgGAUHPvF-S71a7EA',
        name: 'Timothy Mendez',
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocKmhrkUoSaEA5cPsm2PIqwh69wPNjJ8dKF8-rTe5h0x3Q=s96-c',
        given_name: 'Timothy',
        family_name: 'Mendez',
        iat: 1710800604,
        exp: 1710804204,
      };
      const exmapeleemail = undefined;
      const exmapelecredentials = undefined;
      // Todo: Save user to DB on SignIn
      console.log('Should I create you?', {
        user,
        account,
        profile,
        email,
        credentials,
      });

      return !!user;
    },
    session: async ({ session, user, newSession, token, trigger }) => {
      console.log('Seshhh', {
        session,
        user,
        newSession,
        token,
        trigger,
      });

      return session;
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
