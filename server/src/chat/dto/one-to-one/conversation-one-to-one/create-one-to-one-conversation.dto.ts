import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createConversationOneToOneSchema = z.object({
  participant1: z.uuid(),
  participant2: z.uuid(),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export class CreateConversationOneToOneDto extends createZodDto(
  createConversationOneToOneSchema,
) {
  createdAt?: Date;
  updatedAt?: Date;
}
