import { z } from 'zod';

export const startNewChatParamSchema = z.object({
  receiverId: z.uuid(),
  text: z.string().max(1000),
});

export type StartNewChatParam = z.infer<typeof startNewChatParamSchema>;
