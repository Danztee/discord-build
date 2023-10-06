import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { inviteCode: string } }
) {
  try {
    if (!params.inviteCode)
      return new NextResponse("server id is missing", { status: 400 });

    const server = await db.server.findFirst({
      where: {
        inviteCode: params.inviteCode,
      },
    });

    if (!server)
      return new NextResponse("Server not found with that invite Id", {
        status: 404,
      });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER-WITH-INVITE-CODE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
