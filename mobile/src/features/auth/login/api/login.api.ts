import { env } from '@/env';

import { typedFetch } from '@/lib/fetch';

import type { LoginParam } from '../schemas/login-param.schema';
import { loginResponseSchema } from '../schemas/login-response.schema';

export const loginApi = async (data: LoginParam) => {
  return await typedFetch({
    url: `${env.EXPO_PUBLIC_BACKEND_URL}/auth/login`,
    method: 'POST',
    body: data,
    schema: loginResponseSchema,
  });
};
