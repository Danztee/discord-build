import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const profile = await currentProfile();
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;

    console.log(profile);

    if (!profile) return res.status(401).json({ error: "unauthorized" });

    if (!serverId)
      return res.status(401).json({ error: "serverId is missing" });

    if (!channelId)
      return res.status(401).json({ error: "channelId is missing" });

    if (!content) return res.status(401).json({ error: "content is missing" });

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },

      include: {
        members: true,
      },
    });

    if (!server) return res.status(401).json({ error: "server not found" });

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) return res.status(401).json({ error: "channel not found" });

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) return res.status(401).json({ error: "member not found" });

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io.emit(channelKey, message);
  } catch (error) {
    console.log(`messages_POST: ${error}`);
    return res.status(500).json({ message: "Internal error" });
  }
}
