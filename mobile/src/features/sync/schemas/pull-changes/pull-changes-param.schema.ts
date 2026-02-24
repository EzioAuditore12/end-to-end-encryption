import { z } from 'zod';

export const pullChangesParamSchema = z.object({
  lastSyncedAt: z.number(),
  tableNames: z.enum(['CONVERSATION-ONE-TO-ONE', 'CHAT-ONE-TO-ONE', 'USER']).array(),
});

export type PullChangesParam = z.infer<typeof pullChangesParamSchema>;
