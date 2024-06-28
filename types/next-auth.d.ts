import { UserType } from '@prisma/client';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserType;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      stripeCustomerId?: string;
      isActive: boolean;
    };
  }

  interface User extends DefaultUser {
    role: UserType;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    stripeCustomerId?: string;
    isActive: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserType;
  }
}
