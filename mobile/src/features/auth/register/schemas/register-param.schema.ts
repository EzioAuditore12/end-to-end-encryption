import { z } from "zod";

import { userSchema } from "@/features/common/schemas/user.schema";

export const registerParamSchema = userSchema
  .pick({ name: true, email: true })
  .extend({
    password: z.string().max(16),
    dhPublicKey: z.string(),
  });

export type RegisterParam = z.infer<typeof registerParamSchema>;
