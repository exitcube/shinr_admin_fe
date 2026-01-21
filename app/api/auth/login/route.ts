/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "@/helper/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const { data } = await API.post("/admin/login", body);

    const { accessToken, refreshToken } = data.data;

    const res = NextResponse.json({ message: "Login successful", accessToken });

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 30 * 1000,
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error: any) {
    console.log({ error });

    return NextResponse.json(
      { message: error.response?.data?.message || "Login failed" },
      { status: 401 }
    );
  }
}
