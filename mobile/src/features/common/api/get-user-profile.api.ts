import { authenticatedTypedFetch } from '@/lib/auth.api';

import { userSchema } from '../schemas/user.schema';

export const getUserProfileApi = async () => {
  return await authenticatedTypedFetch({
    url: 'user/profile',
    method: 'GET',
    schema: userSchema,
  });
};
