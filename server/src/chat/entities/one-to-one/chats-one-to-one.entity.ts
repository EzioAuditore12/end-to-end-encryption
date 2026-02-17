import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ChatsOneToOne {
  @Prop({
    type: Types.ObjectId,
    ref: 'ConversationOneToOne',
    required: true,
    index: true,
  })
  conversationId: Types.ObjectId;

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
