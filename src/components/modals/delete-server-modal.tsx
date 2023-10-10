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
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

export const DeleteServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const { server } = data;

  const isModalOpen = isOpen && type === "deleteServer";

  const [isLoading, setIsLoading] = useState(false);
  const [serverName, setServerName] = useState("");

  const onClick = async () => {
    try {
      if (serverName !== server?.name)
        return alert("please enter the correct server name");

      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
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
            Delete &apos;{server?.name}&apos;
          </DialogTitle>
        </DialogHeader>

        <div className="px-6">
          <p className="text-sm bg-[#F0B132] p-2 rounded-md">
            Are you sure you want to delete{" "}
            <strong className="text-md">{server?.name}</strong>? This action
            cannot be undone.
          </p>
        </div>

        <div className="px-6">
          <label className="uppercase text-xs font-bold mb-3 text-[#B5BAC1]">
            ENTER SERVER NAME
          </label>

          <Input
            disabled={isLoading}
            variant="dark"
            placeholder="Enter server name"
            className="rounded-md"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
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
            Delete Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
