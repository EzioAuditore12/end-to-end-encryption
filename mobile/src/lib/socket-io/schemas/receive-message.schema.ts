import { z } from 'zod';

export const receiveMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.uuid(),
  text: z.string().max(1000),
  status: z.enum(['SENT', 'DELIVERED', 'SEEN']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ReceiveMessage = z.infer<typeof receiveMessageSchema>;
