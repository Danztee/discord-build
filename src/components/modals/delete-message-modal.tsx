"use client";

import qs from "query-string";
import axios from "axios";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      await axios.delete(url);

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-start text-xl font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-start text-[#DBDEE1]">
            Are you sure you want to delete this message?
          </DialogDescription>
        </DialogHeader>

        <DialogContent>
          <div className="py-4"></div>
        </DialogContent>

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
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
