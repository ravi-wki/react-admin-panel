import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password is required and must contain at least 6 character(s)',
  }),
});

export type LoginFormInputType = z.infer<typeof loginSchema>;
