import { db } from "@/db";
import { PowerSyncDatabase } from "@powersync/react-native";

import {
  CONVERSATION_ONE_TO_ONE_TABLE_NAME,
  type ConversationOneToOne,
} from "../tables/conversation-one-to-one.table";

export class ConversationOneToOneRepostiory {
  private readonly db: PowerSyncDatabase;
  private readonly tableName: string;

  constructor() {
    this.db = db;
    this.tableName = CONVERSATION_ONE_TO_ONE_TABLE_NAME;
  }

  async get(id: string): Promise<ConversationOneToOne | null> {
    return await this.db.getOptional(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id],
    );
  }

  async getByUserId(userId: string): Promise<ConversationOneToOne | null> {
    return await this.db.getOptional(
      `SELECT * FROM ${this.tableName} WHERE userId = ?`,
      [userId],
    );
  }
}

export const conversationOneToOneRepository =
  new ConversationOneToOneRepostiory();
