import React from "react";
import ConversationHeader from "./conversation-header";

type ConversationSidebarProps = {};

const ConversationSidebar: React.FC<ConversationSidebarProps> = () => {
  return (
    <div className="flex flex-col h-full text-primary w-full bg-[#2B2D31]">
      <ConversationHeader />
    </div>
  );
};
export default ConversationSidebar;
