import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { chatsOneToOneSchema } from 'src/chat/dto/one-to-one/chats-one-to-one/chats-one-to-one.dto';
import { objectIdSchema } from 'src/common/schemas/object-id.schema';

export const chatsOneToOneSyncSchema = chatsOneToOneSchema
  .omit({ senderId: true })
  .extend({ mode: z.enum(['SENT', 'RECEIVED']) });

export const chatsOneToOneSyncChangeSchema = z.object({
  created: chatsOneToOneSyncSchema.array(),
  updated: chatsOneToOneSyncSchema.array(),
  deleted: z.array(objectIdSchema),
});

export class ChatsOneToOneSyncDto extends createZodDto(
  chatsOneToOneSyncSchema,
) {
  createdAt: Date;
  updatedAt: Date;
}

export class ChatsOneToOneSyncChangeDto extends createZodDto(
  chatsOneToOneSyncChangeSchema,
) {}
