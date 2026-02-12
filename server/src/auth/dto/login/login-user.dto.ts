import { createZodDto } from 'nestjs-zod';

import { userSchema } from 'src/user/dto/user.dto';

export const loginUserSchema = userSchema.pick({ email: true, password: true });

export class LoginUserDto extends createZodDto(loginUserSchema) {}
