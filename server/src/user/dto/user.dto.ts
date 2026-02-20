import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string().max(50),
  email: z.email().max(240),
  dhPublicKey: z.string().nullable(),
  password: z.string(),
  createdAt: z.any(),
  updatedAt: z.any(),
});

/**
 *
 * Date properties have a problem in serializing in openapi docs that why used
 * any in schema and then shaped into date in dto
 *
 */
export class UserDto extends createZodDto(userSchema) {
  @ApiProperty({ example: '2025-09-14T12:34:56.789Z', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-14T12:34:56.789Z', format: 'date-time' })
  updatedAt: Date;
}
