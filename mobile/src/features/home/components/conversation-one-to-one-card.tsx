import { Card, type CardRootProps } from "heroui-native/card";
import { Avatar } from "heroui-native/avatar";
import { Description } from "heroui-native/description";
import { View } from "react-native";
import { eq, useLiveSuspenseQuery } from "@tanstack/react-db";

import { cn } from "tailwind-variants";
import {
  ThrottledTouchable,
  ThrottledTouchableProps,
} from "@/components/throttled-touchable";
import { ConversationOneToOne } from "@/db/tables/conversation-one-to-one.table";
import { UserCollections } from "@/db/tanstack";

interface ConversationOneToOneCardProps extends CardRootProps {
  data: ConversationOneToOne;
  onPress?: ThrottledTouchableProps["onPress"];
}

export function ConversationOneToOneCard({
  className,
  data,
  onPress,
  ...props
}: ConversationOneToOneCardProps) {
  const { id, userId, createdAt, updatedAt } = data;

  const { data: userData } = useLiveSuspenseQuery((q) =>
    q
      .from({ user: UserCollections })
      .where(({ user }) => eq(user.id, userId))
      .findOne(),
  );

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ThrottledTouchable onPress={onPress}>
      <Card key={id} className={cn(className)} {...props}>
        <Card.Body className="flex-row items-center gap-x-2">
          <Avatar alt={userData?.name ?? ""} className="size-28">
            <Avatar.Image />
            <Avatar.Fallback>{userData?.name?.[0]}</Avatar.Fallback>
          </Avatar>

          <View className="gap-y-2">
            <Description>Email: {userData?.email}</Description>
            <Description>
              Created At: {formatTime(new Date(createdAt))}
            </Description>
            <Description>
              Updated At: {formatTime(new Date(updatedAt))}
            </Description>
          </View>
        </Card.Body>
      </Card>
    </ThrottledTouchable>
  );
}
