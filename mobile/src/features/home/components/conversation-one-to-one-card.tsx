import { Card, type CardRootProps } from "heroui-native/card";
import { Avatar } from "heroui-native/avatar";
import { Description } from "heroui-native/description";
import { View } from "react-native";
import { useSuspenseQuery } from "@powersync/react-native";
import { toCompilableQuery } from "@powersync/drizzle-driver";

import { cn } from "tailwind-variants";
import {
  ThrottledTouchable,
  ThrottledTouchableProps,
} from "@/components/throttled-touchable";
import { ConversationOneToOne } from "@/db/tables/conversation-one-to-one.table";
import { db } from "@/db";
import { userTable } from "@/db/tables/user.table";
import { eq } from "drizzle-orm";

const query = db.select().from(userTable);

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

  const { data: userData } = useSuspenseQuery(
    toCompilableQuery(query.where(eq(userTable.id, userId))),
  );

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ThrottledTouchable onPress={onPress}>
      <Card key={id} className={cn(className)} {...props}>
        <Card.Body className="flex-row items-center gap-x-2">
          <Avatar alt={userData[0].name} className="size-28">
            <Avatar.Image />
            <Avatar.Fallback>{userData[0].name[0]}</Avatar.Fallback>
          </Avatar>

          <View className="gap-y-2">
            <Description>Email: {userData[0].email}</Description>
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
