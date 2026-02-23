import { db } from "@/db";
import {
  type ConversationOneToOne,
  conversationOneToOneTable,
  type InsertConversationOneToOne,
} from "../tables/conversation-one-to-one.table";
import { eq } from "drizzle-orm";

export class ConversationOneToOneRepository {
  private readonly database = db;
  private readonly table = conversationOneToOneTable;

  public async create(
    insertConversationOneToOne: InsertConversationOneToOne,
  ): Promise<ConversationOneToOne> {
    return await this.database
      .insert(this.table)
      .values(insertConversationOneToOne)
      .returning()
      .get();
  }

  public async get(id: string): Promise<ConversationOneToOne | undefined> {
    return await this.database
      .select()
      .from(this.table)
      .where(eq(this.table, id))
      .get();
  }

  public async getByUserId(
    userId: string,
  ): Promise<ConversationOneToOne | undefined> {
    return await this.database
      .select()
      .from(this.table)
      .where(eq(this.table.userId, userId))
      .get();
  }

  public async updateTime(id: string, time: number) {
    await this.database
      .update(this.table)
      .set({ updatedAt: time })
      .where(eq(this.table.id, id));
  }
}

export const conversationOneToOneRepository =
  new ConversationOneToOneRepository();
