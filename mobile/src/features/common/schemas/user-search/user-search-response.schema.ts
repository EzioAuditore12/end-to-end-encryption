import { z } from "zod";

import { userSchema } from "../user.schema";

const meta = z.object({
  itemsPerPage: z.number(),
  totalItems: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  sortBy: z.any(),
});

export const userSearchResponseSchema = z.object({
  data: userSchema.array(),
  meta,
  links: z.any(),
});

export type UserSearchResponse = z.infer<typeof userSearchResponseSchema>;
