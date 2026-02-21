import { database } from "@/db";

import { USER_TABLE_NAME } from "@/db/tables/user.table";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@/db/models/user.model";

export class UserRepository {
  TABLE_NAME = USER_TABLE_NAME;

  async create(createUserDto: CreateUserDto) {
    return await database.write(async () => {
      return await database.get<User>(this.TABLE_NAME).create((user) => {
        if (createUserDto.id) user._raw.id = createUserDto.id;

        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.dhPublicKey = createUserDto.dhPublicKey;

        if (createUserDto.createdAt !== undefined)
          user.createdAt = createUserDto.createdAt;

        if (createUserDto.updatedAt !== undefined)
          createUserDto.updatedAt = createUserDto.updatedAt;
      });
    });
  }
}

export const userRepository = new UserRepository();
