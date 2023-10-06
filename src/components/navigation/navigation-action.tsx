"use client";

import { Plus } from "lucide-react";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

type NavigationActionProps = {};

const NavigationAction: React.FC<NavigationActionProps> = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div
            className="flex mx-3 h-[48px] w-[48px] rounded-[24px]
        group-hover:rounded-[16px] transition-all overflow-hidden
        items-center justify-center bg-background bg-neutral-700
        group-hover:bg-[#23A559]"
          >
            <Plus
              className="group-hover:text-white transition text-[#23A559]"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
export default NavigationAction;
