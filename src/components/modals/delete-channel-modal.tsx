"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";

import qs from "query-string";

import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteChannelModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/channels/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden !w-[28rem]">
        <DialogHeader className="px-6 pt-3">
          <DialogTitle className="text-start text-[1.2rem]">
            Delete Channel
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-4">
          <p className="text-sm rounded-md">
            Are you sure you want to delete{" "}
            <strong className="text-md">#{channel?.name}</strong>? This cannot
            be undone.
          </p>
        </div>

        <DialogFooter className="bg-[#2B2D31] px-6 py-4 flex items-center gap-2">
          <Button
            disabled={isLoading}
            onClick={onClose}
            variant="ghost"
            className="hover:underline hover:bg-transparent"
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            className="rounded-sm bg-[#DA373C]"
            disabled={isLoading}
            onClick={onClick}
          >
            Delete Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
