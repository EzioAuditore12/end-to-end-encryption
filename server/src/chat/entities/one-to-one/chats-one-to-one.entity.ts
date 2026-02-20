import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { GenerateSnowFlakeId } from 'src/common/utils/snowflakeId';

@Schema({ timestamps: true })
export class ChatsOneToOne {
  @Prop({
    type: BigInt,
    required: true,
    default: () => new GenerateSnowFlakeId(1).generate(),
  })
  _id: bigint;

  @Prop({
    type: BigInt,
    ref: 'ConversationOneToOne',
    required: true,
    index: true,
  })
  conversationId: BigInt;

  @Prop({ required: true })
  senderId: string;

  @Prop({ type: String, maxLength: 1000, trim: true })
  text: string;

  @Prop({
    type: String,
    enum: ['SENT', 'DELIVERED', 'SEEN'],
    default: 'SENT',
  })
  status: 'SENT' | 'DELIVERED' | 'SEEN';

  createdAt: Date;

  updatedAt: Date;
}

export const ChatsOneToOneSchema = SchemaFactory.createForClass(ChatsOneToOne);
export type ChatsOneToOneDocument = HydratedDocument<ChatsOneToOne>;
