import { env } from '@/env';
import { typedFetch } from '@/lib/fetch';

import { userSchema } from '../schemas/user.schema';

export const getUserApi = async (id: string) => {
  return typedFetch({
    url: `${env.EXPO_PUBLIC_BACKEND_URL}/user/${id}`,
    method: 'GET',
    schema: userSchema.and({ dhPublicKey: 'string | null' }),
  });
};
