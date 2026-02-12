import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { userSchema } from 'src/user/dto/user.dto';
import { tokensSchema } from './tokens.dto';

export const verifiedUserSchema = z.object({
  user: userSchema.omit({ password: true }),
  tokens: tokensSchema,
});

export class VerifiedUserDto extends createZodDto(verifiedUserSchema) {}
