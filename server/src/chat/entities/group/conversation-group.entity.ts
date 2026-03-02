import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { GenerateSnowFlakeId } from 'src/common/utils/snowflakeId';

@Schema({ timestamps: true })
export class ConversationGroup {
  @Prop({
    type: BigInt,
    required: true,
    default: () => new GenerateSnowFlakeId(1).generate(),
  })
  _id: bigint;

  @Prop({ type: String, maxLength: 50, trim: true })
  name: string;

  @Prop({
    type: [String],
    required: true,
    index: true,
  })
  admins: string[];

  @Prop({ required: false })
  avatar?: string;

  @Prop({
    type: [String],
    required: true,
    index: true,
    validate: [
      (val: string[]) => val.length >= 2,
      'Must have more than 2 participants',
    ],
  })
  participants: string[];

  createdAt: Date;
  updatedAt: Date;
}

export const ConversationGroupSchema =
  SchemaFactory.createForClass(ConversationGroup);

export type ConversationGroupDocument = HydratedDocument<ConversationGroup>;
