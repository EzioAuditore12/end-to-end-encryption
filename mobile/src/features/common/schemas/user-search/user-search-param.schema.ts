import { type } from "arktype";

export const userSearchParamSchema = type({
  search: "0 < string <= 50",
  page: "number.integer >= 0",
  limit: "number.integer >= 0",
});

export type UserSearchParam = typeof userSearchParamSchema.infer;
