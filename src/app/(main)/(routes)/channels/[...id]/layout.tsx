import ConversationSidebar from "@/components/conversation/conversation-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ChannelsLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  const serverId = params.id[0];

  if (serverId && serverId !== "%40me") {
    try {
      const server = await db.server.findUnique({
        where: {
          id: serverId,
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
      });

      if (!server) return redirect("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        {serverId !== "%40me" ? (
          <ServerSidebar serverId={serverId} />
        ) : (
          <ConversationSidebar />
        )}
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ChannelsLayout;
