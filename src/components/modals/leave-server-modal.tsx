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

import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const { server } = data;

  const isModalOpen = isOpen && type === "leaveServer";

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
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
            Leave &apos;{server?.name}&apos;
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-3">
          <p className="text-sm">
            Are you sure you want to leave{" "}
            <strong className="text-md">{server?.name}</strong>? You won&apos;t
            be able to re-join this server unless you are re-invited.
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
            Leave Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
