import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ConversationOneToOneDto,
  convertConversationOneToOneSchemaFromMongoose,
} from 'src/chat/dto/one-to-one/conversation-one-to-one/conversation-one-to-one.dto';
import { CreateConversationOneToOneDto } from 'src/chat/dto/one-to-one/conversation-one-to-one/create-one-to-one-conversation.dto';
import {
  ConversationOneToOne,
  ConversationOneToOneDocument,
  ConversationOneToOneSchema,
} from 'src/chat/entities/one-to-one/conversation-one-to-one.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ConversationOneToOneService {
  constructor(
    @InjectModel(ConversationOneToOne.name)
    private readonly conversationsOneToOneModel: Model<ConversationOneToOneDocument>,
    private readonly userService: UserService,
  ) {}

  public async create(
    createConversationOneToOneDto: CreateConversationOneToOneDto,
  ): Promise<ConversationOneToOneDto> {
    const { participant1, participant2, createdAt, updatedAt } =
      createConversationOneToOneDto;

    let conversation = await this.findConversationBetweenParicipants(
      participant1,
      participant2,
    );

    if (!conversation) {
      const areExistingUser = await this.userService.findMultipleById([
        participant1,
        participant2,
      ]);

      if (!areExistingUser)
        throw new NotFoundException('One of the given user is not valid');

      conversation = await this.createConversationBetweenParticipants(
        participant1,
        participant2,
        createdAt,
        updatedAt,
      );
    }

    return conversation;
  }

  private async findConversationBetweenParicipants(
    participant1: string,
    participant2: string,
  ): Promise<ConversationOneToOneDto | null> {
    const conversation = await this.conversationsOneToOneModel.findOne({
      participants: { $all: [participant1, participant2] },
    });

    if (!conversation) return null;

    return convertConversationOneToOneSchemaFromMongoose.parse(conversation);
  }

  private async createConversationBetweenParticipants(
    participant1: string,
    participant2: string,
    createdAt?: Date,
    updatedAt?: Date,
  ): Promise<ConversationOneToOneDto> {
    const conversation = await this.conversationsOneToOneModel.create({
      participants: [participant1, participant2],
      createdAt: createdAt ?? new Date(),
      updatedAt: updatedAt ?? new Date(),
    });

    return convertConversationOneToOneSchemaFromMongoose.parse(conversation);
  }

  async isExistingConversation(id: string): Promise<boolean> {
    const exists = await this.conversationsOneToOneModel.exists({ _id: id });
    return !!exists;
  }
}
