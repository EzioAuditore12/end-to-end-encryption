import { LegendList, type LegendListProps } from "@legendapp/list";
import { router } from "expo-router";

import type { User } from "../schemas/user.schema";
import { UserCard } from "./user-card";

interface UserListProps extends Omit<
  LegendListProps<User>,
  "data" | "children" | "keyExtractor" | "renderItem"
> {
  data: User[];
  isFetchingNextPage?: boolean;
}

export function UserList({
  className,
  isFetchingNextPage,
  data,
  ...props
}: UserListProps) {
  return (
    <>
      <LegendList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            data={item}
            className="mb-3"
            onPress={() =>
              router.push({
                pathname: "/(main)/user/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
        recycleItems
        {...props}
      />
    </>
  );
}
