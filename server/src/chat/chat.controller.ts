import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StartNewConversationDto } from './dto/one-to-one/start-new-chat/start-new-conversation.dto';
import { ChatsOneToOneService } from './services/one-to-one/chats-one-to-one.service';
import { ApiCreatedResponse, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { ChatsOneToOneDto } from './dto/one-to-one/chats-one-to-one/chats-one-to-one.dto';
import type { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthRequest } from 'src/auth/types/auth-jwt.payload';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatsOneToOneService: ChatsOneToOneService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT token',
    required: true,
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiCreatedResponse({ type: ChatsOneToOneDto })
  async create(
    @Req() req: AuthRequest,
    @Body() startNewConversationDto: StartNewConversationDto,
    @Res() reply: FastifyReply,
  ) {
    const userId = req.user.id;

    const result = await this.chatsOneToOneService.startNewConversation(
      userId,
      startNewConversationDto,
    );

    return reply.status(HttpStatus.CREATED).send(result);
  }
}
