import ChannelId from "@/components/channels/channelId";
import Me from "@/components/channels/me";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string[] };
  searchParams: { video: boolean };
}) => {
  const profile = await currentProfile();

  const serverId = params.id[0];
  const channelId = params.id[1];

  if (serverId && serverId === "%40me") {
    const memberId = params.id[1];
    return (
      <Me serverId={serverId} memberId={memberId} searchParams={searchParams} />
    );
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

  if (channelId === undefined) {
    redirect(`/channels/${serverId}/${initialChannel?.id}`);
  }

  if (!channelId && !serverId) return;

  return <ChannelId serverId={serverId} channelId={channelId} />;
};

export default Page;
