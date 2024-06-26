import { NextApiResponseServerIo } from "@/types";
import { Server as NextServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIo } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NextServer = res.socket.server as any;
    const io = new ServerIo(httpServer, {
      path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }
  res.end;
};

export default ioHandler;
