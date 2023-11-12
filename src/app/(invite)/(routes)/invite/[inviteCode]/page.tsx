"use client";

import { Button } from "@/components/ui/button";
import { Server } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type PageProps = {
  params: {
    inviteCode: string;
  };
};

const Page: React.FC<PageProps> = () => {
  const router = useRouter();
  const params = useParams();
  const [server, setServer] = useState<Server>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!params?.inviteCode) return;
      try {
        const response = await axios.get(
          `/api/servers/server-with-invite-code/${params.inviteCode}`
        );
        setServer(response.data);
      } catch (error: any) {
        console.log(error.data);
        // router.push("/");
      }
    }
    fetchData();
  }, [params?.inviteCode, router]);

  const acceptInvite = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/servers/accept-invite/${params?.inviteCode}`
      );
      const { data: server } = response;
      router.push(`/server/${server.id}`);
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  if (!server) return null;

  return (
    <div className="bg-[#F9F9F9] dark:bg-[#313338] p-8 w-[480px] rounded-md font-bold flex flex-col items-center gap-8">
      <div className="relative group flex mx-3 h-[60px] w-[60px] rounded-[16px] transition-all overflow-hidden">
        <Image fill src={server.imageUrl} alt="server-image" />
      </div>

      <div>
        <h1 className="text-center text-2xl">{server?.name} Server</h1>
        <div className="text-[#B5BAC1] text-[14px] font-light mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <i className="w-[10px] h-[10px] rounded-full bg-[#23A559]" />
            <span>4,791 Online</span>
          </div>

          <div className="flex items-center gap-1">
            <i className="w-[10px] h-[10px] rounded-full bg-[#B5BAC1]" />
            <span>84,686 Members</span>
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <Button
          loading={loading}
          className="w-full"
          variant="primary"
          onClick={acceptInvite}
        >
          Accept Invite
        </Button>
      </div>
    </div>
  );
};

export default Page;
