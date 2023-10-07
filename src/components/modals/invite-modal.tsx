"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";

import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { Label } from "../ui/label";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const { server } = data;

  const isModalOpen = isOpen && type === "invite";

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden !w-[28rem]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-sm text-start">
            Invite Friends to {server?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          <Label className="uppercase text-xs font-bold text-[#B5BAC1]">
            SEND A SERVER INVITE LINK TO A FRIEND
          </Label>
          <div className="flex items-center mt-2 gap-x-2 relative">
            <Input variant="dark" value={inviteUrl} disabled readOnly />

            <Button
              className={`absolute h-[2.2rem] w-[5rem] ml-[19.7rem] rounded-sm hover:opacity-100 ${
                copied ? "bg-[green]" : "bg-[#4A54CA]"
              }`}
              variant="primary"
              onClick={onCopy}
            >
              <span>{copied ? "copied" : "copy"}</span>
            </Button>
          </div>

          <p className="text-[10px] mt-2">
            Your invite link will never expire.{" "}
            <span className="text-[#01A8FC]" onClick={onNew}>
              Edit invite link
            </span>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
