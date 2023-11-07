import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import ChatHeader from "../chat/chat-header";
import ChatMessages from "../chat/chat-messages";
import ChatInput from "../chat/chat-input";
import MediaRoom from "../media-room";

type MeProps = {
  serverId: string;
  memberId: string;
  searchParams: { video: boolean };
};

const Me: React.FC<MeProps> = async ({ serverId, memberId, searchParams }) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  if (!memberId) {
    return (
      <div className="bg-[#313338] flex flex-col h-full justify-center">
        <div className="text-center">
          <h3 className="font-bold text-[#F2F3F5] text-sm">
            It&apos;s quiet for now...
          </h3>
          <p className="text-xs text-[#B5BAC1]">
            When a friend starts an activity – like playing a game or hanging
            out on voice – we&apos;ll show it here!
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="bg-[#313338] flex flex-col h-full justify-center">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        username={otherMember.profile.username}
        type="conversation"
      />
      {searchParams.video && (
        <MediaRoom
          chatId={conversation.id}
          audio={true}
          video={true}
          profile={profile}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.username}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            name={otherMember.profile.username}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};
export default Me;
