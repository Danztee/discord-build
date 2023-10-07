import React from "react";
import { Input } from "../ui/input";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";

type ConversationHeaderProps = {};

const ConversationHeader: React.FC<ConversationHeaderProps> = () => {
  return (
    <div
      className="w-full text-md font-semibold px-3 flex items-center
    h-12 border-neutral-800 border-b-2 transition"
    >
      <Input
        className="h-[2rem]"
        variant="dark"
        placeholder="Find or start a conversation"
        style={{
          fontSize: "12px",
          fontWeight: "light",
        }}
      />
      <DropdownMenuSeparator />
    </div>
  );
};
export default ConversationHeader;
