import { type } from 'arktype';

import { createChangesSchema } from '../create-changes.schema';

import { userSchema } from '@/db/tables/user.table';
import { conversationOneToOneSchema } from '@/db/tables/conversation-one-to-one.table';
import { chatOneToOneSchema } from '@/db/tables/chat-one-to-one.table';

const userChangeSchema = createChangesSchema(userSchema);

const conversationOneToOneChangeSchema = createChangesSchema(conversationOneToOneSchema);

const chatOneToOneChangeSchema = createChangesSchema(chatOneToOneSchema);

export const pullChangesResponseSchema = type({
  timestamp: 'number',
  changes: {
    user: userChangeSchema,
    conversationOneToOne: conversationOneToOneChangeSchema,
    chatsOneToOne: chatOneToOneChangeSchema,
  },
});

export type PullChangesResponse = typeof pullChangesResponseSchema.infer;
