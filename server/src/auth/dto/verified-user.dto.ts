import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { tokensSchema } from './tokens.dto';
import { publicUserSchema } from 'src/user/dto/public-user.dto';

export const verifiedUserSchema = z.object({
  user: publicUserSchema,
  tokens: tokensSchema,
});

export class VerifiedUserDto extends createZodDto(verifiedUserSchema) {}
