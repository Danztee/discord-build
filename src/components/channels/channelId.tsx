"use client";

import { Channel } from "@prisma/client";
import { redirect, useParams, usePathname } from "next/navigation";
import React from "react";

type ChannelIdProps = {
  initialChannel?: Channel;
  serverId?: string;
};

const ChannelId: React.FC<ChannelIdProps> = ({ initialChannel, serverId }) => {
  // if (initialChannel?.name !== "general") return null;

  const pathname = usePathname();
  const params = useParams();

  const pathnameLength = pathname?.split("/").length;

  if (pathnameLength === 3 && initialChannel?.name === "general") {
    return redirect(`/channels/${serverId}/${initialChannel?.id}`);
  }

  // return redirect(`/channels/${serverId}/${initialChannel.id}`);

  return <div>channel id page</div>;
};
export default ChannelId;
