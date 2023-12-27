import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl } = body;
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!imageUrl)
      return new NextResponse("imageUrl code is missing", { status: 400 });

    await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        imageUrl: imageUrl,
      },
    });

    return new NextResponse("User profile photo updated successfully");
  } catch (error) {
    console.log("[UPDATE_USR_PROFILE_IMAGE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const _profile = await currentProfile();

    if (!_profile) return new NextResponse("Unauthorized", { status: 401 });

    const profile = await db.profile.findUnique({
      where: {
        id: _profile.id,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[GET_PROFILE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
