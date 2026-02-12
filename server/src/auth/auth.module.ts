import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import jwtConfig from './configs/jwt.config';
import refreshJwtConfig from './configs/refresh-jwt.config';

import { BlackListedRefreshToken } from './entities/blacklist-refresh-token.entity';
import { User } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/user.service';

import { JwtStrategy } from './stratergies/jwt.stratergy';
import { RefreshJwtStrategy } from './stratergies/refresh-jwt.stratergy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, BlackListedRefreshToken]),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
