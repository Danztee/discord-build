import React from "react";
import { HashIcon } from "../custom-icon";
import MobileToggle from "../mobile-toggle";
import UserAvatar from "../user-avatar";
import SocketIndicator from "../socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

type ChatHeaderProps = {
  serverId?: string;
  username: string;
  type: "channel" | "conversation";
  imageUrl?: string | null;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  type,
  username,
  imageUrl,
  serverId,
}) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-800 border-b-2">
      {type === "channel" && <MobileToggle serverId={serverId!} />}
      {type === "channel" && (
        <HashIcon className="w-8 h-8 text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar
          src={imageUrl}
          username={username}
          className="w-8 h-8 md:w-8 md:h-8 mr-2"
        />
      )}
      <p className="font-semibold text-md text-white">{username}</p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};
export default ChatHeader;
