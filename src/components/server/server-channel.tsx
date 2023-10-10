"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { HashIcon, VoiceIcon } from "../custom-icon";
import { Edit, Lock, Settings, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";

type ServerChannelProps = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: HashIcon,
  [ChannelType.AUDIO]: VoiceIcon,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel: React.FC<ServerChannelProps> = ({
  channel,
  server,
  role,
}) => {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  return (
    <button
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "text-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-[#80848E]" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-[#949BA4] group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-zinc-300 group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Settings className="hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash className="hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-400" />
      )}
    </button>
  );
};
export default ServerChannel;
