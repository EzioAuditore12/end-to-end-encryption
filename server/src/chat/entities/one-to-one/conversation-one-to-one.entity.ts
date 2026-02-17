import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class ConversationOneToOne {
  @Prop({
    type: [String],
    required: true,
    index: true,
    validate: [
      (val: string[]) => val.length === 2,
      'Must have exactly 2 participants',
    ],
  })
  participants: string[];

  createdAt: Date;
  updatedAt: Date;
}

export const ConversationOneToOneSchema =
  SchemaFactory.createForClass(ConversationOneToOne);

export type ConversationOneToOneDocument =
  HydratedDocument<ConversationOneToOne>;
