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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([
      { name: ConversationOneToOne.name, schema: ConversationOneToOneSchema },
      { name: ChatsOneToOne.name, schema: ChatsOneToOneSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatsOneToOneService,
    ConversationOneToOneService,
    UserService,
  ],
})
export class ChatModule {}
