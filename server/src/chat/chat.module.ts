import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

import {
  ConversationOneToOne,
  ConversationOneToOneSchema,
} from './entities/one-to-one/conversation-one-to-one.entity';
import {
  ChatsOneToOne,
  ChatsOneToOneSchema,
} from './entities/one-to-one/chats-one-to-one.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ChatsOneToOneService } from './services/one-to-one/chats-one-to-one.service';
import { ConversationOneToOneService } from './services/one-to-one/conversation-one-to-one.service';
import { ChatService } from './services/chat.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/configs/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([
      { name: ConversationOneToOne.name, schema: ConversationOneToOneSchema },
      { name: ChatsOneToOne.name, schema: ChatsOneToOneSchema },
    ]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatService,
    ChatsOneToOneService,
    ConversationOneToOneService,
    UserService,
  ],
})
export class ChatModule {}
