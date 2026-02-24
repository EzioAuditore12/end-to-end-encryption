import { z } from 'zod';
import { createChangesSchema } from '../create-changes.schema';

import { selectUserSchema } from '@/db/tables/user.table';
import { selectConversationOneToOneSchema } from '@/db/tables/conversation-one-to-one.table';
import { selectChatOneToOneSchema } from '@/db/tables/chat-one-to-one.table';

const userChangeSchema = createChangesSchema(selectUserSchema);

const conversationOneToOneChangeSchema = createChangesSchema(selectConversationOneToOneSchema);

const chatOneToOneChangeSchema = createChangesSchema(selectChatOneToOneSchema);

export const pullChangesResponseSchema = z.object({
  timestamp: z.number(),
  changes: z.object({
    user: userChangeSchema,
    conversationOneToOne: conversationOneToOneChangeSchema,
    chatsOneToOne: chatOneToOneChangeSchema,
  }),
});

export type PullChangesResponse = z.infer<typeof pullChangesResponseSchema>;
