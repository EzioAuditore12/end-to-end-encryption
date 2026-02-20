import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const conversationOneToOneSchema = z.object({
  id: z.any().transform((val) => String(val)), // Change this
  participants: z.array(z.uuid()).length(2),
  createdAt: z.any(),
  updatedAt: z.any(),
});

export const convertConversationOneToOneSchemaFromMongoose =
  conversationOneToOneSchema
    .omit({ id: true })
    .extend({ _id: z.any().transform((val) => String(val)) }) // Change this
    .transform(({ _id, ...rest }) => ({
      id: _id,
      ...rest,
    }));

export class ConversationOneToOneDto extends createZodDto(
  conversationOneToOneSchema,
) {
  createdAt: Date;
  updatedAt: Date;
}
