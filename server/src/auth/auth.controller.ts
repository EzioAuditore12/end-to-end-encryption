import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register/register-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { FastifyReply } from 'fastify';
import { LoginUserDto } from './dto/login/login-user.dto';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import type { RefreshTokenStratergyReqParameters } from './types/auth-jwt.payload';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { RegisterUserResponseDto } from './dto/register/register-user-response.dto';
import { LoginUserResponseDto } from './dto/login/login-user-response.dto';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiCreatedResponse({ type: RegisterUserResponseDto })
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() reply: FastifyReply,
  ): Promise<RegisterUserResponseDto> {
    const credentials = await this.authService.registerUser(registerUserDto);

    return reply.status(HttpStatus.CREATED).send(credentials);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ type: LoginUserResponseDto })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() reply: FastifyReply,
  ): Promise<LoginUserResponseDto> {
    const credentials = await this.authService.validateUser(loginUserDto);

    return reply.status(HttpStatus.OK).send(credentials);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh Tokens',
    description:
      'Here After sending authenticated refresh token in body, bot access and refesh token will be generated',
  })
  @ApiBody({ type: RefreshTokensDto })
  @ApiResponse({ type: TokensDto })
  async refreshTokens(@Req() req: RefreshTokenStratergyReqParameters) {
    return await this.authService.refreshTokens({
      userId: req.user.id,
      refreshToken: req.user.refreshToken,
      expiredAt: req.user.expiredAt,
      createdAt: req.user.issuedAt,
    });
  }
}
