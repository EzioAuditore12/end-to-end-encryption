import { createTransaction } from "@tanstack/react-db";
import { PowerSyncTransactor } from "@tanstack/powersync-db-collection";
import ObjectID from "bson-objectid";

import { db } from "@/db";

import {
  UserCollections,
  ChatOnetoOneCollections,
  ConversationOnetoOneCollections,
} from "../collections";

// Helper functions for random data
function randomString(length: number) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}
function randomEmail() {
  return `${randomString(6)}@${randomString(4)}.com`;
}
function randomText() {
  const texts = [
    "Hello!",
    "How are you?",
    "What's up?",
    "Random message",
    "Test chat",
    "Another message",
    "Sample text",
    "Greetings!",
    "Hey there!",
    "Good day!",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}

export async function pullChanges() {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = {
      id: crypto.randomUUID(),
      email: randomEmail(),
      name: randomString(8),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    const conversation = {
      id: ObjectID().toHexString(),
      userId: user.id,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    const batchTx = createTransaction({
      autoCommit: false,
      mutationFn: async ({ transaction }) => {
        await new PowerSyncTransactor({ database: db }).applyTransaction(
          transaction,
        );
      },
    });

    batchTx.mutate(() => {
      UserCollections.insert(user);
      ConversationOnetoOneCollections.insert(conversation);
      ChatOnetoOneCollections.insert({
        id: ObjectID().toHexString(),
        conversationId: conversation.id,
        mode: "SENT",
        status: "SENT",
        text: randomText(),
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });
    });

    await batchTx.commit();
  }
}
