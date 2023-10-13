import { Menu } from "lucide-react";
import React from "react";
import { HashIcon } from "../custom-icon";
import MobileToggle from "../mobile-toggle";

type ChatHeaderProps = {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imgUrl?: string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  type,
  name,
  imgUrl,
  serverId,
}) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <HashIcon className="w-8 h-8 text-zinc-400 mr-2" />
      )}
      <p className="font-semibold text-md text-white">{name}</p>
    </div>
  );
};
export default ChatHeader;
