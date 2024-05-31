import { UserType } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserType;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role: UserType;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserType;
  }
}
