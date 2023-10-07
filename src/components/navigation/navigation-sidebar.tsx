import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import NavigationMe from "./navigation-me";

type NavigationSidebarProps = {};

const NavigationSidebar: React.FC<NavigationSidebarProps> = async () => {
  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3">
      <NavigationMe />
      <Separator className="h-[2px] bg-zinc-700 rounded-md w-10 mx-auto" />

      <ScrollArea className="flex-1 w-full">
        {servers.map((server, index) => (
          <div key={index} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
        <NavigationAction />
      </ScrollArea>
    </div>
  );
};
export default NavigationSidebar;
