import { useParams, usePathname } from "next/navigation";
import React from "react";

type MeProps = {};

const Me: React.FC<MeProps> = () => {
  const params = useParams();
  const pathname = usePathname();

  console.log(params, pathname);
  return <div>Me page</div>;
};
export default Me;
