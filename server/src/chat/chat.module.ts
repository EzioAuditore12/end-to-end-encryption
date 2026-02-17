import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConversationOneToOne.name, schema: ConversationOneToOneSchema },
      { name: ChatsOneToOne.name, schema: ChatsOneToOneSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
