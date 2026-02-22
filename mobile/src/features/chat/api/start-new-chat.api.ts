import { authenticatedTypedFetch } from '@/lib/auth.api';

import type { StartNewChatParam } from '../schemas/start-new-chat/start-new-chat-param.schema';
import { startNewChatResponseSchema } from '../schemas/start-new-chat/start-new-chat-response.schema';

export const startNewChatApi = async (data: StartNewChatParam) => {
  return await authenticatedTypedFetch({
    url: 'chat',
    method: 'POST',
    body: data,
    schema: startNewChatResponseSchema,
  });
};
