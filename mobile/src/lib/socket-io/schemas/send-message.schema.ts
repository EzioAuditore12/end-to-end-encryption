import { z } from 'zod';

export const sendMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  receiverId: z.uuid(),
  text: z.string().max(1000),
  status: z.enum(['SENT', 'DELIVERED', 'SEEN']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SendMessage = z.infer<typeof sendMessageSchema>;
