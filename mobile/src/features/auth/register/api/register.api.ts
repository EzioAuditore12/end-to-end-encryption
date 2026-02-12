import { env } from "@/env";

import { typedFetch } from "@/lib/fetch";

import type { RegisterParam } from "../schemas/register-param.schema";
import { registerResponseSchema } from "../schemas/register-response.schema";

export const registerApi = async (data: RegisterParam) => {
  return await typedFetch({
    url: `${env.EXPO_PUBLIC_BACKEND_URL}/auth/register`,
    method: "POST",
    body: data,
    schema: registerResponseSchema,
  });
};
