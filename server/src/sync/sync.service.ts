import { Injectable } from '@nestjs/common';
import { ChatsOneToOneService } from 'src/chat/services/one-to-one/chats-one-to-one.service';
import { ConversationOneToOneService } from 'src/chat/services/one-to-one/conversation-one-to-one.service';
import { UserService } from 'src/user/user.service';
import { PullChangesRequestDto } from './dto/pull-changes/pull-changes-request.dto';
import { PullChangesResponseDto } from './dto/pull-changes/pull-changes-response.dto';
import {
  ConversationOneToOneSyncChangeDto,
  ConversationOneToOneSyncDto,
} from './dto/conversation-one-to-one-sync.dto';
import { UserSyncDto } from './dto/user-sync.dto';
import {
  ChatsOneToOneSyncChangeDto,
  ChatsOneToOneSyncDto,
} from './dto/chats-one-to-one-sync.dto';

@Injectable()
export class SyncService {
  constructor(
    private readonly userService: UserService,
    private readonly conversationOneToOneService: ConversationOneToOneService,
    private readonly chatsOneToOneService: ChatsOneToOneService,
  ) {}

  public async pullChanges(
    userId: string,
    pullChangesRequestDto: PullChangesRequestDto,
  ): Promise<PullChangesResponseDto> {
    const { lastSyncedAt, tableNames } = pullChangesRequestDto;

    const timestamp = new Date(lastSyncedAt);

    const { contactIds, conversationIds } =
      await this.conversationOneToOneService.findAllUserConversationsAndContacts(
        userId,
      );

    const conversationOneToOneChanges =
      await this.pullOneToOneConversationChanges(userId, timestamp);

    const involvedUserIds = this.findAllInvolvedUserIds(
      conversationOneToOneChanges,
    );

    const userChanges = await this.pullUserChanges(contactIds, timestamp);

    await this.addMissingUserDetails(userChanges, involvedUserIds);

    const chatsOneToOneChanges = await this.pullOneToOneChatsChanges(
      userId,
      conversationIds,
      timestamp,
    );

    return {
      timestamp: Date.now(),
      changes: {
        user: userChanges,
        conversationOneToOne: conversationOneToOneChanges,
        chatsOneToOne: chatsOneToOneChanges,
      },
    };
  }

  private async pullOneToOneConversationChanges(
    userId: string,
    timestamp: Date,
  ): Promise<ConversationOneToOneSyncChangeDto> {
    const conversations =
      await this.conversationOneToOneService.findConversationsContainingUser(
        userId,
        timestamp,
      );

    const mappedConversations = conversations.map((c) => {
      const { participants, ...rest } = c;
      return {
        ...rest,
        userId: participants.find((id) => id !== userId) as string,
      };
    });

    return {
      created: mappedConversations.filter((c) => c.createdAt > timestamp),
      updated: mappedConversations.filter(
        (c) => c.createdAt <= timestamp && c.updatedAt > timestamp,
      ),
      deleted: [],
    };
  }

  private async addMissingUserDetails(
    userChanges: UserSyncDto,
    involvedUserIds: Set<string>,
  ): Promise<void> {
    const syncedUserIds = new Set<string>([
      ...userChanges.created.map((u) => u.id),
      ...userChanges.updated.map((u) => u.id),
    ]);

    const missingUserIds = Array.from(involvedUserIds).filter(
      (id) => !syncedUserIds.has(id),
    );

    if (missingUserIds.length > 0) {
      const missingUsersDto = await this.pullUserChanges(
        missingUserIds,
        new Date(0),
      );
      userChanges.created.push(...missingUsersDto.created);
    }
  }

  private async pullUserChanges(
    userIds: string[],
    timestamp: Date,
  ): Promise<UserSyncDto> {
    const users = await this.userService.findUsersWithChanges(
      userIds,
      timestamp,
    );

    return {
      created: users.filter((u) => u.createdAt > timestamp),
      updated: users.filter(
        (u) => u.createdAt <= timestamp && u.updatedAt > timestamp,
      ),
      deleted: [],
    };
  }

  private async pullOneToOneChatsChanges(
    userId: string,
    conversationIds: string[],
    timestamp: Date,
  ): Promise<ChatsOneToOneSyncChangeDto> {
    const chats =
      await this.chatsOneToOneService.findChatsSinceForConversations(
        conversationIds,
        timestamp,
      );

    const mappedChats: ChatsOneToOneSyncDto[] = chats.map((c) => ({
      ...c,
      mode: c.senderId === userId ? 'SENT' : 'RECEIVED',
    }));

    return {
      created: mappedChats.filter((d) => d.createdAt > timestamp),
      updated: mappedChats.filter(
        (d) => d.createdAt <= timestamp && d.updatedAt > timestamp,
      ),
      deleted: [],
    };
  }

  private findAllInvolvedUserIds(
    conversationChanges: ConversationOneToOneSyncChangeDto,
  ): Set<string> {
    const involvedUserIds = new Set<string>();
    const collectUserIds = (c: ConversationOneToOneSyncDto) => {
      if (c.userId) involvedUserIds.add(c.userId);
    };

    conversationChanges.created.forEach(collectUserIds);
    conversationChanges.updated.forEach(collectUserIds);

    return involvedUserIds;
  }
}
