import { typedFetch } from "@/lib/fetch";

import { env } from "@/env";

import type { RefreshParam } from "../schemas/refresh-param.schema";
import { refreshResponseSchema } from "../schemas/refresh-response.schema";

export const refreshTokensApi = async (data: RefreshParam) => {
  return await typedFetch({
    url: `${env.EXPO_PUBLIC_BACKEND_URL}/auth/refresh`,
    method: "POST",
    body: data,
    schema: refreshResponseSchema,
  });
};
