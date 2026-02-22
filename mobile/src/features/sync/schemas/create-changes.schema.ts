import { z, ZodTypeAny } from "zod";

export const createChangesSchema = <T extends ZodTypeAny>(schema: T) => {
  return z.object({
    created: z.array(schema),
    updated: z.array(schema),
    deleted: z.array(z.string()),
  });
};
