import { typedFetch } from "@/lib/fetch";

import { env } from "@/env";

import type { UserSearchParam } from "../schemas/user-search/user-search-param.schema";
import { userSearchResponseSchema } from "../schemas/user-search/user-search-response.schema";

export const getUsersApi = async (data: UserSearchParam) => {
  return typedFetch({
    url: `${env.EXPO_PUBLIC_BACKEND_URL}/user`,
    method: "GET",
    params: data,
    schema: userSearchResponseSchema,
  });
};
