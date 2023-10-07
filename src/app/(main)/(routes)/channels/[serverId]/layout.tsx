import ConversationSidebar from "@/components/conversation/conversation-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const MeLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  if (params.serverId !== "%40me") {
    const server = await db.server.findUnique({
      where: {
        id: params.serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (!server) return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        {params.serverId !== "%40me" ? (
          <ServerSidebar serverId={params.serverId} />
        ) : (
          <ConversationSidebar />
        )}
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default MeLayout;
