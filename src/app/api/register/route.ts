import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;

  try {
    const exists = await db.profile.count({ where: { email } });
    if (exists) throw new Error("User already exists with that email`");

    const hashedPassword = await hash(password, 10);

    await db.profile.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "user created successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
