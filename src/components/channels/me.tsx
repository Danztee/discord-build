import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import ChatHeader from "../chat/chat-header";

type MeProps = {
  serverId: string;
  memberId: string;
};

const Me: React.FC<MeProps> = async ({ serverId, memberId }) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  const currentMember = await db.member.findFirst({
    where: {
      // serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) return redirect("/login");

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) return redirect("/channels/@me");

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  if (!conversation) return redirect("/channels/@me");

  return (
    <div className="bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        username={otherMember.profile.username}
        type="conversation"
      />
    </div>
  );
};
export default Me;
