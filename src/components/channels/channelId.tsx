import { Channel } from "@prisma/client";
import { redirect, useParams, usePathname } from "next/navigation";
import React from "react";
import ChatHeader from "../chat/chat-header";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

type ChannelIdProps = {
  initialChannel: Channel;
  serverId: string;
  channelId: string;
};

const ChannelId: React.FC<ChannelIdProps> = async ({
  serverId,
  initialChannel,
  channelId,
}) => {
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

  if (initialChannel) {
    console.log("initial channel");
    // redirect(`/channels/${serverId}/${initialChannel?.id}`);
  }

  return (
    <div className="bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </div>
  );
};
export default ChannelId;
