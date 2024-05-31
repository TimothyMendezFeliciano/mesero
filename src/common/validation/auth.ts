import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
  username: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;

export const userSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required',
      invalid_type_error: 'id must be a valid uuid',
    })
    .uuid('Must be a valid uuid'),
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Must be a valid email'),
  image: z
    .string({
      required_error: 'Image url is required',
      invalid_type_error: 'image url must be a string',
    })
    .url('Must be a valid url'),
});
export const accountSchema = z.object({
  provider: z.string(),
  type: z.string(),
  providerAccountId: z.string(),
  access_token: z.string(),
  expires_at: z.number().gte(Date.now(), 'This token is expired.'),
  refresh_token: z.string(),
  scope: z.string().url(),
  token_type: z.string(),
  id_token: z.string(),
});
export const profileSchema = z.object({
  iss: z.string().url(),
  azp: z.string(),
  aud: z.string(),
  sub: z.string(),
  email: z.string().email(),
  email_verified: z.boolean(),
  at_hash: z.string(),
  name: z.string(),
  picture: z.string().url(),
  given_name: z.string(),
  family_name: z.string(),
  iat: z.number().gte(Date.now(), 'This token is expired'),
  exp: z.number().gte(Date.now(), 'This token is expired'),
});

export type IUser = z.infer<typeof userSchema>;
export type IAccount = z.infer<typeof accountSchema>;
export type IProfile = z.infer<typeof profileSchema>;

export const signInSchema = z.object({
  userSchema,
  accountSchema,
  profileSchema,
});

export type ISignInSchema = z.infer<typeof signInSchema>;
