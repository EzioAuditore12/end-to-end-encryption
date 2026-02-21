import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { GenerateSnowFlakeId } from 'src/common/utils/snowflakeId';

@Schema({ timestamps: true })
export class ConversationOneToOne {
  @Prop({
    type: BigInt,
    required: true,
    default: () => new GenerateSnowFlakeId(1).generate(),
  })
  _id: bigint;

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
