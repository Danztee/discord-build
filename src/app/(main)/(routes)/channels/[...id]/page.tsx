import ChannelId from "@/components/channels/channelId";
import Me from "@/components/channels/me";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Channel } from "@prisma/client";
import axios from "axios";
import { redirect, useParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Page = async ({ params }: { params: { id: string[] } }) => {
  console.log(params);

  const profile = await currentProfile();

  const serverId = params.id[0];
  const channelId = params.id[1];

  if (serverId === "%40me") {
    return <Me />;
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: { profileId: profile.id },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return (
    <ChannelId
      initialChannel={initialChannel}
      serverId={serverId}
      channelId={channelId}
    />
  );
};

export default Page;
