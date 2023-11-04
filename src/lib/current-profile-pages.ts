import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export const currentProfilePages = async (req: NextApiRequest) => {
  const res = {
    getHeader() {
      /* empty */
    },
    setCookie() {
      /* empty */
    },
    setHeader() {
      /* empty */
    },
  } as any;

  const session = await getServerSession(req, res, authOptions);
  return session.user;
};
