import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Validate refresh token in DB
  const newAccessToken = "NEW_ACCESS_TOKEN";
  const newRefreshToken = "NEW_REFRESH_TOKEN";

  const res = NextResponse.json({ success: true });

  res.cookies.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 10,
  });

  res.cookies.set("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
