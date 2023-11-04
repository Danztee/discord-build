import { Channel } from "@prisma/client";
import { redirect, useParams, usePathname } from "next/navigation";
import React from "react";
import ChatHeader from "../chat/chat-header";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import ChatInput from "../chat/chat-input";
import ChatMessages from "../chat/chat-messages";

type ChannelIdProps = {
  serverId: string;
  channelId: string;
};

const ChannelId: React.FC<ChannelIdProps> = async ({ serverId, channelId }) => {
  if (!channelId || !serverId) return;

  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) redirect("/");

  return (
    <div className="bg-[#313338] flex flex-col h-full">
      <ChatHeader
        username={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <ChatMessages
        name={channel.name}
        member={member}
        chatId={channel.id}
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{ channelId: channel.id, serverId: channel.serverId }}
        paramKey="channelId"
        paramValue={channel.id}
        type="channel"
      />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  );
};
export default ChannelId;