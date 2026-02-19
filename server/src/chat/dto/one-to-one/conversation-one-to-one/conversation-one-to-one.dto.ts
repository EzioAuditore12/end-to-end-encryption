import { z } from 'zod';

import { objectIdSchema } from 'src/common/schemas/object-id.schema';
import { createZodDto } from 'nestjs-zod';

export const conversationOneToOneSchema = z.object({
  id: objectIdSchema,
  participants: z.array(z.uuid()).length(2),
  createdAt: z.any(),
  updatedAt: z.any(),
});

export const convertConversationOneToOneSchemaFromMongoose =
  conversationOneToOneSchema
    .omit({ id: true })
    .extend({ _id: objectIdSchema })
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
