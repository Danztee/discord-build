import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export const currentProfile = async () => {
  const session = await getServerSession(authOptions);
  return session.user;
};
