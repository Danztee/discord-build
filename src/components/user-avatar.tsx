import { cn } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  src?: string | null;
  className?: string;
  username?: string;
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  className,
  username,
}) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src !== null ? src : undefined} />
      <AvatarFallback>{username?.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
