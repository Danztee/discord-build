"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import UserAvatar from "../user-avatar";

type ServerMemberProps = {
  member: Member & { profile: Profile };
  server: Server;
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const ServerMember: React.FC<ServerMemberProps> = ({ member, server }) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/channels/@me/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "text-zinc-700"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        username={member.profile.username}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-[#949BA4] group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-zinc-200 group-hover:text-white"
        )}
      >
        {member.profile.username}
      </p>
    </button>
  );
};
export default ServerMember;
