import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { inviteCode: string } }
) {
  try {
    console.log("hi");
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.inviteCode)
      return new NextResponse("invite code is missing", { status: 400 });

    const existingServer = await db.server.findFirst({
      where: {
        inviteCode: params.inviteCode,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (existingServer)
      return new NextResponse(existingServer.id, {
        status: 400,
      });

    const server = await db.server.update({
      where: {
        inviteCode: params.inviteCode,
      },
      data: {
        members: {
          create: [{ profileId: profile.id }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[ACCEPT_INVITE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
