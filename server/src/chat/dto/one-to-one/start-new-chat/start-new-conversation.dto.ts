import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const startNewConversationSchema = z.object({
  receiverId: z.uuid(),
  text: z.string().max(1000),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export class StartNewConversationDto extends createZodDto(
  startNewConversationSchema,
) {
  createdAt?: Date;
  updatedAt?: Date;
}
