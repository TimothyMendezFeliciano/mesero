import { UserType } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      role: UserType;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    username: string;
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
