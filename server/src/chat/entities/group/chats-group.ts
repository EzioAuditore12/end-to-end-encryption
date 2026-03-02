import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { GenerateSnowFlakeId } from 'src/common/utils/snowflakeId';

@Schema({ timestamps: true })
export class ChatsGroup {
  @Prop({
    type: BigInt,
    required: true,
    default: () => new GenerateSnowFlakeId(1).generate(),
  })
  _id: bigint;

  @Prop({
    type: BigInt,
    ref: 'ConversationGroup',
    required: true,
    index: true,
  })
  conversationId: bigint;

  @Prop({ required: true })
  senderId: string;

  @Prop({ type: String, maxLength: 1000, trim: true })
  text: string;

  @Prop({
    type: [String],
    default: [],
    description: 'User IDs who have received the message',
  })
  deliveredTo: string[];

  @Prop({
    type: [String],
    default: [],
    description: 'User IDs who have seen the message',
  })
  seenBy: string[];

  createdAt: Date;

  updatedAt: Date;
}

export const ChatsGroupSchema = SchemaFactory.createForClass(ChatsGroup);
export type ChatsGroupDocument = HydratedDocument<ChatsGroup>;
