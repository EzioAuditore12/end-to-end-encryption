import { z } from 'zod';

export const startNewChatResponseSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.uuid(),
  receiverId: z.uuid(),
  text: z.string().max(1000),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type StartNewChatResponse = z.infer<typeof startNewChatResponseSchema>;
