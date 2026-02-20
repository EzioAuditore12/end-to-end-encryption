import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { userSyncSchema } from '../user-sync.dto';
import { conversationOneToOneSyncChangeSchema } from '../conversation-one-to-one-sync.dto';
import { chatsOneToOneSyncChangeSchema } from '../chats-one-to-one-sync.dto';

export const pullChangesResponseSchema = z.object({
  timestamp: z.number(),
  changes: z.object({
    user: userSyncSchema,
    conversationOneToOne: conversationOneToOneSyncChangeSchema,
    chatsOneToOne: chatsOneToOneSyncChangeSchema,
  }),
});

export class PullChangesResponseDto extends createZodDto(
  pullChangesResponseSchema,
) {}
