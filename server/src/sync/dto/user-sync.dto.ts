import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { publicUserSchema } from 'src/user/dto/public-user.dto';

export const userSyncSchema = z.object({
  created: z.array(publicUserSchema),
  updated: z.array(publicUserSchema),
  deleted: z.array(z.uuid()),
});

export class UserSyncDto extends createZodDto(userSyncSchema) {}
