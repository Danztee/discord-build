"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { HashIcon, VoiceIcon } from "../custom-icon";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Channel name is required" })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be general",
    }),
  type: z.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "createChannel";
  const { channelType } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelType || ChannelType.TEXT,
    },
  });

  useEffect(() => {
    if (channelType) form.setValue("type", channelType);
    else form.setValue("type", ChannelType.TEXT);
  }, [channelType, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const serverId = params?.id[0];
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels`,
        query: {
          serverId,
        },
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#313338] text-[#F2F3F5] p-0 overflow-hidden !w-[28rem]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-[1.3rem] text-start font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <FormField
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CHANNEL TYPE</FormLabel>

                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center justify-between text-[15px] bg-[#43444B] p-2 rounded-md">
                        <HashIcon />
                        <div className="flex flex-col gap-1">
                          <p>Text</p>
                          <p className="text-[11px]">
                            Send messages, images, GIFs, emoji, opinions and
                            puns
                          </p>
                        </div>

                        <RadioGroupItem value="TEXT" id="TEXT" />
                      </div>

                      <div className="flex items-center justify-between text-[15px] bg-[#43444B] p-2 rounded-md">
                        <VoiceIcon />
                        <div className="flex flex-col gap-1">
                          <p>Voice</p>
                          <p className="text-[11px]">
                            Hang out together with voice, video and screen share
                          </p>
                        </div>

                        <RadioGroupItem value="AUDIO" id="AUDIO" />
                      </div>
                    </RadioGroup>

                    <FormMessage color="#fff" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold">
                      CHANNEL NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        variant="dark"
                        placeholder="# new-channel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                className="rounded-sm"
                loading={isLoading}
                disabled={isLoading}
                // disabled={form?.formState?.defaultValues?.name === ""}
              >
                Create Channel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
