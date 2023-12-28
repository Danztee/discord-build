import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import React from "react";

type ConversationMemberProps = {};

const ConversationMember: React.FC<ConversationMemberProps> = async () => {
  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  //   console.log(profile);

  return <div>Have a good coding</div>;
};
export default ConversationMember;
