import { z } from 'zod';

export const loginParamSchema = z.object({
  email: z.email().max(240),
  password: z.string().nonempty(),
});

export type LoginParam = z.infer<typeof loginParamSchema>;
