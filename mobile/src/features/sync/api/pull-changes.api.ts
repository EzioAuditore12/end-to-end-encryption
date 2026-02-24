import { authenticatedTypedFetch } from '@/lib/auth.api';
import { PullChangesParam } from '../schemas/pull-changes/pull-changes-param.schema';
import { pullChangesResponseSchema } from '../schemas/pull-changes/pull-changes-response.schema';

export const pullChangesApi = async (data: PullChangesParam) => {
  return await authenticatedTypedFetch({
    url: 'sync/pull',
    method: 'POST',
    body: data,
    schema: pullChangesResponseSchema,
  });
};
