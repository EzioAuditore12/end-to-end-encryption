import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { ConfigType } from '@nestjs/config';
import { hash, verify } from '@node-rs/argon2';

import refreshJwtConfig from './configs/refresh-jwt.config';

import { BlackListedRefreshToken } from './entities/blacklist-refresh-token.entity';

import { AuthJwtPayload } from './types/auth-jwt.payload';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register/register-user.dto';

import { LoginUserDto } from './dto/login/login-user.dto';

import { VerifiedUserDto } from './dto/verified-user.dto';
import { publicUserSchema } from 'src/user/dto/public-user.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerice: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    @InjectRepository(BlackListedRefreshToken)
    private readonly blackListedRefreshTokenRepo: Repository<BlackListedRefreshToken>,
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<VerifiedUserDto> {
    const { email, password } = registerUserDto;

    const existingUser = await this.userSerice.findByEmail(email);

    if (existingUser)
      throw new ConflictException('User with this username already exists');

    const hashedPassword = await hash(password);

    const createdUser = await this.userSerice.create({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password: hashedPassword,
    });

    const publicUserDetails = publicUserSchema.strip().parse(createdUser);

    const tokens = this.generateTokens(publicUserDetails.id);

    return {
      user: publicUserDetails,
      tokens,
    };
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<VerifiedUserDto> {
    const { email, password } = loginUserDto;

    const user = await this.userSerice.findByEmail(email);

    if (!user)
      throw new NotFoundException('User with this username does not exist');

    const verifyPassword = await verify(user.password, password);

    if (!verifyPassword)
      throw new UnauthorizedException(
        'Either entered username or passsword is wrong',
      );

    const publicUserDetails = publicUserSchema.strip().parse(user);

    const tokens = this.generateTokens(publicUserDetails.id);

    return {
      user: publicUserDetails,
      tokens,
    };
  }

  generateTokens(userId: string): TokensDto {
    const payload: Pick<AuthJwtPayload, 'sub'> = { sub: userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    return { accessToken, refreshToken };
  }

  async insertBlackListedRefreshToken({
    refreshToken,
    issuedAt,
    expiredAt,
  }: {
    refreshToken: string;
    issuedAt: Date;
    expiredAt: Date;
  }) {
    const insertBlaclistedToken = this.blackListedRefreshTokenRepo.create({
      refreshToken,
      createdAt: issuedAt,
      expiredAt,
    });
    await this.blackListedRefreshTokenRepo.save(insertBlaclistedToken);
  }

  async findBlackListedRefreshToken(refreshToken: string) {
    return this.blackListedRefreshTokenRepo.findOne({
      where: { refreshToken },
    });
  }

  async refreshTokens({
    userId,
    expiredAt,
    createdAt,
    refreshToken,
  }: {
    userId: string;
    refreshToken: string;
    createdAt: Date;
    expiredAt: Date;
  }): Promise<TokensDto> {
    await this.insertBlackListedRefreshToken({
      refreshToken,
      issuedAt: createdAt,
      expiredAt,
    });

    return this.generateTokens(userId);
  }
}
