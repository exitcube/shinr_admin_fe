import API from "@/helper/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data } = await API.post("/admin/generate-refreshToken", {
      refreshToken,
    });

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    } = data.data;

    const res = NextResponse.json({
      message: "Token refreshed",
      accessToken: newAccessToken,
    });

    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 30,
    });

    res.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    const res = NextResponse.json(
      { message: "Unable to refresh token" },
      { status: 401 },
    );

    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");

    return res;
  }
}
