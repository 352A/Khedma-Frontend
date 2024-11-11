import { User } from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";

export default function ChatSidebar() {
  return (
    <div className="h-screen w-1/5 bg-gray-100 py-16">
      <div className="flex flex-col justify-center gap-8">
        <User
          name="Ahmed El Hadad"
          description={
            <RouterLink
              href="https://twitter.com/jrgarciadev"
              size="sm"
              isExternal
            >
              @jrgarciadev
            </RouterLink>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
        <User
          name="Ahmed El Hadad"
          description={
            <RouterLink
              href="https://twitter.com/jrgarciadev"
              size="sm"
              isExternal
            >
              @jrgarciadev
            </RouterLink>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
        <User
          name="Ahmed El Hadad"
          description={
            <RouterLink
              href="https://twitter.com/jrgarciadev"
              size="sm"
              isExternal
            >
              @jrgarciadev
            </RouterLink>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
        <User
          name="Ahmed El Hadad"
          description={
            <RouterLink
              href="https://twitter.com/jrgarciadev"
              size="sm"
              isExternal
            >
              @jrgarciadev
            </RouterLink>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
      </div>
    </div>
  );
}
