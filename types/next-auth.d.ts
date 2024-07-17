import { UserType } from '@prisma/client';
import { DefaultUser, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: UserType;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    stripeCustomerId?: string;
    isActive: boolean;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/adapters' {
  type AdapterUser = User;
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserType;
  }
}
