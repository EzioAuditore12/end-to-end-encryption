import { z } from "zod";

export const userSearchParamSchema = z.object({
  search: z.string().max(50),
  page: z.number().positive(),
  limit: z.number().positive(),
});

export type UserSearchParam = z.infer<typeof userSearchParamSchema>;
