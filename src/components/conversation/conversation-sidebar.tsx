import React from "react";
import ConversationHeader from "./conversation-header";
import ConversationMember from "./conversation-member";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

type ConversationSidebarProps = {};

const ConversationSidebar: React.FC<ConversationSidebarProps> = async () => {
  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  const currentMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
    },
  });

  console.log(currentMember, "currentMember");

  if (!currentMember) return redirect("/login");

  const allMessages = await db.directMessage.findMany({
    where: {
      memberId: currentMember.id,
    },
  });

  // console.log(allMessages, "all direct message");

  return (
    <div className="flex flex-col h-full text-primary w-full bg-[#2B2D31]">
      <ConversationHeader />
      <ConversationMember />
    </div>
  );
};
export default ConversationSidebar;
