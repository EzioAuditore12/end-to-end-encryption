import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { objectIdSchema } from 'src/common/schemas/object-id.schema';

export const chatsOneToOneSchema = z.object({
  id: objectIdSchema,
  conversationId: objectIdSchema,
  senderId: z.uuid(),
  text: z.string().max(1000),
  status: z.enum(['SENT', 'DELIVERED', 'SEEN']),
  createdAt: z.any(),
  updatedAt: z.any(),
});

export const convertChatsOneToOneFromMongoose = chatsOneToOneSchema
  .omit({ id: true })
  .extend({ _id: objectIdSchema })
  .transform(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
  }));

export class ChatsOneToOneDto extends createZodDto(chatsOneToOneSchema) {}
