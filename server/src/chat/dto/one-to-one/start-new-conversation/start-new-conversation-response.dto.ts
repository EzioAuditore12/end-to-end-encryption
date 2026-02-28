import { z } from 'zod';
import { chatsOneToOneSchema } from '../chats-one-to-one/chats-one-to-one.dto';
import { createZodDto } from 'nestjs-zod';

const startNewConversationResponseSchema = chatsOneToOneSchema.extend({
  receiverId: z.uuid(),
});

export class StartNewConversationResponseDto extends createZodDto(
  startNewConversationResponseSchema,
) {}
