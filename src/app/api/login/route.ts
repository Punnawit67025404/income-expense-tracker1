import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const correctUsername = process.env.APP_USERNAME;
  const correctPassword = process.env.APP_PASSWORD;

  if (username !== correctUsername || password !== correctPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 วัน
    path: "/",
  });

  return NextResponse.json({ ok: true });
}