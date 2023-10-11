"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { HashIcon, VoiceIcon } from "../custom-icon";
import { Edit, Lock, Settings, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

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
  const { onOpen } = useModal();

  const Icon = iconMap[channel.type];

  const serverId = params?.id[0];

  const onClick = () => {
    router.push(`/channels/${serverId}/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  const channelId = params?.id[1];

  return (
    <button
      onClick={onClick}
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition mb-1",
        channelId === channel.id && "bg-[#404249]"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-[#80848E]" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-[#949BA4] group-hover:text-zinc-300 transition",
          channelId === channel.id && "text-zinc-300 group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Settings
              className="hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300 transition"
              onClick={(e) => onAction(e, "editChannel")}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              className="hidden group-hover:block w-4 h-4 text-zinc-400 hover:text-zinc-300 transition"
              onClick={(e) => onAction(e, "deleteChannel")}
            />
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
