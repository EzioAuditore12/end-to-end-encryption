import crypto from "react-native-nitro-crypto";
import ObjectID from "bson-objectid";

import { userRepository } from "./repositories/user";
import { conversationOneToOneRepository } from "./repositories/conversation-one-to-one";
import { chatOneToOneRepository } from "./repositories/chat-one-to-one";

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

    const now = Date.now();
    const user = {
      id: crypto.randomUUID(),
      email: randomEmail(),
      name: randomString(8),
      created_at: now,
      updated_at: now,
      dhPublicKey: "asd",
    };

    await userRepository.create(user); // Ensure user is created first

    const conversation = {
      id: ObjectID().toHexString(),
      userId: user.id,
      created_at: now,
      updated_at: now,
    };

    await conversationOneToOneRepository.create(conversation); // Then conversation

    const chat = {
      id: ObjectID().toHexString(),
      conversationId: conversation.id,
      mode: "SENT" as any,
      status: "SENT" as any,
      text: randomText(),
      created_at: now,
      updated_at: now,
    };

    await chatOneToOneRepository.create(chat); // Then chat
  }
}
