import { currentProfile } from "@/lib/current-profile";
import { useParams, usePathname } from "next/navigation";
import React from "react";

type MeProps = {
  serverId: string;
  memberId: string;
};

const Me: React.FC<MeProps> = () => {
  const profile = currentProfile();
  // const params = useParams();
  // const pathname = usePathname();

  // console.log(params, pathname);
  return <div>Me page</div>;
};
export default Me;
