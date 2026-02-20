import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';
import { paginate, PaginateQuery, PaginationType } from 'nestjs-paginate';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { SerachUserResponseDto } from './dto/search-user/search-user-response.dto';
import { PublicUserDto, publicUserSchema } from './dto/public-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  public async findOne(id: string): Promise<UserDto | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async findAll(query: PaginateQuery): Promise<SerachUserResponseDto> {
    return await paginate(query, this.userRepository, {
      sortableColumns: ['createdAt', 'name', 'email'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['name', 'email'],
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      defaultLimit: 10,
      maxLimit: 30,
      paginationType: PaginationType.LIMIT_AND_OFFSET,
    });
  }

  public async findByEmail(email: string): Promise<UserDto | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async findMultipleById(ids: string[]): Promise<PublicUserDto[]> {
    const users = await this.userRepository.find({
      where: { id: In(ids) },
    });

    return publicUserSchema.strip().array().parse(users);
  }

  public async findUsersWithChanges(
    ids: string[],
    since: Date,
  ): Promise<PublicUserDto[]> {
    if (ids.length === 0) return [];

    const users = await this.userRepository.find({
      where: {
        id: In(ids),
        updatedAt: MoreThan(since),
      },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });

    return users;
  }
}
