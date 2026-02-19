import { Injectable } from '@nestjs/common';
import { ConversationOneToOneService } from './conversation-one-to-one.service';

import { StartNewConversationDto } from 'src/chat/dto/one-to-one/start-new-conversation.dto';
import { InsertOneToOneChatDto } from 'src/chat/dto/one-to-one/chats-one-to-one/insert-one-to-one-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  ChatsOneToOne,
  ChatsOneToOneDocument,
} from 'src/chat/entities/one-to-one/chats-one-to-one.entity';
import { Model, Types } from 'mongoose';
import {
  ChatsOneToOneDto,
  convertChatsOneToOneFromMongoose,
} from 'src/chat/dto/one-to-one/chats-one-to-one/chats-one-to-one.dto';

@Injectable()
export class ChatsOneToOneService {
  constructor(
    private readonly conversationOneToOneService: ConversationOneToOneService,
    @InjectModel(ChatsOneToOne.name)
    private readonly chatsOneToOneRepository: Model<ChatsOneToOneDocument>,
  ) {}

  async startNewConversation(
    senderId: string,
    startNewConversationDto: StartNewConversationDto,
  ): Promise<ChatsOneToOneDto> {
    const { receiverId, text, createdAt, updatedAt } = startNewConversationDto;

    const conversation = await this.conversationOneToOneService.create({
      participant1: senderId,
      participant2: receiverId,
      createdAt,
      updatedAt,
    });

    const insertedChat = this.insert({
      conversationId: conversation.id,
      senderId,
      status: 'SENT',
      text,
      createdAt,
      updatedAt,
    });

    return insertedChat;
  }

  async insert(
    insertOneToOneChatDto: InsertOneToOneChatDto,
  ): Promise<ChatsOneToOneDto> {
    const { id, conversationId, senderId, status, text, createdAt, updatedAt } =
      insertOneToOneChatDto;

    const insertedChat = await this.chatsOneToOneRepository.create({
      _id: id ?? new Types.ObjectId(),
      conversationId,
      senderId,
      status,
      text,
      createdAt: createdAt ?? new Date(),
      updatedAt: updatedAt ?? new Date(),
    });

    return convertChatsOneToOneFromMongoose.parse(insertedChat);
  }
}
