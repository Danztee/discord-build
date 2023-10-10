"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

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

  return <div>member page</div>;
};
export default ServerMember;
