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
import HashIcon from "../hash-icon";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "createChannel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels`,
        query: {
          serverId: params?.serverId,
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
                      defaultValue="TEXT"
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
                        <svg
                          className="icon-1ykL9s"
                          aria-hidden="true"
                          role="img"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            className="foreground-1dSmCM"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"
                            aria-hidden="true"
                          ></path>
                        </svg>
                        <div className="flex flex-col gap-1">
                          <p>Voice</p>
                          <p className="text-[11px]">
                            Hang out together with voice, video and screen share
                          </p>
                        </div>

                        <RadioGroupItem value="VOICE" id="VOICE" />
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
              <p className="hover:underline text-sm">Cancel</p>
              <Button
                variant="primary"
                className="rounded-sm"
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
