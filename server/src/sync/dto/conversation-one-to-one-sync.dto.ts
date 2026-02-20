import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { conversationOneToOneSchema } from 'src/chat/dto/one-to-one/conversation-one-to-one/conversation-one-to-one.dto';
import { objectIdSchema } from 'src/common/schemas/object-id.schema';

export const conversationOneToOneSyncSchema = conversationOneToOneSchema
  .omit({ participants: true })
  .extend({ userId: z.uuid() });

export const conversationOneToOneSyncChangeSchema = z.object({
  created: conversationOneToOneSyncSchema.array(),
  updated: conversationOneToOneSyncSchema.array(),
  deleted: z.array(objectIdSchema),
});

export class ConversationOneToOneSyncDto extends createZodDto(
  conversationOneToOneSyncSchema,
) {}

export class ConversationOneToOneSyncChangeDto extends createZodDto(
  conversationOneToOneSyncChangeSchema,
) {}
