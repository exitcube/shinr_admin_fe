import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    return res;
  }

  return NextResponse.json({ message: "Token found", accessToken });
}
