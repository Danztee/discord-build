"use client";

import ChannelId from "@/components/channels/channelId";
import Me from "@/components/channels/me";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Page = () => {
  const [initialChannel, setInitialChannel] = useState();
  const params = useParams() as { id: string };
  const serverId = params.id[0];

  const getChannel = useCallback(async () => {
    try {
      const res = await axios.get(`/api/servers/${serverId}`);
      const { data } = res;
      setInitialChannel(data.channels[0]);
    } catch (error) {
      console.log(error);
    }
  }, [serverId]);

  useEffect(() => {
    if (serverId === "%40me") {
      console.log("direct message page");
    } else {
      console.log("channel page");
      getChannel();
    }
  }, [getChannel, serverId]);

  return (
    <>
      {serverId === "%40me" ? (
        <Me />
      ) : (
        <ChannelId initialChannel={initialChannel} serverId={serverId} />
      )}
    </>
  );
};

export default Page;
