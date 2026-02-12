import { z } from "zod";
import { isStrongPassword } from "validator";

import { userSchema } from "@/features/common/schemas/user.schema";

export const registerParamSchema = userSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    password: z
      .string()
      .max(16)
      .refine((val) => isStrongPassword(val), {
        error: "Password not strong enough",
      }),
  });

export type RegisterParam = z.infer<typeof registerParamSchema>;
