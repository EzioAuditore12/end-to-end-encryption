import { Card, type CardRootProps } from "heroui-native/card";
import { Avatar } from "heroui-native/avatar";
import { Description } from "heroui-native/description";
import { View } from "react-native";

import { cn } from "tailwind-variants";
import {
  ThrottledTouchable,
  ThrottledTouchableProps,
} from "@/components/throttled-touchable";

import { ConversationOneToOne } from "@/db/models/conversation-one-to-one.model";
import { User } from "@/db/models/user.model";
import { withDatabase } from "@/db";
import { withObservables } from "@nozbe/watermelondb/react";

interface ConversationOneToOneCardProps extends CardRootProps {
  data: ConversationOneToOne;
  user: User;
  onPress?: ThrottledTouchableProps["onPress"];
}

export function ConversationOneToOneCard({
  className,
  data,
  user,
  onPress,
  ...props
}: ConversationOneToOneCardProps) {
  const { id, updatedAt } = data;

  const { name, email } = user;

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ThrottledTouchable onPress={onPress}>
      <Card key={id} className={cn(className)} {...props}>
        <Card.Body className="flex-row items-center gap-x-2">
          <Avatar alt={name} className="size-28">
            <Avatar.Image />
            <Avatar.Fallback>{name[0]}</Avatar.Fallback>
          </Avatar>

          <View className="gap-y-2">
            <Description>Email: {email}</Description>
            <Description>
              Updated At: {formatTime(new Date(updatedAt))}
            </Description>
          </View>
        </Card.Body>
      </Card>
    </ThrottledTouchable>
  );
}

export const EnhancedConversationOneToOneCard = withDatabase(
  withObservables(["data"], ({ data }: { data: ConversationOneToOne }) => ({
    data: data.observe(),
    user: data.user.observe(),
  }))(ConversationOneToOneCard),
);
